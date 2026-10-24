---
"attestqa": patch
---

On a spec shared with other stories, a run may now correct the tests it wrote itself. The append-only rule protects the tests that were in the spec when the run began; it used to protect every test present at the moment of the write, including the run's own new ones, so replacing a guessed confirmation text with the text the page shows was refused as an existing test losing an assertion. When the run did not read the file before writing it, every test is still protected.
