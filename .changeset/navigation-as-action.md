---
"attestqa": patch
---

The end-of-run check that a state-transition test performs its action now counts a navigation (`page.goto`, reload, back, forward) as the action when the approved design names navigation and no click, fill or other hand action. A redirect test, "navigate to the product list while signed out, land on the sign-in page with a message", was refused as "performs no action" because only clicks and fills counted, and a green run blocked on it.
