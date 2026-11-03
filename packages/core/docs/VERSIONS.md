# Versions

Three artefacts ship from this repository and they are versioned independently.
This file is the single place that says what is released where, because the
answer has been wrong twice already — once when `aqa --version` printed a
hardcoded `0.1.0-dev.0` that a substring assertion had been happily matching,
and once when a git tag was moved to a commit npm had never seen.

Check this table against reality before every release, with the commands below.

## Current

| Artefact | Name | Version | Published | Source |
| --- | --- | --- | --- | --- |
| Runtime | `attestqa` | **2.0.3** (2.0.2 on npm 3 Nov 2026) | npm | `packages/core/package.json` |
| Extension | `attestqa-vscode` | **2.0.3** (2.0.2 on the Marketplace 3 Nov 2026) | VS Code Marketplace | `packages/vscode/package.json` |
| Archive | `attestqa` | every release; cite the concept DOI (see `CITATION.cff`) | Zenodo (GitHub release integration) | `CITATION.cff` |

One version line (ADR-005, 3 Nov 2026): the product release tag, the runtime and the extension carry the
same number. They are not technically coupled — the extension reads ledgers the runtime writes — but two
numbers that drift apart make "which version are you on?" a two-part question for no benefit.

The Zenodo archive is created automatically for every GitHub release (the integration is on), so every
release is citable. `CITATION.cff` carries the *concept* DOI, which always resolves to the latest
version, so only `version` and `date-released` change per release (`packages/core/CITATION.cff` is
the copy that ships in the npm package and must say the same). A paper that needs a fixed version
cites that version's own DOI from its Zenodo page (2.0.1: 10.5281/zenodo.23897787, cited by the
SoftwareX article; 2.0.2: 10.5281/zenodo.23932981).

## What 2.0.x means here

SemVer, with the contract stated in CHANGELOG.md: the CLI flags, exit codes,
environment variables, config schema, ledger event shapes, approval file mode
and artefact paths. A change to any of those is a major bump.

2.0.0 was a commitment to that contract, not a claim that the software is
finished. It says the ledger event shapes are worth depending on — which they
now are, because the VS Code extension and the platform both read them, and
because Paper I's figures are counted from them. Breaking them silently would
invalidate analysis already done.

Note what this makes expensive: `EVENT_KINDS` is part of the contract, so adding
`triage` in 2.0.0 was the right moment to do it. The next event kind is a major
bump or it is nothing.

## Checking what is actually published

```bash
# npm — what the registry has, and what this working tree claims
npm view attestqa version
node -p "require('./package.json').version"

# the built CLI — catches a stale dist/, which has bitten before
node dist/cli.js --version

# VS Code Marketplace
npx vsce show vijaypjavvadi.attestqa-vscode
node -p "require('./packages/vscode/package.json').version"

# tags — a tag must point at the commit that was published, not at today's HEAD
git tag -l 'v*' --sort=-v:refname | head -5
git rev-parse v2.0.2
git log --oneline -1 v2.0.2
```

## Release order, and why it is this order

1. `npm run typecheck && npm test && npm run lint` — all three, on a clean tree.
2. `npm run build`, then `node dist/cli.js --version`. A stale `dist/` has
   silently shipped old behaviour once: a build predating its source by thirteen
   minutes made a feature look absent when it was present.
3. `npm run fixture:make` if any ledger event shape changed, then re-run the
   tests. The golden fixture is generated, never hand-edited — a hand-inserted
   event passes the "covers every kind" check and fails the byte-for-byte one,
   which is the suite telling you the fixture is a record of what the loop does.
4. `npm run version-packages` (changesets bump `package.json` and write the CHANGELOG); bump
   `CITATION.cff` (version, date-released) to the same number; commit.
5. `npm publish --access public`.
6. Tag **the published commit**: `git tag v2.0.2 <that sha>`, then push the tag.
   Tagging HEAD afterwards is how a tag and a release come to describe different
   code.
7. `gh release create v2.0.2` with notes from the CHANGELOG; Zenodo archives it and mints the DOI —
   put that DOI into `CITATION.cff` and the README badge in a follow-up commit.
8. Extension: set `packages/vscode/package.json` to the same number, `npm run package` in `packages/vscode/`,
   then `npx vsce publish`.
9. Update the table at the top of this file.

## Windows note

`cd` alone does not change drive on Windows. From an `E:` prompt,
`mkdir C:\tmp\x && cd C:\tmp\x` leaves the shell on `E:` and the next command
runs in the project — which is how `npm init -y` once overwrote this project's
`package.json`. Use `cd /d`.
