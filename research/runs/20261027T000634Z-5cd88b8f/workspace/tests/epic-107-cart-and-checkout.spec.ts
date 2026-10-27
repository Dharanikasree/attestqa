import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/cart.page";

test.describe("Cart and checkout", () => {

  // @story:114
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-1 Cart lists each added product with its quantity, name and price", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter the test user", async () => {
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter the test password", async () => {
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.getByRole("button", { name: "Add to cart" }).first().click();
    });

    await test.step("Then the cart badge shows \"1\"", async () => {
      await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
    });

    await test.step("When I navigate to the cart page", async () => {
      await page.getByTestId("shopping-cart-link").click();
    });

    await test.step("Then the cart item quantity is displayed", async () => {
      await expect(page.getByTestId("item-quantity").first()).toBeVisible();
    });

    await test.step("And the cart item name is displayed", async () => {
      await expect(page.getByTestId("inventory-item-name").first()).toBeVisible();
    });

    await test.step("And the cart item price is displayed", async () => {
      await expect(page.getByTestId("inventory-item-price").first()).toBeVisible();
    });
  });

  // @story:114
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-2a Removing a product from the cart takes it off the list", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter the test user", async () => {
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter the test password", async () => {
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And I click the Login button", async () => {
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.getByRole("button", { name: "Add to cart" }).first().click();
    });

    await test.step("Then the cart badge shows \"1\"", async () => {
      await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
    });

    await test.step("When I navigate to the cart page", async () => {
      await page.getByTestId("shopping-cart-link").click();
    });

    await test.step("Then the cart item name is displayed", async () => {
      await expect(page.getByTestId("inventory-item-name").first()).toBeVisible();
    });

    await test.step("When I click the Remove button", async () => {
      await page.getByTestId("remove-sauce-labs-backpack").click();
    });

    await test.step("Then the cart list is empty", async () => {
      await expect(page.getByTestId("cart-item")).toHaveCount(0);
    });
  });

  // @story:114
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-2b Removing a product from the cart lowers the cart badge", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter the test user", async () => {
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter the test password", async () => {
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And I click the Login button", async () => {
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.getByRole("button", { name: "Add to cart" }).first().click();
    });

    await test.step("Then the cart badge shows \"1\"", async () => {
      await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
    });

    await test.step("When I navigate to the cart page", async () => {
      await page.getByTestId("shopping-cart-link").click();
    });

    await test.step("When I click the Remove button", async () => {
      await page.getByTestId("remove-sauce-labs-backpack").click();
    });

    await test.step("Then the cart badge is not shown", async () => {
      await expect(page.getByTestId("shopping-cart-badge")).not.toBeVisible();
    });
  });

  // @story:114
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-3 Continue shopping returns to the product list with the cart unchanged", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter the test user", async () => {
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter the test password", async () => {
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And I click the Login button", async () => {
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.getByRole("button", { name: "Add to cart" }).first().click();
    });

    await test.step("Then the cart badge shows \"1\"", async () => {
      await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
    });

    await test.step("When I navigate to the cart page", async () => {
      await page.getByTestId("shopping-cart-link").click();
    });

    await test.step("When I click the Continue Shopping button", async () => {
      await page.getByTestId("continue-shopping").click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("And the cart badge shows \"1\"", async () => {
      await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
    });
  });

  // @story:114
  // @design:D4
  // @type:accessibility
  // @technique:checklist-based
  // @llm-generated
  test("AC-story Cart page passes accessibility checks", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter the test user", async () => {
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter the test password", async () => {
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And I click the Login button", async () => {
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.getByRole("button", { name: "Add to cart" }).first().click();
    });

    await test.step("When I navigate to the cart page", async () => {
      await page.getByTestId("shopping-cart-link").click();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: cartPage.page })
        .include("[data-test='cart-contents-container']")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
