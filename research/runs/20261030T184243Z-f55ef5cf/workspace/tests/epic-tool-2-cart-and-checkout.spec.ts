import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/cart.page";

test.describe("Cart and checkout", () => {

  // @story:TOOL-12
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:state-transition
  test("AC-1a Adding a product to the cart shows a confirmation", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I navigate to the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await page.goto("/");
    });

    await test.step("When I click \"Combination Pliers\"", async () => {
      await page.getByRole("link", { name: "Combination Pliers ABCDE$14.15" }).click();
    });

    await test.step("And I click \"Add to cart\"", async () => {
      await page.getByRole("button", { name: "Add to cart" }).click();
    });

    await test.step("Then the page displays \"Product added to shopping cart.\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(page.getByText("Product added to shopping cart.").first()).toBeVisible();
    });
  });

  // @story:TOOL-12
  // @ac:1
  // @design:D2
  // @type:functional
  // @technique:state-transition
  test("AC-1b Cart icon in the header shows the number of items after adding a product", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I navigate to the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await page.goto("/");
    });

    await test.step("When I click \"Combination Pliers\"", async () => {
      await page.getByRole("link", { name: /Combination Pliers/ }).first().click();
    });

    await test.step("And I click \"Add to cart\"", async () => {
      await page.getByRole("button", { name: "Add to cart" }).click();
    });

    await test.step("Then the cart icon shows item count \"1\"", async () => {
      await expect(page.getByTestId("cart-quantity")).toHaveText("1");
    });
  });

  // @story:TOOL-12
  // @ac:2
  // @design:D3
  // @type:functional
  // @technique:state-transition
  test("AC-2 Changing a line quantity in the cart updates the line total and cart total", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I navigate to the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await page.goto("/");
    });

    await test.step("When I click \"Combination Pliers\"", async () => {
      await page.getByRole("link", { name: /Combination Pliers/ }).first().click();
    });

    await test.step("And I click \"Add to cart\"", async () => {
      await page.getByRole("button", { name: "Add to cart" }).click();
    });

    await test.step("And I navigate to the cart page", async () => {
      await page.goto("/checkout");
    });

    await test.step("And I set the cart line quantity to \"2\"", async () => {
      const quantityInput = page.getByTestId("product-quantity");
      await quantityInput.fill("2");
      await quantityInput.press("Tab");
    });

    await test.step("Then the line total reflects quantity \"2\"", async () => {
      // Combination Pliers is $14.15, qty 2 = $28.30
      await expect(page.getByTestId("cart-product-price").first()).toHaveText("$28.30");
    });

    await test.step("And the cart total reflects the updated quantity", async () => {
      await expect(page.getByTestId("cart-total")).toBeVisible();
      await expect(page.getByTestId("cart-total")).toContainText("28.30");
    });
  });

  // @story:TOOL-12
  // @ac:3
  // @design:D4
  // @type:functional
  // @technique:state-transition
  test("AC-3 Removing a line takes it out of the cart and updates the cart total", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I navigate to the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await page.goto("/");
    });

    await test.step("When I click \"Combination Pliers\"", async () => {
      await page.getByRole("link", { name: /Combination Pliers/ }).first().click();
    });

    await test.step("And I click \"Add to cart\"", async () => {
      await page.getByRole("button", { name: "Add to cart" }).click();
    });

    await test.step("And I navigate to the cart page", async () => {
      await page.goto("/checkout");
    });

    await test.step("And I click the remove line button", async () => {
      await page.getByTestId("delete-product").first().click();
    });

    await test.step("Then the page displays \"Your cart is empty\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(page.getByText("Your cart is empty").first()).toBeVisible();
    });
  });

  // @story:TOOL-12
  // @design:D5
  // @type:accessibility
  // @technique:checklist-based
  test("AC-accessibility Cart page passes accessibility checks", async ({ page }, testInfo) => {
    const cartPage = new CartPage(page);

    await test.step("Given I navigate to the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await page.goto("/");
    });

    await test.step("When I click \"Combination Pliers\"", async () => {
      await page.getByRole("link", { name: /Combination Pliers/ }).first().click();
    });

    await test.step("And I click \"Add to cart\"", async () => {
      await page.getByRole("button", { name: "Add to cart" }).click();
    });

    await test.step("And I navigate to the cart page", async () => {
      await page.goto("/checkout");
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
