# bdd2pw — Conversion Review

> **Source feature:** `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\features\epic-scrum-17-customer-profile-and-orders.feature`
> **Target URL:** http://localhost:3100/#/privacy-security/change-password
> **Generated:** 2026-10-26T23:39:34.064Z

## Summary

0 errors · 27 warnings · 8 info

## Warnings

- [AC-1 Adding a new address saves it and confirmation names the city] No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Adding a new address saves it and confirmation names the city] No address form fields (country, name, mobile, zip, address, city, state) exist in the ChangePasswordPage POM; this step belongs to an address/delivery page, not the change-password page.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Adding a new address saves it and confirmation names the city] No 'Submit' button field exists in the ChangePasswordPage POM; the available confirm button is 'buttonToConfirmTheChangeButton' but it is unclear if that maps to a generic 'Submit' action in this context.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 The saved address is listed among the customer's addresses] No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 The saved address is listed among the customer's addresses] No address form fields (country, name, mobile, zip, address, city, state) exist in the ChangePasswordPage POM; this step belongs to an address/delivery page, not the change-password page.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 The saved address is listed among the customer's addresses] No 'Submit' button field exists in the ChangePasswordPage POM; the available confirm button is 'buttonToConfirmTheChangeButton' but it is unclear if that maps to a generic 'Submit' action in this context.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=Country]] No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=Country]] This step references a 'Country field' which does not exist on the ChangePasswordPage POM (which only has Current Password, New Password, and Repeat New Password fields). Cannot determine which fields constitute 'all other required fields' without a form context that includes a Country field. Please hand-edit this step binding.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=Name]] No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=Name]] The Change Password page POM has no 'Name' field — it only has currentPassword, newPassword, and repeatNewPassword fields. It is unclear which field should be left empty or what 'Name' refers to in this context; manual mapping is required.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=Mobile Number]] No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=Mobile Number]] The step references a 'Mobile Number' field, but no such field exists in the ChangePasswordPage POM. The POM only contains currentPassword, newPassword, and repeatNewPassword fields. Cannot determine which fields constitute 'all other required fields' without a Mobile Number input present on this page.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=ZIP Code]] No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=ZIP Code]] This step references a ZIP Code field and 'all other required fields', but the ChangePasswordPage POM contains no ZIP Code field or any address/registration form fields — only password-related inputs (currentPassword, newPassword, repeatNewPassword). Cannot map this step to any POM field without knowing which page/form is intended.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=Address]] No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=Address]] This step references an 'Address field' which does not exist on the ChangePasswordPage POM (which only has Current Password, New Password, and Repeat New Password fields). The step cannot be mapped without knowing which page/form contains the Address field and what 'all other required fields' are.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=City]] No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=City]] The Change Password page POM has no 'City' field or any address/city-related fields; this step cannot be mapped to any POM element and requires manual implementation.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=State]] No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=State]] The step references a 'State field' but no such field exists in the ChangePasswordPage POM (which only has currentPassword, newPassword, and repeatNewPassword fields). Cannot determine which fields to fill or leave empty without more context.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-story Accessibility of the Create Address form] No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 security A customer cannot access another customer's saved addresses] No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 security A customer cannot access another customer's saved addresses] Cannot determine a locator or assertion for 'addresses belonging to the current user' — no address list or user-scoped address field exists in the ChangePasswordPage POM. This step likely belongs to a different page (e.g. AddressPage) and will need a hand-written assertion against the appropriate locator.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Correct current password and matching new password changes password and shows confirmation] No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 Wrong current password is refused with a message] No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Mismatched new password and repeat disables the Change button] No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-story Accessibility of the Change Password form] No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.

## Info

- Parsed feature "Customer profile and orders" — 10 scenario(s) + Background
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\package.json` — package.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\playwright.config.ts` — playwright.config.ts already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\tsconfig.json` — tsconfig.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\.gitignore` — .gitignore already exists — left untouched.
- Discovered 45 element(s); picked 43 unique locator(s)
- POM decision for ChangePasswordPage: CREATE (missing fields: buttonToConfirmTheChangeButton)
- LLM fallback: 3 successful / 3 attempted, max 50. Cache hits counted as 0.
