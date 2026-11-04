/**
 * W33 (F-0151, F-0130): a test that changes the shared sign-in account and does
 * not restore it makes the whole suite non-rerunnable. SCRUM-10's forgot-password
 * test reset the fixture account's password through the security-question flow
 * and never put it back; in a full parallel run every sign-in after it answered
 * 401. Nothing in the design rules, verifier or triage looked for it.
 *
 * Reconstructed from the finding (the real mutating test lives in the paper's
 * frozen final suite, which this track does not touch): a design rule now
 * requires the expected result to state the restore, and the verifier reports a
 * mutating test with no restore anywhere in the spec as a review item.
 */

import { describe, it, expect } from "vitest";
import {
  validateDesign,
  traceProblems,
  mutatesAccount,
  bodyMutatesAccount,
  leavesFixtureRestored,
  type TestDesign,
  type StoryFacts,
} from "../src/design/test-design.js";

const facts: StoryFacts = {
  acceptanceCriteria: ["AC-2"],
  bugs: [],
  tasks: [],
  story: { id: 10, title: "Reset a forgotten password" },
  epic: { id: 5, title: "Customer account access" },
};

const resetItem = {
  id: "D1",
  covers: "AC-2",
  type: "functional" as const,
  technique: "state-transition" as const,
  conditions: ["the user answers the security question correctly", "enters a new password"],
  expected: "the password is changed and a confirmation is shown",
  source: "AC-2",
};

describe("W33 design rule: a credential change must state the restore", () => {
  it("flags a reset item whose expected result does not restore the account", () => {
    const d: TestDesign = { items: [resetItem], excluded: [] };
    const problems = validateDesign(d, facts, ["functional"]);
    expect(problems.some((p) => p.includes("changes the shared sign-in account"))).toBe(true);
  });

  it("accepts the item once the expected result restores the original password", () => {
    const d: TestDesign = {
      items: [
        {
          ...resetItem,
          expected:
            "the password is changed and a confirmation is shown; the test then restores the original password",
        },
      ],
      excluded: [],
    };
    const problems = validateDesign(d, facts, ["functional"]);
    expect(problems.some((p) => p.includes("changes the shared sign-in account"))).toBe(false);
  });

  it("does not fire on a plain sign-in or registration item", () => {
    const signIn = {
      ...resetItem,
      conditions: ["a registered user", "the correct email and password"],
      expected: "the user is signed in and sees the account menu",
    };
    const register = {
      ...resetItem,
      conditions: ["a new visitor signs up", "a valid email and password"],
      expected: "a new account is created and the user can sign in",
    };
    const d: TestDesign = { items: [signIn, register], excluded: [] };
    const problems = validateDesign(d, facts, ["functional"]);
    expect(problems.some((p) => p.includes("changes the shared sign-in account"))).toBe(false);
  });
});

const feature = `@story:10
Feature: Customer account access

  @ac:2 @design:D1
  Scenario: Correct answer and new password changes the password
    Given the user is on the forgot-password page
    When the user answers the security question and enters a new password
    Then the password is changed and a confirmation is shown
`;

const mutateBody = `
  // @design:D1
  test("AC-2 — Correct answer and new password changes the password", async ({ page }) => {
    await page.goto("/#/forgot-password");
    await page.getByLabel("Email").fill(process.env.AQA_APP_USER ?? "");
    await page.getByLabel("Security Answer").fill("answer");
    await page.getByLabel("New Password").fill("NewPass123!");
    await page.getByLabel("Repeat Password").fill("NewPass123!");
    await page.getByRole("button", { name: "Change" }).click();
    await expect(page.getByText("Your password was successfully changed")).toBeVisible();
  });
`;

const specNoRestore = `import { test, expect } from "@playwright/test";\n${mutateBody}`;
const specWithRestore = `import { test, expect } from "@playwright/test";
test.afterAll(async () => {
  // restore the fixture account's original password
});
${mutateBody}`;

describe("W33 verifier: a mutating test must leave the fixture restored", () => {
  const design: TestDesign = { items: [resetItem], excluded: [] };

  it("reports a mutation with no restore anywhere in the spec", () => {
    const t = traceProblems(
      design,
      [{ path: "f.feature", text: feature }],
      [{ path: "s.spec.ts", text: specNoRestore }],
      10,
    );
    expect(t.reviewShape.some((r) => r.includes("changes the shared sign-in account"))).toBe(true);
  });

  it("stays quiet when an afterAll hook restores the account", () => {
    const t = traceProblems(
      design,
      [{ path: "f.feature", text: feature }],
      [{ path: "s.spec.ts", text: specWithRestore }],
      10,
    );
    expect(t.reviewShape.some((r) => r.includes("changes the shared sign-in account"))).toBe(false);
  });
});

describe("W33 detectors", () => {
  it("mutatesAccount", () => {
    expect(mutatesAccount("the user resets the password via the security question")).toBe(true);
    expect(mutatesAccount("change the account e-mail")).toBe(true);
    expect(mutatesAccount("forgot-password flow with a new password")).toBe(true);
    expect(mutatesAccount("a registered user signs in with the correct password")).toBe(false);
    expect(mutatesAccount("a new visitor registers an account with a password")).toBe(false);
  });

  it("bodyMutatesAccount", () => {
    expect(bodyMutatesAccount(mutateBody)).toBe(true);
    expect(bodyMutatesAccount(`await page.getByLabel("Password").fill(pass);`)).toBe(false);
  });

  it("leavesFixtureRestored", () => {
    expect(leavesFixtureRestored("then restore the original password")).toBe(true);
    expect(leavesFixtureRestored("change the password back afterwards")).toBe(true);
    expect(leavesFixtureRestored("the password is changed and confirmed")).toBe(false);
  });
});
