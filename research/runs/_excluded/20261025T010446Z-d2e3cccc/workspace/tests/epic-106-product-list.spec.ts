import { test, expect } from "@playwright/test";
import { ProductListPage } from "../pages/product-list.page";

test.describe("Product list", () => {

  // @story:111
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-1 Product list is sorted A to Z by name when it first opens", async ({ page }, testInfo) => {
    const productListPage = new ProductListPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await productListPage.goto();
    });

    await test.step("When I find the Username field and enter the test user", async () => {
      await productListPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter the test password", async () => {
      await productListPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      await productListPage.loginButton.click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      await expect(productListPage.page.getByText("Products").first()).toBeVisible();
    });

    await test.step("And the sort dropdown shows \"Name (A to Z)\"", async () => {
      await expect(page.locator(".product_sort_container").first()).toHaveValue("az");
    });

    await test.step("And the first product name comes before the last product name alphabetically", async () => {
      const names = await page.locator(".inventory_item_name").allTextContents();
      expect(names.length, "Expected more than one product to be listed").toBeGreaterThan(1);
      const sorted = [...names].sort((a, b) => a.localeCompare(b));
      expect(names[0]).toBe(sorted[0]);
      expect(names[names.length - 1]).toBe(sorted[sorted.length - 1]);
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

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await productListPage.goto();
    });

    await test.step("When I find the Username field and enter \"standard_user\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await productListPage.usernameInput.fill("standard_user");
    });

    await test.step("And I find the Password field and enter \"secret_sauce\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await productListPage.passwordInput.fill("secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      await productListPage.loginButton.click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      await expect(productListPage.page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I select \"Name (Z to A)\" from the sort dropdown", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.locator('.product_sort_container').selectOption('za');
    });

    await test.step("Then the sort dropdown shows \"Name (Z to A)\"", async () => {
      await expect(page.locator('.product_sort_container').first()).toHaveValue("za");
    });

    await test.step("And the first product name comes after the last product name alphabetically", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      const productNames = await page.locator('.inventory_item_name').allTextContents();
      const first = productNames[0];
      const last = productNames[productNames.length - 1];
      expect(first.localeCompare(last)).toBeGreaterThan(0);
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

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await productListPage.goto();
    });

    await test.step("When I find the Username field and enter \"standard_user\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await productListPage.usernameInput.fill("standard_user");
    });

    await test.step("And I find the Password field and enter \"secret_sauce\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await productListPage.passwordInput.fill("secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      await productListPage.loginButton.click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(productListPage.page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I select \"Price (low to high)\" from the sort dropdown", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.locator('.product_sort_container').selectOption('lohi');
    });

    await test.step("Then the sort dropdown shows \"Price (low to high)\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await expect(page.locator('.product_sort_container')).toHaveValue("lohi");
    });

    await test.step("And the first product price is less than or equal to the last product price", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      const prices = await page.locator('.inventory_item_price').allTextContents();
      const parse = (s: string) => parseFloat(s.replace(/[^0-9.]/g, ''));
      const first = parse(prices[0]);
      const last = parse(prices[prices.length - 1]);
      expect(first).toBeLessThanOrEqual(last);
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

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await productListPage.goto();
    });

    await test.step("When I find the Username field and enter \"standard_user\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await productListPage.usernameInput.fill("standard_user");
    });

    await test.step("And I find the Password field and enter \"secret_sauce\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await productListPage.passwordInput.fill("secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      await productListPage.loginButton.click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(productListPage.page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I select \"Price (high to low)\" from the sort dropdown", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.locator('.product_sort_container').selectOption('hilo');
    });

    await test.step("Then the sort dropdown shows \"Price (high to low)\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await expect(page.locator('.product_sort_container')).toHaveValue("hilo");
    });

    await test.step("And the first product price is greater than or equal to the last product price", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      const prices = await page.locator('.inventory_item_price').allTextContents();
      const parsed = prices.map(p => parseFloat(p.replace('$', '')));
      const first = parsed[0];
      const last = parsed[parsed.length - 1];
      expect(first).toBeGreaterThanOrEqual(last);
    });
  });

  // @story:111
  // @design:D5
  // @type:accessibility
  // @technique:checklist-based
  // @llm-generated
  test("AC-story Product list page passes accessibility checks", async ({ page }, testInfo) => {
    const productListPage = new ProductListPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await productListPage.goto();
    });

    await test.step("When I find the Username field and enter \"standard_user\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await productListPage.usernameInput.fill("standard_user");
    });

    await test.step("And I find the Password field and enter \"secret_sauce\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await productListPage.passwordInput.fill("secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      await productListPage.loginButton.click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(productListPage.page.getByText("Products").first()).toBeVisible();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: productListPage.page })
        .include("[data-test='inventory-container']")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
