---
"attestqa": patch
---

A feature file rewritten to make its steps bind is no longer refused as a loop when each rewrite was analysed with `bdd2pw.analyze`. The loop guard counted only suite runs as a check, and told the agent to run the suite, which cannot exercise scenarios that are not in the spec yet; a run on a shared epic file blocked on it. Unchecked rewrites are still refused after three, now with advice to analyse, and a feature is still stopped after six rewrites with advice to implement its scenarios.
