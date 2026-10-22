# Evaluation start state and data reset (draft, 22 Oct 2026)

What has to be true before the first measured run, and what is reset before
every run, so that each run starts from the same state (EVALUATION_PLAN.md
section 7). The setup week left traces of its trial runs in three places; each
is cleared below, by moving or closing, never by deleting.

## 1. Before the first measured run (once)

| Step | How | Who |
| --- | --- | --- |
| Test projects start empty for Toolshop, Booker and SauceDemo | `node TestRunApplication/_reset/clean-projects.mjs --apply` moves the trial runs' features, tests, page objects and reports to `_attempts/setup-2026-10-22/`. Juice Shop keeps its account tests: its stories 1-3 are the "existing tests" kind | Vijay runs it |
| The evaluation keeps its own run history | Every measured run uses `--ledger .aqa-eval` (in `packages/core`). The 163 trial runs stay in `.aqa`, and attestqa never reuses a trial run's design, because it only reads the ledger it is given | In every run command |
| Trial records in the trackers do not count as existing work | Azure DevOps: close test cases 123-126 (story 91) and 128-131 (story 109), and remove their links to the stories. Jira: close TOOL-22 (the QA sub-task of TOOL-6). Booker bug #127 stays: it is a real defect, and attestqa leaves agent-filed bugs out of a story's context | Vijay, in the trackers |
| Engine | `aqa --version` shows the evaluation build's commit, not `+dirty` | Vijay, after build and link |

## 2. Before every run of a story (reset)

| Application | Reset | Accounts afterwards |
| --- | --- | --- |
| Toolshop | `docker exec pst-laravel-api-1 php artisan migrate:fresh --seed` | The seeded customer and admin accounts (in `.env.toolshop`) |
| Booker | Stop `run_locally.cmd` (Enter in its window) and start it again; its data is in memory | admin / password, built in |
| SauceDemo | Nothing: it keeps no server-side state, and each test starts a new browser | The demo users, built in |
| Juice Shop | `docker restart <juice-shop container>`, then `node TestRunApplication/_reset/juice-shop-ready.mjs` | The script recreates the `.env` test account if needed and places one order |

Restart Booker before starting attestqa, never during a run: pressing Enter in
its window stops every `java.exe` and every `node.exe` on the machine, attestqa
included.

The run's working files are reset by git: runs 2 and 3 of a story start from
the commit made before run 1 (`git stash` or `git checkout -- TestRunApplication/<app>`
after archiving run 1's ledger and files).

## 3. After every run (archive)

Copy the run's ledger folder from `packages/core/.aqa-eval/runs/<runId>/` and
`aqa coverage --json` output into `research/runs/<runId>/`, and add its line to
`research/runs-manifest.csv` with `research/tools/manifest.py`.
