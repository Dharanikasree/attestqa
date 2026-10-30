import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/cart.page";

test.describe("Cart and checkout", () => {

  // @story:TOOL-12
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:state-transition
  test("AC-1 Adding a product shows a confirmation and updates the cart icon count", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I navigate to the home page", async () => {
      await page.goto("/");
    });

    await test.step("When I open the \"Combination Pliers\" product page", async () => {
      await page.waitForLoadState("networkidle");
      const productLink = page.getByRole("link", { name: "Combination Pliers ABCDE$14.15" });
      await expect(productLink).toBeVisible();
      await productLink.click();
      await expect(page.getByRole("heading", { name: "Combination Pliers" })).toBeVisible();
    });

    await test.step("And I click \"Add to cart\"", async () => {
      await page.getByRole("button", { name: "Add to cart" }).click();
    });

    await test.step("Then the page displays \"Product added to shopping cart.\"", async () => {
      await expect(page.getByText("Product added to shopping cart.").first()).toBeVisible();
    });

    await test.step("And the cart icon count is \"1\"", async () => {
      await expect(page.getByTestId("cart-quantity")).toHaveText("1");
    });
  });

  // @story:TOOL-12
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:state-transition
  test("AC-2 Changing a line quantity in the cart updates the line total and cart total", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I navigate to the home page", async () => {
      await page.goto("/");
    });

    await test.step("When I open the \"Combination Pliers\" product page", async () => {
      await page.goto("/product/01JCZWQMNS3S7MRHEBBHSQKPKK");
      await expect(page.getByRole("button", { name: "Add to cart" })).toBeVisible();
    });

    await test.step("And I click \"Add to cart\"", async () => {
      await page.getByRole("button", { name: "Add to cart" }).click();
      await expect(page.getByText("Product added to shopping cart.").first()).toBeVisible();
    });

    await test.step("And I navigate to the cart page", async () => {
      await page.goto("/cart");
    });

    await test.step("And I update the cart line quantity to \"2\"", async () => {
      // The cart line quantity input: set to 2
      const quantityInput = page.getByTestId("product-quantity").first();
      await expect(quantityInput).toBeVisible();
      // Record original line total before change
      await quantityInput.fill("2");
      await quantityInput.blur();
    });

    await test.step("Then the cart line total reflects quantity \"2\"", async () => {
      // Line total should reflect 2 × unit price ($14.15 × 2 = $28.30)
      await expect(page.getByTestId("line-price").first()).toContainText("28.30");
    });

    await test.step("And the cart total is updated", async () => {
      // Cart total should also reflect $28.30
      await expect(page.getByTestId("cart-total")).toContainText("28.30");
    });
  });

  // @story:TOOL-12
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:state-transition
  test("AC-3 Removing a line from the cart removes it and updates the cart total", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I navigate to the home page", async () => {
      await page.goto("/");
    });

    await test.step("When I open the \"Combination Pliers\" product page", async () => {
      await page.goto("/product/01JCZWQMNS3S7MRHEBBHSQKPKK");
      await expect(page.getByRole("button", { name: "Add to cart" })).toBeVisible();
    });

    await test.step("And I click \"Add to cart\"", async () => {
      await page.getByRole("button", { name: "Add to cart" }).click();
      await expect(page.getByText("Product added to shopping cart.").first()).toBeVisible();
    });

    await test.step("And I navigate to the cart page", async () => {
      await page.goto("/cart");
    });

    await test.step("And I remove the first cart line", async () => {
      // Click the delete/remove button for the first line
      await page.getByRole("button", { name: "Delete" }).first().click();
    });

    await test.step("Then the page displays \"Your cart is empty\"", async () => {
      await expect(page.getByText("Your cart is empty").first()).toBeVisible();
    });
  });

  // @story:TOOL-12
  // @design:D4
  // @type:accessibility
  // @technique:checklist-based
  test("AC-accessibility Cart page passes accessibility checks", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I navigate to the home page", async () => {
      await page.goto("/");
    });

    await test.step("When I open the \"Combination Pliers\" product page", async () => {
      await page.getByRole("link", { name: /Combination Pliers/ }).first().click();
      await expect(page.getByRole("heading", { name: "Combination Pliers" })).toBeVisible();
    });

    await test.step("And I click \"Add to cart\"", async () => {
      await page.getByRole("button", { name: "Add to cart" }).click();
      await expect(page.getByText("Product added to shopping cart.").first()).toBeVisible();
    });

    await test.step("And I navigate to the cart page", async () => {
      await page.goto("/cart");
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: cartPage.page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
