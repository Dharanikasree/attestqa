/**
 * W35 (F-0155, F-0158): the edit surface is scoped to the run's own story.
 *
 * In a shared epic spec the agent edits the EARLIER stories' passing tests; the
 * passing-test rule refused up to eight times in one run, and the no-progress
 * guard ended a run whose own story was fully green. The verifier already counts
 * a run whose own tests are green as done (ownTestTitles); this adds the other
 * half: a test that belongs to another story is not this run's to change, so the
 * refusal says so and points the agent at its own story's failing tests instead.
 */

import { describe, it, expect } from "vitest";
import { editsAPassingTest } from "../src/skills/story-rules.js";
import type { AnyRunEvent } from "../src/types.js";

// facts.epic -> epicStem "epic-scrum-5-account" -> spec at tests/epic-scrum-5-account.spec.ts
const PATH = "tests/epic-scrum-5-account.spec.ts";
const SPEC = [
  'import { test, expect } from "@playwright/test";',
  "// @story:SCRUM-6 @design:D1",
  'test("Sign in works", async ({ page }) => {',
  '  await page.goto("/login");',
  "  await expect(page).toHaveURL(/dashboard/);",
  "});",
  "// @story:SCRUM-8 @design:D2",
  'test("Logout clears the session", async ({ page }) => {',
  '  await page.goto("/logout");',
  "  await expect(page).toHaveURL(/login/);",
  "});",
].join("\n");

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

const events: AnyRunEvent[] = [
  ...pair(
    { server: "aqa", toolName: "story_context", args: {}, startedAt: 0 },
    {
      facts: {
        epic: { id: "SCRUM-5", title: "Account" },
        acceptanceCriteria: ["AC-1"],
        bugs: [],
        tasks: [],
      },
    },
  ),
  ...pair(
    { server: "fs", toolName: "write_file", args: { path: PATH, content: SPEC }, startedAt: 0 },
    {
      path: PATH,
    },
  ),
  ...pair(
    { server: "pw", toolName: "run_tests", args: {}, startedAt: 0 },
    {
      green: false,
      passed: 1,
      failed: 1,
      tests: [
        { title: "Sign in works", status: "passed" }, // SCRUM-6 neighbour
        { title: "Logout clears the session", status: "failed" }, // SCRUM-8 own
      ],
    },
  ),
];

// The agent edits the neighbour's passing test ("Sign in works").
const edited = SPEC.replace("/dashboard/", "/home/");
const write = { toolName: "fs.write_file", args: { path: PATH, content: edited } };

describe("the edit surface is scoped to the run's own story (W35)", () => {
  it("names the other story and points at the run's own failing test", () => {
    const msg = editsAPassingTest(write, events, undefined, "SCRUM-8");
    expect(msg).toBeTruthy();
    expect(msg!).toMatch(/another story/i);
    expect(msg!).toContain("Logout clears the session"); // the run's own failing test
    expect(msg!).toMatch(/your own story/i);
  });

  it("without a story id, behaviour is unchanged (still refuses, no scoping)", () => {
    const msg = editsAPassingTest(write, events);
    expect(msg).toBeTruthy();
    expect(msg!).not.toMatch(/another story/i);
    expect(msg!).toContain("passed in the last full run");
  });
});
