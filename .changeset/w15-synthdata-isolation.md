---
"attestqa": patch
---

Wire the synthetic-data generator into the per-test isolation story (W15). The `synthdata.generate` adapter already existed but was never offered to the story-to-tests agent, so the agent could not use it even where a project had one configured. It is now a stage-2 tool in the skill — listed always, but served to the model only when `SYNTHDATA_CMD` is set, so it is a no-op on a project that has not configured one — and the isolation checks (`statesIsolation` for the design, `isolatesTestData` for the spec) now recognise it: a stateful story that generates a unique datum per test with synthdata (a unique room number, a unique guest) satisfies the data-isolation rule. The skill guidance points the agent at it for the unique-datum strategy. The generator itself remains the project's own command behind `SYNTHDATA_CMD`.
