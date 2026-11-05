/**
 * W31 (F-0137): replace_in_file must match across CRLF/LF.
 *
 * `git checkout` on this Windows machine restores files with CRLF, while the
 * agent reads a normalised view and writes its edit with LF. The fs tool matched
 * bytes, so every edit of a CRLF file with an LF `old` failed with "old does not
 * appear" and a hint to "copy the text exactly" — advice the model could not
 * act on, because its view showed CRLF and its output was LF and the error named
 * neither. SCRUM-26 lost runs 2 and 3 to it (10 then 28 failed edits).
 *
 * The fix matches `old` tolerant of CRLF vs LF and writes `new` back in the
 * file's own line ending.
 */

import { describe, it, expect } from "vitest";
import { mkdtempSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { FsTools } from "../src/mcp/adapters/fs.js";

const ws = () => mkdtempSync(join(tmpdir(), "aqa-w31-"));

describe("replace_in_file matches across CRLF/LF (W31)", () => {
  it("edits a CRLF file with an LF `old`, keeping the file's CRLF endings", async () => {
    const dir = ws();
    const file = join(dir, "epic.feature");
    // A file as `git checkout` restores it on Windows: CRLF everywhere.
    const crlf =
      "Feature: Login\r\n\r\n  Scenario: good\r\n    Given a user\r\n    When they sign in\r\n    Then ok\r\n";
    writeFileSync(file, crlf, "utf8");

    // The agent read the file and writes its edit with LF (its own output).
    const out = await new FsTools(dir).call("fs", "replace_in_file", {
      path: "epic.feature",
      old: "  Scenario: good\n    Given a user\n",
      new: "  Scenario: better\n    Given a signed-in user\n",
    });

    expect(out.ok).toBe(true);
    const after = readFileSync(file, "utf8");
    expect(after).toContain("Scenario: better");
    // Written back in the file's own ending: no bare LF leaked in.
    expect(/[^\r]\n/.test(after)).toBe(false);
    expect(after).toContain("Scenario: better\r\n    Given a signed-in user\r\n");
  });

  it("edits an LF file with an LF `old` unchanged (no regression)", async () => {
    const dir = ws();
    const file = join(dir, "a.txt");
    writeFileSync(file, "one\ntwo\nthree\n", "utf8");
    const out = await new FsTools(dir).call("fs", "replace_in_file", {
      path: "a.txt",
      old: "two\n",
      new: "TWO\n",
    });
    expect(out.ok).toBe(true);
    expect(readFileSync(file, "utf8")).toBe("one\nTWO\nthree\n");
  });

  it("still refuses a genuinely absent `old` (not a line-ending issue)", async () => {
    const dir = ws();
    const file = join(dir, "f.txt");
    writeFileSync(file, "alpha\r\nbeta\r\n", "utf8");
    const out = await new FsTools(dir).call("fs", "replace_in_file", {
      path: "f.txt",
      old: "gamma",
      new: "delta",
    });
    expect(out.ok).toBe(false);
  });
});
