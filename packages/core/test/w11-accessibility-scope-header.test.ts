/**
 * W11 (F-0093): the accessibility scope rule removes the story's own control
 * when it lives in the header. SCRUM-18's search box is in the top toolbar; the
 * scan was scoped to <main>, which excludes the toolbar, so a real "label"
 * violation on the search box passed and the run reported nothing. The scope
 * rule is right to keep site-wide header/footer noise off a story, but scoping
 * to a generic page region also drops the story's own controls that sit outside
 * main.
 *
 * The verifier now reports (review-only) a scan scoped to main/body alone when
 * the story is about a control that usually lives in the header or toolbar.
 */

import { describe, it, expect } from "vitest";
import { traceProblems, type TestDesign } from "../src/design/test-design.js";

const feature = `@story:18
Feature: Finding and buying products

  @ac:1 @design:D1
  Scenario: Searching lists matching products
    Given I search from the magnifying-glass icon in the top toolbar
    Then matching products are listed

  @design:D2
  Scenario: The search page passes axe accessibility checks
    Given I am on the search results page
    Then there are no accessibility violations
`;

const axeTest = (include: string) => `
  // @design:D2
  test("story – search page passes axe accessibility checks", async ({ page }) => {
    const { default: AxeBuilder } = await import("@axe-core/playwright");
    const results = await new AxeBuilder({ page }).include("${include}").withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations.map((v) => v.id).sort()).toEqual([]);
  });
`;

const d1Test = `
  // @design:D1
  test("AC-1 – searching lists matching products", async ({ page }) => {
    await page.getByLabel("Search").fill("apple");
    await expect(page.getByText("Apple Juice").first()).toBeVisible();
  });
`;

const searchDesign: TestDesign = {
  items: [
    {
      id: "D1",
      covers: "AC-1",
      type: "functional",
      technique: "equivalence-partitioning",
      conditions: ["the user searches from the magnifying-glass icon in the top toolbar"],
      expected: "matching products are listed",
      source: "AC-1",
    },
    {
      id: "D2",
      covers: "story",
      type: "accessibility",
      technique: "checklist-based",
      conditions: ["the search results page"],
      expected: "no WCAG 2.1 A/AA violations are reported",
      source: "config",
    },
  ],
  excluded: [],
};

const spec = (include: string) =>
  `import { test, expect } from "@playwright/test";\n${d1Test}\n${axeTest(include)}`;

describe("W11: an accessibility scan scoped to main hides a header control", () => {
  it("flags a main-only scan when the story is about a header control", () => {
    const t = traceProblems(
      searchDesign,
      [{ path: "f.feature", text: feature }],
      [{ path: "s.spec.ts", text: spec("main") }],
      18,
    );
    const hit = t.reviewShape.find((r) => r.includes("scoped to the main region"));
    expect(hit).toBeTruthy();
    expect(hit!).toContain("search box");
  });

  it("stays quiet when the scan includes the story's own control", () => {
    const t = traceProblems(
      searchDesign,
      [{ path: "f.feature", text: feature }],
      [{ path: "s.spec.ts", text: spec("#searchQuery") }],
      18,
    );
    expect(t.reviewShape.some((r) => r.includes("scoped to the main region"))).toBe(false);
  });

  it("does not fire when the story is not about a header control", () => {
    const productDesign: TestDesign = {
      items: [
        {
          id: "D1",
          covers: "AC-1",
          type: "functional",
          technique: "equivalence-partitioning",
          conditions: ["the user opens a product detail page"],
          expected: "the product's name and price are shown",
          source: "AC-1",
        },
        {
          id: "D2",
          covers: "story",
          type: "accessibility",
          technique: "checklist-based",
          conditions: ["the product detail page"],
          expected: "no WCAG 2.1 A/AA violations are reported",
          source: "config",
        },
      ],
      excluded: [],
    };
    const productFeature = `@story:18
Feature: Product detail

  @ac:1 @design:D1
  Scenario: Product detail shows name and price
    Given I open a product detail page
    Then the name and price are shown

  @design:D2
  Scenario: The product detail page passes axe accessibility checks
    Given I am on the product detail page
    Then there are no accessibility violations
`;
    const t = traceProblems(
      productDesign,
      [{ path: "f.feature", text: productFeature }],
      [{ path: "s.spec.ts", text: spec("main") }],
      18,
    );
    expect(t.reviewShape.some((r) => r.includes("scoped to the main region"))).toBe(false);
  });
});
