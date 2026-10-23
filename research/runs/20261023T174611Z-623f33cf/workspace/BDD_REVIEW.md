# bdd2pw — Conversion Review

> **Source feature:** `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\features\epic-scrum-15-finding-and-buying-products.feature`
> **Target URL:** http://localhost:3100
> **Generated:** 2026-10-23T17:49:41.517Z

## Summary

0 errors · 1 warning · 8 info

## Warnings

- [AC-1 Searching by partial name lists only matching products] Cannot deterministically assert filtered product results without a POM field or locator that represents the product list/cards; the step requires verifying that all displayed products match 'apple', which needs a custom assertion over multiple elements. Please hand-edit this step.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.

## Info

- Parsed feature "Finding and buying products" — 4 scenario(s)
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\package.json` — package.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\playwright.config.ts` — playwright.config.ts already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\tsconfig.json` — tsconfig.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\.gitignore` — .gitignore already exists — left untouched.
- Discovered 84 element(s); picked 41 unique locator(s)
- POM decision for ProductSearchPage: CREATE (missing fields: clickToSearch)
- LLM fallback: 2 successful / 2 attempted, max 50. Cache hits counted as 0.
