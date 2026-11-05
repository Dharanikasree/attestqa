/**
 * W3 (F-0086): the source check accepts an issue key alone and with a type word
 * before OR after it.
 *
 * It accepted "task SCRUM-9" (the type word before the key) but refused
 * "SCRUM-9" (the key alone) and "SCRUM-9 sub-task" (the type word after), so the
 * agent dropped the true source — a sub-task, where the implementation facts
 * live — to get past a rule that was right in aim but too strict in form.
 */

import { describe, it, expect } from "vitest";
import { parseDesign, validateDesign, type StoryFacts } from "../src/design/test-design.js";

const FACTS: StoryFacts = { acceptanceCriteria: ["AC-1"], bugs: [], tasks: [9] };
const ALL = ["functional", "security", "accessibility", "confirmation"] as const;
const item = (source: string): Record<string, unknown> => ({
  id: "D1",
  covers: "AC-1",
  type: "functional",
  technique: "equivalence-partitioning",
  conditions: ["the user does the thing"],
  expected: "the result is observed",
  source,
});

const sourceAccepted = (source: string): boolean => {
  const problems = validateDesign(parseDesign({ items: [item(source)] }), FACTS, ALL);
  return !problems.some((p) => p.includes("names no criterion"));
};

describe("source accepts an issue key alone and with a type word (W3)", () => {
  it("accepts the bare issue key (SCRUM-9)", () => expect(sourceAccepted("SCRUM-9")).toBe(true));
  it("accepts the key with a type word after (SCRUM-9 sub-task)", () =>
    expect(sourceAccepted("SCRUM-9 sub-task")).toBe(true));
  it("still accepts the key with a type word before (task SCRUM-9)", () =>
    expect(sourceAccepted("task SCRUM-9")).toBe(true));
  it("still refuses a genuinely sourceless item", () =>
    expect(sourceAccepted("it usually does")).toBe(false));
});
