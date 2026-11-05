/**
 * W34 (F-0153): a state-transition test's assertion must be specific to the
 * transition. The seeded-fault study found two accepted tests that passed while
 * a fault was live, because the assertion did not exercise the transition:
 *
 *   - JS-3 "After logout the browser returns to the storefront home page"
 *     asserted toHaveURL(/#\//) — a prefix that /#/login also satisfies, so the
 *     wrong destination passed.
 *   - JS-2 "Register button is disabled when password and repeat password
 *     differ" filled only the two password fields and asserted toBeDisabled(),
 *     which held because the e-mail and security-question fields were empty,
 *     whether or not the mismatch rule exists.
 *
 * Both are weaker than their design, not broken, so shapeProblems reports each
 * as a review-only problem (isReviewOnly) rather than a hard gap.
 */

import { describe, it, expect } from "vitest";
import {
  shapeProblems,
  isReviewOnly,
  weakUrlDestination,
  type DesignItem,
} from "../src/design/test-design.js";

const logoutItem: DesignItem = {
  id: "D1",
  covers: "AC-2",
  type: "functional",
  technique: "state-transition",
  conditions: ["the user is signed in", "the user clicks Logout"],
  // Two parts, so the design-level state-transition check is satisfied.
  expected: "the account menu shows Login again; the browser returns to the storefront home page",
  source: "AC-2",
};

// A logout test with TWO assertions (so the existing assertion-count check
// passes) whose destination assertion is nonetheless a bare prefix.
const logoutWeak = `
  await page.getByLabel("Account").click();
  await page.getByRole("menuitem", { name: "Logout" }).click();
  await expect(page.getByRole("menuitem", { name: "Login" })).toBeVisible();
  await expect(page).toHaveURL(/#\\//);
`;

// The same test, destination pinned to the exact home route.
const logoutPinned = `
  await page.getByLabel("Account").click();
  await page.getByRole("menuitem", { name: "Logout" }).click();
  await expect(page.getByRole("menuitem", { name: "Login" })).toBeVisible();
  await expect(page).toHaveURL(/#\\/$/);
`;

const registerItem: DesignItem = {
  id: "D2",
  covers: "AC-3",
  type: "functional",
  technique: "state-transition",
  conditions: ["the password and its repeat differ"],
  expected: "the Register button is disabled; the form shows a password-mismatch message",
  source: "AC-3",
};

// Fills only the two password fields, then asserts disabled — no enabled
// baseline, so the assertion holds on any incomplete form.
const registerWeak = `
  await page.getByTestId("password").fill("Pa55word!");
  await page.getByTestId("passwordRepeat").fill("different");
  await expect(page.getByText(/do not match/i)).toBeVisible();
  await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
`;

// Establishes the enabled baseline with every field valid, then changes the one
// condition under test and asserts disabled.
const registerPaired = `
  await page.getByTestId("email").fill("a@b.test");
  await page.getByTestId("password").fill("Pa55word!");
  await page.getByTestId("passwordRepeat").fill("Pa55word!");
  await page.getByTestId("securityQuestion").click();
  await page.getByText("Your eldest sibling's middle name?").click();
  await page.getByTestId("securityAnswer").fill("x");
  await expect(page.getByRole("button", { name: "Register" })).toBeEnabled();
  await page.getByTestId("passwordRepeat").fill("different");
  await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
`;

describe("W34: the assertion must be specific to the transition", () => {
  it("flags a destination assertion that matches a bare prefix", () => {
    const problems = shapeProblems(logoutItem, logoutWeak);
    const hit = problems.find((p) => p.startsWith("the destination assertion matches a prefix"));
    expect(hit).toBeTruthy();
    expect(isReviewOnly(hit!)).toBe(true);
    expect(hit!).toContain("/#\\//");
  });

  it("accepts a destination assertion anchored to the exact route", () => {
    const problems = shapeProblems(logoutItem, logoutPinned);
    expect(problems.some((p) => p.startsWith("the destination assertion"))).toBe(false);
  });

  it("flags a control-state assertion with no valid-case counterpart", () => {
    const problems = shapeProblems(registerItem, registerWeak);
    const hit = problems.find((p) =>
      p.startsWith("the control-state assertion has no valid-case counterpart"),
    );
    expect(hit).toBeTruthy();
    expect(isReviewOnly(hit!)).toBe(true);
  });

  it("accepts a control-state test that asserts both the enabled baseline and the disabled case", () => {
    const problems = shapeProblems(registerItem, registerPaired);
    expect(problems.some((p) => p.startsWith("the control-state assertion"))).toBe(false);
  });

  it("does not ask for a URL check on an item whose expected result names no destination", () => {
    const noDestination: DesignItem = {
      ...logoutItem,
      expected: "the account menu shows Login again; the session token is cleared",
    };
    const problems = shapeProblems(noDestination, logoutWeak);
    expect(problems.some((p) => p.startsWith("the destination assertion"))).toBe(false);
  });

  it("weakUrlDestination: prefix weak, pinned and routed strong", () => {
    expect(weakUrlDestination("await expect(page).toHaveURL(/#\\//);")).toBeTruthy();
    expect(weakUrlDestination(`expect(page.url()).toContain("/#/");`)).toBeTruthy();
    expect(weakUrlDestination("await expect(page).toHaveURL(/#\\/$/);")).toBeUndefined();
    expect(weakUrlDestination("await expect(page).toHaveURL(/#\\/login/);")).toBeUndefined();
    // A text assertion that happens to contain a slash is not a URL check.
    expect(
      weakUrlDestination(`expect(heading).toContainText("Terms / Conditions");`),
    ).toBeUndefined();
  });
});
