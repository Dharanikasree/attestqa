/**
 * W29: an output-cap-truncated whole-file write gets an honest error.
 *
 * A whole-file write larger than the inference's ~8192-token output cap arrives
 * as a tool call with the `content` cut off (missing). The fs tool answered
 * "content must be a string", which does not say why, so the agent repeated the
 * identical write until the no-progress guard stopped it — paying the full cap
 * each time (SCRUM-25 run 2, four times).
 *
 * The fix names the cause (the output limit) and points to replace_in_file,
 * which is smaller than the whole file and does not hit the cap.
 */

import { describe, it, expect } from "vitest";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { FsTools } from "../src/mcp/adapters/fs.js";

const ws = () => mkdtempSync(join(tmpdir(), "aqa-w29-"));
const msg = (r: { result?: unknown }) => String((r.result as { message?: string })?.message ?? "");

describe("a whole-file write cut off at the output limit (W29)", () => {
  it("explains the output limit and points to replace_in_file when content is missing", async () => {
    const out = await new FsTools(ws()).call("fs", "write_file", { path: "big.spec.ts" });
    expect(out.ok).toBe(false);
    expect(msg(out)).toMatch(/output limit|cut off/i);
    expect(msg(out)).toMatch(/replace_in_file/);
    // It must NOT be the old, unhelpful message.
    expect(msg(out)).not.toBe('"content" must be a string');
  });

  it("still reports a non-string content as a type error (a different mistake)", async () => {
    const out = await new FsTools(ws()).call("fs", "write_file", { path: "x.txt", content: 123 });
    expect(out.ok).toBe(false);
    expect(msg(out)).toMatch(/must be a string/);
  });

  it("still writes a normal string, including an empty one", async () => {
    const dir = ws();
    const out = await new FsTools(dir).call("fs", "write_file", { path: "y.txt", content: "" });
    expect(out.ok).toBe(true);
    expect(readFileSync(join(dir, "y.txt"), "utf8")).toBe("");
  });
});
