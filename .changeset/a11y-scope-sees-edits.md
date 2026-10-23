---
"attestqa": patch
---

An accessibility bug is no longer refused for an unscoped scan after the scan has been scoped. The check reads each spec as the run last left it, and it used to miss changes made with `fs.replace_in_file`, so a scan scoped with `.include(...)` through an edit was still judged by the text from before the edit. Edits are now applied the way the tool applies them.
