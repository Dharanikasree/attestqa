---
"attestqa": patch
---

`replace_in_file` now matches `old` whether the file uses CRLF or LF line endings. When `git checkout` restored a test project with CRLF (as it does on Windows) and the agent, reading a normalised view, wrote its edit with LF, every edit failed with "old does not appear" and a hint to copy the text exactly — advice the model could not act on, because its view showed CRLF, its output was LF, and the error named neither. One story lost two runs to it (10 then 28 failed edits). `old` is now matched with each line break tolerant of CRLF or LF, and `new` is written back in the file's own ending so no other line changes. A genuine content mismatch still refuses, and now says line endings are not the cause (F-0137).
