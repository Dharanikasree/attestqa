/**
 * W21 (F-0104): an accessibility violation a never-passed test found is still a
 * candidate defect. An axe scan reports facts about the DOM, so a rule it flags
 * ("button-name" on an icon-only button with no accessible name) is real whether
 * or not the test "passed" — unlike a functional test, where never passing means
 * the test itself may be wrong. SCRUM-21's button-name violation recurred across
 * runs and was never surfaced, because the bug gate withholds a defect from a
 * test that never passed. `axeRuleIds` recognises a real axe-scan failure (axe
 * output + concrete kebab-case rule ids) so the verifier can put it to the
 * reviewer; a broken or empty scan, which triage handles, is not recognised.
 */

import { describe, it, expect } from "vitest";
import { axeRuleIds } from "../src/verify/story-to-tests.js";

describe("W21: axeRuleIds", () => {
  it("pulls the rule ids out of a real axe assertion failure", () => {
    const message = `Error: expect(received).toEqual(expected)

axe violations: [
  { "id": "button-name", "impact": "critical" },
  { "id": "color-contrast", "impact": "serious" }
]

- Expected  - 1
+ Received  + 3
- []
+ [ "button-name", "color-contrast" ]`;
    expect(axeRuleIds(message).sort()).toEqual(["button-name", "color-contrast"]);
  });

  it("pulls ids out of attestqa's summarised message (the real ledger form)", () => {
    // From SCRUM-21 run 20261024T161322Z.
    const message = "Error: axe violations — button-name (critical) on 1 element(s): .cdk-focused";
    expect(axeRuleIds(message)).toEqual(["button-name"]);
    expect(
      axeRuleIds(
        "Error: axe violations — color-contrast (serious) on 1 element(s): app-product:nth-child(6) > mat-card; contrast 2.86:1",
      ),
    ).toEqual(["color-contrast"]);
  });

  it("returns nothing for a non-axe failure", () => {
    expect(axeRuleIds(`Error: expect(locator).toBeVisible() failed: element not found`)).toEqual(
      [],
    );
    expect(axeRuleIds(`Timed out 5000ms waiting for expect(page).toHaveURL(/#\\/login/)`)).toEqual(
      [],
    );
  });

  it("does not mistake a scan that threw (no rule ids) for a violation", () => {
    // axe throws before checking when .include matches nothing — a test-fault,
    // handled by triage, not a product defect. No rule ids in the message.
    expect(axeRuleIds(`Error: axe-core: No elements found for include in page Context`)).toEqual(
      [],
    );
  });

  it("ignores data-/test- selectors that share the kebab shape", () => {
    const message = `axe violations: [ { "id": "label" } ] target: [ "data-test-id", "button-name" ]`;
    const ids = axeRuleIds(message);
    expect(ids).toContain("button-name");
    expect(ids).not.toContain("data-test-id");
  });
});
