/**
 * W14 (F-0096): the report counts what the code does, not what a marker says.
 *
 * SCRUM-32 run 3 wrote the strongest AC-1 of the story — it searched through the
 * box and asserted every card contains the term — but a generator `// TODO`
 * comment lingered in the test, and the report called AC-1 "not implemented" and
 * dropped it from the pass count. A step is unimplemented only when its body
 * does no work; a `// TODO` comment or a `[SKIPPED]` title is a marker, not proof.
 */

import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { withUnimplemented, type TestRunSummary } from "../src/mcp/adapters/pw.js";

const SPEC = [
  'import { test, expect } from "@playwright/test";',
  'test.describe("Product catalogue", () => {',
  '  test("AC-1 Search shows only matching products", async ({ page }) => {',
  '    await test.step("When I search for a term", async () => {',
  "      // TODO: a tighter selector would be nicer",
  "      await page.getByRole('searchbox').fill('apple');",
  "      await page.keyboard.press('Enter');",
  "    });",
  '    await test.step("Then every card contains the term", async () => {',
  "      for (const c of await page.locator('.card').all()) {",
  "        await expect(c).toContainText('apple');",
  "      }",
  "    });",
  "  });",
  '  test("AC-2 Add to cart", async ({ page }) => {',
  '    await test.step("[SKIPPED] When I set the quantity to 3", async () => {',
  "      // @bdd2pw lane=todo",
  "      // TODO: no quantity field in the POM",
  "    });",
  "  });",
  "});",
].join("\n");

const summary = (): TestRunSummary => ({
  passed: 2,
  failed: 0,
  skipped: 0,
  flaky: 0,
  green: true,
  failures: [],
  tests: [
    {
      title: "AC-1 Search shows only matching products",
      file: "e.spec.ts",
      status: "passed",
      durationMs: 1,
    },
    { title: "AC-2 Add to cart", file: "e.spec.ts", status: "passed", durationMs: 1 },
  ],
  testsOmitted: 0,
  unexpectedPasses: [],
  exitCode: 0,
});

describe("unimplemented is decided by the code, not a marker (W14)", () => {
  it("keeps a working test with a lingering // TODO comment as a pass", () => {
    const ws = mkdtempSync(join(tmpdir(), "aqa-w14-"));
    mkdirSync(join(ws, "tests"));
    writeFileSync(join(ws, "tests", "e.spec.ts"), SPEC);
    const r = withUnimplemented(summary(), ws)!;

    // AC-1 does the work (only a stray TODO comment) — still a pass.
    expect(r.tests.find((t) => t.title.startsWith("AC-1"))?.status).toBe("passed");
    expect((r.unimplemented ?? []).some((u) => u.title.startsWith("AC-1"))).toBe(false);

    // AC-2 has a genuinely empty step — still flagged (regression guard).
    expect(r.tests.find((t) => t.title.startsWith("AC-2"))?.status).toBe("unimplemented");
    expect((r.unimplemented ?? []).some((u) => u.title.startsWith("AC-2"))).toBe(true);

    expect(r.passed).toBe(1);
    expect(r.green).toBe(false);
  });
});
