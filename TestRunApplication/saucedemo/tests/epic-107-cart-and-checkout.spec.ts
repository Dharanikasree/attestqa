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
});
