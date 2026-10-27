#!/usr/bin/env node
// Evaluation driver, phase 2 (from 26 Oct 2026, research/EVAL_START_STATE.md §2b).
// Runs one story's measured runs end to end, in one window, with no second start
// and no manual reset:
//
//   node ..\..\TestRunApplication\_reset\eval-driver.mjs --app saucedemo --story AB#113 [--runs 1,2,3]
//   node ..\..\TestRunApplication\_reset\eval-driver.mjs --app juice-shop --story SCRUM-25 --runs 2,3
//
// For each run, in order:
//   1. refuses to start unless the app's test project is clean against git
//      (the story's base files only) and no scenario for this story is on disk;
//   2. resets the application (Juice Shop: docker restart + juice-shop-ready.mjs;
//      Toolshop: migrate:fresh --seed; Booker: asks you to restart it; SauceDemo: nothing);
//   3. for run 2 and 3, makes the repeat ledger hold exactly the runs the main
//      ledger held before run 1 of this story;
//   4. starts `aqa run ... --approval file` and answers every approval it writes
//      (decision "approved", by "auto-approver (evaluation phase 2)"), logging each
//      to research/runs/_auto-approvals.log;
//   5. archives the run: ledger folder, console output, `aqa coverage --json`, and a
//      copy of the test project's features/pages/tests, into research/runs/<runId>/
//      and TestRunApplication/_attempts/eval-<date>-<story>-run<n>/;
//   6. puts the test project back to the state before run 1 (git checkout + clean).
// After run 1 it saves the run's files as _attempts/eval-base-<story>-run1/, and after
// the last run it installs that base in the test project, so the next story starts
// from this story's run 1, as the protocol says. Then it stops: the manifest row,
// findings and results are written by hand from the archive, as before.
//
// Credentials are never read here: aqa reads .env itself. Nothing is pushed or
// committed; the summary at the end prints the git command for you.

import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, cpSync, rmSync, renameSync, appendFileSync, statSync } from "node:fs";
import { join, resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline";
import { approvePending } from "./auto-approve.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const core = join(root, "packages", "core");
const cli = join(core, "dist", "cli.js");
const research = join(root, "research");
const attempts = join(root, "TestRunApplication", "_attempts");
const APPROVER = "auto-approver (evaluation phase 2)";

const APPS = {
  "saucedemo": { config: "examples/eval/saucedemo.config.yaml", env: ".env.saucedemo,.env", ledgers: [".aqa-eval-sd", ".aqa-eval-sd-r2", ".aqa-eval-sd-r3"], slug: (s) => "SD-" + s.replace(/^AB#/, ""), reset: "none" },
  "juice-shop": { config: "examples/ai-quality.jira.config.yaml", env: null, ledgers: [".aqa-eval", ".aqa-eval-r2", ".aqa-eval-r3"], slug: (s) => s, reset: "juice-shop" },
  "toolshop": { config: "examples/eval/toolshop.config.yaml", env: ".env.toolshop,.env", ledgers: [".aqa-eval", ".aqa-eval-r2", ".aqa-eval-r3"], slug: (s) => s, reset: "toolshop" },
  "booker": { config: "examples/eval/booker.config.yaml", env: ".env.booker,.env", ledgers: [".aqa-eval-rb", ".aqa-eval-rb-r2", ".aqa-eval-rb-r3"], slug: (s) => "RB-" + s.replace(/^AB#/, ""), reset: "booker" },
};

const arg = (name, dflt) => { const i = process.argv.indexOf(`--${name}`); return i > 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : dflt; };
const has = (name) => process.argv.includes(`--${name}`);
const appName = arg("app");
const story = arg("story");
const runs = arg("runs", "1,2,3").split(",").map((n) => Number(n.trim())).filter((n) => [1, 2, 3].includes(n));
const app = APPS[appName];
if (!app || !story || runs.length === 0) {
  console.error("usage: eval-driver.mjs --app saucedemo|juice-shop|toolshop|booker --story <AB#113|SCRUM-25|TOOL-6> [--runs 1,2,3] [--no-reset] [--dry-run]");
  process.exit(2);
}
const wsRel = `TestRunApplication/${appName}`;
const ws = join(root, wsRel);
const slug = app.slug(story);
const today = new Date().toISOString().slice(0, 10);
const log = (s) => console.log(`[driver ${new Date().toISOString().slice(11, 19)}] ${s}`);
// node itself is run without a shell (its path may contain a space); git and docker
// go through the shell on Windows so that .cmd shims and PATH lookups work.
const sh = (cmd, args, opts = {}) => spawnSync(cmd, args, { cwd: root, encoding: "utf8", shell: cmd !== process.execPath && process.platform === "win32", ...opts });

// ---- preconditions -------------------------------------------------------
const lock = join(core, `.eval-driver-${appName}.lock`);
let locked = false;
const unlock = () => { if (locked) { try { rmSync(lock); } catch {} locked = false; } };
function fail(msg) { console.error(`driver: ${msg}`); unlock(); process.exit(1); }
if (!existsSync(cli)) fail(`no build at ${cli} — run the build first`);
if (existsSync(lock)) {
  const [pid] = readFileSync(lock, "utf8").split(" ");
  let alive = false;
  try { process.kill(Number(pid), 0); alive = true; } catch {}
  if (alive) fail(`${lock} exists and its driver (pid ${pid}) is still running — one driver per application`);
  log(`stale lock from pid ${pid} removed`);
  rmSync(lock);
}
writeFileSync(lock, `${process.pid} ${new Date().toISOString()} ${story}\n`); locked = true;
process.on("exit", unlock);
process.on("SIGINT", () => { unlock(); process.exit(130); });

function gitStatus() {
  const r = sh("git", ["--no-optional-locks", "status", "--porcelain", "--", wsRel]);
  if (r.status !== 0) fail(`git status failed: ${r.stderr}`);
  return r.stdout.split(/\r?\n/).filter((l) => l.trim() && !/\.bak$/.test(l) && !/test-results\//.test(l) && !/artefacts\//.test(l));
}
function scrub() { for (const d of ["test-results", "artefacts"]) rmSync(join(ws, d), { recursive: true, force: true }); }
// git checkout on Windows writes CRLF (core.autocrlf); the agent writes LF, and the
// fs tool's replace_in_file matches bytes, so a CRLF feature file made every edit
// fail in SCRUM-26 runs 2 and 3 (F-0137). Phase 1 files were always LF: keep it so.
function toLF() {
  let n = 0;
  for (const d of ["features", "pages", "tests"]) {
    const dir = join(ws, d); if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir)) {
      const p = join(dir, f); if (!statSync(p).isFile()) continue;
      const b = readFileSync(p); if (!b.includes("\r\n")) continue;
      writeFileSync(p, b.toString("utf8").replace(/\r\n/g, "\n")); n++;
    }
  }
  for (const f of ["BDD_REVIEW.md"]) { const p = join(ws, f); if (existsSync(p)) { const b = readFileSync(p); if (b.includes("\r\n")) { writeFileSync(p, b.toString("utf8").replace(/\r\n/g, "\n")); n++; } } }
  if (n) log(`${n} file(s) converted from CRLF to LF`);
}
function restoreWorkspace() {
  scrub();
  let r = sh("git", ["checkout", "--", wsRel]); if (r.status !== 0) fail(`git checkout failed: ${r.stderr}`);
  r = sh("git", ["clean", "-fdq", "--", wsRel]); if (r.status !== 0) fail(`git clean failed: ${r.stderr}`);
  toLF();
  const left = gitStatus(); if (left.length) fail(`test project not clean after restore:\n${left.join("\n")}`);
}
const tagId = story.startsWith("AB#") ? story.slice(3) : story;
const tagRe = new RegExp(`@story:${tagId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\w-])`);
function storyOnDisk() {
  const feats = join(ws, "features"); if (!existsSync(feats)) return false;
  return readdirSync(feats).some((f) => f.endsWith(".feature") && tagRe.test(readFileSync(join(feats, f), "utf8")));
}
function requestOf(ledger, id) {
  try { const first = readFileSync(join(core, ledger, "runs", id, "events.jsonl"), "utf8").split(/\r?\n/)[0]; return JSON.parse(first).payload?.text ?? ""; } catch { return ""; }
}
function ask(q) { return new Promise((res) => { const rl = createInterface({ input: process.stdin, output: process.stdout }); rl.question(q, (a) => { rl.close(); res(a); }); }); }

async function resetApp() {
  if (has("no-reset")) { log("reset skipped (--no-reset)"); return; }
  if (app.reset === "none") { log("SauceDemo keeps no state: no reset"); return; }
  if (app.reset === "juice-shop") {
    let r = sh("docker", ["restart", "juice-shop"]); if (r.status !== 0) fail(`docker restart juice-shop failed: ${r.stderr || r.stdout}`);
    for (let i = 0; i < 12; i++) {
      r = sh(process.execPath, [join(here, "juice-shop-ready.mjs")]);
      if (r.status === 0 && /signed in as the test account/.test(r.stdout)) { log(`Juice Shop reset: ${r.stdout.trim().split(/\r?\n/).join(" · ")}`); return; }
      await new Promise((s) => setTimeout(s, 5000));
    }
    fail(`juice-shop-ready.mjs did not confirm the test account: ${r.stdout} ${r.stderr}`);
  }
  if (app.reset === "toolshop") {
    const r = sh("docker", ["exec", "pst-laravel-api-1", "php", "artisan", "migrate:fresh", "--seed"]);
    if (r.status !== 0) fail(`Toolshop reseed failed: ${r.stderr || r.stdout}`);
    log("Toolshop reseeded"); return;
  }
  if (app.reset === "booker") {
    await ask("Booker: stop run_locally.cmd (Enter in its window), start it again, wait for it to answer, then press Enter here... ");
    log("Booker restarted (as confirmed by you)"); return;
  }
}

function ledgerRuns(l) { const d = join(core, l, "runs"); return existsSync(d) ? readdirSync(d).filter((n) => /^\d{8}T\d{6}Z-/.test(n)).sort() : []; }
function syncRepeatLedger(l, wanted) {
  const dir = join(core, l, "runs"); mkdirSync(dir, { recursive: true });
  const have = ledgerRuns(l);
  for (const id of wanted) if (!have.includes(id)) cpSync(join(core, app.ledgers[0], "runs", id), join(dir, id), { recursive: true });
  for (const id of have) if (!wanted.includes(id)) { mkdirSync(join(core, "_to_delete"), { recursive: true }); renameSync(join(dir, id), join(core, "_to_delete", `${l.replace(/^\./, "")}-${id}`)); }
  const now = ledgerRuns(l);
  if (now.join() !== [...wanted].sort().join()) fail(`${l} could not be made to match the pre-run-1 ledger`);
  log(`${l}: ${now.length} runs, same as ${app.ledgers[0]} before run 1`);
}

function archive(runId, ledger, n) {
  const src = join(core, ledger, "runs", runId);
  const dst = join(research, "runs", runId);
  cpSync(src, dst, { recursive: true });
  const cov = sh(process.execPath, [cli, "coverage", "--json", "--workspace", ws, "--ledger", ledger], { cwd: core });
  writeFileSync(join(dst, "coverage.json"), cov.stdout || "", "utf8");
  const wsDst = join(dst, "workspace"); mkdirSync(wsDst, { recursive: true });
  const att = join(attempts, `eval-${today}-${slug}-run${n}`); mkdirSync(att, { recursive: true });
  for (const d of ["features", "pages", "tests"]) if (existsSync(join(ws, d))) { cpSync(join(ws, d), join(wsDst, d), { recursive: true }); cpSync(join(ws, d), join(att, d), { recursive: true }); }
  for (const f of ["BDD_REVIEW.md"]) if (existsSync(join(ws, f))) { cpSync(join(ws, f), join(wsDst, f)); cpSync(join(ws, f), join(att, f)); }
  log(`archived ${runId} → research/runs/${runId} and _attempts/${att.split(/[\\/]/).pop()}`);
  return dst;
}

function runOnce(ledger, n) {
  return new Promise((resolveRun) => {
    const args = [cli, "run", `Write tests for ${story}`, "--config", app.config, "--workspace", process.platform === "win32" ? `..\\..\\TestRunApplication\\${appName}` : `../../TestRunApplication/${appName}`, "--ledger", ledger, "--approval", "file"];
    if (app.env) args.push("--env", app.env);
    log(`run ${n} on ${ledger}: aqa ${args.slice(1).map((a) => (/\s/.test(a) ? `"${a}"` : a)).join(" ")}`);
    if (has("dry-run")) return resolveRun({ runId: null, code: 0 });
    const child = spawn(process.execPath, args, { cwd: core, stdio: ["ignore", "pipe", "pipe"] });
    let out = ""; let runId = null;
    const onData = (chunk) => {
      const s = chunk.toString(); out += s; process.stdout.write(s);
      if (!runId) { const m = out.match(/aqa run (\d{8}T\d{6}Z-[0-9a-f]+):/); if (m) runId = m[1]; }
    };
    child.stdout.on("data", onData); child.stderr.on("data", onData);
    const logFile = join(research, "runs", "_auto-approvals.log");
    const timer = setInterval(() => {
      const dirs = runId ? [join(core, ledger)] : [join(core, ledger)];
      for (const g of approvePending(dirs, APPROVER, logFile)) log("approved  " + g.split("\t").slice(1).join("  "));
    }, 1000);
    child.on("close", (code) => {
      clearInterval(timer);
      if (!runId) { const m = out.match(/(\d{8}T\d{6}Z-[0-9a-f]{8})/); runId = m ? m[1] : null; }
      if (runId) { const dst = join(research, "runs", runId); mkdirSync(dst, { recursive: true }); writeFileSync(join(dst, "console.txt"), out, "utf8"); }
      resolveRun({ runId, code });
    });
  });
}

// ---- main ----------------------------------------------------------------
(async () => {
  log(`${appName} ${story}: runs ${runs.join(", ")}; approver "${APPROVER}"`);
  scrub(); toLF();
  const dirty = gitStatus(); if (dirty.length) fail(`test project is not clean against git — archive and reset first:\n${dirty.join("\n")}`);
  if (storyOnDisk()) fail(`a scenario tagged for ${story} is already in ${wsRel}/features — a run from here would resume, not start`);
  const main = app.ledgers[0];
  const before = ledgerRuns(main);
  const basePath = join(attempts, `eval-base-${slug}-run1`);
  if (!runs.includes(1) && !existsSync(basePath)) fail(`${basePath} is missing: run 1 was not done by the driver, save run 1's files there first`);
  const results = [];
  for (const n of runs) {
    const ledger = app.ledgers[n - 1];
    if (n > 1) {
      // runs 2/3 see only what the main ledger held before run 1 of this story
      const pre = before.filter((id) => !results.some((r) => r.runId === id) && !requestOf(main, id).includes(story));
      syncRepeatLedger(ledger, pre);
    }
    await resetApp();
    const { runId, code } = await runOnce(ledger, n);
    const status = { 0: "done", 1: "error", 2: "blocked", 3: "refused", 4: "budget" }[code] ?? `exit ${code}`;
    log(`run ${n} finished: ${status}${runId ? ` (${runId})` : ""}`);
    results.push({ n, runId, code, status });
    if (has("dry-run")) continue;
    if (!runId) fail("no run id was printed; nothing archived — check the output above");
    archive(runId, ledger, n);
    if (n === 1) {
      rmSync(basePath, { recursive: true, force: true }); mkdirSync(basePath, { recursive: true });
      for (const d of ["features", "pages", "tests"]) if (existsSync(join(ws, d))) cpSync(join(ws, d), join(basePath, d), { recursive: true });
      if (existsSync(join(ws, "BDD_REVIEW.md"))) cpSync(join(ws, "BDD_REVIEW.md"), join(basePath, "BDD_REVIEW.md"));
      log(`run 1 files saved as the story's base: _attempts/eval-base-${slug}-run1`);
    } else {
      // the repeat ledger goes back to the pre-run-1 set; the run is already archived
      mkdirSync(join(core, "_to_delete"), { recursive: true });
      renameSync(join(core, ledger, "runs", runId), join(core, "_to_delete", `${ledger.replace(/^\./, "")}-${runId}`));
    }
    restoreWorkspace();
    log(`test project restored to the state before run 1`);
    if (code === 1) { fail(`run ${n} ended in error; stopping here`); }
  }
  if (!has("dry-run")) {
    // the next story starts from this story's run 1
    cpSync(basePath, ws, { recursive: true }); toLF();
    log(`base installed: ${wsRel} now holds ${story} run 1's files`);
  }
  console.log("\n==== driver summary ====");
  for (const r of results) console.log(`run ${r.n}: ${r.status}  ${r.runId ?? ""}`);
  console.log(`approvals log: research/runs/_auto-approvals.log`);
  const rel = (p) => { const r = relative(process.cwd(), join(root, p)); return r ? r : "."; };
  console.log(`next: send this summary to Claude for the manifest row, findings and results; then\n  git add ${rel("research")} ${rel(wsRel)} ${rel("TestRunApplication/_attempts")}\n  git commit -m "${story} ${results.map((r) => r.status).join(", ")}; base = ${story} run 1"`);
  unlock();
  const worst = Math.max(...results.map((r) => r.code));
  process.exit(worst === 1 ? 1 : 0);
})().catch((e) => fail(String(e?.stack || e)));
