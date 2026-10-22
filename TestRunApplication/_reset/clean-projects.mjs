#!/usr/bin/env node
// Moves this week's trial-run files out of the evaluation test projects, so
// each application's first story starts from nothing on disk
// (research/EVAL_START_STATE.md). Moves, never deletes: everything goes to
// TestRunApplication/_attempts/<label>/<app>/.
//
//   node clean-projects.mjs                  # dry run: lists what would move
//   node clean-projects.mjs --apply [--label setup-2026-10-22]
//
// Juice Shop is left alone: its first three evaluation stories (SCRUM-6, 8,
// 10) are the "existing tests" kind and need the account tests on disk.

import { existsSync, mkdirSync, readdirSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const apply = process.argv.includes("--apply");
const li = process.argv.indexOf("--label");
const label = li > 0 ? process.argv[li + 1] : "setup-2026-10-22";
const APPS = ["toolshop", "booker", "saucedemo"];
// What a run writes. Everything else (config, package files, README) stays.
const RUN_OUTPUT = ["features", "tests", "pages", "artefacts", "test-results", ".aqa-report", ".bdd2pw", "BDD_REVIEW.md"];

let moved = 0;
for (const app of APPS) {
  for (const name of RUN_OUTPUT) {
    const from = join(root, app, name);
    if (!existsSync(from)) continue;
    const isDir = !name.includes(".") || name.startsWith(".");
    const empty = isDir && readdirSync(from).length === 0;
    if (empty) continue;
    const to = join(root, "_attempts", label, app, name);
    console.log(`${apply ? "moved" : "would move"}  ${app}/${name}  ->  _attempts/${label}/${app}/${name}`);
    if (apply) {
      mkdirSync(dirname(to), { recursive: true });
      renameSync(from, to);
      // Keep the empty folders the project layout expects, with the .gitkeep
      // placeholders git tracks (the first cleanup moved them away too).
      if (["features", "tests", "pages"].includes(name)) {
        mkdirSync(from, { recursive: true });
        if (existsSync(join(to, ".gitkeep"))) writeFileSync(join(from, ".gitkeep"), "");
      }
    }
    moved++;
  }
}
console.log(moved === 0 ? "nothing to move" : apply ? `${moved} item(s) moved` : `${moved} item(s) would move — add --apply`);
