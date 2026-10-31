import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/cart.page";

test.describe("Cart and checkout", () => {

  // @story:TOOL-12
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:state-transition
  test("AC-1 Adding a product to the cart shows a confirmation and updates the cart icon count", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 2 step(s) not bound — And I click \"Add to cart\" | And the cart icon count is shown in the header");
    const cartPage = new CartPage(page);

    await test.step("Given I navigate to the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await cartPage.goto();
    });

    await test.step("Then the page displays \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(cartPage.page.getByText("Combination Pliers").first()).toBeVisible();
    });

    await test.step("When I navigate to the product page for \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await cartPage.goto();
    });

    await test.step("[SKIPPED] And I click \"Add to cart\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Add to cart"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("Then the page displays \"Product added to shopping cart.\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(cartPage.page.getByText("Product added to shopping cart.").first()).toBeVisible();
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
    const cartPage = new CartPage(page);

    await test.step("Given I navigate to the product page for \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await cartPage.goto();
    });

    await test.step("[SKIPPED] And I click \"Add to cart\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Add to cart"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("And I navigate to the cart page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await cartPage.goto();
    });

    await test.step("Then the page displays \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(cartPage.page.getByText("Combination Pliers").first()).toBeVisible();
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
    const cartPage = new CartPage(page);

    await test.step("Given I navigate to the product page for \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await cartPage.goto();
    });

    await test.step("[SKIPPED] And I click \"Add to cart\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Add to cart"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("And I navigate to the cart page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await cartPage.goto();
    });

    await test.step("Then the page displays \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(cartPage.page.getByText("Combination Pliers").first()).toBeVisible();
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
    const cartPage = new CartPage(page);

    await test.step("Given I navigate to the product page for \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await cartPage.goto();
    });

    await test.step("[SKIPPED] And I click \"Add to cart\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Add to cart"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("And I navigate to the cart page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await cartPage.goto();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: cartPage.page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
