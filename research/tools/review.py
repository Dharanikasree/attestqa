"""Print what the after-run review needs from an archived run (research/runs/<id>/).

  python tools/review.py <runId> [<runId> ...]

Everything comes from events.jsonl and console.txt; nothing from the agent's own
summary. Sections: header, approved design (items, exclusions), refusals (with the
weakening ones marked), suite results per run, final triage verdicts, heal turns,
end status.
"""
import json, re, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
RUNS = HERE.parent / "runs"
sys.path.insert(0, str(HERE))
from manifest import WEAKENING_PATTERNS  # noqa: E402


def load(run_id):
    d = RUNS / run_id
    if not d.exists():
        d = RUNS / "_excluded" / run_id
    ev = [json.loads(l) for l in (d / "events.jsonl").read_text(encoding="utf-8").splitlines() if l.strip()]
    return d, ev


def review(run_id):
    d, ev = load(run_id)
    req = next(e["payload"] for e in ev if e["kind"] == "request")
    end = next((e["payload"] for e in ev if e["kind"] == "end"), {})
    inf = [e["payload"] for e in ev if e["kind"] == "inference"]
    tok_in = sum(p.get("usage", {}).get("inputTokens", 0) for p in inf)
    tok_out = sum(p.get("usage", {}).get("outputTokens", 0) for p in inf)
    print(f"=== {run_id}  {req.get('text')}  -> {end.get('status','open')}  ({len(ev)} events, {len(inf)} inferences, {tok_in} in / {tok_out} out)")
    print(f"    {end.get('summary','')[:240]}")
    route = next((e["payload"] for e in ev if e["kind"] == "route"), None)
    if route:
        print(f"    route {route.get('path')}: {route.get('reason')}")
    # design
    for e in ev:
        if e["kind"] == "approval_requested" and e["payload"]["calls"] and e["payload"]["calls"][0]["toolName"] == "aqa.test_design":
            a = e["payload"]["calls"][0]["args"]
            print("  design:")
            for it in a.get("items", []):
                print(f"    {it['id']:>4} {it.get('covers','?'):>5} {it.get('type','?'):<13} {it.get('technique','?'):<24} {str(it.get('expect') or it.get('expected') or '')[:110]}")
            for x in a.get("excluded", []):
                print(f"    excluded {x.get('what'):<14} {str(x.get('reason',''))[:120]}")
            break
    sentback = sum(1 for e in ev if e["kind"] == "policy" and e["payload"].get("decision") == "refuse" and "test design has" in e["payload"].get("reason", ""))
    print(f"  design sent back {sentback}x")
    # approvals
    for e in ev:
        if e["kind"] == "approval_resolved":
            print(f"    approval {e['payload']['approvalId']} {e['payload']['decision']} by {e['payload'].get('by')}")
    # refusals
    print("  refusals:")
    for e in ev:
        if e["kind"] == "policy" and e["payload"].get("decision") == "refuse":
            r = e["payload"].get("reason", "")
            if "test design has" in r:
                continue
            weak = [k for k, p in WEAKENING_PATTERNS.items() if p.search(r)]
            tag = f"[WEAKENING {','.join(weak)}] " if weak else ""
            print(f"    #{e['eventId']:<4} {e['payload'].get('toolName','?'):<22} {tag}{r[:170]}")
    # tool failures
    calls = {e["eventId"]: e["payload"] for e in ev if e["kind"] == "call"}
    for e in ev:
        if e["kind"] == "observation" and not e["payload"].get("ok", True):
            c = calls.get(e["payload"].get("eventIdOfCall"), {})
            msg = e["payload"].get("result")
            msg = msg.get("message") if isinstance(msg, dict) else str(msg)
            if c.get("toolName") == "run_tests":
                continue
            print(f"    failed call #{e['eventId']:<4} {c.get('toolName','?'):<18} {str(msg)[:150]}")
    # suites
    print("  suite runs:")
    for e in ev:
        if e["kind"] == "observation":
            c = calls.get(e["payload"].get("eventIdOfCall"), {})
            if c.get("toolName") == "run_tests":
                s = json.dumps(e["payload"])
                m = re.search(r'"passed": (\d+).{0,40}?"failed": (\d+)', s)
                tests = re.findall(r'"title": "([^"]+)", "file": "[^"]+", (?:"message": "([^"]*)", )?(?:"pageAtFailure": "[^"]*", )?"status": "(\w+)"', s)
                failed = [(t, msg) for t, msg, st in tests if st == "failed"]
                todo = sum(1 for t, msg, st in tests if st == "skipped")
                print(f"    #{e['eventId']:<4} {m.group(1) if m else '?'} passed / {m.group(2) if m else '?'} failed / {todo} skipped;", ("filters " + json.dumps({k: v for k, v in c.get('args', {}).items() if k != 'spec'})) if len(c.get('args', {})) > 1 else "full")
                for t, msg in failed[:6]:
                    print(f"          x {t[:70]} | {msg[:120].replace(chr(10),' ')}")
    # triage
    tr = [e for e in ev if e["kind"] == "triage"]
    if tr:
        print("  last triage:")
        for v in tr[-1]["payload"].get("verdicts", []):
            print(f"    {v['category']:<12} {v.get('confidence')} {v['test'][-60:]} | {v.get('evidence','')[:100].replace(chr(10),' ')}")
    for e in ev:
        if e["kind"] == "agent" and e["payload"].get("role") == "heal":
            print(f"  heal #{e['eventId']}: {e['payload'].get('because','')[:140]}")
    for e in ev:
        if e["kind"] == "verify":
            print(f"  verify #{e['eventId']}: {json.dumps(e['payload'])[:220]}")
    con = d / "console.txt"
    if con.exists():
        t = con.read_text(encoding="utf-8", errors="replace")
        m = re.search(r"Total scripts.*?(?=\n== |\Z)", t, re.S)
        if m:
            print("  report: " + " ".join(l.strip() for l in m.group(0).splitlines() if re.match(r"\s*(Total|Passed|Failed|Skipped|Not impl|Defects)", l)))
    print()


if __name__ == "__main__":
    for rid in sys.argv[1:]:
        review(rid)
