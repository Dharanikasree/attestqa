# bdd2pw — Conversion Review

> **Source feature:** `E:\EB1A_Research\Application\attestqa\TestRunApplication\saucedemo\features\epic-106-product-list.feature`
> **Target URL:** https://www.saucedemo.com/inventory.html
> **Generated:** 2026-10-25T18:01:39.008Z

## Summary

0 errors · 8 warnings · 8 info

## Warnings

- [AC-1 Product list is sorted A to Z by name when it first opens] No product name locators exist in the POM (ProductListPage has no inventory item / product name fields). This step requires reading and comparing product name text from the DOM — hand-edit to add a product name locator (e.g., page.locator('.inventory_item_name')) and implement the alphabetical comparison logic manually.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 Sorting by name Z to A reverses the order] no rule matched: "When I click "Name (Z to A)"" (LLM fallback also failed: Could not parse binding for step 0 ("I click "Name (Z to A)""); slot was: {"step":{"keyword":"When","text":"I click \"Name (Z to A)\""},"pomCall":{"page":"page","method":"getByText","args":["\"Name (Z to A)\""]},"warning":"No POM field matches a sort dropdown or 'Name (Z to)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 Sorting by name Z to A reverses the order] This step requires reading and comparing product name text from a list of items; no POM field maps to a product name list or first product element, and the assertion logic (alphabetical ordering) cannot be expressed as a single Playwright matcher — hand-edit this step to implement the custom comparison.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3a Sorting by price low to high lists the cheapest product first] no rule matched: "When I click "Price (low to high)"" (LLM fallback also failed: Could not parse binding for step 0 ("I click "Price (low to high)""); slot was: {"step":{"keyword":"When","text":"I click \"Price (low to high)\""},"pomCall":{"page":"page","method":"locator","args":["\"select.product_sort_container\""]},"customBody":"await page.locator('select.p)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3a Sorting by price low to high lists the cheapest product first] No POM field maps to individual product prices or their ordering; a custom assertion comparing price elements is needed and cannot be deterministically generated without DOM price locators.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3b Sorting by price high to low lists the most expensive product first] no rule matched: "When I click "Price (high to low)"" (LLM fallback also failed: Could not parse binding for step 0 ("I click "Price (high to low)""); slot was: {"step":{"keyword":"When","text":"I click \"Price (high to low)\""},"pomCall":{"page":"page","method":"locator","args":["\"select.product_sort_container\""]},"customBody":"await page.locator('select.p)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3b Sorting by price high to low lists the most expensive product first] Cannot deterministically verify that the first product has the highest price without a list of product price locators in the POM; no price-related field exists in the provided POM fields.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-story Product list page passes accessibility checks] Axe accessibility check steps are handled by a built-in bdd2pw rule; no manual binding was generated. Please verify that the bdd2pw rule 'passes axe accessibility checks' is active and that @axe-core/playwright is installed — do not hand-edit this step to call axe APIs directly.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.

## Info

- Parsed feature "Product list" — 5 scenario(s)
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\saucedemo\package.json` — package.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\saucedemo\playwright.config.ts` — playwright.config.ts already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\saucedemo\tsconfig.json` — tsconfig.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\saucedemo\.gitignore` — .gitignore already exists — left untouched.
- Discovered 13 element(s); picked 11 unique locator(s)
- POM decision for ProductListPage: CREATE
- LLM fallback: 5 successful / 5 attempted, max 50. Cache hits counted as 0.
