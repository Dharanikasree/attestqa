# ADR-005 — One version line for the product, the engine and the extension

Date: 3 November 2026. Decided by Vijay. Supersedes the numbering in ADR-002 (product `v1.0.0` with engine
2.0.0 inside) and the sign-off decisions D22/D23 (amended as D24 in `Docs/src/00_Signoff.md`).

## Decision

The product release tag, the npm package `attestqa` and the VS Code extension `attestqa-vscode` carry the
same version number. The first product release under this rule is **v2.0.2**: the 2.0.1 engine plus the
eleven fixes produced by the October 2026 evaluation (108 runs), already on `main` as changesets. It ships
as soon as it is published, not on a calendar date. New features go to **v2.1.0** when they are done
(planned 15 December 2026). The stage majors move up one: API testing v3, web version v4, security v5,
ETL v6. SemVer as in CHANGELOG.md; the contract (event shapes, flags, exit codes, config, approval file)
still means a major bump when it changes.

## Why

Two numbering lines had already produced one wrong statement in a submitted paper (the SoftwareX
manuscript's C1 said "the engine inside the attestqa product release v1.0.0") and would have produced
more: every README, roadmap, release note and citation had to explain the pair. One number removes the
explanation. The evaluation and the papers cite attestqa 2.0.1; the fixes they found ship as 2.0.2; the
papers can say so in one sentence.

## Consequences

- `ROADMAP.md`, `RELEASE_NOTES.md`, both READMEs, `docs/VERSIONS.md`, `docs/RELEASING.md` and the design
  sources under `Docs/src/` are renumbered (3 Nov 2026); the PDFs under `Docs/` are re-rendered from the
  sources with `Docs/render.py`.
- `packages/vscode/package.json` is set to 2.0.2; the release workflow's tag check must compare the tag to
  both package versions.
- `CITATION.cff` is bumped with every release, since every GitHub release is archived on Zenodo.
- The SoftwareX manuscript corrects C1 at revision; it continues to cite 2.0.1, the version evaluated.
