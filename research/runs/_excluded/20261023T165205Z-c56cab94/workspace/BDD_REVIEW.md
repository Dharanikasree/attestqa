# bdd2pw — Conversion Review

> **Source feature:** `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\features\epic-scrum-15-finding-and-buying-products.feature`
> **Target URL:** http://localhost:3100
> **Generated:** 2026-10-23T16:56:32.007Z

## Summary

0 errors · 2 warnings · 8 info

## Warnings

- [AC-1 Searching for a partial name shows only matching products] No single POM field exposes product name text; customBody iterates all product info buttons and asserts each contains 'apple' — verify the button label actually carries the product name or adjust the locator to the real product title element.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1b Searching with a single character shows only matching products] No POM field represents individual product card elements or product name text; synthesised a generic mat-card/product locator loop — verify the correct selector against the DOM and adjust if needed.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.

## Info

- Parsed feature "Finding and buying products" — 5 scenario(s)
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\package.json` — package.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\playwright.config.ts` — playwright.config.ts already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\tsconfig.json` — tsconfig.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\.gitignore` — .gitignore already exists — left untouched.
- Discovered 84 element(s); picked 41 unique locator(s)
- POM decision for SearchPage: CREATE (missing fields: clickToSearch)
- LLM fallback: 2 successful / 2 attempted, max 50. Cache hits counted as 0.
