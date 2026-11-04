/**
 * W2/W6 (F-0087, F-0088): on stories that already have tests, the design adopts
 * the existing test's scope and labels. SCRUM-8's accessibility item scanned the
 * login page because the existing scan did (the story is sign-out); SCRUM-10's
 * security item cited AC-1 while testing AC-3's case, copying an existing test's
 * label. The source rule checks that a source is NAMED, not that it supports the
 * item, and the approver passed them too.
 *
 * This is a judgement the rules cannot make by string matching, so the fix is a
 * design-review aid, not a gate: each item carries an optional one-line
 * rationale justifying its page and source against the story, shown to the
 * approver, and the design approval carries a checklist line for the reviewer.
 */

import { describe, it, expect } from "vitest";
import { parseDesign, renderDesign } from "../src/design/test-design.js";
import { renderApproval } from "../src/runtime/render-approval.js";

const args = {
  items: [
    {
      id: "D1",
      covers: "AC-1",
      type: "accessibility",
      technique: "checklist-based",
      conditions: ["the account menu after sign-out"],
      expected: "no WCAG 2.1 A/AA violations",
      source: "AC-1",
      rationale:
        "SCRUM-8 is sign-out, so the scan covers the account menu and the home page it lands on",
    },
    {
      id: "D2",
      covers: "AC-2",
      type: "functional",
      technique: "state-transition",
      conditions: ["the user clicks Logout"],
      expected: "the session ends; the home page is shown",
      source: "AC-2",
      // no rationale
    },
  ],
  excluded: [],
};

describe("W2/W6: the design is justified against the story", () => {
  it("parseDesign keeps the rationale when present and omits it otherwise", () => {
    const d = parseDesign(args);
    expect(d.items[0]?.rationale).toMatch(/sign-out/);
    expect(d.items[1]?.rationale).toBeUndefined();
  });

  it("renders the rationale to the approver, and flags an item that has none", () => {
    const lines = renderDesign(parseDesign(args)).join("\n");
    expect(lines).toContain("why: SCRUM-8 is sign-out");
    expect(lines).toContain("why: — not justified against the story");
  });

  it("puts the support checklist in front of the approver", () => {
    const out = renderApproval([{ toolName: "aqa.test_design", args } as never]);
    expect(out).toContain("Before you approve, for each item:");
    expect(out).toMatch(/does the source named actually support this item/);
    expect(out).toMatch(/page it tests one THIS story's criteria mention/);
    expect(out).toMatch(/expected result taken from the story, not invented/);
  });

  it("keeps every approval line within the width limit", () => {
    const out = renderApproval([{ toolName: "aqa.test_design", args } as never]);
    for (const line of out.split("\n")) expect(line.length).toBeLessThanOrEqual(90);
  });
});
