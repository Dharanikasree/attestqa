---
"attestqa": patch
---

A design item may cite an issue key as its source — on its own, or with a type word before or after it. The source check accepted "task SCRUM-9" but refused "SCRUM-9" and "SCRUM-9 sub-task", so the agent dropped the true source (a sub-task, where the implementation facts live) to get past a rule that was right in aim but too strict in form. A tracker issue key is now accepted in any of those forms. The key is matched case-sensitively, so a lowercase word like "page-2" is not mistaken for one, and an item with no criterion, task, bug or comment behind it is still refused (F-0086).
