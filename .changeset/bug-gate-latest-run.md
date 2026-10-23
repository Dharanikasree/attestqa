---
"attestqa": patch
---

A bug is no longer held back by a locator failure the run has already repaired. Before a bug may be filed, every test still failing on a locator that matched nothing must have had its page read with `aqa.heal_locator`; the check used to count such failures from every suite run in the session, so a selector fixed in the first run kept blocking a real defect found in the last one. It now looks at each test's latest result.
