# attestqa v2.0.3 — November 2026

A small patch on 2.0.2: the citation file shipped with the package now carries the right version
and the Zenodo concept DOI, and the release itself is the first made by the token-free pipeline
(trusted publishing on npm and the VS Code Marketplace). It also carries one engine fix on top of
the eleven from the October evaluation that 2.0.2 shipped: a failure that is the test's own code —
a broken or ambiguous selector, an accessibility scan scoped to a region that is not on the page —
is now reported as a test fault, not as "flaky". All are listed below. attestqa is governed, open-source end-to-end testing for web
applications. Point it at a user story in **Jira or Azure DevOps**; approve the test design it
proposes; get ordinary Playwright tests in a folder you own — written, run, triaged and repaired
under rules that refuse, in code, to make a failing test pass by weakening it. Every step is in a
ledger you can replay.

## Install

```bash
npm install -g attestqa        # the engine and the aqa command (Node.js 20+)
```

VS Code: install **attestqa** from the Marketplace (publisher `vijaypjavvadi`), or the `.vsix`
attached to this release.

Then follow the [user guide](packages/core/docs/USAGE.md) — about ten minutes to set up a project.

## Changed in 2.0.3

- Triage: a failure that is the test's own code — an invalid or ambiguous selector (a strict-mode violation), or an accessibility scan scoped to a region that is not on the page — is reported as a test fault instead of as "flaky". The agent still repairs it exactly as before; only the report's wording changes, so a run whose one failure was a broken selector no longer reads "1 flaky" (F-0125, F-0126).
- `CITATION.cff` (repository and npm package): version, date and the Zenodo concept DOI, which resolves to the latest archived version.
- One release workflow; npm and Marketplace publishing without tokens. See `packages/core/docs/RELEASING.md`.

## Fixed in 2.0.2 (each from an observed run; finding ids in `research/findings.jsonl`)

- Bug gate judges each test by its latest result (F-0089).
- Accessibility scope gate applies the run's own edits to the spec before judging (F-0091).
- The file view the rules read applies in-place edits (F-0094).
- Feature-churn guard counts `bdd2pw.analyze` as progress (F-0098).
- Append-only rule protects only tests present at run start (F-0102).
- Verifier counts navigation as a state-transition action when the design names it (F-0110).
- Edits may name a masked value by its mask token (F-0113).
- Append-only rule recognises the run's own scaffolded tests by their tags (F-0139).
- Ledger names its engine; a page-load transient is a flake, not a defect; relative navigation is resolved against the configured origin (three further changesets).

## What attestqa 2.0.x is

- Jira and Azure DevOps stories, read with their epic, sub-tasks, comments and open bugs.
- A test design — functional, security, accessibility, confirmation — approved by a person before
  any test is written.
- Playwright tests generated with bdd2pw into your own project, tagged to story and design item;
  new stories added beside existing ones without touching them.
- Failure triage, and locator repair from the page as it was at the failure, with pw-self-heal as a
  second opinion.
- `aqa coverage`, `aqa replay` and `aqa check-rules` — all offline, from the ledger and your files.
- Anthropic, OpenAI, Azure OpenAI, a local model or your company gateway.
- A VS Code extension: run a story, approve the design in the editor, see coverage and runs.

## Packages

| Package | Version |
| --- | --- |
| `attestqa` (npm) | 2.0.3 |
| `attestqa-vscode` (Marketplace) | 2.0.3 |
| bdd2pw / pw-self-heal (dependencies) | 4.6.5 / 1.3.0 |

`attestqa` 2.0.x replaced the 1.x engine published from agentic-qa; the ledger format changed. From 2.0.2 the product, the engine and the extension share one version number (ADR-005). What
comes next is in the [roadmap](ROADMAP.md).
