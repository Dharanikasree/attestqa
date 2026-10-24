# bdd2pw — Conversion Review

> **Source feature:** `E:\EB1A_Research\Application\attestqa\TestRunApplication\saucedemo\features\epic-105-signing-in.feature`
> **Target URL:** https://www.saucedemo.com
> **Generated:** 2026-10-24T17:25:09.074Z

## Summary

0 errors · 4 warnings · 8 info

## Warnings

- [AC-2 — Wrong password shows credentials error and no product list] No POM field corresponds to a product list element; the product list locator cannot be determined from the SignInPage POM alone — hand-edit this step to reference the correct locator on the inventory/product page.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 — Empty username shows username required error] No POM field corresponds to a product list element; the product list locator cannot be determined from the SignInPage POM alone — hand-edit this step to reference the correct locator on the inventory/product page.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [Bug 121 — Problem user product images are distinct after sign-in] The step references 'problem user credential' but no POM field or quoted value provides the actual credential string. Please hard-code the problem_user username (e.g., "problem_user") and call signInPage.usernameInput.fill("problem_user") manually.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [Bug 121 — Problem user product images are distinct after sign-in] Cannot determine a locator or assertion for 'each product image is distinct' — no product image POM field exists and the step requires comparing multiple image src attributes for uniqueness, which needs a custom loop assertion.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.

## Info

- Parsed feature "Signing in" — 5 scenario(s)
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\saucedemo\package.json` — package.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\saucedemo\playwright.config.ts` — playwright.config.ts already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\saucedemo\tsconfig.json` — tsconfig.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\saucedemo\.gitignore` — .gitignore already exists — left untouched.
- Discovered 8 element(s); picked 8 unique locator(s)
- POM decision for SignInPage: CREATE (missing fields: login)
- LLM fallback: 3 successful / 3 attempted, max 50. Cache hits counted as 0.
