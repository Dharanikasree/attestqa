# bdd2pw — Conversion Review

> **Source feature:** `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\features\epic-tool-2-cart-and-checkout.feature`
> **Target URL:** http://localhost:4200
> **Generated:** 2026-10-30T17:48:45.622Z

## Summary

0 errors · 9 warnings · 8 info

## Warnings

- [AC-1 Adding a product shows a confirmation and updates the cart icon count] no rule matched: "And I click "Add to cart"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Adding a product shows a confirmation and updates the cart icon count] no rule matched: "And the cart icon count is "1"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 Changing a line quantity in the cart updates the line total and cart total] no rule matched: "And I click "Add to cart"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 Changing a line quantity in the cart updates the line total and cart total] no rule matched: "And I update the cart line quantity to "2"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 Changing a line quantity in the cart updates the line total and cart total] no rule matched: "Then the cart line total reflects quantity "2"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 Changing a line quantity in the cart updates the line total and cart total] no rule matched: "And the cart total is updated" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Removing a line from the cart removes it and updates the cart total] no rule matched: "And I click "Add to cart"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Removing a line from the cart removes it and updates the cart total] no rule matched: "And I remove the first cart line" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-accessibility Cart page passes accessibility checks] no rule matched: "And I click "Add to cart"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.

## Info

- Parsed feature "Cart and checkout" — 4 scenario(s)
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\package.json` — package.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\playwright.config.ts` — playwright.config.ts already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\tsconfig.json` — tsconfig.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\.gitignore` — .gitignore already exists — left untouched.
- Discovered 4 element(s); picked 4 unique locator(s)
- POM decision for CartPage: CREATE
- LLM fallback: 0 successful / 0 attempted, max 50. Cache hits counted as 0.
