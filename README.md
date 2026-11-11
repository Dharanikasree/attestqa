# attestqa

Governed, open-source end-to-end testing for any website. A model your company already pays for writes and runs ordinary Playwright tests in a folder you own, and attestqa refuses — in code, not in a prompt — to make a failing test pass by weakening it. Every step is written to a ledger you can audit.

Status: **v2.0.3** — the engine and CLI are on npm (`attestqa` 2.0.2, 3 Nov 2026, carries the fixes from the October evaluation; 2.0.3 corrects the citation file), the attestqa
extension on the VS Code Marketplace). The design set was approved on 10 October 2026 and is the
frozen baseline in `Docs/baseline/` (`Docs/baseline/00_Signoff.pdf`).

## Start here

- **[User guide](packages/core/docs/USAGE.md)** — install, set up a project, run a story from Jira or
  Azure DevOps, approve the design, read coverage and the ledger, use it from VS Code.
- **[Roadmap](ROADMAP.md)** — what ships each month, and the later stages (API, web version,
  security, ETL).
- **Try it:** `npm install -g attestqa`, then `aqa init` in your Playwright project (section 3 of the user guide).
- **[Dependencies](DEPENDENCIES.md)** — what attestqa needs: Node, packages, the services it talks to, and the evaluation apps.

| Folder | Holds |
|---|---|
| `packages/core` | The governed runtime and the `aqa` CLI, published on npm as `attestqa` (history imported from agentic-qa) |
| `packages/vscode` | The VS Code extension, `attestqa-vscode` on the Marketplace — a thin client of the `aqa` CLI |
| `packages/*` | Other shared packages (`@attestqa/ui`, `@attestqa/client`, provider and sign-in plug-ins) as they arrive |
| `Winapp/` | The Windows desktop app (from v2.2.0) |
| `WebApplication/` | The web version, `@attestqa/server` (from v4.0.0) |
| `TestRunApplication/` | One plain Playwright project per site under test, plus `targets.yaml` |
| `Docs/` | The signed design baseline (frozen, in `Docs/baseline/`) and cross-package handoffs; see `Docs/README.md` |
| `research/` | Findings, decisions, hypotheses, run manifest and weekly journal |

Releases: one version line across the tag, npm and the extension (ADR-005). A new major for each kind of testing — 2.x web, 3.x API, 4.x web version, 5.x security, 6.x ETL — a new minor for each feature release, a patch for fixes. See [ROADMAP.md](ROADMAP.md) and [VERSIONS.md](packages/core/docs/VERSIONS.md). Licence: MIT.
