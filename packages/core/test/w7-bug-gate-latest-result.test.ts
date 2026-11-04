/**
 * W7 (F-0089): the bug gate judges each test by its LATEST result.
 *
 * SCRUM-18 run 1 found a real defect (an unlabelled search input, low contrast),
 * proposed it five times with evidence, and the locator gate refused it each
 * time — because AC-2's selector had failed in the FIRST full run and the gate
 * counted that failure forever, even after the selector was repaired. The run
 * blocked on a true bug. The fix (shipped 2.0.2, 6d04950) reads each test's
 * latest result; this is the test that proves it, which W7 asked for.
 *
 * Replaying the real ledger with `aqa check-rules` confirms the gate no longer
 * refuses that bug (it now reaches the unscoped-scan rule instead, which is W11).
 */

import { describe, it, expect } from "vitest";
import { unhealedLocator } from "../src/skills/story-rules.js";
import type { AnyRunEvent } from "../src/types.js";

const LOC = (loc: string) =>
  `Error: expect(locator).toBeVisible() failed\n\nLocator: ${loc}\n` +
  "Expected: visible\nTimeout: 5000ms\nError: element(s) not found\n\nCall log:\n" +
  `  - waiting for ${loc}`;

let id = 0;
const pair = (payload: Record<string, unknown>, result: Record<string, unknown>): AnyRunEvent[] => {
  const c = ++id;
  return [
    { tool: "attestqa", runId: "r", eventId: c, timestamp: 1, kind: "call", payload },
    {
      tool: "attestqa",
      runId: "r",
      eventId: ++id,
      timestamp: 1,
      kind: "observation",
      payload: { eventIdOfCall: c, ok: true, artefacts: [], durationMs: 1, result },
    },
  ] as unknown as AnyRunEvent[];
};
const run = (
  failures: Array<{ title: string; message: string }>,
  args: Record<string, unknown> = {},
) =>
  pair(
    { server: "pw", toolName: "run_tests", args, startedAt: 0 },
    { passed: 0, failed: failures.length, failures },
  );
const heal = (test: string) =>
  pair({ server: "aqa", toolName: "heal_locator", args: { test }, startedAt: 0 }, {});

const BUG = {
  toolName: "ado.wit_work_item_write",
  args: { action: "create", workItemType: "Bug" },
};
const AC2 = "AC-2 Searching lists only matching products";

describe("the bug gate judges each test by its latest result (W7, F-0089)", () => {
  it("does not hold a bug when the locator failure was repaired (passed since)", () => {
    const events = [
      ...run([{ title: AC2, message: LOC("getByText('searchsearchclose')") }]), // run 1: locator fails
      ...run([]), // run 2 (full): AC-2 no longer failing -> repaired
    ];
    expect(unhealedLocator(BUG, events)).toBeUndefined();
  });

  it("still holds a bug when an unhealed locator failure is the latest result", () => {
    const events = [...run([{ title: AC2, message: LOC("getByText('searchsearchclose')") }])];
    expect(unhealedLocator(BUG, events)).toMatch(/locator in this run matched nothing/);
  });

  it("does not hold a bug once aqa.heal_locator has read the page", () => {
    const events = [
      ...run([{ title: AC2, message: LOC("getByText('searchsearchclose')") }]),
      ...heal(AC2),
    ];
    expect(unhealedLocator(BUG, events)).toBeUndefined();
  });

  it("only gates a Bug create, not another work-item type", () => {
    const events = [...run([{ title: AC2, message: LOC("x") }])];
    const task = {
      toolName: "ado.wit_work_item_write",
      args: { action: "create", workItemType: "Task" },
    };
    expect(unhealedLocator(task, events)).toBeUndefined();
  });
});
