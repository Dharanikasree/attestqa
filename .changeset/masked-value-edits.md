---
"attestqa": patch
---

`fs.replace_in_file` now accepts a mask token in `old` where the file holds the value the mask hides. The model sees e-mail addresses as `[EMAIL]` and copies that token into its edits, which then never matched the file, so a line containing an address could not be edited at all; a run proposed the same edit eleven times and blocked. A token in `old` now matches the address at that place (one place only, or the edit is refused as ambiguous), and the same token in `new` keeps it.
