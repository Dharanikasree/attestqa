# ADR-007 — Documentation structure and the feature-release process

Date: 2026-11-04 · Status: accepted

## Context

Two things had drifted. **Documentation** existed in three overlapping sets: the signed
pre-development design baseline (`Docs/src` AQ-00–09, ~80% describing unbuilt software), the engine
docs (`packages/core/docs`, a current layer mixed with an Oct-9 "agentic-qa-era" layer that is now
inaccurate), and research/ops artifacts scattered among them. The same fact — how a run works, what
the product does, the version rules — was stated in three or four places that no longer agreed.
**Versioning** was recorded in AQ-00 (D22, plus two rows both numbered D24), AQ-05 §1, VERSIONS.md,
RELEASING.md and TECHNICAL.md, with contradictions (notably VERSIONS.md still documented a manual
`npm publish` order that the token-free CI pipeline in RELEASING.md had replaced).

## Decision

**1. One living source of truth per concern. Everything else is frozen-and-labelled or historical.**
Documents fall into three tiers:

- **Living** (maintained, shipped): `ROADMAP.md` (plan) · `packages/core/docs/` ENGINE_MAP
  (mechanism), TECHNICAL (contract), ARCHITECTURE (rationale), USAGE (user guide), ADOPTION,
  RELEASING (runbook), VERSIONS (version-of-record), WEAKENING (frozen research corpus, cited).
- **Frozen baseline**: the signed set moves to `Docs/baseline/`, byte-identical, not maintained,
  PDFs not re-rendered. It is a historical record; `Docs/baseline/README.md` points to the living
  docs.
- **Historical**: superseded or spent engine docs move to `packages/core/docs/history/`
  (HOW-A-RUN-WORKS, FUNCTIONAL, PRODUCT_attestqa — superseded; DESIGN_agents, DESIGN_triage —
  overtaken by code; DESIGN_memory — unbuilt; RESEARCH_mcp — dated memo; ADO_cleanup — spent; the
  old handoffs and adoption workbook).

VERSIONS.md stays the single version-of-record and is linked from CLAUDE.md and RELEASING.md;
RELEASING.md is the pure runbook. VERSIONS.md's stale manual release-order section is removed.

**2. Version scheme (confirms ADR-005, withdraws the old one).** One version line across the git
tag, `attestqa` (npm) and `attestqa-vscode` (Marketplace):

- **MAJOR** — a new stage/kind of testing, or a change to the contract surface (TECHNICAL.md: event
  kinds and payloads, CLI flags, exit codes, config schema, approval file format, artefact paths).
  Stages: 2.x web · 3.x API · 4.x web version · 5.x security · 6.x ETL.
- **MINOR** — a feature release (additive capability).
- **PATCH** — fixes, docs, tests; no contract change.

The earlier scheme (AQ-00 D22 / AQ-05 §1: a separate product number, "a new major per stage") is
withdrawn.

**3. Feature-release process.** Monthly target on the 15th; a release ships whatever is finished and
tested, unfinished work slips to the next month and the date does not move. Each change is recorded
as a changeset when it is made (patch or minor). At release: `changeset version` cuts the version
and CHANGELOG; CITATION.cff (version + date), RELEASE_NOTES.md and the VERSIONS.md table are
updated; `npm run preflight` is green; the commit goes to `main`; the tag `vX.Y.Z` triggers the CI
publish (RELEASING.md). Each release ends with any ADRs for decisions changed, a findings/EVAL
update and a journal entry, and the minted Zenodo DOI goes back into CITATION.cff.

## Alternatives

- **Rewrite the baseline in place.** Rejected: AQ-00–09 are a signed artifact (ADR-001) whose PDFs
  are hashed in the sign-off sheet; editing them would erase the signed record. Corrections are
  recorded here instead.
- **Delete the superseded docs.** Rejected in favour of archiving into `history/`: the reasoning is
  still useful and git history alone is a poor index of why a doc was retired.

## Consequences

- The shipped doc set is only the living tier. Stale docs can no longer be mistaken for current.
- Two errors in the signed sheet are recorded, not fixed in place: AQ-00 has two rows numbered
  `D24` (the one-version-line amendment and the public-repository decision); AQ-05 §1 still shows
  the withdrawn D22 scheme.
- The stale *content* of the still-living TECHNICAL, ARCHITECTURE and ADOPTION docs (Oct-9
  "agentic-qa" shape) is refreshed during the 2.1.0 cycle, tracked as its own work; this ADR only
  moves structure.
- `packages/core/README.md` links to retired docs (FUNCTIONAL, HOW-A-RUN-WORKS) are repointed.
