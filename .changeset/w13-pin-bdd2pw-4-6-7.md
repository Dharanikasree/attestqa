---
"attestqa": patch
---

Pin `@vijaypjavvadi/bdd2pw` to `^4.6.7`, which fixes the navigate-drops-path bug (W13, F-0095). bdd2pw's rule-26 used to bind `Given I navigate to "<path>"` to the page object's no-argument `goto()`, which opened the base URL and discarded the captured path — so a search test ran on the home page and the bug it filed named the wrong page. 4.6.7 emits `page.goto("<captured path>")` instead; verified with `bdd2pw analyze`, where the navigate step now produces `await analyzedPage.page.goto("/#/search?q=Juice")`. Raising attestqa's floor to 4.6.7 guarantees the fix is present.
