# bdd2pw — Conversion Review

> **Source feature:** `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\features\epic-tool-5-shop-administration.feature`
> **Target URL:** http://localhost:4200/admin/login
> **Generated:** 2026-10-31T02:33:58.241Z

## Summary

0 errors · 4 warnings · 8 info

## Warnings

- [AC-2 Searching the admin product list by name shows only matching products] no rule matched: "And I search for "Pliers" in the admin product list" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 Bug TOOL-21 Admin product search does not narrow the list] no rule matched: "And I search for "Pliers" in the admin product list" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 A customer account that opens the admin product list address does not see the list] no rule matched: "Then the page does not display "Combination Pliers"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [Background] no rule matched: "And I sign in as administrator" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.

## Info

- Parsed feature "Shop administration" — 5 scenario(s) + Background
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\package.json` — package.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\playwright.config.ts` — playwright.config.ts already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\tsconfig.json` — tsconfig.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\.gitignore` — .gitignore already exists — left untouched.
- Discovered 20 element(s); picked 20 unique locator(s)
- POM decision for AdminProductPage: CREATE
- LLM fallback: 0 successful / 0 attempted, max 50. Cache hits counted as 0.
