---
"attestqa": patch
---

The append-only rule now recognises a run's own tests by their tags, not only by the order of reads. When bdd2pw scaffolds a story's tests before the run first reads the spec, the tests it just added looked like tests that were there at the start, and correcting a guessed label in one of them was refused as an existing test losing an assertion (four times in one run, which then blocked). A test tagged with the story being worked on and with a design item approved in this run is the run's own and may be corrected; tests from other stories, and tests of this story from earlier runs, stay protected as before.
