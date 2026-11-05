---
"attestqa": patch
---

Release process: build each version on a `release/X.Y.Z` branch, with feature and fix branches cut from it and merged back by PR, and merge to `main` only after the version publishes (ADR-006). The version bump is now one command, `npm run version-packages`: the engine and the extension are `fixed` in the changeset config, so both bump together from the changesets (the extension is no longer ignored and left behind), and a sync script stamps `CITATION.cff` with the new version and date. The GitHub release body comes from the version's own CHANGELOG section, so the hand-maintained `RELEASE_NOTES.md` is gone. No change to the published package's behaviour; this is release tooling and documentation.
