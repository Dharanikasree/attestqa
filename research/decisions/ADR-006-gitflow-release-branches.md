# ADR-006 — Release branches, feature branches, and an automated version bump

Date: 5 November 2026. Decided by Vijay. Builds on ADR-005 (one version line) and ADR-002 (the one
release workflow).

## Decision

Versions are built on a **release branch** and merged to `main` only after they ship.

- `main` is always the last released, stable state. It is protected; nothing is pushed to it
  directly. It changes only by merging a release branch after that version is published.
- For each version, a branch **`release/X.Y.Z`** is cut from `main`. It is protected with the same
  required checks as `main` (`check (ubuntu-latest)`, `check (windows-latest)`), and a push to it
  runs those checks — so the release branch is tested as its own integration line.
- Each feature or fix is a branch **`feat/<name>`** or **`fix/<name>`** cut from the release branch,
  carrying its own changeset, merged back into the release branch by pull request once green.
- The release is cut **from the release branch**: `npm run version-packages`, commit, tag `vX.Y.Z`,
  push the tag; the workflow publishes to npm, the VS Code Marketplace and a GitHub release.
- **After** the publish succeeds, a pull request merges the release branch into `main`.

The version bump is **one command**. `.changeset/config.json` now lists the two packages as `fixed`
(`[["attestqa","attestqa-vscode"]]`) instead of ignoring the extension, so `changeset version` bumps
both package.jsons and writes both CHANGELOGs from the changesets. `npm run version-packages` runs
that and then `scripts/sync-release-meta.mjs`, which stamps `CITATION.cff` with the new version and
today's date. The GitHub release body is taken from the version's section of
`packages/core/CHANGELOG.md` by the workflow. The hand-maintained `RELEASE_NOTES.md` is removed.

## Why

The 2.1.0 release exposed how much of the version bump was manual and silent. `changeset version`
left the extension at the old number because it was in the changeset `ignore` list, so the tag check
would have failed at publish time; `CITATION.cff` and `RELEASE_NOTES.md` were edited by hand against
a checklist. Each was an opportunity to ship an inconsistent version. `fixed` packages, a sync
script and changelog-sourced release notes remove every hand edit except adding the Zenodo version
DOI (which can only be done after the release exists). Building each version on its own branch keeps
`main` releasable at every moment, gives every feature and fix an isolated, tested branch and a
changeset, and makes the release itself reviewable as a pull request into `main`.

## Consequences

- `.changeset/config.json`: `fixed` set, `ignore` cleared. `attestqa-vscode` is versioned by
  changesets again (it is still `private` and is published by the workflow, not by changesets).
- `package.json` (root): `version-packages` runs `changeset version` then the sync script.
- `scripts/sync-release-meta.mjs` is new and owns `CITATION.cff` version + date.
- `.github/workflows/release.yml`: `push` triggers include `release/**`; the GitHub-release step
  reads the changelog section instead of `RELEASE_NOTES.md`. `RELEASE_NOTES.md` is deleted and
  `RELEASE_NOTES.generated.md` is git-ignored.
- `packages/core/docs/RELEASING.md` documents the branch model and the one-command bump.
- Branch protection must be added to `release/*` (the same required checks as `main`). As a
  single-maintainer repository, `release/*` and `main` require the checks to pass but do not require
  a separate reviewer's approval; this is revisited if another maintainer joins.
- The only by-hand release metadata left is the Zenodo **version** DOI, added to `CITATION.cff`
  after the GitHub release is archived.
