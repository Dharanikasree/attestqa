---
"attestqa": patch
---

The runtime's view of a file "as this run left it" now includes in-place edits made with `fs.replace_in_file` after the last full read. Before, a bug proposed from an edited test could be dropped at the end of the run for describing the test as it now is (for example, a scoped accessibility scan) because the check compared it with the file from before the edit.
