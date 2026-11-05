# Historical engine docs — superseded, kept for the record

These documents are no longer maintained. They describe the engine as it was before the 2.0.x
"attestqa" era (the Oct-9 "agentic-qa" shape: a single `story-to-tests` skill, Azure DevOps only,
per-criterion test cases, no test-design approval, no triage/heal, no Jira) or they are design
drafts the code has since overtaken. They are kept because the reasoning in them is still useful
and because they are cited by earlier notes — not because they are accurate about the current
product.

**For the current picture, read these instead:**

| Superseded doc | Replaced by |
| --- | --- |
| `HOW-A-RUN-WORKS.md` | `../ENGINE_MAP.md` §2 (the current stage-by-stage pipeline) |
| `FUNCTIONAL.md` | `../USAGE.md` (the current "what it does", end to end) |
| `PRODUCT_attestqa.md` | `ROADMAP.md` (repo root) + the signed vision in `Docs/baseline/src/01_Product.md` |
| `DESIGN_agents_v0.2.md` | `../ENGINE_MAP.md` §2–3 (roles and routes, now built) |
| `DESIGN_triage.md` | `../ENGINE_MAP.md` §7 (triage and quarantine, now built) |

Also here:

- `DESIGN_memory_v0.1.md` — a design for cross-run memory that is **not built**. Forward-looking,
  not stale; moved here so the live doc set is only what ships.
- `RESEARCH_mcp_2026-10-07.md` — a dated research memo about the MCP spec and the future web
  server. Point-in-time by design.
- `ADO_cleanup.md` — a spent one-off worklist (the corpus bug triage of 7 Oct 2026).
- `agentic-qa-adoption.xlsx`, `handoffs/` — adoption workbook and development handoffs from the
  pre-rename period.
