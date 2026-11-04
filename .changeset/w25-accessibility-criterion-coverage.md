---
"attestqa": patch
---

The design coverage rule no longer forces a functional test for a criterion whose natural type is accessibility or security. "Every criterion has a functional test" refused AB#110's AC-3 — "the sign-in page passes an automated WCAG 2.1 A/AA scan" — for having no functional item, so the agent added a functional item and implemented it as a second copy of the axe scan: the rule meant to guarantee coverage produced padding. A criterion is now satisfied by a functional, accessibility or security item covering it. The design records only the acceptance-criterion labels, not their text, so the criterion's natural type is read from the item the agent wrote for it, and the reviewer approving the design is the check that the type fits the criterion (F-0112).
