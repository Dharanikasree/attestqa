/**
 * W27 (F-0125, F-0126): a test fault is not a flake, and the report must not
 * call it one.
 *
 * The built-in triage already DECIDES these correctly — a strict-mode violation
 * or an axe scope that matches nothing is "The test's own code is invalid", and
 * the agent is left to fix it (category `flake`, so not quarantined). But the
 * verdict it writes carries `category: "flake"` at 0.9, and the end-of-run
 * report counts every `flake` verdict as "flaky". So a run whose only failure
 * was the test's own broken selector reported "1 failure(s): 1 flaky" — the one
 * word the rationale explicitly contradicts ("not a defect and not a flake").
 *
 * The fix keeps the category (the ledger's category set is contract in 2.0.x)
 * and adds an optional `testFault` boolean to the verdict, which the report
 * reads to count these as test faults rather than flakes.
 *
 * The two messages below are the bytes the ledgers hold, not invented fixtures:
 *   - 20261025T181355Z-8ef975e3 (F-0125): axe scoped to a region not on the page
 *   - 20261025T183138Z-55885357 (F-0126): getByLabel('Password') hit two fields
 */

import { describe, it, expect } from "vitest";
import { classifyFailure } from "../src/triage/classify.js";
import { TEST_CODE_RATIONALE } from "../src/triage/patterns.js";
import { StageTracker } from "../src/runtime/stages.js";
import type { AnyRunEvent } from "../src/types.js";

// Verbatim from research/runs/.../events.jsonl, the recorded failure evidence.
const AXE_NO_ELEMENTS =
  "Error: frame.evaluate: Error: No elements found for include in page Context";
const STRICT_MODE =
  "Error: locator.fill: Error: strict mode violation: getByLabel('Password') resolved to 2 elements:";
// A genuine flake from the same families of runs, to prove we are narrowing the
// label, not relabelling every flake.
const REAL_FLAKE = "Error: Timeout 5000ms exceeded waiting for locator('.banner')";

describe("a test-code fault is flagged, not called a flake (W27)", () => {
  it("marks axe's 'No elements found' as a test fault, keeping the category and rationale", () => {
    const v = classifyFailure({ testId: "scan", message: AXE_NO_ELEMENTS });
    // Category stays `flake` on purpose: the ledger's category set is contract
    // in 2.0.x, and `flake` is what leaves the test for the agent to fix.
    expect(v.category).toBe("flake");
    expect(v.confidence).toBe(0.9);
    // The new, additive signal the report reads.
    expect(v.testFault).toBe(true);
    // The rationale that already told the truth is untouched.
    expect(v.rationale.startsWith(TEST_CODE_RATIONALE)).toBe(true);
  });

  it("marks a strict-mode violation as a test fault", () => {
    const v = classifyFailure({ testId: "pw", message: STRICT_MODE });
    expect(v.category).toBe("flake");
    expect(v.confidence).toBe(0.9);
    expect(v.testFault).toBe(true);
    expect(v.rationale.startsWith(TEST_CODE_RATIONALE)).toBe(true);
  });

  it("leaves a genuine flake unflagged", () => {
    const v = classifyFailure({ testId: "banner", message: REAL_FLAKE });
    expect(v.category).toBe("flake");
    expect(v.testFault).toBeUndefined();
  });
});

describe("the report counts a test fault as a test fault, not as flaky (W27)", () => {
  const triageEvent = (verdicts: Array<Record<string, unknown>>): AnyRunEvent =>
    ({
      tool: "attestqa",
      runId: "r",
      eventId: 1,
      timestamp: 1,
      kind: "triage",
      payload: { verdicts },
    }) as unknown as AnyRunEvent;

  it("does not say 'flaky' when the only failure was the test's own code", () => {
    // The exact shape F-0125 reported: one failure, a test fault.
    const line = new StageTracker().line(
      triageEvent([{ category: "flake", confidence: 0.9, testFault: true }]),
    );
    expect(line).toContain("1 failure(s)");
    expect(line).toContain("1 test fault(s)");
    expect(line).not.toContain("flaky");
  });

  it("still says 'flaky' for a real flake, and separates the two", () => {
    const line = new StageTracker().line(
      triageEvent([
        { category: "flake", confidence: 0.25 },
        { category: "flake", confidence: 0.9, testFault: true },
      ]),
    );
    expect(line).toContain("1 flaky");
    expect(line).toContain("1 test fault(s)");
  });
});
