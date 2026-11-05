#!/usr/bin/env node
// Keep release metadata in step with the version `changeset version` just wrote.
// Run from the repository root by `npm run version-packages`, after `changeset version`:
//   - CITATION.cff: `version` and `date-released` (today, UTC).
// It reads the new number from packages/core/package.json (the engine, which the
// extension is now `fixed` to, so both already carry it). The Zenodo *version* DOI is
// still added by hand after the release, because Zenodo mints it only once the GitHub
// release exists; the concept DOI in CITATION.cff never changes.
import { readFileSync, writeFileSync } from "node:fs";

const version = JSON.parse(readFileSync("packages/core/package.json", "utf8")).version;
const today = new Date().toISOString().slice(0, 10);

const path = "CITATION.cff";
const before = readFileSync(path, "utf8");
const after = before
  .replace(/^version:.*$/m, `version: ${version}`)
  .replace(/^date-released:.*$/m, `date-released: "${today}"`);

if (!/^version: /m.test(after) || !/^date-released: /m.test(after)) {
  console.error("sync-release-meta: CITATION.cff has no version/date-released line to update");
  process.exit(1);
}

if (after !== before) writeFileSync(path, after);
console.log(`sync-release-meta: CITATION.cff -> version ${version}, date ${today}`);
