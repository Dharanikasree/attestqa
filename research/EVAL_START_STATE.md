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

Runs 2 and 3 of a story each get their own ledger, `.aqa-eval-r2` and `.aqa-eval-r3`,
holding exactly the runs that were in `.aqa-eval` before run 1 of that story. Claude
prepares them before each repeat. Without this, a repeat finds run 1 in the ledger and
reuses its approved design instead of designing again (route B, "story unchanged"), so it
measures nothing new: the first attempt at run 2 of SCRUM-6, 20261022T171911Z-a0749b09,
did exactly that and is kept in `runs/_excluded/`. Run 1 of every story stays in
`.aqa-eval`, so later stories still see the earlier stories' run 1, as planned.

From 24 Oct two applications run at the same time, in two terminals, to use the
days better: Juice Shop with SauceDemo, then Toolshop with SauceDemo. Booker always
runs alone, because its restart kills every java.exe and node.exe on the machine.
Each application has its own ledgers so that nothing overlaps on disk:
Juice Shop and Toolshop share `.aqa-eval` (one Jira history, as before),
SauceDemo uses `.aqa-eval-sd` with repeats in `.aqa-eval-sd-r2` and `-r3`, and
Booker will use `.aqa-eval-rb` the same way. Two runs at once share the machine's
CPU and browser, which can affect timing (flakes, timeouts); the manifest's dates
and `runs-cost.csv` wall times show which runs overlapped.

A run that ends blocked, on budget, or in any other way is not started again on the
same workspace: its files are archived and the workspace is reset first, by Claude,
so that the next run begins from the story's run-1 state. A second start on the
files a stopped run left behind resumes that run (attestqa reads the feature file
and continues) and is excluded from the counted runs (24 Oct, SCRUM-22).

The run's working files are reset by git: runs 2 and 3 of a story start from
the commit made before run 1 (`git stash` or `git checkout -- TestRunApplication/<app>`
after archiving run 1's ledger and files).

Reset check (added 26 Oct, after SCRUM-25 run 2 was lost twice): a reset is not
done until `git status -- TestRunApplication/<app>` shows only the story's base
files and the generated spec, page objects, `artefacts/` and `test-results/`
from the previous run are deleted, not moved (a move on this mount leaves a
copy behind). One terminal per app: a second start on the same ledger while a
run is open produces two runs editing the same workspace, and both are excluded
(F-0127).

## 2b. Phase 2: the driver does steps 2 and 3 (from 26 Oct)

One command per story, one window per application:

    cd packages\core
    node ..\..\TestRunApplication\_reset\eval-driver.mjs --app saucedemo --story AB#113 --runs 1,2,3

The driver refuses to start unless `git status -- TestRunApplication/<app>` is clean
(the committed base) and no scenario for the story is on disk; resets the application
before every run (Juice Shop: docker restart + juice-shop-ready.mjs, checked; Toolshop:
migrate:fresh --seed; Booker: it waits for you to restart it; SauceDemo: nothing);
makes `-r2`/`-r3` hold exactly the main ledger's runs from before run 1 of the story;
runs `aqa run … --approval file` and answers each approval as
"auto-approver (evaluation phase 2)" (log: `research/runs/_auto-approvals.log`);
archives the ledger folder, the console output, `coverage.json` and the test project's
files into `research/runs/<runId>/` and `_attempts/eval-<date>-<story>-run<n>/`; restores
the test project with git after each run; saves run 1's files as
`_attempts/eval-base-<story>-run1/` and installs them after the last run. It then
stops: the manifest row, findings and results are still written from the archive by
hand, and the commit is still yours. Runs done by hand (phase 1) keep their place in the
same ledgers and folders.

Commit only an application that has no run in progress (added 26 Oct): `git add
TestRunApplication` while a run is open captures that run's half-written feature,
spec and page object as if they were the base, and the next reset restores them
from HEAD. The commit on 26 Oct 23:05 did this for Juice Shop (SCRUM-25 run 2 was
open); the base was restored from the previous commit and committed again. Add
the application's folder by name, and only after its run has been archived.

## 3. After every run (archive)

Copy the run's ledger folder from `packages/core/.aqa-eval/runs/<runId>/` and
`aqa coverage --json` output into `research/runs/<runId>/`, and add its line to
`research/runs-manifest.csv` with `research/tools/manifest.py`.
