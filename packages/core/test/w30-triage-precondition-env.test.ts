/**
 * W30 (F-0130): a failed precondition sign-in is the environment, not a defect.
 *
 * The mirror of W27. When the configured fixture account cannot sign in, the
 * precondition the agent writes before exercising the product fails with a 401,
 * and triage scored it `real-defect` at 0.5 (the `expect(received)` + 4xx
 * patterns match) — so every functional test in the run looked like a possible
 * product defect, and a stateful story that had mutated the shared account took
 * the whole run down as "the product is broken".
 *
 * A precondition is setup: if it fails, no step of the test body reached the
 * product, so nothing about the product was observed — exactly the setup-hook
 * case. The fix classifies it `environmental` (a category the ledger already
 * knows; no contract change), which writes the run off as "fix the account and
 * run again" instead of filing bugs against the product.
 *
 * The message below is verbatim from the ledger:
 *   research/runs/_excluded/20261026T143742Z-8ca35396 (F-0130, event 151).
 */

import { describe, it, expect } from "vitest";
import { classifyFailure, triageRun } from "../src/triage/classify.js";

// Verbatim from the recorded failure evidence.
const PRECONDITION_401 =
  "Error: Precondition: login must succeed (check AQA_APP_USER and AQA_APP_PASS)\n" +
  "Expected: 200\nReceived: 401";
// The same fault phrased differently, still naming the configured account.
const ACCOUNT_AUTH = "Error: could not authenticate AQA_APP_USER — request returned 401";
// A bare product 401 with no precondition/account context must stay a defect.
const PRODUCT_401 = "Error: expect(received).toBe(expected)\n\nExpected: 200\nReceived: 401";

describe("a failed precondition sign-in is environmental, not a defect (W30)", () => {
  it("classifies the precondition 401 as environmental, not real-defect", () => {
    const v = classifyFailure({ testId: "AC-1", message: PRECONDITION_401 });
    expect(v.category).toBe("environmental");
    expect(v.confidence).toBe(0.9);
    // The rationale must point at the account/environment, not the product.
    expect(v.rationale).toMatch(/sign in|AQA_APP_USER|account|environment/i);
  });

  it("classifies an auth failure that names the configured account as environmental", () => {
    const v = classifyFailure({ testId: "AC-2", message: ACCOUNT_AUTH });
    expect(v.category).toBe("environmental");
  });

  it("leaves a bare product 401 (no precondition/account) as a real defect", () => {
    const v = classifyFailure({ testId: "AC-3", message: PRODUCT_401 });
    expect(v.category).toBe("real-defect");
  });
});

describe("the run is written off, not blamed on the product (W30)", () => {
  it("makes the run environmental and quarantines nothing when nothing signed in", () => {
    const r = triageRun(
      [
        { testId: "AC-1", message: PRECONDITION_401 },
        { testId: "AC-2", message: PRECONDITION_401 },
      ],
      { passed: 0 },
    );
    expect(r.runLevel).toBe("environmental");
    // Nothing measured the product, so there is no defect candidate to file.
    expect(r.quarantined).toEqual([]);
  });
});
