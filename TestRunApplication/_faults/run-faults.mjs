#!/usr/bin/env node
// Runs an application's final suite against its seeded faults
// (research/SEEDED_FAULTS.md): a control run through the proxy with no fault,
// then one run per fault, each with plain `npx playwright test` — no agent, no
// model. Writes results/<app>/<run>.json and results/<app>/summary.json.
//
//   node run-faults.mjs --app saucedemo [--fault SD-4] [--port 8099]
//
// A fault counts as CAUGHT when a test tagged with the fault's story fails in
// its run; as caught BY ACCIDENT when only other tests fail; as MISSED when
// none fails. A run is INVALID when the proxy never applied the rule exactly
// once, or applied it to a response where it matched more than once. The
// control must pass, or nothing after it means anything.

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(
  process.argv.slice(2).flatMap((a, i, all) =>
    a.startsWith("--") ? [[a.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : true]] : [],
  ),
);
if (!args.app) {
  console.error("usage: node run-faults.mjs --app <toolshop|booker|saucedemo|juice-shop> [--fault <id>] [--port <n>]");
  process.exit(2);
}
const plan = JSON.parse(readFileSync(join(here, `${args.app}.json`), "utf8"));
const workspace = join(here, "..", args.app);
const port = Number(args.port ?? 8099);
const out = join(here, "results", args.app);
mkdirSync(out, { recursive: true });

const editsOf = (f) => f.edits ?? [{ find: f.find, replace: f.replace }];
const ready = (f) => editsOf(f).every((e) => e.find && !e.find.startsWith("TO-CONFIRM"));
const faults = plan.faults.filter((f) => (args.fault ? f.id === args.fault : true));
const notReady = faults.filter((f) => !ready(f));
if (notReady.length)
  console.log(`not ready (match text not confirmed), skipped: ${notReady.map((f) => f.id).join(", ")}`);

/** The @story tag in force above each test() in the suite's specs. */
function storyOfTests() {
  const map = new Map();
  const dir = join(workspace, "tests");
  for (const f of existsSync(dir) ? readdirSync(dir) : []) {
    if (!/\.spec\.[cm]?[jt]s$/.test(f)) continue;
    let story;
    for (const line of readFileSync(join(dir, f), "utf8").split("\n")) {
      const tag = /@story:([A-Za-z0-9#-]+)/.exec(line);
      if (tag && /^\s*(\/\/|\*|@)/.test(line)) story = tag[1];
      const t = /\btest\(\s*["'`]([^"'`]+)["'`]/.exec(line);
      if (t && story) map.set(t[1], story);
    }
  }
  return map;
}

function run(cmd, cmdArgs, opts) {
  return new Promise((resolve) => {
    const p = spawn(cmd, cmdArgs, { ...opts, shell: process.platform === "win32" });
    let stdout = "";
    p.stdout?.on("data", (d) => (stdout += d));
    p.stderr?.on("data", () => {});
    p.on("close", (code) => resolve({ code, stdout }));
  });
}

function startProxy(fault, logFile) {
  return new Promise((resolve, reject) => {
    const a = [join(here, "faultproxy.mjs"), "--upstream", plan.upstream, "--port", String(port), "--log", logFile];
    if (fault) a.push("--rules", join(here, `${args.app}.json`), "--fault", fault.id);
    const p = spawn(process.execPath, a);
    p.stdout.on("data", (d) => String(d).includes("fault proxy") && resolve(p));
    p.stderr.on("data", (d) => reject(new Error(String(d))));
    p.on("exit", (c) => c && reject(new Error(`proxy exited ${c}`)));
  });
}

async function once(fault) {
  const name = fault ? fault.id : "control";
  const logFile = join(out, `${name}.log.jsonl`);
  rmSync(logFile, { force: true });
  const proxy = await startProxy(fault, logFile);
  try {
    const r = await run("npx", ["playwright", "test", "--reporter=json"], {
      cwd: workspace,
      env: { ...process.env, AQA_APP_URL: `http://localhost:${port}` },
    });
    let report;
    try {
      report = JSON.parse(r.stdout.slice(r.stdout.indexOf("{")));
    } catch {
      report = undefined;
    }
    const failed = [];
    const walk = (suites) => {
      for (const s of suites ?? []) {
        for (const sp of s.specs ?? [])
          if (sp.ok === false) {
            const res = sp.tests?.[0]?.results?.at(-1);
            failed.push({ title: sp.title, message: String(res?.error?.message ?? "").split("\n")[0].slice(0, 200) });
          }
        walk(s.suites);
      }
    };
    walk(report?.suites);
    const log = existsSync(logFile)
      ? readFileSync(logFile, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l))
      : [];
    // Every edit of the fault applied exactly once somewhere, and never to a
    // response where its text appeared more than once.
    const valid =
      !fault ||
      (editsOf(fault).every((_, i) => log.some((e) => (e.edit ?? 0) === i && e.matches === 1)) &&
        !log.some((e) => e.matches > 1));
    const stories = storyOfTests();
    const ofStory = fault ? failed.filter((f) => stories.get(f.title) === String(fault.storyId ?? "")) : [];
    const verdict = !fault
      ? failed.length === 0 ? "control passed" : "CONTROL FAILED"
      : !valid ? "INVALID (rule did not apply exactly once)"
      : ofStory.length > 0 ? "caught"
      : failed.length > 0 ? "caught by accident"
      : "missed";
    const result = { run: name, fault: fault ?? null, verdict, failed, stats: report?.stats ?? null, applied: log };
    writeFileSync(join(out, `${name}.json`), JSON.stringify(result, null, 2));
    console.log(`  ${name.padEnd(8)} ${verdict}${failed.length ? `  — failing: ${failed.map((f) => f.title).join("; ")}` : ""}`);
    return result;
  } finally {
    proxy.kill();
  }
}

console.log(`${plan.app}: ${plan.upstream} via http://localhost:${port}`);
const results = [await once(undefined)];
if (results[0].verdict !== "control passed") {
  console.log("The control run failed: the suite does not pass through the proxy, so no fault run would mean anything. Stopping.");
} else {
  for (const f of faults.filter(ready)) results.push(await once(f));
}
writeFileSync(join(out, "summary.json"), JSON.stringify(results.map(({ run, verdict, failed }) => ({ run, verdict, failed: failed.map((f) => f.title) })), null, 2));
