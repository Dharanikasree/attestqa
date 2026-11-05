---
"attestqa": patch
---

The per-call model output cap is now configurable (W29 part 2). A whole-file write larger than the cap arrives truncated — part 1 made the error honest and points the agent at `replace_in_file` — but a project that legitimately writes large files had no way to raise the limit, because the 8192 default was hard-coded in both model clients and never wired from config. `agent.budgets.max_output_tokens` now sets it, threaded through `buildModel` to the Anthropic and OpenAI-compatible clients. Unset keeps the model's 8192 default, so nothing changes unless a project opts in. Config, not contract — it affects cost, not the ledger shape.
