# Approval checklist for the evaluation runs

Read before answering any approval in a measured run, so all 144 runs are judged
the same way. A denial is recorded with its reason, in the reviewer's words.

The approver decides alone, during the run. After each run Claude reviews the
approved design against this checklist and the story; an item that should have
been denied is recorded as an approver miss in `findings.jsonl` and
`EVAL_RESULTS.md`, and the run's outcome is not changed (decided 23 Oct 2026).

## Test design

Approve only if every line is true; otherwise deny and say which line failed.

1. Every acceptance criterion of the story has at least one item covering it.
2. Each item's expected result is something a person could check on the screen,
   taken from the story, not invented (no address, wording or value the story
   does not give).
3. Each open bug linked to the story is either tested (expected to fail) or
   excluded with a reason that names the bug and why it does not touch this story.
4. Each excluded test type has a reason specific to this story.
5. Nothing is designed for another story's criteria.

## Running the suite

Approve when the application under test is the one named in the command
(`AQA_APP_URL` in the run's `.env` file) and it is running.

## Test cases in the tracker

Approve when there is one case per criterion, each case's steps match the test
that was written, and no case duplicates one that already exists for the story.

## A bug

Approve only if all three are true; otherwise deny with the reason.

1. The failing test checks something the story's criteria say.
2. The evidence shows the product doing it wrong (an assertion about what the
   page showed, or a measured value), not a locator that matched nothing, a
   timeout, or a test-code error.
3. The bug says what was expected, what happened, and where; it is not already
   filed.

## The results comment

Approve when the counts match the report printed by the run. Deny only if it
claims something the run did not do.
