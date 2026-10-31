# bdd2pw — Conversion Review

> **Source feature:** `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\features\epic-tool-4-contact.feature`
> **Target URL:** http://localhost:4200/contact
> **Generated:** 2026-10-31T00:21:38.286Z

## Summary

0 errors · 15 warnings · 8 info

## Warnings

- [AC-1 Submitting the form with all required fields shows a thank-you message] no rule matched: "When I find the First name field and enter "Jane"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Submitting the form with all required fields shows a thank-you message] no rule matched: "And I find the Last name field and enter "Doe"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Submitting the form with all required fields shows a thank-you message] no rule matched: "And I find the Email address field and enter "jane@example.com"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Submitting the form with all required fields shows a thank-you message] no rule matched: "And I find the Message field and enter "I would like to ask about my recent order and need some assistance."" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Submitting the form with all required fields shows a thank-you message] no rule matched: "And I click "Send"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Submitting the form with all required fields shows a thank-you message] no rule matched: "Then the Send button is no longer visible" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 Leaving a required field empty shows a validation message [field=First name, message=First name is required]] no rule matched: "And I click "Send"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 Leaving a required field empty shows a validation message [field=Last name, message=Last name is required]] no rule matched: "And I click "Send"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 Leaving a required field empty shows a validation message [field=Email address, message=Email is required]] no rule matched: "And I click "Send"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 Leaving a required field empty shows a validation message [field=Message, message=Message is required]] no rule matched: "And I click "Send"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 An email without an @ is refused with an email format message] no rule matched: "When I find the First name field and enter "Jane"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 An email without an @ is refused with an email format message] no rule matched: "And I find the Last name field and enter "Doe"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 An email without an @ is refused with an email format message] no rule matched: "And I find the Email address field and enter "janedoe.example.com"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 An email without an @ is refused with an email format message] no rule matched: "And I find the Message field and enter "I would like to ask about my recent order and need assistance."" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 An email without an @ is refused with an email format message] no rule matched: "And I click "Send"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.

## Info

- Parsed feature "Contact form" — 4 scenario(s)
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\package.json` — package.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\playwright.config.ts` — playwright.config.ts already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\tsconfig.json` — tsconfig.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\toolshop\.gitignore` — .gitignore already exists — left untouched.
- Discovered 20 element(s); picked 20 unique locator(s)
- POM decision for ContactPage: CREATE
- LLM fallback: 0 successful / 0 attempted, max 50. Cache hits counted as 0.
