---
"attestqa": patch
---

A spec that does not compile is now reported as its own state, not as "no test is failing". When the last edit broke the spec, Playwright found no tests and reported a top-level compile error, but the runtime counted zero passes and zero failures and read that as nothing wrong — so the agent kept going, under budget pressure, as if the suite were fine, and ran out of budget (SCRUM-19 run 2). The run summary now captures Playwright's run-level errors, and `pw.run_tests` reports that the spec does not compile — no test ran, so nothing was measured, this is not a green suite and not "no failing test" — and names the compile error to fix. A normal run is unaffected (F-0099).
