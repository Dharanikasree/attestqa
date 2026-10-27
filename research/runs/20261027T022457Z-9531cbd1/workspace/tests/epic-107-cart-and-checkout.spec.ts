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

  // @story:115
  // @ac:1
  // @design:D7
  // @type:functional
  // @technique:state-transition
  test("AC-1 Continuing with all fields filled in goes to the order overview", async ({ page }) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter credentials", async () => {
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter credentials", async () => {
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And I click Login", async () => {
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays Products (login succeeded)", async () => {
      await expect(page.getByText("Products").first()).toBeVisible({ timeout: 10000 });
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.locator(".inventory_item button").first().click();
    });

    await test.step("And I click the cart icon", async () => {
      await page.locator(".shopping_cart_link").first().click();
    });

    await test.step("Then the page displays Your Cart", async () => {
      await expect(page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("When I click Checkout", async () => {
      await page.getByTestId("checkout").click();
    });

    await test.step("Then the page displays Checkout: Your Information", async () => {
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
    });

    await test.step("When I fill in the First Name field", async () => {
      await page.getByTestId("firstName").fill("Jane");
    });

    await test.step("And I fill in the Last Name field", async () => {
      await page.getByTestId("lastName").fill("Doe");
    });

    await test.step("And I fill in the Postal Code field", async () => {
      await page.getByTestId("postalCode").fill("12345");
    });

    await test.step("And I click Continue", async () => {
      await page.getByTestId("continue").click();
    });

    await test.step("Then the page displays Checkout: Overview", async () => {
      await expect(page.getByText("Checkout: Overview").first()).toBeVisible();
    });
  });

  // @story:115
  // @ac:2
  // @design:D8
  // @type:functional
  // @technique:boundary-value-analysis
  test("AC-2a Empty first name shows an error saying the first name is required", async ({ page }) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter credentials", async () => {
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter credentials", async () => {
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And I click Login", async () => {
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays Products (login succeeded)", async () => {
      await expect(page.getByText("Products").first()).toBeVisible({ timeout: 10000 });
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.locator(".inventory_item button").first().click();
    });

    await test.step("And I click the cart icon", async () => {
      await page.locator(".shopping_cart_link").first().click();
    });

    await test.step("Then the page displays Your Cart", async () => {
      await expect(page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("When I click Checkout", async () => {
      await page.getByTestId("checkout").click();
    });

    await test.step("Then the page displays Checkout: Your Information", async () => {
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
    });

    await test.step("When I leave the First Name field empty, fill Last Name and Postal Code, and click Continue", async () => {
      // First Name left empty
      await page.getByTestId("lastName").fill("Doe");
      await page.getByTestId("postalCode").fill("12345");
      await page.getByTestId("continue").click();
    });

    await test.step("Then the page displays 'First Name is required'", async () => {
      await expect(page.getByTestId("error")).toBeVisible();
      await expect(page.getByTestId("error")).toContainText("First Name is required");
    });
  });

  // @story:115
  // @ac:2
  // @design:D9
  // @type:functional
  // @technique:boundary-value-analysis
  test("AC-2b Empty last name shows an error saying the last name is required", async ({ page }) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter credentials", async () => {
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter credentials", async () => {
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And I click Login", async () => {
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays Products (login succeeded)", async () => {
      await expect(page.getByText("Products").first()).toBeVisible({ timeout: 10000 });
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.locator(".inventory_item button").first().click();
    });

    await test.step("And I click the cart icon", async () => {
      await page.locator(".shopping_cart_link").first().click();
    });

    await test.step("Then the page displays Your Cart", async () => {
      await expect(page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("When I click Checkout", async () => {
      await page.getByTestId("checkout").click();
    });

    await test.step("Then the page displays Checkout: Your Information", async () => {
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
    });

    await test.step("When I fill First Name, leave Last Name empty, fill Postal Code, and click Continue", async () => {
      await page.getByTestId("firstName").fill("Jane");
      // Last Name left empty
      await page.getByTestId("postalCode").fill("12345");
      await page.getByTestId("continue").click();
    });

    await test.step("Then the page displays 'Last Name is required'", async () => {
      await expect(page.getByTestId("error")).toBeVisible();
      await expect(page.getByTestId("error")).toContainText("Last Name is required");
    });
  });

  // @story:115
  // @ac:2
  // @design:D10
  // @type:functional
  // @technique:boundary-value-analysis
  test("AC-2c Empty postal code shows an error saying the postal code is required", async ({ page }) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter credentials", async () => {
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter credentials", async () => {
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And I click Login", async () => {
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays Products (login succeeded)", async () => {
      await expect(page.getByText("Products").first()).toBeVisible({ timeout: 10000 });
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.locator(".inventory_item button").first().click();
    });

    await test.step("And I click the cart icon", async () => {
      await page.locator(".shopping_cart_link").first().click();
    });

    await test.step("Then the page displays Your Cart", async () => {
      await expect(page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("When I click Checkout", async () => {
      await page.getByTestId("checkout").click();
    });

    await test.step("Then the page displays Checkout: Your Information", async () => {
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
    });

    await test.step("When I fill First Name and Last Name, leave Postal Code empty, and click Continue", async () => {
      await page.getByTestId("firstName").fill("Jane");
      await page.getByTestId("lastName").fill("Doe");
      // Postal Code left empty
      await page.getByTestId("continue").click();
    });

    await test.step("Then the page displays 'Postal Code is required'", async () => {
      await expect(page.getByTestId("error")).toBeVisible();
      await expect(page.getByTestId("error")).toContainText("Postal Code is required");
    });
  });

  // @story:115
  // @ac:3
  // @design:D11
  // @type:functional
  // @technique:state-transition
  test("AC-3 Cancel returns to the cart with the cart unchanged", async ({ page }) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter credentials", async () => {
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter credentials", async () => {
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And I click Login", async () => {
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays Products (login succeeded)", async () => {
      await expect(page.getByText("Products").first()).toBeVisible({ timeout: 10000 });
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.locator(".inventory_item button").first().click();
    });

    await test.step("And I click the cart icon", async () => {
      await page.locator(".shopping_cart_link").first().click();
    });

    await test.step("Then the page displays Your Cart", async () => {
      await expect(page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("And the cart badge shows 1", async () => {
      await expect(page.locator(".shopping_cart_badge").first()).toHaveText("1");
    });

    await test.step("When I click Checkout", async () => {
      await page.getByTestId("checkout").click();
    });

    await test.step("Then the page displays Checkout: Your Information", async () => {
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
    });

    await test.step("When I click Cancel", async () => {
      await page.getByTestId("cancel").click();
    });

    await test.step("Then the page displays Your Cart", async () => {
      await expect(page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("And the cart badge still shows 1", async () => {
      await expect(page.locator(".shopping_cart_badge").first()).toHaveText("1");
    });
  });

  // @story:115
  // @design:D12
  // @type:accessibility
  // @technique:checklist-based
  test("AC-story Checkout information page passes axe accessibility checks", async ({ page }) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter credentials", async () => {
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter credentials", async () => {
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And I click Login", async () => {
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays Products (login succeeded)", async () => {
      await expect(page.getByText("Products").first()).toBeVisible({ timeout: 10000 });
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.locator(".inventory_item button").first().click();
    });

    await test.step("And I click the cart icon", async () => {
      await page.locator(".shopping_cart_link").first().click();
    });

    await test.step("Then the page displays Your Cart", async () => {
      await expect(page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("When I click Checkout", async () => {
      await page.getByTestId("checkout").click();
    });

    await test.step("Then the page displays Checkout: Your Information", async () => {
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
    });

    await test.step("Then the checkout information form passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page })
        .include(".checkout_info_container")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(
        axeResults.violations.map((v) => v.id).sort(),
        `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`
      ).toEqual([]);
    });
  });

  // @story:116
  // @ac:1
  // @design:D13
  // @type:functional
  // @technique:state-transition
  test("AC-1 Overview lists the products in the cart with their prices", async ({ page }) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter credentials", async () => {
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter credentials", async () => {
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And I click Login", async () => {
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays Products (login succeeded — precondition)", async () => {
      await expect(page.getByText("Products").first()).toBeVisible({ timeout: 10000 });
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.locator(".inventory_item button").first().click();
    });

    await test.step("And I click the cart icon", async () => {
      await page.locator(".shopping_cart_link").first().click();
    });

    await test.step("Then the page displays Your Cart", async () => {
      await expect(page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("When I click Checkout", async () => {
      await page.getByTestId("checkout").click();
    });

    await test.step("Then the page displays Checkout: Your Information", async () => {
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
    });

    await test.step("When I fill in the checkout information fields", async () => {
      await page.getByTestId("firstName").fill("Jane");
      await page.getByTestId("lastName").fill("Doe");
      await page.getByTestId("postalCode").fill("12345");
    });

    await test.step("And I click Continue", async () => {
      await page.getByTestId("continue").click();
    });

    await test.step("Then the page displays Checkout: Overview (navigation confirmed)", async () => {
      await expect(page.getByText("Checkout: Overview").first()).toBeVisible();
    });

    await test.step("And the overview item name is visible", async () => {
      await expect(page.locator(".inventory_item_name").first()).toBeVisible();
    });

    await test.step("And the overview item price is visible", async () => {
      await expect(page.locator(".inventory_item_price").first()).toBeVisible();
    });
  });

  // @story:116
  // @ac:2
  // @design:D14
  // @type:functional
  // @technique:boundary-value-analysis
  test("AC-2 Item total equals the sum of the listed prices", async ({ page }) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter credentials", async () => {
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter credentials", async () => {
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And I click Login", async () => {
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays Products (login succeeded — precondition)", async () => {
      await expect(page.getByText("Products").first()).toBeVisible({ timeout: 10000 });
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.locator(".inventory_item button").first().click();
    });

    await test.step("And I click the cart icon", async () => {
      await page.locator(".shopping_cart_link").first().click();
    });

    await test.step("Then the page displays Your Cart", async () => {
      await expect(page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("When I click Checkout", async () => {
      await page.getByTestId("checkout").click();
    });

    await test.step("Then the page displays Checkout: Your Information", async () => {
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
    });

    await test.step("When I fill in the checkout information fields", async () => {
      await page.getByTestId("firstName").fill("Jane");
      await page.getByTestId("lastName").fill("Doe");
      await page.getByTestId("postalCode").fill("12345");
    });

    await test.step("And I click Continue", async () => {
      await page.getByTestId("continue").click();
    });

    await test.step("Then the page displays Checkout: Overview (navigation confirmed)", async () => {
      await expect(page.getByText("Checkout: Overview").first()).toBeVisible();
    });

    await test.step("And the item total equals the sum of the listed item prices", async () => {
      // Collect all item prices shown in the overview
      const priceLocator = page.locator(".inventory_item_price");
      await expect(priceLocator.first()).toBeVisible();
      const count = await priceLocator.count();
      let sum = 0;
      for (let i = 0; i < count; i++) {
        const text = await priceLocator.nth(i).textContent();
        sum += parseFloat((text ?? "0").replace("$", ""));
      }
      // Read the item total shown on the page
      const itemTotalText = await page.locator(".summary_subtotal_label").textContent();
      const itemTotal = parseFloat((itemTotalText ?? "0").replace(/[^0-9.]/g, ""));
      expect(itemTotal, `Item total $${itemTotal} should equal sum of item prices $${sum}`).toBeCloseTo(sum, 2);
    });
  });

  // @story:116
  // @ac:3
  // @design:D15
  // @type:functional
  // @technique:decision-table
  test("AC-3 Total equals the item total plus the tax shown", async ({ page }) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter credentials", async () => {
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter credentials", async () => {
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And I click Login", async () => {
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays Products (login succeeded — precondition)", async () => {
      await expect(page.getByText("Products").first()).toBeVisible({ timeout: 10000 });
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.locator(".inventory_item button").first().click();
    });

    await test.step("And I click the cart icon", async () => {
      await page.locator(".shopping_cart_link").first().click();
    });

    await test.step("Then the page displays Your Cart", async () => {
      await expect(page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("When I click Checkout", async () => {
      await page.getByTestId("checkout").click();
    });

    await test.step("Then the page displays Checkout: Your Information", async () => {
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
    });

    await test.step("When I fill in the checkout information fields", async () => {
      await page.getByTestId("firstName").fill("Jane");
      await page.getByTestId("lastName").fill("Doe");
      await page.getByTestId("postalCode").fill("12345");
    });

    await test.step("And I click Continue", async () => {
      await page.getByTestId("continue").click();
    });

    await test.step("Then the page displays Checkout: Overview (navigation confirmed)", async () => {
      await expect(page.getByText("Checkout: Overview").first()).toBeVisible();
    });

    await test.step("And the order total equals the item total plus the tax", async () => {
      // Read the item total, tax, and order total shown on the page
      await expect(page.locator(".summary_subtotal_label")).toBeVisible();
      await expect(page.locator(".summary_tax_label")).toBeVisible();
      await expect(page.locator(".summary_total_label")).toBeVisible();

      const itemTotalText = await page.locator(".summary_subtotal_label").textContent();
      const taxText = await page.locator(".summary_tax_label").textContent();
      const totalText = await page.locator(".summary_total_label").textContent();

      const itemTotal = parseFloat((itemTotalText ?? "0").replace(/[^0-9.]/g, ""));
      const tax = parseFloat((taxText ?? "0").replace(/[^0-9.]/g, ""));
      const total = parseFloat((totalText ?? "0").replace(/[^0-9.]/g, ""));

      expect(total, `Order total $${total} should equal item total $${itemTotal} plus tax $${tax}`).toBeCloseTo(itemTotal + tax, 2);
    });
  });

  // @story:116
  // @design:D16
  // @type:accessibility
  // @technique:checklist-based
  test("AC-story Overview page passes axe accessibility checks", async ({ page }) => {
    const cartPage = new CartPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await cartPage.goto();
    });

    await test.step("When I find the Username field and enter credentials", async () => {
      await cartPage.usernameInput.fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter credentials", async () => {
      await cartPage.passwordInput.fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And I click Login", async () => {
      await cartPage.loginButton.click();
    });

    await test.step("Then the page displays Products (login succeeded — precondition)", async () => {
      await expect(page.getByText("Products").first()).toBeVisible({ timeout: 10000 });
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.locator(".inventory_item button").first().click();
    });

    await test.step("And I click the cart icon", async () => {
      await page.locator(".shopping_cart_link").first().click();
    });

    await test.step("Then the page displays Your Cart", async () => {
      await expect(page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("When I click Checkout", async () => {
      await page.getByTestId("checkout").click();
    });

    await test.step("Then the page displays Checkout: Your Information", async () => {
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
    });

    await test.step("When I fill in the checkout information fields", async () => {
      await page.getByTestId("firstName").fill("Jane");
      await page.getByTestId("lastName").fill("Doe");
      await page.getByTestId("postalCode").fill("12345");
    });

    await test.step("And I click Continue", async () => {
      await page.getByTestId("continue").click();
    });

    await test.step("Then the page displays Checkout: Overview (navigation confirmed)", async () => {
      await expect(page.getByText("Checkout: Overview").first()).toBeVisible();
    });

    await test.step("Then the overview page passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page })
        .include(".checkout_summary_container")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(
        axeResults.violations.map((v) => v.id).sort(),
        `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`
      ).toEqual([]);
    });
  });
});
