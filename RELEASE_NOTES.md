# attestqa v2.1.0 — November 2026

A minor release. It adds support for an **organization-scoped Anthropic API key** — the one new
capability that makes this a minor — and clears the **27 open W items from the October evaluation**:
rule and reporting fixes across test design, verification, triage and the run loop, each from an
observed run and each with a test replayed from its ledger. No contract changed; a 2.0.x project
upgrades without any edit. attestqa is governed, open-source end-to-end testing for web
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

## New in 2.1.0

- **Organization-scoped Anthropic keys.** An org-scoped key is rejected by the API unless the
  request names a workspace, and attestqa's Anthropic client did not send one — so a run with such
  a key failed at the first model call. Set `ANTHROPIC_WORKSPACE_ID` (the id from the Anthropic
  Console → your workspace → settings) and the client sends it as the `anthropic-workspace-id`
  header. A workspace-scoped key sets nothing and nothing changes for keys that already worked.
- **A configurable per-call output cap** — `agent.budgets.max_output_tokens` — so a project can
  raise or lower the per-request output limit. The default is unchanged (W29).

## Changed in 2.1.0 (the 27 W items; finding ids in `research/findings.jsonl`)

Test design and coverage:

- An assertion must be specific to the transition it tests, and a negative assertion must name an
  element (W34, W8/W10).
- Every design item has a test (W8/W10).
- A non-functional criterion (accessibility, security) is covered by its own test type (W25).
- Each design item is justified against the story's own text, for the approver to judge — an
  optional one-line `rationale` shown in the design approval, with a reviewer checklist (W2/W6).
- A design item may cite an issue key alone or with a type word (W3).

Stateful stories and data isolation:

- A story that changes shared server-side state (a basket, booking, order, room or inbox) must say,
  once, how each test gets its own data — a fresh account, the state cleared before each test, or a
  unique datum per test; a test that mutates shared state with nothing isolating it is flagged for
  review (W15/W18/W21).
- The synthetic-data generator (`synthdata.generate`, behind the project's `SYNTHDATA_CMD`) is wired
  into that story as the unique-datum strategy (W15).
- A test that changes the shared account must leave it usable afterwards (W33).

Accessibility:

- The accessibility scan includes the story's own control wherever it lives — a search box or menu
  in the header is part of the story, not scoped out to `<main>` (W11).
- An accessibility violation a never-passed test found is surfaced for review rather than dropped:
  an axe scan reports facts about the DOM, so a rule it flags is real whether or not the test
  passed (W21).

Reporting and the run loop:

- A spec that does not compile is reported as its own state, not as "no test is failing" (W17).
- The report counts what the code does, not a leftover `// TODO` or `[SKIPPED]` marker (W14).
- The "completed" line is qualified with the count of items left for review (W22).
- A repeated file read is nudged to act or stop, not just re-read again (W24).
- A failed precondition sign-in is triaged as environmental, not a defect (W30).
- `replace_in_file` matches across CRLF/LF and writes the file's own line ending; a whole-file write
  truncated by the output cap gets an honest error (W31, W29).
- Heal and the edit-surface refusal are scoped to the run's own story, not another story's
  leftovers in a shared epic file (W28/W19, W35).
- The bug gate judges each test by its latest result (W7), and the Jira start-up line says the QA
  report goes to the QA sub-task (W4).

Dependencies:

- `@vijaypjavvadi/bdd2pw` pinned to `^4.6.7`, which fixes the navigate-drops-path bug — a navigate
  step now opens the captured path instead of the base URL (W13).

Two items are handoffs to bdd2pw's maintainer (its scaffold needs a scenario/tag filter so a shared
epic file is generated for one story only); the engine-side half shipped here.

## What attestqa 2.x is

- Jira and Azure DevOps stories, read with their epic, sub-tasks, comments and open bugs.
- A test design — functional, security, accessibility, confirmation — approved by a person before
  any test is written.
- Playwright tests generated with bdd2pw into your own project, tagged to story and design item;
  new stories added beside existing ones without touching them.
- Failure triage, and locator repair from the page as it was at the failure, with pw-self-heal as a
  second opinion.
- `aqa coverage`, `aqa replay` and `aqa check-rules` — all offline, from the ledger and your files.
- Anthropic (including organization-scoped keys), OpenAI, Azure OpenAI, a local model or your
  company gateway.
- A VS Code extension: run a story, approve the design in the editor, see coverage and runs.

## Packages

| Package | Version |
| --- | --- |
| `attestqa` (npm) | 2.1.0 |
| `attestqa-vscode` (Marketplace) | 2.1.0 |
| bdd2pw / pw-self-heal (dependencies) | 4.6.7 / 1.3.0 |

From 2.0.2 the product, the engine and the extension share one version number (ADR-005). What comes
next is in the [roadmap](ROADMAP.md).
