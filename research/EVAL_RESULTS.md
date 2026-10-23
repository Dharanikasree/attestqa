# Evaluation results (running record)

Started 22 Oct 2026. Build `attestqa 2.0.1 @8f59bc0` for SCRUM-6, 8, 10 and SCRUM-18 run 1;
from the SCRUM-18 rerun on, a local patch build (F-0089), not published to npm; each
run's manifest row names its commit. Common settings: model claude-sonnet-4-6,
approvals by Vijay against `APPROVAL_CHECKLIST.md`. Plan: `EVALUATION_PLAN.md`;
start state and resets: `EVAL_START_STATE.md`. Every number below comes from a
ledger archived in `runs/<runId>/` and its row in `runs-manifest.csv`; the
findings it cites are in `findings.jsonl`.

Updated after each story. Written so that the paper's results and threats
sections can be drafted from it without going back to the terminal output.

## 1. Runs per story

"Sent back" = times the design rules returned the design to the agent before
it reached the approver. "Route" A = tests written, B = existing tests run.

| App | Story | Kind | Run | Run id | Route | Items | Criteria covered | Sent back | Suite | Bugs filed | Denials | Outcome |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Juice Shop | SCRUM-6 sign in | ui-change (existing tests) | 1 | 20261022T161640Z-45bd8a63 | B | 8 | 3/3 | 2 | 19/19 | 0 | 0 | done |
| Juice Shop | SCRUM-6 | | 2 | 20261022T172927Z-2a2e5c6c | B | 8 | 3/3 | 1 | 19/19 | 0 | 0 | done |
| Juice Shop | SCRUM-6 | | 3 | 20261022T184339Z-53d32c8a | B | 8 | 3/3 | 2 | 19/19 | 0 | 0 | done |
| Juice Shop | SCRUM-8 sign out | linked bug (existing tests) | 1 | 20261022T213317Z-dad48298 | B | 5 | 2/2 | 1 | 19/19 | 0 | 0 | done |
| Juice Shop | SCRUM-8 | | 2 | 20261022T231215Z-bf40f6cb | B | 5 | 2/2 | 1 | 19/19 | 0 | 0 | done |
| Juice Shop | SCRUM-8 | | 3 | 20261023T012618Z-ad277a1d | B | 5 | 2/2 | 2 | 19/19 | 0 | 0 | done |
| Juice Shop | SCRUM-10 register | ui-change (existing tests) | 1 | 20261023T125939Z-41853627 | B | 6 | 3/3 | 2 | 19/19 | 0 | 0 | done |
| Juice Shop | SCRUM-10 | | 2 | 20261023T130632Z-64c7c55d | B | 6 | 3/3 | 2 (+1 refused early suite run) | 19/19 | 0 | 0 | done |
| Juice Shop | SCRUM-10 | | 3 | 20261023T133811Z-deac53cb | B | 6 | 3/3 | 2 | 19/19 | 0 | 0 | done |
| Juice Shop | SCRUM-18 search | new area (tests written) | 1 | 20261023T135910Z-e690e135 | A | 4 | 3/3 | 2 | 3/4 (a11y fails: real defect) | 0 (5 refused) | 0 | **blocked** (F-0089) |
| Juice Shop | SCRUM-18 | | 1 (2nd attempt, 6d04950) | 20261023T143449Z-d157e355 | A | 5 | 3/3 | 2 | 4/5 (a11y fails: real defect) | 0 (5 refused) | 0 | **blocked** (F-0091) |
| Juice Shop | SCRUM-18 | | **1 (counted, 010ec25)** | 20261023T145501Z-dc4ce24a | A | 5 | 3/3 | 1 | 5/5 | 0 | 0 | **blocked** by verifier (F-0092) |

Suite counts are for the whole epic spec (19 tests), not only the story's own.
One of the 19 is the expected failure for open bug SCRUM-12, which reproduced
in every run and counts as passed.

Progress: 10 of 144 story runs. SCRUM-18 run 1 took three attempts: the first two were blocked by engine defects (F-0089, F-0091) and are kept as evidence; the third is the counted run.

## 2. Excluded runs

Not counted. Kept in `runs/_excluded/` with a manifest row marked `eval-excluded`.

| Run id | Story | Why |
|---|---|---|
| 20261022T171911Z-a0749b09 | SCRUM-6 | Meant as run 2, but used the same ledger as run 1, so it reused run 1's approved design (route B, "story unchanged") instead of designing again (F-0084). |
| 20261022T185532Z-1552136a | SCRUM-6 | A second start after run 3 had already finished in the same ledger; reused run 3's design for the same reason. |
| 20261023T165205Z-c56cab94 | SCRUM-18 | Run 2 on build 010ec25: a real accessibility bug from a correctly scoped scan was dropped at the end by a check that read the spec from before the edit (F-0094). Repeated on the fixed build. |

The SCRUM-6 pair are still evidence of something: an unchanged story is re-run without a
new approval, which is the intended behaviour in real use.

## 3. What is working

- The design rules caught a weak design in every run (1 or 2 send-backs each),
  and the agent fixed it before the approver saw it. The usual causes: an
  expected result naming one thing where two were needed, an open bug neither
  tested nor excluded, an expectation with no source.
- Three independent runs of a story reached the same design: the same items,
  every criterion covered, the same decision on each open bug.
- Open bug SCRUM-12 was tested as expected-to-fail and reproduced in all three
  SCRUM-8 runs; SCRUM-28 was excluded with a correct reason every time. No
  false bug was filed and no run blocked.

## 4. What is not working, or not yet shown

Each item names the finding and whether it is fixed. One (F-0089) was patched during the evaluation, as a local build, because it blocked
a real defect from being filed; the others wait for the release after the evaluation.

| # | What | Finding | Status | Matters for the paper because |
|---|---|---|---|---|
| W1 | Repeats shared run 1's ledger and copied its design; fixed by giving runs 2 and 3 their own ledger holding the history before run 1. | F-0084 | fixed (protocol) | Threat to validity; shows how the repeat protocol was made sound. |
| W2 | The accessibility item scans the page the existing test scans (login page), not a page the story is about. Same in 3 of 3 SCRUM-8 runs; the approver passed it too. | F-0087 | open | On existing-tests stories the agent adopts the existing test's scope rather than checking it. A limit of the design review, and of the checklist. |
| W3 | The source check accepts "task SCRUM-9" but refuses "SCRUM-9" and "SCRUM-9 sub-task"; the agent dropped the true source to get past it. | F-0086 | open | A rule that is right in aim but too strict in form can push the agent to a less accurate design. |
| W4 | On Jira runs the start-up line says results are not posted to the issue; they are posted to the QA sub-task. | F-0085 | open | Cosmetic; reported for completeness. |
| W6 | A security item (D19) cites AC-1 for AC-3's duplicate-email case and expects things the story does not say, copying the existing test's label. The source rule checks that a source is named, not that it supports the item. Approved in all three SCRUM-10 runs (approver misses). | F-0088 | open | Same anchoring as W2; also shows the human approver does not catch every unsupported item. |
| W7 | A real defect (search input with no label, low contrast) was found, proposed as a bug five times with evidence, and refused each time by a gate that still counted a locator failure fixed earlier in the run. The run blocked. | F-0089 | open | The governance that stops false bugs also stopped a true one: a cost of the rules, and the first blocked run. |
| W8 | The first tests written are weaker than the approved design: AC-1 never checks that non-matching products are absent; AC-2's assertion is satisfied by a product name. | F-0090 | open | The central measurement of the paper: does a governed agent write tests as strong as its design? |
| W9 | Second block on the same real defect: after the agent scoped the axe scan through an edit, the scope gate still read the spec from before the edit and refused the bug four more times. | F-0091 | fixed locally | Two blocks in a row came from rules judging stale evidence, not from wrong rules: worth its own paragraph on how a governed agent fails. |
| W10 | First new-tests run without an engine fault: 5/5 green, but the verifier refused it because the AC-2 test never uses the search box. Correct refusal. The verifier missed a test that passes whatever the product does (asserts that the words "product cards" are absent) and a design item with no test at all. | F-0092 | open | Shows both what the end-of-run check catches and what it does not. |
| W11 | A real accessibility defect in the story's own search box was scoped out of the scan by the "main content only" rule, so it went unreported. | F-0093 | open | A scope rule meant to protect stories from site-wide noise also hides defects in controls that live in the header. |
| W12 | A third check that read a test file from before the agent's edits dropped a true accessibility bug at the end of SCRUM-18 run 2. Same fault as W9 in a different reader; both fixed by making the readers apply in-place edits. In the same run the agent kept editing a test the repair cap had closed, five times, and the run blocked. | F-0094 | fixed locally | Two of the three engine faults so far share one root cause: how the runtime rebuilds a file from its own history. The third (W7) also came from reading old evidence: a failure already repaired. |
| W5 | Until SCRUM-18 every story already had tests (route B). | — | shown from SCRUM-18 | Authoring, repair, weakening and real bug finding are measured from Juice Shop story 4 onward and in the other three apps. |

## 5. Threats to keep in the paper

- One person wrote the stories, approved the designs and judged the results
  (mitigated by the written checklist; denials recorded with reasons).
- The repeat protocol was corrected after the first story (W1); the two
  affected runs are excluded and listed above, not silently dropped.
- The evaluation started on 22 Oct rather than 26 Oct; nothing else in the
  protocol changed.
