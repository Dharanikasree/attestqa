# bdd2pw — Conversion Review

> **Source feature:** `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\features\epic-tool-1-product-catalogue.feature`
> **Target URL:** http://localhost:4200
> **Generated:** 2026-10-30T12:02:13.832Z

## Summary

0 errors · 4 warnings · 8 info

## Warnings

- [AC-1 Home page lists products with name, price and image] No POM field maps to a generic product card name element; the step requires iterating over product card name elements (e.g., headings or links within each card) which cannot be deterministically resolved to a single POM field. Hand-edit to assert on the collection of product name elements.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Home page lists products with name, price and image] No POM field maps to a generic product card price element; the step requires iterating over product card price elements which cannot be deterministically resolved to a single POM field. Hand-edit to assert on the collection of product price elements.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Home page lists products with name, price and image] No POM field maps to a generic product card image element; the step requires iterating over product card image elements which cannot be deterministically resolved to a single POM field. Hand-edit to assert on the collection of product image elements.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-story Catalogue home page passes axe accessibility checks] bdd2pw has a built-in rule for axe accessibility check steps; no manual binding should be generated. The step 'the product list passes axe accessibility checks' was not matched by that rule — verify the step text matches the expected pattern (e.g. '<subject> passes axe accessibility checks') and re-run the scaffolder so the built-in axe rule can handle it correctly.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.

## Info

- Parsed feature "Product catalogue" — 4 scenario(s)
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\package.json` — package.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\playwright.config.ts` — playwright.config.ts already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\tsconfig.json` — tsconfig.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\.gitignore` — .gitignore already exists — left untouched.
- Discovered 127 element(s); picked 83 unique locator(s)
- POM decision for ProductCataloguePage: CREATE (missing fields: page2Button)
- LLM fallback: 1 successful / 1 attempted, max 50. Cache hits counted as 0.
