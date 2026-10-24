# bdd2pw — Conversion Review

> **Source feature:** `E:\EB1A_Research\Application\attestqa\TestRunApplication\saucedemo\features\epic-105-signing-in.feature`
> **Target URL:** https://www.saucedemo.com/
> **Generated:** 2026-10-24T17:47:55.045Z

## Summary

0 errors · 1 warning · 8 info

## Warnings

- [Bug 121 Problem user product images are distinct after sign-in] This step requires iterating over all product images and asserting that every src attribute is unique — there is no POM field for product images and no single Playwright matcher covers set-uniqueness; hand-edit this step to add a custom loop assertion.
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
