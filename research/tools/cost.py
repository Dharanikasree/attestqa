"""Cost and time per run, read from the run ledgers (research/runs/<id>/events.jsonl).

Writes research/runs-cost.csv: one row per archived run, counted and excluded,
rebuilt from scratch each time (every number comes from a ledger, so nothing is
lost by regenerating it).

Usage:
  python cost.py                # all runs under research/runs and research/runs/_excluded
  python cost.py --print        # also print a summary by kind of run

Definitions:
  wall_min            first event to last event of the run
  approval_wait_min   sum over approvals of (resolved - requested): the time the run
                      waited for a person
  agent_min           wall_min - approval_wait_min
  cost_usd            tokens x list price of the model (PRICES below), from inference.usage
  refused_*           inferences whose proposed call the policy refused (the cost of
                      turns the rules sent back); paired with the next policy event
                      for the same tool
  items / items_passing / criteria / criteria_covered
                      from the run's coverage.json for the run's own story
  bugs_filed          successful jira.create_bug or Azure DevOps Bug create calls
  cost_per_passing_item, cost_per_bug
                      cost_usd divided by those counts (blank when the count is 0)
"""
import argparse, csv, json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRICES = {  # USD per million tokens: input, output, cache read, cache write
    "claude-sonnet-4-6": (3.0, 15.0, 0.30, 3.75),
}
COLUMNS = ["run_id", "excluded", "study", "story", "outcome", "core_commit",
           "wall_min", "approval_wait_min", "agent_min", "inferences",
           "input_tokens", "output_tokens", "cache_read_tokens", "cache_write_tokens",
           "cost_usd", "refused_inferences", "refused_cost_usd",
           "items", "items_passing", "criteria", "criteria_covered", "bugs_filed",
           "cost_per_passing_item", "cost_per_bug", "notes"]


def turn_cost(model, u):
    p = PRICES.get(model, PRICES["claude-sonnet-4-6"])
    return (u.get("inputTokens", 0) * p[0] + u.get("outputTokens", 0) * p[1]
            + u.get("cacheReadTokens", 0) * p[2] + u.get("cacheCreationTokens", 0) * p[3]) / 1e6


def bare(name):
    return str(name or "").split(".")[-1]


def one_run(run_dir: Path, manifest: dict):
    events = [json.loads(l) for l in open(run_dir / "events.jsonl", encoding="utf-8") if l.strip()]
    rid = run_dir.name
    story = ""
    req = next((e for e in events if e["kind"] == "request"), None)
    if req:
        m = re.search(r"\b([A-Z][A-Z0-9]+-\d+|AB#\d+)\b", json.dumps(req["payload"]))
        story = m.group(1) if m else ""
    end = next((e for e in reversed(events) if e["kind"] == "end"), None)
    outcome = (end or {}).get("payload", {}).get("status", "open")
    commit = ""
    if req:
        v = req["payload"].get("versions") or {}
        commit = f"{v.get('attestqa', '')} @{v.get('commit', '')}".strip(" @")

    wall = (events[-1]["timestamp"] - events[0]["timestamp"]) / 60000
    asked = {}
    wait = 0.0
    for e in events:
        if e["kind"] == "approval_requested":
            asked[e["payload"].get("approvalId")] = e["timestamp"]
        elif e["kind"] == "approval_resolved" and e["payload"].get("approvalId") in asked:
            wait += (e["timestamp"] - asked.pop(e["payload"]["approvalId"])) / 60000

    tok = dict(i=0, o=0, cr=0, cw=0)
    cost = refused_cost = 0.0
    n_inf = n_refused = 0
    for k, e in enumerate(events):
        if e["kind"] != "inference":
            continue
        p = e["payload"]
        u = p.get("usage", {}) or {}
        c = turn_cost(p.get("model", ""), u)
        n_inf += 1
        cost += c
        tok["i"] += u.get("inputTokens", 0); tok["o"] += u.get("outputTokens", 0)
        tok["cr"] += u.get("cacheReadTokens", 0); tok["cw"] += u.get("cacheCreationTokens", 0)
        tool = bare(p.get("toolName"))
        if not tool:
            continue
        for f in events[k + 1:]:
            if f["kind"] == "inference":
                break
            if f["kind"] == "policy" and bare(f["payload"].get("toolName")) == tool:
                if f["payload"].get("decision") == "refuse":
                    n_refused += 1
                    refused_cost += c
                break

    bugs = 0
    calls = {e["eventId"]: e for e in events if e["kind"] == "call"}
    for e in events:
        if e["kind"] != "observation" or not e["payload"].get("ok"):
            continue
        c = calls.get(e["payload"].get("eventIdOfCall"))
        if not c:
            continue
        name, args = bare(c["payload"].get("toolName")), c["payload"].get("args", {})
        if name == "create_bug" or (name == "wit_work_item_write" and args.get("action") == "create"
                                    and str(args.get("workItemType")) == "Bug"):
            bugs += 1

    items = passing = crit = covered = ""
    cov = run_dir / "coverage.json"
    if cov.exists() and story:
        try:
            # Azure DevOps stories are "AB#109" in the request and 109 in coverage.
            want = story.replace("AB#", "")
            s = next((x for x in json.load(open(cov, encoding="utf-8")) if str(x.get("story")) == want), None)
        except ValueError:
            s = None
        if s:
            its = s.get("items", [])
            items, passing = len(its), sum(1 for x in its if x.get("state") == "passing")
            crit = len(s.get("acceptanceCriteria", []))
            covered = crit - len(s.get("uncoveredCriteria", []))

    row = manifest.get(rid, {})
    return {
        "run_id": rid, "excluded": "yes" if run_dir.parent.name == "_excluded" else "no",
        "study": row.get("study", ""), "story": story, "outcome": outcome, "core_commit": commit,
        "wall_min": round(wall, 1), "approval_wait_min": round(wait, 1),
        "agent_min": round(wall - wait, 1), "inferences": n_inf,
        "input_tokens": tok["i"], "output_tokens": tok["o"],
        "cache_read_tokens": tok["cr"], "cache_write_tokens": tok["cw"],
        "cost_usd": round(cost, 2), "refused_inferences": n_refused,
        "refused_cost_usd": round(refused_cost, 2),
        "items": items, "items_passing": passing, "criteria": crit, "criteria_covered": covered,
        "bugs_filed": bugs,
        "cost_per_passing_item": round(cost / passing, 2) if isinstance(passing, int) and passing else "",
        "cost_per_bug": round(cost / bugs, 2) if bugs else "",
        "notes": row.get("notes", ""),
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(ROOT / "runs-cost.csv"))
    ap.add_argument("--print", action="store_true")
    a = ap.parse_args()
    manifest = {r["run_id"]: r for r in csv.DictReader(open(ROOT / "runs-manifest.csv", encoding="utf-8"))}
    dirs = sorted(d for d in (ROOT / "runs").glob("2*") if (d / "events.jsonl").exists())
    dirs += sorted(d for d in (ROOT / "runs" / "_excluded").glob("2*") if (d / "events.jsonl").exists())
    rows = [one_run(d, manifest) for d in dirs]
    with open(a.out, "w", encoding="utf-8", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=COLUMNS, lineterminator="\n")
        w.writeheader()
        w.writerows(rows)
    print(f"{len(rows)} runs -> {a.out}")
    if a.print:
        tot = sum(r["cost_usd"] for r in rows)
        ex = sum(r["cost_usd"] for r in rows if r["excluded"] == "yes" or r["study"] != "eval")
        ref = sum(r["refused_cost_usd"] for r in rows)
        print(f"total ${tot:.2f}; excluded or not counted ${ex:.2f}; spent on refused turns ${ref:.2f}")
        for r in rows:
            print(f"{r['run_id']}  {r['story']:9} {r['outcome']:8} {r['study']:14} ${r['cost_usd']:>5}  "
                  f"refused ${r['refused_cost_usd']:>5}  wall {r['wall_min']:>5}m  wait {r['approval_wait_min']:>5}m  "
                  f"bugs {r['bugs_filed']}  passing {r['items_passing']}/{r['items']}")


if __name__ == "__main__":
    main()
