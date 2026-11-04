/**
 * W8/W10 (F-0090, F-0092): tests weaker than the approved design.
 *
 * Two mechanical gaps the end-of-run check missed, both from the real SCRUM-18
 * ledgers:
 *   - W10: a "no match shows no product cards" test asserted
 *     getByText("product cards").not.toBeVisible() — prose that is never on any
 *     page, so it passes whatever the product does. A negative-form assertion
 *     must name an element, not prose. (From run 20261023T145501Z-dc4ce24a.)
 *   - W8/W10: "every approved design item has a test that references it" —
 *     design-item-not-tested read the feature file alone, so an item whose
 *     scenario was tagged but whose spec test was missing read as covered.
 *
 * The semantic weaknesses the findings also name (absence never checked, an
 * assertion satisfied by a product name) are the paper's measurement, not a
 * mechanical rule, and are deliberately left to the reviewer.
 */

import { describe, it, expect } from "vitest";
import {
  shapeProblems,
  isReviewOnly,
  proseAbsenceAssertion,
  traceProblems,
  type DesignItem,
  type TestDesign,
} from "../src/design/test-design.js";

// The real D2 test body from run 20261023T145501Z-dc4ce24a.
const d2Real = `
  test("AC-1 – Searching for a term that matches no product shows no product cards", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await expect(searchPage.page.getByText("product cards").first()).not.toBeVisible();
  });
`;

const d2Item: DesignItem = {
  id: "D2",
  covers: "AC-1",
  type: "functional",
  technique: "boundary-value-analysis",
  conditions: ["a term that matches no product"],
  expected: "no product cards are displayed",
  source: "AC-1",
};

describe("W10: a negative-form assertion must name an element, not prose", () => {
  it("flags the real 'no product cards' assertion as review-only", () => {
    const problems = shapeProblems(d2Item, d2Real);
    const hit = problems.find((p) => p.startsWith("a negative assertion located by text"));
    expect(hit).toBeTruthy();
    expect(isReviewOnly(hit!)).toBe(true);
  });

  it("leaves a positive text assertion alone", () => {
    const body = `await expect(page.getByText("Apple Juice").first()).toBeVisible();`;
    expect(proseAbsenceAssertion(body)).toBeUndefined();
  });

  it("leaves a negative assertion on a structural locator alone", () => {
    const byTestId = `await expect(page.getByTestId("product").first()).not.toBeVisible();`;
    const byCount = `await expect(page.locator(".product")).toHaveCount(0);`;
    expect(proseAbsenceAssertion(byTestId)).toBeUndefined();
    expect(proseAbsenceAssertion(byCount)).toBeUndefined();
  });

  it("flags toBeHidden and toHaveCount(0) on a text locator too", () => {
    expect(
      proseAbsenceAssertion(`await expect(page.getByText("product cards")).toBeHidden();`),
    ).toBeTruthy();
    expect(
      proseAbsenceAssertion(`await expect(page.getByText("product cards")).toHaveCount(0);`),
    ).toBeTruthy();
  });
});

const feature = `@story:SCRUM-18
Feature: Finding and buying products

  @ac:1 @design:D1
  Scenario: Searching lists matching products
    Given I search for "apple"
    Then matching products are listed

  @ac:1 @design:D2
  Scenario: A no-match search shows no products
    Given I search for a term with no match
    Then no products are listed
`;

// A spec that implements D1 only — D2's scenario is tagged in the feature but
// nothing in the spec references it.
const specD1Only = `import { test, expect } from "@playwright/test";
// @design:D1
test("Searching lists matching products", async ({ page }) => {
  await expect(page.getByTestId("product").first()).toBeVisible();
});
`;

const design: TestDesign = {
  items: [{ ...d2Item, id: "D1", covers: "AC-1", technique: "equivalence-partitioning" }, d2Item],
  excluded: [],
};

describe("W8/W10: every approved design item has a test that references it", () => {
  it("reports a feature-tagged item with no test in the spec as untested", () => {
    const t = traceProblems(
      design,
      [{ path: "f.feature", text: feature }],
      [{ path: "s.spec.ts", text: specD1Only }],
      18,
    );
    expect(t.untested.some((u) => u.startsWith("D2"))).toBe(true);
    expect(t.untested.some((u) => u.startsWith("D1"))).toBe(false);
  });

  it("does not apply the spec-level clause before any spec exists", () => {
    const t = traceProblems(design, [{ path: "f.feature", text: feature }], [], 18);
    // Both items are tagged in the feature; with no spec on disk yet,
    // no-spec-written carries it, so neither is called untested here.
    expect(t.untested).toEqual([]);
  });
});
