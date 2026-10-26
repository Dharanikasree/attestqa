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

  // @story:112
  // @ac:1
  // @design:D6
  // @type:functional
  // @technique:state-transition
  test("AC-1 Clicking a product name opens its detail page with matching name, description and price", async ({ page }) => {
    const productListPage = new ProductListPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await productListPage.goto();
    });

    await test.step("When I sign in as standard_user", async () => {
      await productListPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
      await productListPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
      await productListPage.loginButton.click();
    });

    let listName: string;
    let listDescription: string;
    let listPrice: string;

    await test.step("Then the product list is shown", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("And I record the first product's name, description and price from the list", async () => {
      listName = (await page.getByTestId("inventory-item-name").first().textContent()) ?? "";
      listDescription = (await page.getByTestId("inventory-item-desc").first().textContent()) ?? "";
      listPrice = (await page.getByTestId("inventory-item-price").first().textContent()) ?? "";
      expect(listName, "Precondition: first product name should not be empty").not.toBe("");
      expect(listPrice, "Precondition: first product price should not be empty").not.toBe("");
    });

    await test.step("When I click the first product name in the list", async () => {
      await page.getByTestId("inventory-item-name").first().click();
    });

    await test.step("Then the product detail page is shown", async () => {
      await expect(page.getByTestId("inventory-item-name")).toBeVisible();
    });

    await test.step("And the product name on the detail page matches the name from the list", async () => {
      await expect(page.getByTestId("inventory-item-name")).toHaveText(listName!);
    });

    await test.step("And the product description on the detail page matches the description from the list", async () => {
      await expect(page.getByTestId("inventory-item-desc")).toHaveText(listDescription!);
    });

    await test.step("And the product price on the detail page matches the price from the list", async () => {
      await expect(page.getByTestId("inventory-item-price")).toHaveText(listPrice!);
    });
  });

  // @story:112
  // @ac:2
  // @design:D7
  // @type:functional
  // @technique:state-transition
  test("AC-2 Adding a product from its detail page changes button to Remove and cart shows 1", async ({ page }) => {
    const productListPage = new ProductListPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await productListPage.goto();
    });

    await test.step("When I sign in as standard_user", async () => {
      await productListPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
      await productListPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
      await productListPage.loginButton.click();
    });

    await test.step("Then the product list is shown", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I click the first product name to open its detail page", async () => {
      await page.getByTestId("inventory-item-name").first().click();
    });

    await test.step("Then the product detail page is shown", async () => {
      await expect(page.getByTestId("add-to-cart")).toBeVisible();
    });

    await test.step("When I click 'Add to cart'", async () => {
      await page.getByTestId("add-to-cart").click();
    });

    await test.step("Then the button changes to Remove", async () => {
      await expect(page.getByTestId("remove")).toBeVisible();
    });

    await test.step("And the cart badge shows 1", async () => {
      await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
    });
  });

  // @story:112
  // @ac:3
  // @design:D8
  // @type:functional
  // @technique:state-transition
  test("AC-3 Back to products returns to the product list", async ({ page }) => {
    const productListPage = new ProductListPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await productListPage.goto();
    });

    await test.step("When I sign in as standard_user", async () => {
      await productListPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
      await productListPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
      await productListPage.loginButton.click();
    });

    await test.step("Then the product list is shown", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I click the first product name to open its detail page", async () => {
      await page.getByTestId("inventory-item-name").first().click();
    });

    await test.step("Then the product detail page is shown", async () => {
      await expect(page.getByTestId("back-to-products")).toBeVisible();
    });

    await test.step("When I click 'Back to products'", async () => {
      await page.getByTestId("back-to-products").click();
    });

    await test.step("Then the product list page is shown", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });
  });

  // @story:112
  // @design:D9
  // @type:accessibility
  // @technique:checklist-based
  test("AC-story Product detail page passes accessibility checks", async ({ page }) => {
    const productListPage = new ProductListPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await productListPage.goto();
    });

    await test.step("When I sign in as standard_user", async () => {
      await productListPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
      await productListPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
      await productListPage.loginButton.click();
    });

    await test.step("Then the product list is shown", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I click the first product name to open its detail page", async () => {
      await page.getByTestId("inventory-item-name").first().click();
    });

    await test.step("Then the product detail page is shown", async () => {
      await expect(page.getByTestId("inventory-item-name")).toBeVisible();
    });

    await test.step("Then the product detail page passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(
        axeResults.violations.map((v) => v.id).sort(),
        `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`
      ).toEqual([]);
    });
  });

  // @story:113
  // @ac:1
  // @design:D10
  // @type:functional
  // @technique:state-transition
  test("AC-1 Adding a product from the list changes its button to Remove and shows cart badge", async ({ page }) => {
    const productListPage = new ProductListPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await productListPage.goto();
    });

    await test.step("When I sign in as standard_user", async () => {
      await productListPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
      await productListPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
      await productListPage.loginButton.click();
    });

    await test.step("Then the product list is shown", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("And the first product's Add to cart button is present (precondition)", async () => {
      await expect(page.getByRole("button", { name: "Add to cart" }).first()).toBeVisible();
    });

    await test.step("When I click Add to cart for the first product", async () => {
      await page.getByRole("button", { name: "Add to cart" }).first().click();
    });

    await test.step("Then the first product button shows Remove", async () => {
      await expect(page.getByRole("button", { name: "Remove" }).first()).toBeVisible();
    });

    await test.step("And the cart badge shows 1", async () => {
      await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
    });
  });

  // @story:113
  // @ac:2
  // @design:D11
  // @type:functional
  // @technique:state-transition
  test("AC-2 Removing a product changes button back to Add to cart and lowers the badge; no badge when cart is empty", async ({ page }) => {
    const productListPage = new ProductListPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await productListPage.goto();
    });

    await test.step("When I sign in as standard_user", async () => {
      await productListPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
      await productListPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
      await productListPage.loginButton.click();
    });

    await test.step("Then the product list is shown", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("And the first product's Add to cart button is present (precondition)", async () => {
      await expect(page.getByRole("button", { name: "Add to cart" }).first()).toBeVisible();
    });

    await test.step("When I click Add to cart for the first product", async () => {
      await page.getByRole("button", { name: "Add to cart" }).first().click();
    });

    await test.step("Then the first product button shows Remove", async () => {
      await expect(page.getByRole("button", { name: "Remove" }).first()).toBeVisible();
    });

    await test.step("And the cart badge shows 1", async () => {
      await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
    });

    await test.step("When I click Remove for the first product", async () => {
      await page.getByRole("button", { name: "Remove" }).first().click();
    });

    await test.step("Then the first product button shows Add to cart again", async () => {
      await expect(page.getByRole("button", { name: "Add to cart" }).first()).toBeVisible();
    });

    await test.step("And the cart badge is not shown", async () => {
      await expect(page.getByTestId("shopping-cart-badge")).not.toBeVisible();
    });
  });

  // @story:113
  // @ac:3
  // @design:D12
  // @type:functional
  // @technique:state-transition
  test("AC-3 Products added stay in the cart after moving to another page and back", async ({ page }) => {
    const productListPage = new ProductListPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await productListPage.goto();
    });

    await test.step("When I sign in as standard_user", async () => {
      await productListPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
      await productListPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
      await productListPage.loginButton.click();
    });

    await test.step("Then the product list is shown", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("And the first product's Add to cart button is present (precondition)", async () => {
      await expect(page.getByRole("button", { name: "Add to cart" }).first()).toBeVisible();
    });

    await test.step("When I click Add to cart for the first product", async () => {
      await page.getByRole("button", { name: "Add to cart" }).first().click();
    });

    await test.step("Then the cart badge shows 1", async () => {
      await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
    });

    await test.step("When I click the first product name to navigate to its detail page", async () => {
      await page.getByTestId("inventory-item-name").first().click();
    });

    await test.step("Then the product detail page is shown", async () => {
      await expect(page.getByTestId("inventory-item-name")).toBeVisible();
    });

    await test.step("When I click Back to products", async () => {
      await page.getByTestId("back-to-products").click();
    });

    await test.step("Then the product list is shown again", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("And the cart badge still shows 1", async () => {
      await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
    });

    await test.step("And the first product button still shows Remove", async () => {
      await expect(page.getByRole("button", { name: "Remove" }).first()).toBeVisible();
    });
  });

  // @story:113
  // @design:D13
  // @type:accessibility
  // @technique:checklist-based
  test("AC-story Product list cart interactions pass accessibility checks", async ({ page }) => {
    const productListPage = new ProductListPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await productListPage.goto();
    });

    await test.step("When I sign in as standard_user", async () => {
      await productListPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
      await productListPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
      await productListPage.loginButton.click();
    });

    await test.step("Then the product list is shown", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("Then the product list passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page })
        .include("[data-test='inventory-container']")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(
        axeResults.violations.map((v) => v.id).sort(),
        `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`
      ).toEqual([]);
    });
  });
});
