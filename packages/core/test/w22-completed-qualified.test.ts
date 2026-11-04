/**
 * W22 (F-0106): "completed" is qualified by the items left for review.
 *
 * AB#109 run 2 passed 5/5 but had an unscoped scan and a half-asserted
 * transition, both demoted to "for your review" rather than blocking. The run
 * line said plainly "completed", so a reader skimming the headline could not see
 * that the run was weaker than its design. The completion line now names how many
 * items need review (and how many need a decision).
 */

import { describe, it, expect } from "vitest";
import { StageTracker } from "../src/runtime/stages.js";
import type { AnyRunEvent } from "../src/types.js";

let id = 0;
const ev = (kind: string, payload: Record<string, unknown>): AnyRunEvent =>
  ({
    tool: "attestqa",
    runId: "r",
    eventId: ++id,
    timestamp: 1,
    kind,
    payload,
  }) as unknown as AnyRunEvent;
const play = (events: AnyRunEvent[]) => {
  const t = new StageTracker();
  return events.map((e) => t.line(e)).join("");
};

describe("a completed run that is weaker than its design says so (W22)", () => {
  it("qualifies 'completed' with the count of items needing review", () => {
    const out = play([
      ev("request", { text: "Write tests for AB#109" }),
      ev("route", { path: "A" }),
      ev("verify", {
        limitations: [
          "for your review — the accessibility scan checks more broadly than the design says",
          "for your review — AC-2 asserts the transition less specifically than the design",
        ],
      }),
      ev("end", { status: "done", summary: "" }),
    ]);
    expect(out).toMatch(/completed[^\n]*2 for your review/);
  });

  it("leaves a clean completed run unqualified", () => {
    const out = play([
      ev("request", { text: "Write tests for AB#109" }),
      ev("route", { path: "A" }),
      ev("verify", { limitations: [] }),
      ev("end", { status: "done", summary: "" }),
    ]);
    expect(out).toMatch(/: completed\n/);
    expect(out).not.toMatch(/for your review/);
  });
});
