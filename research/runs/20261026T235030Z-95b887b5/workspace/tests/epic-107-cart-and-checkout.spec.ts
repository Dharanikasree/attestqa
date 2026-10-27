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

    await test.step("Given I am on the home page", async () => {
      await page.goto("/");
    });

    await test.step("When I log in with valid credentials", async () => {
      await page.getByRole("textbox", { name: "Username" }).fill(process.env["AQA_APP_USER"] ?? "");
      await page.getByRole("textbox", { name: "Password" }).fill(process.env["AQA_APP_PASS"] ?? "");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.locator(".inventory_list"), "Precondition: login must succeed and show product list").toBeVisible();
    });

    await test.step("And I add the first product to the cart", async () => {
      await page.getByTestId("inventory-container").getByRole("button", { name: /add to cart/i }).first().click();
    });

    await test.step("And I click the cart icon", async () => {
      await page.getByTestId("shopping-cart-link").click();
    });

    await test.step("Then the cart lists the product with quantity, name and price", async () => {
      await expect(page.getByTestId("cart-item"), "Cart must contain at least one item").toHaveCount(1);
      await expect(page.getByTestId("item-quantity").first(), "Cart item quantity must be visible").toBeVisible();
      await expect(page.locator(".inventory-item-name").first(), "Cart item name must be visible").toBeVisible();
      await expect(page.locator(".inventory-item-price").first(), "Cart item price must be visible").toBeVisible();
    });
  });

  // @story:114
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-2 Removing a product in the cart takes it off the list and lowers the cart badge", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the home page", async () => {
      await page.goto("/");
    });

    await test.step("When I log in with valid credentials", async () => {
      await page.getByRole("textbox", { name: "Username" }).fill(process.env["AQA_APP_USER"] ?? "");
      await page.getByRole("textbox", { name: "Password" }).fill(process.env["AQA_APP_PASS"] ?? "");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.locator(".inventory_list"), "Precondition: login must succeed and show product list").toBeVisible();
    });

    await test.step("And I add the first product to the cart", async () => {
      await page.getByTestId("inventory-container").getByRole("button", { name: /add to cart/i }).first().click();
      await expect(page.getByTestId("shopping-cart-badge"), "Precondition: cart badge must show 1 after adding product").toHaveText("1");
    });

    await test.step("And I click the cart icon", async () => {
      await page.getByTestId("shopping-cart-link").click();
      await expect(page.getByTestId("cart-item"), "Precondition: cart must show the added item").toHaveCount(1);
    });

    await test.step("And I click Remove", async () => {
      await page.getByRole("button", { name: /remove/i }).first().click();
    });

    await test.step("Then the cart list is empty", async () => {
      await expect(page.getByTestId("cart-item"), "Product row must disappear from the cart list after removal").toHaveCount(0);
    });

    await test.step("And the cart badge is not shown", async () => {
      await expect(page.getByTestId("shopping-cart-badge"), "Cart badge must not be visible after removing the only item").toHaveCount(0);
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

    await test.step("Given I am on the home page", async () => {
      await page.goto("/");
    });

    await test.step("When I log in with valid credentials", async () => {
      await page.getByRole("textbox", { name: "Username" }).fill(process.env["AQA_APP_USER"] ?? "");
      await page.getByRole("textbox", { name: "Password" }).fill(process.env["AQA_APP_PASS"] ?? "");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.locator(".inventory_list"), "Precondition: login must succeed and show product list").toBeVisible();
    });

    await test.step("And I add the first product to the cart", async () => {
      await page.getByTestId("inventory-container").getByRole("button", { name: /add to cart/i }).first().click();
      await expect(page.getByTestId("shopping-cart-badge"), "Precondition: cart badge must show 1 after adding product").toHaveText("1");
    });

    await test.step("And I click the cart icon", async () => {
      await page.getByTestId("shopping-cart-link").click();
      await expect(page.getByTestId("cart-item"), "Precondition: cart must show the added item").toHaveCount(1);
    });

    await test.step("And I click Continue Shopping", async () => {
      await page.getByTestId("continue-shopping").click();
    });

    await test.step("Then the product list is displayed", async () => {
      await expect(page.getByTestId("inventory-container"), "Product list must be shown after Continue Shopping").toBeVisible();
    });

    await test.step("And the cart badge still shows 1", async () => {
      await expect(page.getByTestId("shopping-cart-badge"), "Cart badge must still show 1 — cart is unchanged").toHaveText("1");
    });
  });

  // @story:114
  // @design:D4
  // @type:accessibility
  // @technique:checklist-based
  // @llm-generated
  test("D4 Cart page passes axe accessibility checks", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the home page", async () => {
      await page.goto("/");
    });

    await test.step("When I log in with valid credentials", async () => {
      await page.getByRole("textbox", { name: "Username" }).fill(process.env["AQA_APP_USER"] ?? "");
      await page.getByRole("textbox", { name: "Password" }).fill(process.env["AQA_APP_PASS"] ?? "");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.locator(".inventory_list"), "Precondition: login must succeed and show product list").toBeVisible();
    });

    await test.step("And I add the first product to the cart", async () => {
      await page.getByTestId("inventory-container").getByRole("button", { name: /add to cart/i }).first().click();
    });

    await test.step("And I click the cart icon", async () => {
      await page.getByTestId("shopping-cart-link").click();
      await expect(page.getByTestId("cart-item"), "Precondition: cart must show the added item before axe scan").toHaveCount(1);
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page })
        .include(".cart_contents_container")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
