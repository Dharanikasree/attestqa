/**
 * W25 (F-0112): a criterion whose natural type is accessibility (or security) is
 * satisfied by a test of that type. "Every criterion has a functional test"
 * refused AB#110's AC-3 ("the sign-in page passes an automated WCAG 2.1 A/AA
 * scan") for having no functional item; the agent then added a functional item
 * to satisfy the rule and implemented it as a second copy of the axe scan — the
 * coverage rule produced padding instead of coverage.
 *
 * The design records only the AC labels, not their text, so the criterion's
 * natural type is read from the item the agent chose to cover it with.
 */

import { describe, it, expect } from "vitest";
import { validateDesign, type StoryFacts, type DesignItem } from "../src/design/test-design.js";

const facts: StoryFacts = {
  acceptanceCriteria: ["AC-1", "AC-2", "AC-3"],
  bugs: [],
  tasks: [],
  story: { id: 110, title: "Sign-in page" },
};

const fn = (id: string, covers: string): DesignItem => ({
  id,
  covers,
  type: "functional",
  technique: "equivalence-partitioning",
  conditions: ["a valid value"],
  expected: "the page behaves as the criterion says",
  source: covers,
});

const a11y = (id: string, covers: string): DesignItem => ({
  id,
  covers,
  type: "accessibility",
  technique: "checklist-based",
  conditions: ["the sign-in page"],
  expected: "no WCAG 2.1 A/AA violations are reported",
  source: covers,
});

const sec = (id: string, covers: string): DesignItem => ({
  id,
  covers,
  type: "security",
  technique: "checklist-based",
  conditions: ["the session"],
  expected: "the session token is cleared and the account cannot be enumerated",
  source: covers,
});

describe("W25: a non-functional criterion is covered by its own test type", () => {
  it("accepts an accessibility item as the test of an accessibility criterion", () => {
    const problems = validateDesign(
      { items: [fn("D1", "AC-1"), fn("D2", "AC-2"), a11y("D3", "AC-3")], excluded: [] },
      facts,
      ["functional", "accessibility"],
    );
    expect(problems.some((p) => p.includes("AC-3 has no"))).toBe(false);
  });

  it("accepts a security item as the test of a security criterion", () => {
    const problems = validateDesign(
      { items: [fn("D1", "AC-1"), fn("D2", "AC-2"), sec("D3", "AC-3")], excluded: [] },
      facts,
      ["functional", "security"],
    );
    expect(problems.some((p) => p.includes("AC-3 has no"))).toBe(false);
  });

  it("still flags a criterion with no test of any covering type", () => {
    const problems = validateDesign(
      { items: [fn("D1", "AC-1"), fn("D2", "AC-2")], excluded: [] },
      facts,
      ["functional"],
    );
    expect(
      problems.some(
        (p) => p === "AC-3 has no functional, accessibility or security test in the design",
      ),
    ).toBe(true);
  });
});
