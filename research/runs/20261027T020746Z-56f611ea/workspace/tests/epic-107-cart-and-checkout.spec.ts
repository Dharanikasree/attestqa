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
  // @design:D6
  // @type:functional
  // @technique:state-transition
  test("AC-1 Continuing with all fields filled in goes to the order overview", async ({ page }) => {
    await test.step("Given I am on the sign-in page", async () => {
      await page.goto("/");
    });

    await test.step("When I find the Username field and enter the test user", async () => {
      await page.getByRole("textbox", { name: "Username" }).fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter the test password", async () => {
      await page.getByRole("textbox", { name: "Password" }).fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And I click Login", async () => {
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Then the page displays Products", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I add a product to the cart", async () => {
      await page.locator(".inventory_item button").first().click();
    });

    await test.step("Then the cart badge shows 1", async () => {
      await expect(page.locator(".shopping_cart_badge").first()).toHaveText("1");
    });

    await test.step("When I click the cart icon", async () => {
      await page.locator(".shopping_cart_link").first().click();
    });

    await test.step("Then the page displays Your Cart", async () => {
      await expect(page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("When I click Checkout", async () => {
      await page.getByRole("button", { name: "Checkout" }).click();
    });

    await test.step("Then the page displays Checkout: Your Information", async () => {
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
    });

    await test.step("When I fill in First Name", async () => {
      await page.getByTestId("firstName").fill("Jane");
    });

    await test.step("And I fill in Last Name", async () => {
      await page.getByTestId("lastName").fill("Doe");
    });

    await test.step("And I fill in Postal Code", async () => {
      await page.getByTestId("postalCode").fill("12345");
    });

    await test.step("And I click Continue", async () => {
      await page.getByRole("button", { name: "Continue" }).click();
    });

    await test.step("Then the page displays Checkout: Overview", async () => {
      await expect(page.getByText("Checkout: Overview").first()).toBeVisible();
    });
  });

  // @story:115
  // @ac:2
  // @design:D7
  // @type:functional
  // @technique:equivalence-partitioning
  for (const { label, firstName, lastName, postalCode, errorMessage } of [
    { label: "first name empty", firstName: "", lastName: "Doe", postalCode: "12345", errorMessage: "Error: First Name is required" },
    { label: "last name empty", firstName: "Jane", lastName: "", postalCode: "12345", errorMessage: "Error: Last Name is required" },
    { label: "postal code empty", firstName: "Jane", lastName: "Doe", postalCode: "", errorMessage: "Error: Postal Code is required" },
  ]) {
    // @story:115
    // @ac:2
    // @design:D7
    // @type:functional
    // @technique:equivalence-partitioning
    test(`AC-2 Continuing with a required field empty shows the appropriate error message — ${label}`, async ({ page }) => {
      await test.step("Given I am on the sign-in page", async () => {
        await page.goto("/");
      });

      await test.step("When I find the Username field and enter the test user", async () => {
        await page.getByRole("textbox", { name: "Username" }).fill(process.env["AQA_APP_USER"] ?? "standard_user");
      });

      await test.step("And I find the Password field and enter the test password", async () => {
        await page.getByRole("textbox", { name: "Password" }).fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
      });

      await test.step("And I click Login", async () => {
        await page.getByRole("button", { name: "Login" }).click();
      });

      await test.step("Then the page displays Products", async () => {
        await expect(page.getByText("Products").first()).toBeVisible();
      });

      await test.step("When I add a product to the cart", async () => {
        await page.locator(".inventory_item button").first().click();
      });

      await test.step("When I click the cart icon", async () => {
        await page.locator(".shopping_cart_link").first().click();
      });

      await test.step("Then the page displays Your Cart", async () => {
        await expect(page.getByText("Your Cart").first()).toBeVisible();
      });

      await test.step("When I click Checkout", async () => {
        await page.getByRole("button", { name: "Checkout" }).click();
      });

      await test.step("Then the page displays Checkout: Your Information", async () => {
        await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
      });

      await test.step("When I fill in First Name", async () => {
        await page.getByTestId("firstName").fill(firstName);
      });

      await test.step("And I fill in Last Name", async () => {
        await page.getByTestId("lastName").fill(lastName);
      });

      await test.step("And I fill in Postal Code", async () => {
        await page.getByTestId("postalCode").fill(postalCode);
      });

      await test.step("And I click Continue", async () => {
        await page.getByRole("button", { name: "Continue" }).click();
      });

      await test.step(`Then the error message is visible`, async () => {
        await expect(page.getByTestId("error")).toBeVisible();
        await expect(page.getByTestId("error")).toContainText(errorMessage);
      });
    });
  }

  // @story:115
  // @ac:3
  // @design:D8
  // @type:functional
  // @technique:state-transition
  test("AC-3 Cancel returns to the cart with the cart unchanged", async ({ page }) => {
    await test.step("Given I am on the sign-in page", async () => {
      await page.goto("/");
    });

    await test.step("When I find the Username field and enter the test user", async () => {
      await page.getByRole("textbox", { name: "Username" }).fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter the test password", async () => {
      await page.getByRole("textbox", { name: "Password" }).fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And I click Login", async () => {
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Then the page displays Products", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I add a product to the cart", async () => {
      await page.locator(".inventory_item button").first().click();
    });

    await test.step("Then the cart badge shows 1", async () => {
      await expect(page.locator(".shopping_cart_badge").first()).toHaveText("1");
    });

    await test.step("When I click the cart icon", async () => {
      await page.locator(".shopping_cart_link").first().click();
    });

    await test.step("Then the page displays Your Cart", async () => {
      await expect(page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("When I click Checkout", async () => {
      await page.getByRole("button", { name: "Checkout" }).click();
    });

    await test.step("Then the page displays Checkout: Your Information", async () => {
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
    });

    await test.step("When I click Cancel", async () => {
      await page.getByRole("button", { name: "Cancel" }).click();
    });

    await test.step("Then the page displays Your Cart", async () => {
      await expect(page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("And the cart badge still shows 1", async () => {
      await expect(page.locator(".shopping_cart_badge").first()).toHaveText("1");
    });
  });

  // @story:115
  // @design:D9
  // @type:accessibility
  // @technique:checklist-based
  test("AC-story Checkout information page passes axe accessibility checks", async ({ page }) => {
    await test.step("Given I am on the sign-in page", async () => {
      await page.goto("/");
    });

    await test.step("When I find the Username field and enter the test user", async () => {
      await page.getByRole("textbox", { name: "Username" }).fill(process.env["AQA_APP_USER"] ?? "standard_user");
    });

    await test.step("And I find the Password field and enter the test password", async () => {
      await page.getByRole("textbox", { name: "Password" }).fill(process.env["AQA_APP_PASS"] ?? "secret_sauce");
    });

    await test.step("And I click Login", async () => {
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Then the page displays Products", async () => {
      await expect(page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I add a product to the cart", async () => {
      await page.locator(".inventory_item button").first().click();
    });

    await test.step("When I click the cart icon", async () => {
      await page.locator(".shopping_cart_link").first().click();
    });

    await test.step("Then the page displays Your Cart", async () => {
      await expect(page.getByText("Your Cart").first()).toBeVisible();
    });

    await test.step("When I click Checkout", async () => {
      await page.getByRole("button", { name: "Checkout" }).click();
    });

    await test.step("Then the page displays Checkout: Your Information", async () => {
      await expect(page.getByText("Checkout: Your Information").first()).toBeVisible();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page })
        .include(".checkout_info_wrapper")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
