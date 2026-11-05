---
"attestqa": patch
---

The "completed" line now says how much was left open. A run can pass every test and still be weaker than its design — an unscoped accessibility scan, a transition asserted less specifically than the design — which the runtime sends to review rather than blocking. The headline still read plainly "completed", so a reader skimming it could not see that the run checked less than it was asked to (AB#109 run 2). The completion line now qualifies "completed" with the count of items needing review (and any needing a decision), e.g. "completed — 1 for your review". A clean run is unqualified (F-0106).
