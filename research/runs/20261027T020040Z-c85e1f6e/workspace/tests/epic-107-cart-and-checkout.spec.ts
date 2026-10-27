import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/cart.page";

test.describe("Cart and checkout", () => {

  // @story:114
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-1 Cart lists added product with quantity, name and price", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter \"standard_user\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter \"secret_sauce\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(cartPage.page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.locator(".inventory_item button").first().click();
    });

    await test.step("Then the cart badge shows \"1\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await expect(page.locator(".shopping_cart_badge").first()).toHaveText("1");
    });

    await test.step("When I click the cart icon", async () => {
      await page.locator(".shopping_cart_link").first().click();
    });

    await test.step("Then the page displays \"Your Cart\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(cartPage.page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("And the cart item quantity shows \"1\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await expect(page.locator(".cart_quantity").first()).toHaveText("1");
    });

    await test.step("And the cart item name is visible", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await expect(page.locator(".inventory_item_name").first()).toBeVisible();
    });

    await test.step("And the cart item price is visible", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await expect(page.locator(".inventory_item_price").first()).toBeVisible();
    });
  });

  // @story:114
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-2 Removing a product from the cart takes it off the list and lowers the badge", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter \"standard_user\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter \"secret_sauce\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(cartPage.page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.locator(".inventory_item button").first().click();
    });

    await test.step("Then the cart badge shows \"1\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(page.locator(".shopping_cart_badge").first()).toHaveText("1");
    });

    await test.step("When I click the cart icon", async () => {
      await page.locator(".shopping_cart_link").first().click();
    });

    await test.step("Then the page displays \"Your Cart\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(cartPage.page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("And the cart item name is visible", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(page.locator(".inventory_item_name").first()).toBeVisible();
    });

    await test.step("When Click the \"Remove\" button", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await page.getByRole("button", { name: "Remove" }).first().click();
    });

    await test.step("Then the cart item list is empty", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await expect(page.locator(".cart_item")).toHaveCount(0);
    });

    await test.step("And the cart badge is not shown", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await expect(page.locator(".shopping_cart_badge")).not.toBeVisible();
    });
  });

  // @story:114
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-3 Continue shopping returns to the product list with cart unchanged", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter \"standard_user\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter \"secret_sauce\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(cartPage.page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.locator(".inventory_item button").first().click();
    });

    await test.step("Then the cart badge shows \"1\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(page.locator(".shopping_cart_badge").first()).toHaveText("1");
    });

    await test.step("When I click the cart icon", async () => {
      await page.locator(".shopping_cart_link").first().click();
    });

    await test.step("Then the page displays \"Your Cart\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(cartPage.page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("When Click the \"Continue Shopping\" button", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await page.getByRole("button", { name: "Continue Shopping" }).click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(cartPage.page.getByText("Products").first()).toBeVisible();
    });

    await test.step("And the cart badge shows \"1\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await expect(page.locator('.shopping_cart_badge').first()).toHaveText("1");
    });
  });

  // @story:114
  // @design:D4
  // @type:accessibility
  // @technique:checklist-based
  // @llm-generated
  test("AC-story Cart page passes axe accessibility checks", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter \"standard_user\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter \"secret_sauce\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(cartPage.page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.locator(".inventory_item button").first().click();
    });

    await test.step("When I click the cart icon", async () => {
      await page.locator(".shopping_cart_link").first().click();
    });

    await test.step("Then the page displays \"Your Cart\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(cartPage.page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: cartPage.page })
        .include(".cart_list")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });

  // @story:114
  // @ac:1
  // @design:D5
  // @type:security
  // @technique:equivalence-partitioning
  test("AC-1 Unauthenticated user navigating directly to the cart sees the sign-in page", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I navigate to the cart directly", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await page.goto("/cart.html");
    });

    await test.step("Then the page displays \"Swag Labs\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(cartPage.page.getByText("Swag Labs").first()).toBeVisible();
    });
  });

  // ---------------------------------------------------------------------------
  // Story 115 — Customer gives their details at checkout
  // ---------------------------------------------------------------------------

  // @story:115
  // @ac:1
  // @design:D6
  // @type:functional
  // @technique:state-transition
  test("AC-1 Continuing with all fields filled in goes to the order overview", async ({ page }) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await cartPage.goto();
    });

    await test.step("When I sign in as standard_user", async () => {
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
      await cartPage.loginButton.click();
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("And I add a product to the cart and go to checkout", async () => {
      await page.locator(".inventory_item button").first().click();
      await expect(page.locator(".shopping_cart_badge").first()).toHaveText("1");
      await page.locator(".shopping_cart_link").first().click();
      await expect(page.getByText("Your Cart").first()).toBeVisible();
      await page.getByTestId("checkout").click();
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
    });

    await test.step("When I fill in first name, last name and postal code and click Continue", async () => {
      await page.getByTestId("firstName").fill("Jane");
      await page.getByTestId("lastName").fill("Doe");
      await page.getByTestId("postalCode").fill("12345");
      await page.getByTestId("continue").click();
    });

    await test.step("Then the page displays the order overview", async () => {
      await expect(page.getByText("Checkout: Overview").first()).toBeVisible();
    });
  });

  // @story:115
  // @ac:2
  // @design:D7
  // @type:functional
  // @technique:boundary-value-analysis
  test("AC-2 Continuing with first name empty shows first name required error", async ({ page }) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the checkout information page with a product in cart", async () => {
      await cartPage.goto();
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
      await cartPage.loginButton.click();
      await expect(page.getByText("Products").first()).toBeVisible();
      await page.locator(".inventory_item button").first().click();
      await page.locator(".shopping_cart_link").first().click();
      await expect(page.getByText("Your Cart").first()).toBeVisible();
      await page.getByTestId("checkout").click();
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
    });

    await test.step("When I leave first name empty and fill last name and postal code, then click Continue", async () => {
      await page.getByTestId("firstName").fill("");
      await page.getByTestId("lastName").fill("Doe");
      await page.getByTestId("postalCode").fill("12345");
      await page.getByTestId("continue").click();
    });

    await test.step("Then the page shows an error saying first name is required", async () => {
      await expect(page.getByText("First Name is required").first()).toBeVisible();
    });
  });

  // @story:115
  // @ac:2
  // @design:D7
  // @type:functional
  // @technique:boundary-value-analysis
  test("AC-2 Continuing with last name empty shows last name required error", async ({ page }) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the checkout information page with a product in cart", async () => {
      await cartPage.goto();
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
      await cartPage.loginButton.click();
      await expect(page.getByText("Products").first()).toBeVisible();
      await page.locator(".inventory_item button").first().click();
      await page.locator(".shopping_cart_link").first().click();
      await expect(page.getByText("Your Cart").first()).toBeVisible();
      await page.getByTestId("checkout").click();
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
    });

    await test.step("When I fill first name and postal code but leave last name empty, then click Continue", async () => {
      await page.getByTestId("firstName").fill("Jane");
      await page.getByTestId("lastName").fill("");
      await page.getByTestId("postalCode").fill("12345");
      await page.getByTestId("continue").click();
    });

    await test.step("Then the page shows an error saying last name is required", async () => {
      await expect(page.getByText("Last Name is required").first()).toBeVisible();
    });
  });

  // @story:115
  // @ac:2
  // @design:D7
  // @type:functional
  // @technique:boundary-value-analysis
  test("AC-2 Continuing with postal code empty shows postal code required error", async ({ page }) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the checkout information page with a product in cart", async () => {
      await cartPage.goto();
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
      await cartPage.loginButton.click();
      await expect(page.getByText("Products").first()).toBeVisible();
      await page.locator(".inventory_item button").first().click();
      await page.locator(".shopping_cart_link").first().click();
      await expect(page.getByText("Your Cart").first()).toBeVisible();
      await page.getByTestId("checkout").click();
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
    });

    await test.step("When I fill first name and last name but leave postal code empty, then click Continue", async () => {
      await page.getByTestId("firstName").fill("Jane");
      await page.getByTestId("lastName").fill("Doe");
      await page.getByTestId("postalCode").fill("");
      await page.getByTestId("continue").click();
    });

    await test.step("Then the page shows an error saying postal code is required", async () => {
      await expect(page.getByText("Postal Code is required").first()).toBeVisible();
    });
  });

  // @story:115
  // @ac:3
  // @design:D8
  // @type:functional
  // @technique:state-transition
  test("AC-3 Cancel returns to the cart with the cart unchanged", async ({ page }) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the checkout information page with a product in cart", async () => {
      await cartPage.goto();
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
      await cartPage.loginButton.click();
      await expect(page.getByText("Products").first()).toBeVisible();
      await page.locator(".inventory_item button").first().click();
      await expect(page.locator(".shopping_cart_badge").first()).toHaveText("1");
      await page.locator(".shopping_cart_link").first().click();
      await expect(page.getByText("Your Cart").first()).toBeVisible();
      await expect(page.locator(".inventory_item_name").first()).toBeVisible();
    });

    await test.step("When I proceed to checkout information and click Cancel", async () => {
      await page.getByTestId("checkout").click();
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
      await page.getByTestId("cancel").click();
    });

    await test.step("Then I am back on the cart page with the item still there", async () => {
      await expect(page.getByText("Your Cart").first()).toBeVisible();
      await expect(page.locator(".inventory_item_name").first()).toBeVisible();
    });
  });

  // @story:115
  // @design:D9
  // @type:accessibility
  // @technique:checklist-based
  test("AC-story Checkout information page passes axe accessibility checks", async ({ page }) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the checkout information page", async () => {
      await cartPage.goto();
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
      await cartPage.loginButton.click();
      await expect(page.getByText("Products").first()).toBeVisible();
      await page.locator(".inventory_item button").first().click();
      await page.locator(".shopping_cart_link").first().click();
      await expect(page.getByText("Your Cart").first()).toBeVisible();
      await page.getByTestId("checkout").click();
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
    });

    await test.step("Then the checkout information form passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page })
        .include(".checkout_info_wrapper")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(
        axeResults.violations.map((v) => v.id).sort(),
        `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`
      ).toEqual([]);
    });
  });
});
