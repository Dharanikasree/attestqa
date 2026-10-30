#!/usr/bin/env node
// Flakiness of an application's final suite (research/EVALUATION_PLAN.md §6, RQ4):
// ten plain full runs of `npx playwright test`, against the correct application,
// no agent, no proxy, no model. Node built-ins only.
//
//   node run-flakiness.mjs --app saucedemo [--runs 10]
//
// Writes results/<app>/flakiness/run-<n>.json (Playwright's JSON report) and
// results/<app>/flakiness.json: for every test, how many of the runs it passed,
// failed or was skipped in, and the list of tests whose outcome was not the same
// in every run — those are the flaky ones. Tests that fail in all ten runs are
// not flaky; they are the suite's standing failures and are listed separately.
//
// The application's address comes from the .env file the stories used
// (AQA_APP_URL), the same way the suite ran during the evaluation; pass
// --env <file> to point at another one. Reset the application before starting
// (EVAL_START_STATE.md §2); for Juice Shop that is docker restart + juice-shop-ready.mjs.

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(
  process.argv.slice(2).flatMap((a, i, all) =>
    a.startsWith("--") ? [[a.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : true]] : [],
  ),
);
if (!args.app) {
  console.error("usage: node run-flakiness.mjs --app <toolshop|booker|saucedemo|juice-shop> [--runs 10] [--env <file>]");
  process.exit(2);
}
const workspace = join(here, "..", args.app);
const runs = Number(args.runs ?? 10);
const out = join(here, "results", args.app, "flakiness");
// the same exclusions as the fault runs (plan.excludeTests in <app>.json), so RQ3 and RQ4 run the same suite
const planFile = join(here, `${args.app}.json`);
const plan = existsSync(planFile) ? JSON.parse(readFileSync(planFile, "utf8")) : {};
mkdirSync(out, { recursive: true });

// the address the stories ran against: .env.<app> first, then .env (as aqa does)
const envFiles = args.env
  ? [resolve(String(args.env))]
  : [join(here, "..", "..", "packages", "core", `.env.${args.app}`), join(here, "..", "..", "packages", "core", ".env")];
const env = { ...process.env };
for (const f of envFiles) {
  if (!existsSync(f)) continue;
  for (const line of readFileSync(f, "utf8").split(/\r?\n/)) {
    const m = /^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/.exec(line);
    if (m && env[m[1]] === undefined) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
if (!env.AQA_APP_URL) {
  console.error("AQA_APP_URL is not set in the .env file(s); the suite needs the application's address");
  process.exit(2);
}

function run(cmd, cmdArgs, opts) {
  return new Promise((res) => {
    const p = spawn(cmd, cmdArgs, { ...opts, shell: process.platform === "win32" });
    let stdout = "";
    p.stdout?.on("data", (d) => (stdout += d));
    p.stderr?.on("data", () => {});
    p.on("close", (code) => res({ code, stdout }));
  });
}

function outcomes(report) {
  const map = new Map();
  const walk = (suites) => {
    for (const s of suites ?? []) {
      for (const sp of s.specs ?? []) {
        const res = sp.tests?.[0]?.results?.at(-1);
        const status = res?.status ?? (sp.ok ? "passed" : "failed");
        const expected = sp.tests?.[0]?.expectedStatus ?? "passed";
        // an expected-fail test (test.fail) that failed is "passed as expected"
        const o = status === "skipped" ? "skipped" : status === expected ? "passed" : "failed";
        map.set(sp.title, { outcome: o, message: String(res?.error?.message ?? "").split("\n")[0].slice(0, 160) });
      }
      walk(s.suites);
    }
  };
  walk(report?.suites);
  return map;
}

console.log(`${args.app}: ${runs} plain runs of the final suite against ${env.AQA_APP_URL}`);
const perTest = new Map();
const started = new Date().toISOString();
for (let n = 1; n <= runs; n++) {
  const pw = ["playwright", "test", "--reporter=json"];
  // the command goes through the shell on Windows (npx.cmd), so an argument with
    // spaces must be quoted or it is split into file filters (30 Oct: a run of 40
    // tests instead of 76)
    if (plan.excludeTests) pw.push("--grep-invert", process.platform === "win32" ? `"${plan.excludeTests}"` : plan.excludeTests);
  const r = await run("npx", pw, { cwd: workspace, env });
  let report;
  try { report = JSON.parse(r.stdout.slice(r.stdout.indexOf("{"))); } catch { report = undefined; }
  if (!report) { console.log(`  run ${n}: no report (exit ${r.code}); stopping`); break; }
  writeFileSync(join(out, `run-${n}.json`), JSON.stringify(report));
  const o = outcomes(report);
  let p = 0, f = 0, sk = 0;
  for (const [title, { outcome, message }] of o) {
    const t = perTest.get(title) ?? { passed: 0, failed: 0, skipped: 0, messages: new Set() };
    t[outcome]++;
    if (outcome === "failed" && message) t.messages.add(message);
    perTest.set(title, t);
    if (outcome === "passed") p++; else if (outcome === "failed") f++; else sk++;
  }
  console.log(`  run ${n}: ${p} passed, ${f} failed, ${sk} skipped (${Math.round((report.stats?.duration ?? 0) / 1000)} s)`);
}
const tests = [...perTest.entries()].map(([title, t]) => ({ title, ...t, messages: [...t.messages].slice(0, 3) }));
const done = tests.length ? Math.max(...tests.map((t) => t.passed + t.failed + t.skipped)) : 0;
const flaky = tests.filter((t) => t.passed > 0 && t.failed > 0);
const standing = tests.filter((t) => t.failed === done && done > 0);
const summary = {
  app: args.app, url: env.AQA_APP_URL, runs: done, started, excludeTests: plan.excludeTests ?? null, finished: new Date().toISOString(),
  tests: tests.length, alwaysPassed: tests.filter((t) => t.passed === done).length,
  flaky: flaky.map((t) => ({ title: t.title, passed: t.passed, failed: t.failed, messages: t.messages })),
  standingFailures: standing.map((t) => t.title),
  skippedEveryRun: tests.filter((t) => t.skipped === done).map((t) => t.title),
  perTest: tests,
};
writeFileSync(join(here, "results", args.app, "flakiness.json"), JSON.stringify(summary, null, 2));
console.log(`\n${done} runs, ${tests.length} tests: ${summary.alwaysPassed} always passed, ${flaky.length} flaky, ${standing.length} failed every run, ${summary.skippedEveryRun.length} skipped every run`);
for (const t of flaky) console.log(`  flaky: ${t.title} (${t.passed} passed / ${t.failed} failed) ${t.messages[0] ?? ""}`);
console.log(`written: results/${args.app}/flakiness.json`);
