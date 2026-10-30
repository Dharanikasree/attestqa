# Evaluation plan — attestqa v1.0.0 and Paper I

Status: agreed 13 Oct 2026. Feature freeze 17 Oct; evaluation 19 Oct – 14 Nov; release 15 Nov.
Evaluation build (22 Oct 2026): attestqa 2.0.1 at commit 8f59bc0, run from the local build
(`npm link`), not released. Every run's ledger records the commit it ran; a fix during the
evaluation is committed, rebuilt and logged as a finding, and the release follows the evaluation.
Start state, resets and archiving: `EVAL_START_STATE.md`; approvals: `APPROVAL_CHECKLIST.md`;
seeded faults: `SEEDED_FAULTS.md`.
During the evaluation only fixes go into the engine, each as a patch with its finding logged, so
every result can be traced to the engine version that produced it.

## 1. Question

Does a governed agent produce useful, honest Playwright tests from real user stories, across
different applications and both trackers — and what do the governance rules actually prevent?

## 2. Design at a glance

| | |
| --- | --- |
| Applications | 4 (one existing, three new) |
| Stories | 48 (12 per application) |
| Runs | 144 (each story run 3 times, fresh workspace state each time) |
| Trackers | Jira: Juice Shop, Toolshop · Azure DevOps: Restful-Booker Platform, SauceDemo |
| Seeded faults | about 20 (5 per application) |
| Model | one model, fixed for the whole study (recorded in each ledger) |
| Governance | always on. There is no ungoverned arm: what the rules prevented is measured from the ledger (refusals) and by `aqa check-rules` counterfactuals, never by running without them. |

## 3. Applications

All four run on this machine or are public practice sites built to be tested. Each gets an entry
in `TestRunApplication/targets.yaml` with `permission_basis` and `checked` filled in before its
first run (Docs/06_Local_Test_Strategy.pdf §5), and a Playwright project in
`TestRunApplication/<id>/` that runs with plain `npx playwright test`.

| Id | Application | Kind | Hosting | Tracker | Faults from |
| --- | --- | --- | --- | --- | --- |
| juice-shop | OWASP Juice Shop | shop, intentionally vulnerable | local (have it) | Jira | patches to the local build |
| toolshop | Practice Software Testing "Toolshop" | shop with search, filters, admin | local (Docker) | Jira | its with-bugs edition, if still published; else patches |
| booker | Restful-Booker Platform | B&B booking + admin | local (Docker) | Azure DevOps | patches to the local build |
| saucedemo | SauceDemo | small shop, login-gated | hosted practice site | Azure DevOps | its built-in fault users (problem / glitch / error / visual) |

Verify during setup: current repository and image names, ports, default test and admin accounts,
whether the Toolshop with-bugs edition still exists, and that SauceDemo's fault users still behave
as documented. Record what was found in `targets.yaml`.

## 4. Stories — 12 per application, the same mix in each

| Kind | Per app | Route it exercises | What it shows |
| --- | --- | --- | --- |
| New area, nothing on disk | 3 | A | authoring from scratch |
| New story in an epic that already has tests | 3 | A2 (shared spec) | append-only, other stories untouched |
| Story with a linked open bug | 2 | A / A2 | known-bug tests (expected to fail), triage |
| Existing tests, then the UI changes | 2 | B | locator heal; anti-weakening rules under pressure |
| Accessibility- or security-heavy | 2 | A / A2 | non-functional test types |

Each story has 2–4 acceptance criteria, written as a product owner would (observable, one result
each), plus where relevant sub-tasks, a product-owner comment and a linked bug. The "UI changes"
stories are run once against the original build, then the change is applied (a renamed label, a
moved control) and the story is run again.

### Juice Shop (Jira, epic per area)

1. Sign in (SCRUM-6) · 2. Sign out (SCRUM-8) · 3. Register (SCRUM-10) · 4. Search products ·
5. Add to and change the basket · 6. Customer feedback form · 7. Forgot password / security
question · 8. Save a delivery address · 9. Write a product review · 10. Change password ·
11. Language selection · 12. Order history (with a linked bug).

### Toolshop (Jira)

1. Browse and paginate products · 2. Filter by category and brand · 3. Search by name ·
4. Sort by price and name · 5. Product detail and related products · 6. Add to cart and change
quantity · 7. Sign in and sign out · 8. Register · 9. Checkout as a signed-in customer ·
10. Favourites · 11. Contact form with validation · 12. Admin: product list (with a linked bug).

### Restful-Booker Platform (Azure DevOps)

1. Home page shows rooms and B&B details · 2. Contact form validation · 3. Contact message
reaches the admin inbox · 4. Book a room: date selection · 5. Book a room: guest details
validation · 6. Admin sign in and sign out · 7. Admin creates a room · 8. Admin edits and deletes a
room · 9. Admin reads and marks messages · 10. Admin changes branding · 11. Admin report of
bookings · 12. Double booking is refused (with a linked bug).

### SauceDemo (Azure DevOps)

1. Sign in with a valid user · 2. Locked-out user is refused with a message · 3. Inventory sorting
(name, price) · 4. Product detail page · 5. Add to and remove from cart from the inventory ·
6. Cart page contents and continue shopping · 7. Checkout: customer information validation ·
8. Checkout: overview totals and tax · 9. Checkout: complete order · 10. Menu: reset app state and
sign out · 11. Problem user sees wrong images (linked bug) · 12. Error user cannot complete
checkout (linked bug).

The full stories, acceptance criteria, sub-tasks, comments and bugs go into one seed file per
application (`scripts/jira-seed/<id>.json`, and an Azure DevOps equivalent), created in the trackers
by a person, as SCRUM was.

Written 13 Oct: `scripts/jira-seed/toolshop.json`, `scripts/ado-seed/booker.json`,
`scripts/ado-seed/saucedemo.json`. Written 22 Oct: `scripts/jira-seed/juice-shop.json` (project SCRUM; the
account epic, its three stories and SCRUM-12 were entered by hand on 10 Oct and carry their keys,
which the seeder now reuses instead of creating them again). Each story carries `order` (run order; later stories in an epic
append to its file) and `kind` (the row of the table above); "UI changes" stories carry `uiChange`,
the change to apply before their second pass; each file has a `verify` list for the setup week.
None of these notes is posted to the tracker. Each application gets its own tracker project
(Jira `TOOL`; Azure DevOps `attestqa-booker`, `attestqa-saucedemo`), because attestqa reads every
open bug in a project. Seeding, by a person:

```
node scripts/jira-seed/seed.mjs --file=toolshop.json --env=packages/core/.env            # dry run
node scripts/jira-seed/seed.mjs --file=toolshop.json --env=packages/core/.env --apply
node scripts/ado-seed/seed.mjs  --file=booker.json   --env=packages/core/.env            # dry run
node scripts/ado-seed/seed.mjs  --file=booker.json   --env=packages/core/.env --apply
```

Reproduce each linked bug on the build under test before `--apply`; a bug that does not reproduce
is filed as Done/Resolved or replaced, so its state matches the application.

## 5. Seeded faults

About five per application, each a change a real developer could make, recorded with the story it
should be caught by:

- a wrong validation message or none at all;
- a button that stays enabled when it should be disabled (or the reverse);
- a wrong redirect after an action;
- a calculation off by a small amount (a total, a count);
- an element renamed for sighted users but not in its accessible name (or the reverse).

Protocol: generate and approve the tests against the correct build; then run the same suite with
`npx playwright test` against each faulty build, one fault at a time. A fault counts as caught when
a test that covers its story fails for that reason. Faults are never shown to the agent.

Added 27 Oct: the control run is the baseline, not a gate. A final suite can carry tests that
never passed (Juice Shop's profile epic), which fail in the control and in every fault run alike;
they are subtracted, and a fault counts as caught only when a test of its story fails that passed
in the control. A fault aimed at a story with no passing test is reported as missed for that
reason. Flakiness (RQ4): `TestRunApplication/_faults/run-flakiness.mjs --app <app>` makes ten plain
full runs and separates tests whose outcome varied from the suite's standing failures.

## 6. Measurements

All counted from ledgers and files; nothing is taken from the model's own account.

| Measure | Source |
| --- | --- |
| Completion: done / blocked / budget, per story and per run | `end` event |
| Human interventions: hand edits, restarts, approvals denied | run notes + ledger |
| Time and tokens per run | ledger timestamps, `inference.usage` |
| Cost (added 23 Oct): dollars per run, per passing design item and per filed bug; time waiting for approvals vs. agent time; cost of turns the rules refused; cost of runs not counted | `tools/cost.py` → `runs-cost.csv` |
| Design: items per story, refusals before approval, items edited or denied by the reviewer | `policy`, `approval_*` |
| Coverage: criteria with a test, items with a passing or expected-failing test | `aqa coverage --json` |
| Governance: refusals by rule; refusals judged correct / incorrect (two-person review of a sample) | `policy` + review sheet |
| Weakening prevented: refused writes that would have removed or loosened a claim | quarantine / append-only rules |
| Counterfactual: decisions that would differ under the rules at release vs. at study start | `aqa check-rules` |
| Heal: locator repairs, agreement between attestqa and pw-self-heal | `heal_locator` results |
| Triage accuracy: category vs. the reviewer's judgement | `triage` events + review sheet |
| Seeded faults caught | section 5 |
| Stability: same story, three runs — same outcome? same number of tests? | per-story comparison |
| Flakiness of the generated suite: 10 plain re-runs of each final suite | `npx playwright test --repeat-each` |

## 7. Run protocol

1. Before each story's first run: the tracker item exists, the app is reset to its seed data, the
   workspace is at the commit before this story.
2. One command per run (`aqa run "Write tests for <id>" --config … --workspace …`), approvals in the
   terminal. The approver follows a written checklist (every criterion covered, one result per
   item, bugs tested or excluded with a reason) and records any denial with its reason.
3. No hand edits during a run. If a run blocks, it is recorded as blocked; a fix to the engine is a
   patch release, and the story is re-run from scratch.
4. After each run: `aqa coverage --json` and the ledger are archived in `research/runs/<runId>/`;
   one line in `research/runs-manifest.csv`.
5. Runs 2 and 3 of a story start from the same state as run 1.

Phase 2 (decided 26 Oct, after 40 counted story runs): from run 41 the approvals are
answered automatically. Each run uses `--approval file`, and the driver script
(`TestRunApplication/_reset/eval-driver.mjs`) sets every request to approved with
`by: "auto-approver (evaluation phase 2)"`, so the ledger tells the two phases apart.
Nothing in the engine changes: every rule, refusal, verifier check and repair cap runs
as in phase 1; only the "y" at the prompt is given by a script. The reason is time:
in phase 1 the approver denied nothing in 40 runs, the approver's misses were all found
by the after-run checklist review, and approval wait was most of the wall time (up to
seven hours on one comment). The after-run review continues unchanged, so the design
quality data has the same source in both phases. What phase 2 cannot show is a human
denial changing an outcome; the cost table reports approval wait for phase 1 only.
The driver also does the reset, the repeat-ledger preparation, the run and the archive
in one window, which removes the two protocol faults of 26 Oct (a second start on the
same ledger, and a run on an application that had not been reset; F-0127, F-0130).

## 8. Schedule

| Dates | Work |
| --- | --- |
| 13–17 Oct | Finish v1.0.0 features (SCRUM-6, SCRUM-7, one Azure DevOps story, CI, extension). Freeze. |
| 19–25 Oct | Set up Toolshop, Booker, SauceDemo projects; seed files and tracker items; seeded-fault patches; `1.0.0-rc.1` |
| 22 Oct – 1 Nov | Runs: Juice Shop and Toolshop (Jira). Started 22 Oct, four days early, once setup was complete; nothing else in the protocol changed |
| 2–8 Nov | Runs: Booker and SauceDemo (Azure DevOps); seeded-fault runs for all four |
| 9–14 Nov | Measures, review sheet, findings, Paper I results section; release notes |
| 15 Nov | v1.0.0 |

Budget: about 15 minutes and about $1 per run → about 36 hours of runs and about $150 of model use.

## 9. Threats to validity, stated in advance

- One author writes the stories, approves the designs and judges correctness: mitigated by a written
  approval checklist, a second reviewer for a sample of refusals and triage verdicts, and publishing
  the seed files.
- Practice applications are simpler than production systems: mitigated by four different kinds of
  application and two trackers; stated as a limitation.
- The engine changes during the study (patches only): every result names its engine version; a
  patch that changes a rule triggers a `check-rules` replay of earlier runs.
- One model: results are for that model; the provider interface allows replication with others.
