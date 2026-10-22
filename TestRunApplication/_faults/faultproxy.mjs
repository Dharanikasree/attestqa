#!/usr/bin/env node
// Fault proxy for the attestqa evaluation (research/SEEDED_FAULTS.md).
//
// Sits between Playwright and an application and changes exactly one thing in
// one kind of response. The suite under test reaches the application only
// through AQA_APP_URL, so a faulty run is the same suite pointed here.
//
//   node faultproxy.mjs --upstream https://www.saucedemo.com --port 8099
//        [--rules saucedemo.json --fault SD-4] [--log fault-log.jsonl]
//   node faultproxy.mjs --upstream ... --rules saucedemo.json --check [--fault SD-4]
//   node faultproxy.mjs --upstream ... --dump [/,/login]      (save page + scripts)
//
// With no --fault it passes everything through unchanged (the control run).
// --check fetches each rule's probe from the upstream and confirms its text is
// found exactly once; it exits 1 otherwise, so a fault can neither miss nor
// spread. While serving, every application of a rule is logged with the
// number of matches it found, and a response where a rule matched zero or
// more than one time is logged as such: the runner treats that run as invalid.
//
// Node built-ins only. Upstream responses are requested uncompressed
// (accept-encoding: identity) so a rule sees plain text.

import http from "node:http";
import https from "node:https";
import { appendFileSync, readFileSync } from "node:fs";

const args = Object.fromEntries(
  process.argv.slice(2).flatMap((a, i, all) =>
    a.startsWith("--") ? [[a.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : true]] : [],
  ),
);
if (!args.upstream) {
  console.error("usage: node faultproxy.mjs --upstream <url> --port <n> [--rules <file> --fault <id>] [--check]");
  process.exit(2);
}
const upstream = new URL(args.upstream);
const port = Number(args.port ?? 8099);
const rules = args.rules ? JSON.parse(readFileSync(args.rules, "utf8")).faults ?? [] : [];
const active = args.fault ? rules.filter((r) => r.id === args.fault) : [];
if (args.fault && active.length !== 1) {
  console.error(`fault ${args.fault} not found once in ${args.rules}`);
  process.exit(2);
}
const logFile = args.log ?? "fault-log.jsonl";
const log = (entry) => appendFileSync(logFile, JSON.stringify({ at: new Date().toISOString(), ...entry }) + "\n");

/** Whether a rule applies to this path and content type. */
const applies = (rule, path, type) =>
  new RegExp(rule.path).test(path) && (!rule.contentType || (type ?? "").includes(rule.contentType));

/** Count non-overlapping occurrences. */
const count = (text, find) => (find ? text.split(find).length - 1 : 0);

const client = upstream.protocol === "https:" ? https : http;

function fetchUpstream(path, { method = "GET", headers = {}, body } = {}) {
  return new Promise((resolve, reject) => {
    const req = client.request(
      {
        protocol: upstream.protocol,
        hostname: upstream.hostname,
        port: upstream.port || (upstream.protocol === "https:" ? 443 : 80),
        path,
        method,
        headers: { ...headers, host: upstream.host, "accept-encoding": "identity" },
      },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve({ res, body: Buffer.concat(chunks) }));
      },
    );
    req.on("error", reject);
    if (body?.length) req.write(body);
    req.end();
  });
}

// ---- --dump: save the entry page and the scripts it loads ------------------
// So the exact text of each rule can be taken from what the browser really
// receives. Writes bundles/<host>/ beside this script.
if (args.dump) {
  const { mkdirSync, writeFileSync } = await import("node:fs");
  const { dirname, join } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const dir = join(dirname(fileURLToPath(import.meta.url)), "bundles", upstream.host.replace(/[:]/g, "_"));
  mkdirSync(dir, { recursive: true });
  const entries = typeof args.dump === "string" ? args.dump.split(",") : ["/"];
  for (const e of entries) {
    const page = await fetchUpstream(e);
    const html = page.body.toString("utf8");
    writeFileSync(join(dir, `entry${e.replace(/[^a-z0-9]+/gi, "_")}.html`), html);
    const srcs = [...html.matchAll(/(?:src|href)="([^"]+\.js)"/g)].map((m) => new URL(m[1], upstream).pathname);
    for (const src of [...new Set(srcs)]) {
      const r = await fetchUpstream(src);
      writeFileSync(join(dir, src.replace(/^\//, "").replace(/\//g, "__")), r.body);
      console.log(`  saved ${src} (${r.body.length} bytes)`);
    }
  }
  console.log(`bundles in ${dir}`);
  process.exit(0);
}

// ---- --check: does each rule find its text exactly once? -------------------
if (args.check) {
  const toCheck = active.length ? active : rules;
  let bad = 0;
  for (const rule of toCheck) {
    if (!rule.find || rule.find.startsWith("TO-CONFIRM")) {
      console.log(`  ${rule.id}  not ready: match text not taken from the live application yet`);
      bad++;
      continue;
    }
    // The probe: an explicit path, or the assets the entry page loads whose
    // path matches the rule (bundle names carry hashes).
    let paths = rule.probe ? [rule.probe] : [];
    if (!paths.length) {
      const entry = await fetchUpstream(rule.entry ?? "/");
      const html = entry.body.toString("utf8");
      paths = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
        .map((m) => new URL(m[1], upstream).pathname)
        .filter((p) => new RegExp(rule.path).test(p));
    }
    let hits = 0;
    for (const p of paths) {
      const r = await fetchUpstream(p);
      hits += count(r.body.toString("utf8"), rule.find);
    }
    const ok = hits === 1;
    if (!ok) bad++;
    console.log(`  ${rule.id}  ${ok ? "ok" : "NOT OK"}  found ${hits} time(s) in ${paths.length} file(s)  ${rule.change}`);
  }
  process.exit(bad ? 1 : 0);
}

// ---- serve -------------------------------------------------------------------
const here = `http://localhost:${port}`;
http
  .createServer(async (req, res) => {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const headers = { ...req.headers };
    delete headers["host"];
    delete headers["accept-encoding"];
    if (headers["origin"]) headers["origin"] = upstream.origin;
    if (headers["referer"]) headers["referer"] = headers["referer"].replace(here, upstream.origin);
    let up;
    try {
      up = await fetchUpstream(req.url, { method: req.method, headers, body: Buffer.concat(chunks) });
    } catch (e) {
      res.writeHead(502, { "content-type": "text/plain" });
      res.end(`fault proxy: upstream unreachable: ${e.message}`);
      return;
    }
    const out = { ...up.res.headers };
    // Keep the browser on the proxy: absolute redirects and cookies scoped to
    // the upstream host would otherwise send it to the real application.
    if (out.location) out.location = String(out.location).replace(upstream.origin, here);
    if (out["set-cookie"])
      out["set-cookie"] = [].concat(out["set-cookie"]).map((c) => c.replace(/;\s*Domain=[^;]+/i, "").replace(/;\s*Secure/i, ""));
    let body = up.body;
    for (const rule of active) {
      if (!applies(rule, new URL(req.url, upstream).pathname, out["content-type"])) continue;
      const text = body.toString("utf8");
      const n = count(text, rule.find);
      log({ fault: rule.id, path: req.url, matches: n });
      if (n === 1) body = Buffer.from(text.replace(rule.find, rule.replace), "utf8");
    }
    delete out["content-length"];
    delete out["content-encoding"];
    delete out["transfer-encoding"];
    out["content-length"] = String(body.length);
    res.writeHead(up.res.statusCode ?? 502, out);
    res.end(body);
  })
  .listen(port, () =>
    console.log(`fault proxy ${here} -> ${upstream.origin}  ${active.length ? `fault ${active[0].id}: ${active[0].change}` : "no fault (control)"}`),
  );
