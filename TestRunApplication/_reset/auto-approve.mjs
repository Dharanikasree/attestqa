#!/usr/bin/env node
// Evaluation phase 2 (from 26 Oct 2026): answers attestqa's file-mode approvals
// automatically, so that the runs do not wait for a person at the keyboard.
//
//   aqa run "..." --approval file --ledger .aqa-eval-sd
//   node ..\..\TestRunApplication\_reset\auto-approve.mjs --ledger .aqa-eval-sd [.aqa-eval ...]
//
// Every approval request a run writes to <ledger>/runs/<id>/approvals/<approvalId>.json
// with decision null is set to decision "approved", by "auto-approver (evaluation
// phase 2)". The run's ledger records that, so a phase-2 approval is never mistaken
// for a human one. Nothing else is touched: every rule, refusal, verifier check and
// repair cap runs as before; this only replaces the "y" at the prompt.
//
// Each approval granted is appended to research/runs/_auto-approvals.log with the
// run id, the approval id and the summary text the human would have read, so the
// after-run checklist review (research/APPROVAL_CHECKLIST.md) can still be done.
//
// Stop it with Ctrl+C. It never denies, never edits a decided file, and never
// touches anything outside the approvals folders.

import { readdirSync, readFileSync, writeFileSync, existsSync, appendFileSync, mkdirSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

export function approvePending(ledgerDirs, who, log) {
  const granted = [];
  mkdirSync(dirname(log), { recursive: true });
  for (const ledger of ledgerDirs) {
    const runs = join(ledger, "runs");
    if (!existsSync(runs)) continue;
    for (const runId of readdirSync(runs)) {
      const dir = join(runs, runId, "approvals");
      if (!existsSync(dir)) continue;
      for (const f of readdirSync(dir)) {
        if (!f.endsWith(".json")) continue;
        const file = join(dir, f);
        let rec;
        try { rec = JSON.parse(readFileSync(file, "utf8")); } catch { continue; } // partial write
        if (rec.decision !== null && rec.decision !== undefined) continue;
        const at = new Date().toISOString();
        writeFileSync(file, JSON.stringify({ ...rec, decision: "approved", by: who, at }, null, 2), "utf8");
        const line = `${at}\t${runId}\t${rec.approvalId}\t${String(rec.summary ?? "").replace(/\s+/g, " ").slice(0, 300)}`;
        appendFileSync(log, line + "\n", "utf8");
        granted.push(line);
      }
    }
  }
  return granted;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const ledgers = [];
  let by = "auto-approver (evaluation phase 2)";
  let logFile = resolve(here, "../../research/runs/_auto-approvals.log");
  let once = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--ledger") { while (args[i + 1] && !args[i + 1].startsWith("--")) ledgers.push(resolve(args[++i])); }
    else if (args[i] === "--by") by = args[++i];
    else if (args[i] === "--log") logFile = resolve(args[++i]);
    else if (args[i] === "--once") once = true;
  }
  if (ledgers.length === 0) {
    console.error("auto-approve: --ledger <dir> [<dir> ...] is required (paths relative to the current folder)");
    process.exit(2);
  }
  mkdirSync(dirname(logFile), { recursive: true });
  console.log(`auto-approve: watching ${ledgers.map((l) => l.replace(/\\/g, "/").split("/").pop()).join(", ")} — approvals by "${by}", log ${logFile}`);
  const tick = () => {
    for (const g of approvePending(ledgers, by, logFile)) console.log("approved  " + g.split("\t").slice(1).join("  "));
  };
  tick();
  if (!once) setInterval(tick, 1000);
}
