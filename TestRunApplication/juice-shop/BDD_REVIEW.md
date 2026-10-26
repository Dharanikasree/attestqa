# bdd2pw — Conversion Review

> **Source feature:** `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\features\epic-scrum-17-customer-profile-and-orders.feature`
> **Target URL:** http://localhost:3100/#/login
> **Generated:** 2026-10-26T22:53:19.999Z

## Summary

0 errors · 40 warnings · 8 info

## Warnings

- [AC-1 Adding a new address saves it and confirmation names the city] No credentials are specified in the step; placeholder values used for email and password — update to match a real registered customer account.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Adding a new address saves it and confirmation names the city] No address form fields (country, name, mobile, zip, address, city, state) exist in the POM for ChangePasswordPage; this step requires address form locators that are not present — add them to the POM before generating this binding.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Adding a new address saves it and confirmation names the city] No Submit button exists in the POM; synthesised a getByRole locator — verify this matches the correct element on the address form page.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 The saved address is listed among the customer's addresses] No credentials are specified in the step; placeholder values used for email and password — update to match a real registered customer account.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 The saved address is listed among the customer's addresses] No address form fields (country, name, mobile, zip, address, city, state) exist in the POM for ChangePasswordPage; this step requires address form locators that are not present — add them to the POM before generating this binding.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 The saved address is listed among the customer's addresses] No Submit button exists in the POM; synthesised a getByRole locator — verify this matches the correct element on the address form page.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=Country]] No credentials are specified in the step; placeholder values used for email and password — update to match a real registered customer account.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=Country]] The step references a 'Country' field and 'other required fields' that do not exist in the POM for ChangePasswordPage (which is a login page with only Email, Password, and Remember Me fields). Cannot determine which fields to fill or leave empty without a matching POM or DOM context.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=Name]] No credentials are specified in the step; placeholder values used for email and password — update to match a real registered customer account.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=Name]] The step references a 'Name field' and 'other required fields' that do not correspond to any POM fields on ChangePasswordPage (which only has Email, Password, and related login fields). Cannot determine which fields to fill or leave empty without additional POM context or a DOM snapshot.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=Mobile Number]] No credentials are specified in the step; placeholder values used for email and password — update to match a real registered customer account.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=Mobile Number]] The step references a 'Mobile Number' field and 'all other required fields', but no such fields exist in the POM — the POM only contains Email and Password inputs for a login page. Cannot determine which fields to fill or leave empty without a matching POM or DOM snapshot.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=ZIP Code]] No credentials are specified in the step; placeholder values used for email and password — update to match a real registered customer account.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=ZIP Code]] The step references a ZIP Code field and other required fields, but none of these fields exist in the current POM (which is scoped to a Login/ChangePassword page with no registration or address form fields). Cannot determine which locators to use without a matching POM or DOM snapshot.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=Address]] No credentials are specified in the step; placeholder values used for email and password — update to match a real registered customer account.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=Address]] The step references an 'Address field' and 'all other required fields' but no address-related POM fields exist on ChangePasswordPage (which is a login page). Cannot determine which fields to fill or leave empty without a matching POM or DOM snapshot.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=City]] No credentials are specified in the step; placeholder values used for email and password — update to match a real registered customer account.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=City]] No 'City' field or related POM fields exist in the ChangePasswordPage POM; this step references a registration/address form that is not represented here and cannot be deterministically mapped without the correct POM and DOM context.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=State]] No credentials are specified in the step; placeholder values used for email and password — update to match a real registered customer account.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Address cannot be submitted while any required field is empty [field=State]] No 'State' field or equivalent POM locator exists in the ChangePasswordPage POM, and the step does not specify which 'other required fields' to fill or with what values. Manual implementation required.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-story Accessibility of the Create Address form] No credentials are specified in the step; placeholder values used for email and password — update to match a real registered customer account.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 security A customer cannot access another customer's saved addresses] No credentials are specified in the step; placeholder values used for email and password — update to match a real registered customer account.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 security A customer cannot access another customer's saved addresses] Cannot determine a specific locator or assertion for 'addresses belonging to the current user' — no address-related POM fields exist on ChangePasswordPage and no quoted text is provided to match against. Hand-edit this step to add the appropriate locator and assertion.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Correct current password and matching new password changes the password and shows confirmation] No credentials are specified in the step; placeholder values used for email and password — update to match a real registered customer account.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Correct current password and matching new password changes the password and shows confirmation] No POM field for a 'Change' button exists on ChangePasswordPage; the available buttons are Login, dismiss cookie message, Open Sidenav, etc. A locator for the Change button cannot be resolved without a DOM snapshot or POM entry.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Correct current password and matching new password changes the password and shows confirmation] No POM field for a 'Change' button exists on ChangePasswordPage; the available buttons are Login, dismiss cookie message, Open Sidenav, etc. A locator for the Change button cannot be resolved without a DOM snapshot or POM entry.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 Wrong current password is refused with an error message] No credentials are specified in the step; placeholder values used for email and password — update to match a real registered customer account.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-2 Wrong current password is refused with an error message] No POM field for a 'Change' button exists on ChangePasswordPage; the available buttons are Login, dismiss cookie message, Open Sidenav, etc. A locator for the Change button cannot be resolved without a DOM snapshot or POM entry.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Mismatched new password and repeat disables the Change button] No credentials are specified in the step; placeholder values used for email and password — update to match a real registered customer account.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Mismatched new password and repeat disables the Change button] No POM field matches 'Field to repeat the new password' (a repeat/confirm password input on a change-password form). The POM only exposes login-page fields. Please add a confirmPassword or repeatPassword field to the POM and hand-edit this step.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-3 Mismatched new password and repeat disables the Change button] No POM field matches 'Button to confirm the change' and the matcher 'toBeDisabled' is not in the allowed matcher list; please add a POM field for the confirm-change button and assert expect(locator).toBeDisabled() manually.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Password length boundary — <label> [label=4-character password refused, password=abcd, state=disabled]] No credentials are specified in the step; placeholder values used for email and password — update to match a real registered customer account.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Password length boundary — <label> [label=4-character password refused, password=abcd, state=disabled]] No POM field matches 'Button to confirm the change' and the matcher 'toBeDisabled' is not in the allowed matcher list; please add a POM field for the confirm-change button and assert expect(locator).toBeDisabled() manually.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Password length boundary — <label> [label=5-character password accepted, password=abcde, state=enabled]] No credentials are specified in the step; placeholder values used for email and password — update to match a real registered customer account.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Password length boundary — <label> [label=5-character password accepted, password=abcde, state=enabled]] No POM field matches 'Field for the new password'; this field likely exists on a change-password page not captured in the current POM snapshot — add a 'newPassword' or similar field to the POM and re-run.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Password length boundary — <label> [label=5-character password accepted, password=abcde, state=enabled]] No POM field matches 'Field to repeat the new password'; this field likely exists on a change-password page not captured in the current POM snapshot — add a 'repeatNewPassword' or similar field to the POM and re-run.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Password length boundary — <label> [label=5-character password accepted, password=abcde, state=enabled]] No POM field matches 'Button to confirm the change' and 'enabled' (not disabled) is not a supported matcher in the current assertion set — add the button to the POM and use a not.toBeDisabled assertion, then re-run.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Password length boundary — <label> [label=40-character password accepted, password=abcdefghijklmnopqrstuvwxyzabcdefghijklmn, state=enabled]] No credentials are specified in the step; placeholder values used for email and password — update to match a real registered customer account.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-1 Password length boundary — <label> [label=40-character password accepted, password=abcdefghijklmnopqrstuvwxyzabcdefghijklmn, state=enabled]] No POM field matches 'Button to confirm the change' and 'enabled' (not disabled) is not a supported matcher in the current assertion set — add the button to the POM and use a not.toBeDisabled assertion, then re-run.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.
- [AC-story Accessibility of the Change Password form] No credentials are specified in the step; placeholder values used for email and password — update to match a real registered customer account.
  - Suggestion: Add a custom step rule, enable --llm fallback, or hand-edit the spec.

## Info

- Parsed feature "Customer profile and orders" — 10 scenario(s) + Background
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\package.json` — package.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\playwright.config.ts` — playwright.config.ts already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\tsconfig.json` — tsconfig.json already exists — left untouched.
- `E:\EB1A_Research\Application\attestqa\TestRunApplication\juice-shop\.gitignore` — .gitignore already exists — left untouched.
- Discovered 46 element(s); picked 45 unique locator(s)
- POM decision for ChangePasswordPage: CREATE
- LLM fallback: 7 successful / 7 attempted, max 50. Cache hits counted as 0.
