/**
 * W28 / W19 (F-0126): heal repairs the run's OWN story, not another story's
 * leftovers in a shared epic spec.
 *
 * SCRUM-25 run 1: the epic feature file still held SCRUM-24's scenarios (its run
 * blocked before scaffold), this run's scaffold turned them into tests, and the
 * first failure handed to the heal agent was SCRUM-24's "Create Address" scan —
 * not a SCRUM-25 test. The run's budget then went on the previous story's
 * leftovers. A test tagged for another story is not this run's to repair; it
 * belongs in the report. An untagged test is nobody's and stays in scope.
 */

import { describe, it, expect } from "vitest";
import { roleFor } from "../src/agents/roles.js";
import type { AnyRunEvent } from "../src/types.js";

const SPEC = [
  'import { test, expect } from "@playwright/test";',
  "// @story:SCRUM-24 @design:D1",
  'test("Accessibility of the Create Address form", async ({ page }) => {',
  "  await expect(page.getByRole('button', { name: 'Add' })).toBeVisible();",
  "});",
  "// @story:SCRUM-25 @design:D1",
  'test("AC-1 Correct current password changes the password", async ({ page }) => {',
  "  await expect(page.getByRole('button', { name: 'Change' })).toBeVisible();",
  "});",
].join("\n");

// A locator failure (stuckAction matches "element(s) not found").
const LOC = (loc: string) =>
  `Error: expect(locator).toBeVisible() failed\n\nLocator: ${loc}\n` +
  "Expected: visible\nTimeout: 5000ms\nError: element(s) not found\n\nCall log:\n" +
  `  - waiting for ${loc}`;

let id = 0;
const pair = (payload: Record<string, unknown>, obs: Record<string, unknown>): AnyRunEvent[] => {
  const c = ++id;
  return [
    { tool: "attestqa", runId: "r", eventId: c, timestamp: 1, kind: "call", payload },
    {
      tool: "attestqa",
      runId: "r",
      eventId: ++id,
      timestamp: 1,
      kind: "observation",
      payload: { eventIdOfCall: c, ok: true, artefacts: [], durationMs: 1, ...obs },
    },
  ] as unknown as AnyRunEvent[];
};

const run = (failures: Array<{ title: string; message: string }>): AnyRunEvent[] => [
  ...pair(
    {
      server: "fs",
      toolName: "write_file",
      args: { path: "tests/epic.spec.ts", content: SPEC },
      startedAt: 0,
    },
    { result: {} },
  ),
  ...pair(
    { server: "pw", toolName: "run_tests", args: {}, startedAt: 0 },
    { result: { passed: 0, failed: failures.length, failures } },
  ),
];

const CREATE_ADDRESS = "Accessibility of the Create Address form"; // SCRUM-24 leftover
const CHANGE_PW = "AC-1 Correct current password changes the password"; // SCRUM-25's own

describe("heal is scoped to the run's own story (W28/W19)", () => {
  it("redirects heal to the run's own failing test, past another story's leftover", () => {
    const events = run([
      { title: CREATE_ADDRESS, message: LOC("getByRole('button', { name: 'Add' })") },
      { title: CHANGE_PW, message: LOC("getByRole('button', { name: 'Change' })") },
    ]);
    const role = roleFor(events, "SCRUM-25");
    expect(role.name).toBe("heal");
    expect(role.because).toContain(CHANGE_PW);
    expect(role.because).not.toContain(CREATE_ADDRESS);
  });

  it("does not heal when the only healable failure is another story's leftover", () => {
    const events = run([
      { title: CREATE_ADDRESS, message: LOC("getByRole('button', { name: 'Add' })") },
    ]);
    expect(roleFor(events, "SCRUM-25").name).toBe("default");
  });

  it("without a story (unchanged call) still heals the first failure", () => {
    const events = run([
      { title: CREATE_ADDRESS, message: LOC("getByRole('button', { name: 'Add' })") },
    ]);
    expect(roleFor(events).name).toBe("heal");
  });
});
