---
"attestqa": patch
---

The edit-surface refusal is scoped to the run's own story. In a shared epic spec the agent edits the earlier stories' tests that already pass; the passing-test rule refused up to eight times in one run, and the no-progress guard then ended a run whose own story was fully green (TOOL-7, TOOL-11). The verifier already counts a run whose own tests are green as done; this adds the other half. When the test being changed belongs to another story in the shared file, the refusal now says so — it is not this run's to change — and points the agent at its own story's failing tests, or tells it that if its own tests all pass the run is done. A run with no story context, or no shared neighbours, is unchanged; the set of refusals is unchanged (only the message), so the message is clearer without loosening the rule (F-0155, F-0158).
