# Seeded faults — draft for approval (22 Oct 2026)

Section 5 of EVALUATION_PLAN.md: about five faults per application, each a
change a real developer could make, each recorded with the story and criterion
that should catch it. The agent never sees them.

## How a fault is put in: a fault proxy

Two of the four applications cannot be rebuilt by us: SauceDemo is hosted, and
Juice Shop runs from a published image. So every fault, for all four, is put in
the same way: a small local proxy sits between Playwright and the application
and changes one thing in one response.

- The suite reaches the application only through `AQA_APP_URL` (since 22 Oct the
  tests navigate relatively), so a faulty run is the same suite with
  `AQA_APP_URL` pointing at the proxy. No test is edited.
- Each fault is one rule: which response (path and type), what text to find,
  what to put instead. The proxy refuses to start if a rule's text is found
  zero times or more than once, so a fault cannot silently miss or spread.
- One fault at a time. With no rule loaded the proxy passes everything through
  unchanged, and the suite must then pass: that is the control run.

Rewrites act on what the browser receives: the JavaScript bundle for screen
text, labels, buttons, navigation and client-side arithmetic; the JSON of an
API response for server-computed values. The exact text each rule matches is
taken from the live application in the setup week and recorded beside the
rule.

## The faults

Five per application, one of each kind in the plan: (V) a wrong or missing
validation message, (B) a button enabled or disabled wrongly, (R) a wrong
redirect, (C) a calculation off by a small amount, (A) an element whose
accessible name no longer matches what is shown.

### Toolshop (Jira, TOOL)

| Id | Kind | Change | Should be caught by |
| --- | --- | --- | --- |
| TS-1 | V | Contact form: an email without "@" is accepted with no message | Contact form, AC-3 |
| TS-2 | B | Product detail: the "−" quantity button stays enabled at 1 and takes the quantity to 0 | Product detail, AC-2 |
| TS-3 | R | Registering successfully goes to the home page instead of the sign-in page | Register, AC-1 |
| TS-4 | C | Cart: the cart total is one unit price short per line, while each line total stays right | Cart, AC-2 |
| TS-5 | A | Sign-in page: the email field keeps its visible label, but the label is unlinked and the placeholder empty, so it has no accessible name | Sign in and out, AC-4 (accessibility scan) |

Toolshop also publishes a "with bugs" edition. Its bugs were not chosen by us
and are not recorded against stories, so it is not used for this section.

### Restful-Booker Platform (Azure DevOps, attestqa-booker)

| Id | Kind | Change | Should be caught by |
| --- | --- | --- | --- |
| RB-1 | V | Contact form: a too-short phone number is refused, but the message no longer gives the allowed length | Contact form validation, AC-2 |
| RB-2 | B | Admin report: the next-month button does nothing | Report calendar, AC-3 |
| RB-3 | R | After Logout the browser goes to an admin page instead of the guest home page | Admin sign in and out, AC-3 (see note 4) |
| RB-4 | C | Booking calendar: the price for the stay counts one night fewer than chosen | Choose dates, AC-2 |
| RB-5 | A | Admin navigation: the Messages link stays visible but is hidden from assistive technology | Messages, AC-3 (accessibility scan) |

### SauceDemo (Azure DevOps, attestqa-saucedemo)

| Id | Kind | Change | Should be caught by |
| --- | --- | --- | --- |
| SD-1 | V | Checkout: an empty postal code is accepted and the overview is shown | Checkout details, AC-2 |
| SD-2 | B | Product list: after adding a product its button still says "Add to cart" | Add and remove from the list, AC-1 |
| SD-3 | R | Checkout: Cancel goes to the product list instead of the cart | Checkout details, AC-3 |
| SD-4 | C | Overview: the total is the item total plus tax plus $0.01 | Order totals, AC-3 |
| SD-5 | A | Sign-in page: the username field loses the text that names it (placeholder and accessible name) | Locked-out user, AC-3 (accessibility scan) |

### OWASP Juice Shop (Jira, SCRUM)

| Id | Kind | Change | Should be caught by |
| --- | --- | --- | --- |
| JS-1 | V | Sign in: a wrong password shows no message | Sign in, AC-2 |
| JS-2 | B | Register: the Register button is enabled while the two passwords differ | Register, AC-2 |
| JS-3 | R | Sign out: the browser goes to the login page instead of the storefront home page | Sign out, AC-2 |
| JS-4 | C | Basket: raising a product's quantity raises the line but the basket total by one unit less | Basket, AC-2 |
| JS-5 | A | Sign-in page: the icon-only button that shows the password loses its accessible name | Sign in (its accessibility design item) |

## What is counted

For each fault: the control run passes; the faulty run has at least one test of
the named story failing; and the failure is about the changed behaviour (read
from the failure message), not a locator or a timeout. A fault whose story's
tests all still pass is "missed", and the design item that should have caught
it is recorded. A fault caught only by an unrelated test counts as caught by
accident, separately.

Run with plain `npx playwright test` against the final suite of each
application after its stories are done (no agent, no model). 20 faults × 1
run, plus 4 control runs.

## Confirmed 22 Oct 2026

Every rule's exact text was taken from what each application serves (bundles
saved with `faultproxy.mjs --dump`) and matches exactly once; Booker's RB-1 is a
server message, checked by sending a contact message the application refuses.
Three changes from the first draft, found while confirming:

- JS-5 was "labels change language but the page's lang attribute does not". Juice
  Shop never updates `<html lang>` (it is fixed at "en"), so that is how the real
  build behaves: the language story's AC-3 should fail on the genuine build, a
  real accessibility defect. JS-5 now removes the accessible name of the sign-in
  page's show-password button.
- RB-5 was on the message rows, which open on a click on plain text and carry no
  accessible name to remove. It now hides the admin Messages link from assistive
  technology.
- TS-4 targets the cart component's total (the checkout module has two).

## Open points

1. Each rule's exact match text, taken from the live bundle or API in the setup
   week; a fault whose text cannot be found once and only once is replaced by
   another of the same kind for the same application.
2. Accessibility faults are caught only by the stories that carry an
   accessibility scan; each fault above names one that does.
3. The proxy is a small Node script in TestRunApplication/_faults/ with one JSON
   file of rules per application, committed with the evaluation, so every fault
   is reproducible.
4. Booker's story "Owner signs in to and out of the admin area", AC-3, says
   Logout "shows the sign-in form again"; the real application goes to the guest
   home page. The criterion is ours and wrong; correct it in Azure DevOps before
   the runs.
5. Story ids: filled in for all four (Toolshop TOOL-6..19, Juice Shop SCRUM-6/8/10
   and SCRUM-18..27, Booker 91-102, SauceDemo 109-120). Juice Shop was seeded on
   22 Oct; its order-tracking bug is SCRUM-28.
