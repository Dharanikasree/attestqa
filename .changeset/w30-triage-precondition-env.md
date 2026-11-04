---
"attestqa": patch
---

A sign-in that fails before a test can start is no longer reported as a product defect. When the configured fixture account could not log in — a 401 at a precondition the test sets before exercising the product, for example after a stateful story changed the shared account and nothing restored it — triage scored it `real-defect` at 0.5, so every functional test in the run looked like a possible defect against the product. A precondition is setup: if it fails, no step reached the product and nothing about it was observed. Such a failure is now classified `environmental` (the mirror of the test-fault fix, and the opposite mislabel), which writes the run off as "fix the account and run again" rather than filing bugs against the product. A bare 401 with no precondition or configured-account signal still stays a product failure (F-0130).
