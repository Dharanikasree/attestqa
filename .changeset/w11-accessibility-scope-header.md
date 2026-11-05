---
"attestqa": patch
---

The accessibility scope rule no longer scopes the story's own control out of the scan when that control lives in the header. SCRUM-18's search box is in the top toolbar; the scan was scoped to `<main>`, which excludes the toolbar, so a real "label" violation on the search box passed and the run reported nothing. The scope guidance now tells the agent to scope to the story's control wherever it lives — a search box or menu in the header is part of the story — rather than narrowing to `<main>`, which would scope the story's own control out. And the verifier adds a review-only check: an accessibility scan scoped to a generic page region alone (main or body) when the story is about a control that usually lives in the header or toolbar (a search box, menu or cart) may have hidden a defect in the story's own control, and that goes to the reviewer (F-0093).
