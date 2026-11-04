---
"attestqa": patch
---

A whole-file write that was cut off at the model's output limit now gets an error that says so. A `write_file` whose content is larger than the inference's output cap (about 8192 tokens) arrives with the content missing, and the tool answered "content must be a string" — which did not explain why, so the agent wrote the same large file again and again, paying the full cap each time, until the no-progress guard stopped the run. A write with no content now reports that the call was cut off at the output limit and that repeating it will not help, and points to `fs.replace_in_file` to change only the part that differs — which is smaller than the whole file and does not hit the limit. A content value that is present but not a string is still a plain type error (W29).
