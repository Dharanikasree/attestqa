# Docs

This folder holds the project's non-engine documents.

- **`baseline/`** — the signed pre-development design set (AQ-00 to AQ-09), **frozen**. It is a
  historical record of the original plan, not the current state; see `baseline/README.md`.
- **`handoff/`** — cross-package handoffs (e.g. bdd2pw / pw-emit) prepared for another package's
  maintainer.

The living documentation lives with the code and the plan, not here:

| You want | Read |
| --- | --- |
| What ships, and when | `../ROADMAP.md` |
| How a run works, the rules | `../packages/core/docs/ENGINE_MAP.md` |
| Using the product | `../packages/core/docs/USAGE.md` |
| Versions, what's published | `../packages/core/docs/VERSIONS.md` |
| Release process | `../packages/core/docs/RELEASING.md` |

How the documentation is organised, and why it is split this way, is recorded in
`../research/decisions/ADR-007-documentation-structure.md`.
