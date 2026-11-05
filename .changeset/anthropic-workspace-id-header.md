---
"attestqa": minor
---

Support an organization-scoped Anthropic API key. Such a key is rejected by the API ("this request must include the anthropic-workspace-id header") unless the request names a workspace, and attestqa's Anthropic client did not send one — so a run with an org-scoped key failed at the first model call. Set `ANTHROPIC_WORKSPACE_ID` in the environment (the id from the Anthropic Console → your workspace → settings) and the client now sends it as the `anthropic-workspace-id` header. A workspace-scoped key sets nothing and the header is omitted, so nothing changes for keys that already worked.
