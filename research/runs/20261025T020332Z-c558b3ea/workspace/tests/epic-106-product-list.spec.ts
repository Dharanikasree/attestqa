import { test, expect } from "@playwright/test";
import { ProductListPage } from "../pages/product-list.page";

test.describe("Product list", () => {

  // Helper: sign in and navigate to inventory
  async function signInAndGoto(page: import("@playwright/test").Page) {
    await page.goto("/");
    await page.getByRole("textbox", { name: "Username" }).fill(process.env["AQA_APP_USER"] ?? "standard_user");
    await page.getByRole("textbox", { name: "Password" }).fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Products").first()).toBeVisible();
  }

  // @story:111
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-1 Product list is sorted A to Z by name when it first opens", async ({ page }, testInfo) => {
    const productListPage = new ProductListPage(page);

    await test.step("Given I am on the product list page", async () => {
      await signInAndGoto(page);
    });

    await test.step("Then the page displays \"Name (A to Z)\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(productListPage.page.getByText("Name (A to Z)").first()).toBeVisible();
    });

    await test.step("And the first product name is alphabetically first", async () => {
      const nameLocators = page.locator(".inventory_item_name");
      await expect(nameLocators.first()).toBeVisible();
      const names: string[] = [];
      const count = await nameLocators.count();
      for (let i = 0; i < count; i++) {
        const name = await nameLocators.nth(i).textContent();
        names.push(name ?? "");
      }
      const sorted = [...names].sort((a, b) => a.localeCompare(b));
      expect(names[0], `Expected first product "${names[0]}" to be alphabetically first of [${names.join(", ")}]`).toBe(sorted[0]);
    });
  });

  // @story:111
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-2 Sorting by name Z to A reverses the order", async ({ page }, testInfo) => {
    const productListPage = new ProductListPage(page);

    await test.step("Given I am on the product list page", async () => {
      await signInAndGoto(page);
    });

    await test.step("When I click \"Name (Z to A)\"", async () => {
      const sortDropdown = page.locator("select.product_sort_container");
      await expect(sortDropdown).toBeVisible();
      await sortDropdown.selectOption("za");
    });

    await test.step("Then the page displays \"Name (Z to A)\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(productListPage.page.getByText("Name (Z to A)").first()).toBeVisible();
    });

    await test.step("And the first product name is alphabetically last", async () => {
      const nameLocators = page.locator(".inventory_item_name");
      await expect(nameLocators.first()).toBeVisible();
      const names: string[] = [];
      const count = await nameLocators.count();
      for (let i = 0; i < count; i++) {
        const name = await nameLocators.nth(i).textContent();
        names.push(name ?? "");
      }
      const sorted = [...names].sort((a, b) => b.localeCompare(a));
      expect(names[0], `Expected first product "${names[0]}" to be alphabetically last of [${names.join(", ")}]`).toBe(sorted[0]);
    });
  });

  // @story:111
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-3a Sorting by price low to high lists the cheapest product first", async ({ page }, testInfo) => {
    const productListPage = new ProductListPage(page);

    await test.step("Given I am on the product list page", async () => {
      await signInAndGoto(page);
    });

    await test.step("When I click \"Price (low to high)\"", async () => {
      const sortDropdown = page.locator("select.product_sort_container");
      await expect(sortDropdown).toBeVisible();
      await sortDropdown.selectOption("lohi");
    });

    await test.step("Then the page displays \"Price (low to high)\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(productListPage.page.getByText("Price (low to high)").first()).toBeVisible();
    });

    await test.step("And the first product has the lowest price", async () => {
      const priceLocators = page.locator(".inventory_item_price");
      await expect(priceLocators.first()).toBeVisible();
      const prices: number[] = [];
      const count = await priceLocators.count();
      for (let i = 0; i < count; i++) {
        const text = await priceLocators.nth(i).textContent();
        prices.push(parseFloat((text ?? "0").replace("$", "")));
      }
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices[0], `Expected first product price $${prices[0]} to be the lowest of [${prices.map(p => "$" + p).join(", ")}]`).toBe(sorted[0]);
    });
  });

  // @story:111
  // @ac:3
  // @design:D4
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-3b Sorting by price high to low lists the most expensive product first", async ({ page }, testInfo) => {
    const productListPage = new ProductListPage(page);

    await test.step("Given I am on the product list page", async () => {
      await signInAndGoto(page);
    });

    await test.step("When I click \"Price (high to low)\"", async () => {
      const sortDropdown = page.locator("select.product_sort_container");
      await expect(sortDropdown).toBeVisible();
      await sortDropdown.selectOption("hilo");
    });

    await test.step("Then the page displays \"Price (high to low)\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(productListPage.page.getByText("Price (high to low)").first()).toBeVisible();
    });

    await test.step("And the first product has the highest price", async () => {
      const priceLocators = page.locator(".inventory_item_price");
      await expect(priceLocators.first()).toBeVisible();
      const prices: number[] = [];
      const count = await priceLocators.count();
      for (let i = 0; i < count; i++) {
        const text = await priceLocators.nth(i).textContent();
        prices.push(parseFloat((text ?? "0").replace("$", "")));
      }
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices[0], `Expected first product price $${prices[0]} to be the highest of [${prices.map(p => "$" + p).join(", ")}]`).toBe(sorted[0]);
    });
  });

  // @story:111
  // @design:D5
  // @type:accessibility
  // @technique:checklist-based
  // @llm-generated
  test("AC-story Product list page passes accessibility checks", async ({ page }, testInfo) => {
    const productListPage = new ProductListPage(page);

    await test.step("Given I am on the product list page", async () => {
      await signInAndGoto(page);
    });

    await test.step("Then the product list passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: productListPage.page })
        .include(".inventory_list")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
