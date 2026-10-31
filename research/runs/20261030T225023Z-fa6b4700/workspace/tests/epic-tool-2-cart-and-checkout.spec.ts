import { test, expect } from "@playwright/test";
import { CheckoutPage } from "../pages/checkout.page";

test.describe("Cart and checkout", () => {

  // @story:TOOL-12
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:state-transition
  test("AC-1 Adding a product to the cart shows a confirmation and updates the cart icon count", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 2 step(s) not bound — And I click \"Add to cart\" | And the cart icon count is shown in the header");
    const checkoutPage = new CheckoutPage(page);

    await test.step("Given I navigate to the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("Then the page displays \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(checkoutPage.page.getByText("Combination Pliers").first()).toBeVisible();
    });

    await test.step("When I navigate to the product page for \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] And I click \"Add to cart\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Add to cart"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("Then the page displays \"Product added to shopping cart.\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(checkoutPage.page.getByText("Product added to shopping cart.").first()).toBeVisible();
    });

    await test.step("[SKIPPED] And the cart icon count is shown in the header", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And the cart icon count is shown in the header" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });
  });

  // @story:TOOL-12
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:state-transition
  test("AC-2 Changing a line quantity in the cart updates the line total and cart total", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 4 step(s) not bound — And I click \"Add to cart\" | When I set the cart line quantity to \"2\" | Then the cart line total reflects quantity \"2\" (+1 more)");
    const checkoutPage = new CheckoutPage(page);

    await test.step("Given I navigate to the product page for \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] And I click \"Add to cart\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Add to cart"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("And I navigate to the cart page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("Then the page displays \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(checkoutPage.page.getByText("Combination Pliers").first()).toBeVisible();
    });

    await test.step("[SKIPPED] When I set the cart line quantity to \"2\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "When I set the cart line quantity to "2"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] Then the cart line total reflects quantity \"2\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "Then the cart line total reflects quantity "2"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And the cart total reflects the updated quantity", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And the cart total reflects the updated quantity" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });
  });

  // @story:TOOL-12
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:state-transition
  test("AC-3 Removing a line from the cart removes it and updates the cart total", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 4 step(s) not bound — And I click \"Add to cart\" | When I click the remove line button | Then the page does not display \"Combination Pliers\" (+1 more)");
    const checkoutPage = new CheckoutPage(page);

    await test.step("Given I navigate to the product page for \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] And I click \"Add to cart\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Add to cart"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("And I navigate to the cart page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("Then the page displays \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(checkoutPage.page.getByText("Combination Pliers").first()).toBeVisible();
    });

    await test.step("[SKIPPED] When I click the remove line button", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "When I click the remove line button" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] Then the page does not display \"Combination Pliers\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "Then the page does not display "Combination Pliers"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And the cart total is shown", async () => {
      // @bdd2pw lane=todo
      // TODO: ambiguous visibility step: no POM field matched "the cart total". Add a locator field to the POM, or hand-edit the spec to point at the right element. (bdd2pw will not synthesise a URL regex from a prose noun — that produced always-failing tests in v3.0.0 and earlier.) (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });
  });

  // @story:TOOL-12
  // @design:D4
  // @type:accessibility
  // @technique:checklist-based
  test("AC-accessibility Cart page passes accessibility checks", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — And I click \"Add to cart\"");
    const checkoutPage = new CheckoutPage(page);

    await test.step("Given I navigate to the product page for \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] And I click \"Add to cart\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Add to cart"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("And I navigate to the cart page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: checkoutPage.page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });

  // @story:TOOL-16
  // @ac:1
  // @design:D5
  // @type:functional
  // @technique:state-transition
  test("AC-1 Signed-in customer proceeds through checkout to payment without re-authentication", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 6 step(s) not bound — When I find the \"Email address\" field and enter \"customer@email\" | And I find the \"Password\" field and enter \"customer-password\" | And I click \"Login\" (+3 more)");
    const checkoutPage = new CheckoutPage(page);

    await test.step("Given I navigate to \"/auth/login\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] When I find the \"Email address\" field and enter \"customer@email\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "When I find the "Email address" field and enter "customer@email"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I find the \"Password\" field and enter \"customer-password\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I find the "Password" field and enter "customer-password"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I click \"Login\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Login"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("Then the page displays \"Jane\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(checkoutPage.page.getByText("Jane").first()).toBeVisible();
    });

    await test.step("When I navigate to the product page for \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] And I click \"Add to cart\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Add to cart"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("And I navigate to the cart page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] And I click \"Proceed to checkout\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Proceed to checkout"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("Then the URL contains \"/checkout\"", async () => {
      // @bdd2pw lane=rule rule=rule-39
      await expect(checkoutPage.page).toHaveURL(new RegExp("/checkout"));
    });

    await test.step("[SKIPPED] And the page does not display \"Login\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And the page does not display "Login"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });
  });

  // @story:TOOL-16
  // @ac:2
  // @design:D6
  // @type:functional
  // @technique:state-transition
  test("AC-2 Billing address step is pre-filled from the customer profile", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 7 step(s) not bound — When I find the \"Email address\" field and enter \"customer@email\" | And I find the \"Password\" field and enter \"customer-password\" | And I click \"Login\" (+4 more)");
    const checkoutPage = new CheckoutPage(page);

    await test.step("Given I navigate to \"/auth/login\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] When I find the \"Email address\" field and enter \"customer@email\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "When I find the "Email address" field and enter "customer@email"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I find the \"Password\" field and enter \"customer-password\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I find the "Password" field and enter "customer-password"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I click \"Login\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Login"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("Then the page displays \"Jane\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(checkoutPage.page.getByText("Jane").first()).toBeVisible();
    });

    await test.step("When I navigate to the product page for \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] And I click \"Add to cart\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Add to cart"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("And I navigate to the cart page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] And I click \"Proceed to checkout\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Proceed to checkout"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I proceed to the billing address step", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I proceed to the billing address step" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] Then the billing address fields are filled", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "Then the billing address fields are filled" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });
  });

  // @story:TOOL-16
  // @ac:3
  // @design:D7
  // @type:functional
  // @technique:state-transition
  test("AC-3 Paying with cash on delivery confirms the payment and the order", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 8 step(s) not bound — When I find the \"Email address\" field and enter \"customer@email\" | And I find the \"Password\" field and enter \"customer-password\" | And I click \"Login\" (+5 more)");
    const checkoutPage = new CheckoutPage(page);

    await test.step("Given I navigate to \"/auth/login\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] When I find the \"Email address\" field and enter \"customer@email\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "When I find the "Email address" field and enter "customer@email"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I find the \"Password\" field and enter \"customer-password\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I find the "Password" field and enter "customer-password"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I click \"Login\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Login"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("Then the page displays \"Jane\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(checkoutPage.page.getByText("Jane").first()).toBeVisible();
    });

    await test.step("When I navigate to the product page for \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] And I click \"Add to cart\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Add to cart"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("And I navigate to the cart page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] And I click \"Proceed to checkout\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Proceed to checkout"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I proceed through checkout to the payment step", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I proceed through checkout to the payment step" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I select \"Cash on Delivery\" as the payment method", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I select "Cash on Delivery" as the payment method" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I click \"Confirm\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Confirm"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("Then the page displays \"Payment was successful\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(checkoutPage.page.getByText("Payment was successful").first()).toBeVisible();
    });

    await test.step("And the page displays \"Thanks for your order!\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(checkoutPage.page.getByText("Thanks for your order!").first()).toBeVisible();
    });
  });

  // @story:TOOL-16
  // @bug:TOOL-20
  // @design:D8
  // @type:confirmation
  // @technique:state-transition
  test("AC-2 (bug TOOL-20) Billing address fields are pre-filled from customer profile", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 7 step(s) not bound — When I find the \"Email address\" field and enter \"customer@email\" | And I find the \"Password\" field and enter \"customer-password\" | And I click \"Login\" (+4 more)");
    const checkoutPage = new CheckoutPage(page);

    await test.step("Given I navigate to \"/auth/login\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] When I find the \"Email address\" field and enter \"customer@email\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "When I find the "Email address" field and enter "customer@email"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I find the \"Password\" field and enter \"customer-password\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I find the "Password" field and enter "customer-password"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I click \"Login\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Login"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("Then the page displays \"Jane\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(checkoutPage.page.getByText("Jane").first()).toBeVisible();
    });

    await test.step("When I navigate to the product page for \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] And I click \"Add to cart\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Add to cart"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("And I navigate to the cart page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] And I click \"Proceed to checkout\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Proceed to checkout"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I proceed to the billing address step", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I proceed to the billing address step" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] Then the billing address fields are filled", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "Then the billing address fields are filled" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });
  });

  // @story:TOOL-16
  // @design:D9
  // @type:accessibility
  // @technique:checklist-based
  test("AC-accessibility Checkout page passes accessibility checks", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 5 step(s) not bound — When I find the \"Email address\" field and enter \"customer@email\" | And I find the \"Password\" field and enter \"customer-password\" | And I click \"Login\" (+2 more)");
    const checkoutPage = new CheckoutPage(page);

    await test.step("Given I navigate to \"/auth/login\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] When I find the \"Email address\" field and enter \"customer@email\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "When I find the "Email address" field and enter "customer@email"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I find the \"Password\" field and enter \"customer-password\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I find the "Password" field and enter "customer-password"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I click \"Login\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Login"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("Then the page displays \"Jane\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(checkoutPage.page.getByText("Jane").first()).toBeVisible();
    });

    await test.step("When I navigate to the product page for \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] And I click \"Add to cart\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Add to cart"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("And I navigate to the cart page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await checkoutPage.goto();
    });

    await test.step("[SKIPPED] And I click \"Proceed to checkout\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Proceed to checkout"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: checkoutPage.page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
