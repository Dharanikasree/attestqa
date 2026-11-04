---
"attestqa": patch
---

Repair now works on the run's own story, not another story's leftovers in a shared epic file. Stories in one epic share a feature file, so a story whose run blocked before scaffold leaves scenarios behind; the next story's scaffold turns them into tests, they fail, and the heal agent was handed one of them first — the next story's budget went on the previous story's leftovers (SCRUM-25 run 1 healed SCRUM-24's "Create Address" scan). The heal role now skips a failing test that belongs to another story (matched by the `@story` tag on its scenario in the feature file, or the `@story` comment in the spec); such a test goes in the report, not the repair queue. An untagged test is nobody's and stays in scope, and a run with no shared leftovers is unchanged. This closes W19 (heal spends the budget on the run's own tests first) as well as W28's repair-queue half (F-0126).
