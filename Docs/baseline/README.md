# Design baseline — frozen

This folder is the **signed pre-development design set** for attestqa (AQ-00 to AQ-09),
approved on 10 October 2026 (ADR-001). It is a historical record, **not a living document**.
It describes the product as it was planned before any code was written — a scope that still
includes software that does not exist yet (the Electron desktop app, the web server, API /
security / ETL testing). Read it to understand the original intent, not the current state.

**For what is true now, go here instead:**

| You want | Read |
| --- | --- |
| What ships, and when | `ROADMAP.md` (repo root) |
| How a run works, the rules, the pipeline | `packages/core/docs/ENGINE_MAP.md` |
| Using the product (install, run, results) | `packages/core/docs/USAGE.md` |
| Versions, and what's published where | `packages/core/docs/VERSIONS.md` |
| Release process | `packages/core/docs/RELEASING.md` |
| Why the design is shaped this way | `packages/core/docs/ARCHITECTURE.md` |

## What's here

- `src/*.md` — the editable Markdown sources of AQ-00 to AQ-09.
- `*.pdf` — the signed PDFs. `00_Signoff` carries the SHA-256 of each one, so the version signed
  can be proven. **The `.md` and `.pdf` are kept byte-identical to what was signed and are not
  edited.** Corrections to the decisions they record live in `research/decisions/` as ADRs, never
  as silent edits here.
- `assets/`, `prototype/`, `render.py`, `signoff.py` — the tooling that produced the PDFs.
  Re-rendering is **retired**: the set is frozen, so the PDFs are not regenerated.
- `attestqa_Planner.xlsx` — the original day-by-day hour planner behind AQ-05.

## Known corrections (see ADR-007)

The signed sheet is left as-signed, but two things in it are superseded and are recorded in
`research/decisions/ADR-007`:

- The version scheme in AQ-00 **D22** and AQ-05 §1 (a separate product number, "a new major per
  stage") is withdrawn. The live scheme is **one version line** (ADR-005): see `ROADMAP.md` and
  `packages/core/docs/VERSIONS.md`.
- AQ-00 has **two rows numbered `D24`** (the one-version-line amendment and the public-repository
  decision). This is a numbering error in the signed sheet; ADR-007 records it. The sheet is not
  edited.
