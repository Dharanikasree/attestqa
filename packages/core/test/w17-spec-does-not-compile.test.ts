/**
 * W17 (F-0099): a spec that does not compile is its own state.
 *
 * SCRUM-19 run 2's last edit broke the spec; Playwright then found no tests and
 * reported a top-level compile error, but the runtime read it as "no test is
 * failing" — so the agent, under budget pressure, kept going as if all was well
 * and ran out of budget. A spec that does not compile is not a green run and not
 * "no failing test": no test ran, so nothing was measured, and the error must be
 * surfaced so it gets fixed.
 */

import { describe, it, expect } from "vitest";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PwTools, summarise } from "../src/mcp/adapters/pw.js";
import type { CommandRunner } from "../src/mcp/adapters/process.js";

// The shape Playwright really produces for a syntax error (captured from a real
// run): all-zero stats and a top-level `errors` array.
const COMPILE_REPORT = JSON.stringify({
  stats: { expected: 0, skipped: 0, unexpected: 0, flaky: 0 },
  errors: [
    {
      message: "SyntaxError: /ws/tests/epic.spec.ts: Unexpected token (4:12)\n> 4 |   const x = ;",
      location: { file: "tests/epic.spec.ts", line: 4, column: 12 },
    },
  ],
  suites: [],
});

const runner =
  (code: number, stdout: string): CommandRunner =>
  async () => ({
    code,
    stdout,
    stderr: "",
  });
const tmp = () => mkdtempSync(join(tmpdir(), "aqa-w17-"));
const msg = (r: { result?: unknown }) => String((r.result as { message?: string })?.message ?? "");

describe("a spec that does not compile is reported as its own state (W17)", () => {
  it("summarise captures the top-level compile errors", () => {
    const s = summarise(COMPILE_REPORT, 1)!;
    expect(s.loadErrors?.length).toBeGreaterThan(0);
    expect(s.loadErrors?.[0]).toMatch(/SyntaxError|Unexpected token/);
    expect(s.green).toBe(false);
    expect(s.failed).toBe(0); // no test failed — but that is NOT "all fine"
  });

  it("the run_tests tool says the spec does not compile, not that nothing is failing", async () => {
    const out = await new PwTools(tmp(), { runner: runner(1, COMPILE_REPORT) }).call(
      "pw",
      "run_tests",
      {},
    );
    expect(out.ok).toBe(false);
    expect(msg(out)).toMatch(/does not compile|compile/i);
    expect(msg(out)).toMatch(/SyntaxError|Unexpected token/);
  });

  it("a normal green run has no loadErrors", () => {
    const green = JSON.stringify({
      stats: { expected: 2, skipped: 0, unexpected: 0, flaky: 0 },
      errors: [],
      suites: [],
    });
    expect(summarise(green, 0)!.loadErrors).toBeUndefined();
  });
});
