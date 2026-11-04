---
"attestqa": patch
---

The report no longer calls a test "not implemented" over a leftover marker. A test is counted unimplemented when one of its steps was never written — but the check keyed on a `// TODO` comment or a `[SKIPPED]` step title, which the agent can leave behind after writing a working step. So the strongest AC-1 of a story — it searched through the box and asserted every card contains the term — was reported "not implemented" and dropped from the pass count over a stray generator comment (SCRUM-32 run 3). The check now reads the step bodies: a step is unimplemented only when its body does no work (only comments and whitespace), whatever the title or the comments say. A genuinely empty step is still caught, so a suite that only passes because steps are empty is still not green (F-0096).
