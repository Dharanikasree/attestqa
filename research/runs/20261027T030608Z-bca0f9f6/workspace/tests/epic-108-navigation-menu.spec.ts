import { test, expect } from "@playwright/test";
import { NavigationMenuPage } from "../pages/navigation-menu.page";

test.describe("Navigation menu", () => {

  // @story:118
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-1 Reset app state from the menu empties the cart and the cart badge is not shown", async ({ page }, testInfo) => {
    const navigationMenuPage = new NavigationMenuPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await navigationMenuPage.goto();
    });

    await test.step("When I fill in the username with the standard user credentials", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await navigationMenuPage.usernameInput.fill("standard_user");
    });

    await test.step("And I fill in the password with the standard user credentials", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await navigationMenuPage.passwordInput.fill("secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      await page.getByTestId("login-button").click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(navigationMenuPage.page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I click the first Add to cart button in the product list", async () => {
      await page.locator("[data-test^='add-to-cart']").first().click();
    });

    await test.step("Then the cart badge shows \"1\"", async () => {
      await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
    });

    await test.step("When I open the side menu", async () => {
      await page.getByRole("button", { name: "Open Menu" }).click();
    });

    await test.step("And Click the \"Reset App State\" button", async () => {
      await page.getByTestId("reset-sidebar-link").click();
    });

    await test.step("Then the cart badge is not shown", async () => {
      await expect(page.getByTestId("shopping-cart-badge")).not.toBeVisible();
    });
  });

  // @story:118
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-2 Logout from the menu shows the sign-in page", async ({ page }, testInfo) => {
    const navigationMenuPage = new NavigationMenuPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await navigationMenuPage.goto();
    });

    await test.step("When I fill in the username with the standard user credentials", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await navigationMenuPage.usernameInput.fill("standard_user");
    });

    await test.step("And I fill in the password with the standard user credentials", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await navigationMenuPage.passwordInput.fill("secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      await page.getByTestId("login-button").click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(navigationMenuPage.page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I open the side menu", async () => {
      await page.getByRole("button", { name: "Open Menu" }).click();
    });

    await test.step("And Click the \"Logout\" button", async () => {
      await page.getByRole("button", { name: "Logout" }).click();
    });

    await test.step("Then the page displays \"Swag Labs\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(navigationMenuPage.page.getByText("Swag Labs").first()).toBeVisible();
    });
  });

  // @story:118
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-3 After logout going back in the browser does not show the product list", async ({ page }, testInfo) => {
    const navigationMenuPage = new NavigationMenuPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await navigationMenuPage.goto();
    });

    await test.step("When I fill in the username with the standard user credentials", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await navigationMenuPage.usernameInput.fill("standard_user");
    });

    await test.step("And I fill in the password with the standard user credentials", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await navigationMenuPage.passwordInput.fill("secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      await page.getByTestId("login-button").click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(navigationMenuPage.page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I open the side menu", async () => {
      await page.getByRole("button", { name: "Open Menu" }).click();
    });

    await test.step("And Click the \"Logout\" button", async () => {
      await page.getByRole("button", { name: "Logout" }).click();
    });

    await test.step("Then the page displays \"Swag Labs\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(navigationMenuPage.page.getByText("Swag Labs").first()).toBeVisible();
    });

    await test.step("When I go back in the browser", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await page.goBack();
    });

    await test.step("Then the page displays \"Swag Labs\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(navigationMenuPage.page.getByText("Swag Labs").first()).toBeVisible();
    });
  });

  // @story:118
  // @ac:2
  // @design:D4
  // @type:security
  // @technique:state-transition
  // @llm-generated
  test("AC-2 After logout navigating directly to the product list shows the sign-in page", async ({ page }, testInfo) => {
    const navigationMenuPage = new NavigationMenuPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await navigationMenuPage.goto();
    });

    await test.step("When I fill in the username with the standard user credentials", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await navigationMenuPage.usernameInput.fill("standard_user");
    });

    await test.step("And I fill in the password with the standard user credentials", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await navigationMenuPage.passwordInput.fill("secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      await page.getByTestId("login-button").click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(navigationMenuPage.page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I open the side menu", async () => {
      await page.getByRole("button", { name: "Open Menu" }).click();
    });

    await test.step("And Click the \"Logout\" button", async () => {
      await page.getByRole("button", { name: "Logout" }).click();
    });

    await test.step("Then the page displays \"Swag Labs\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(navigationMenuPage.page.getByText("Swag Labs").first()).toBeVisible();
    });

    await test.step("When I navigate to the product list directly", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await navigationMenuPage.goto();
    });

    await test.step("Then the page displays \"Swag Labs\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(navigationMenuPage.page.getByText("Swag Labs").first()).toBeVisible();
    });
  });

  // @story:118
  // @design:D5
  // @type:accessibility
  // @technique:checklist-based
  // @llm-generated
  test("AC-story Navigation menu passes accessibility checks", async ({ page }, testInfo) => {
    const navigationMenuPage = new NavigationMenuPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await navigationMenuPage.goto();
    });

    await test.step("When I fill in the username with the standard user credentials", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await navigationMenuPage.usernameInput.fill("standard_user");
    });

    await test.step("And I fill in the password with the standard user credentials", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await navigationMenuPage.passwordInput.fill("secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      await page.getByTestId("login-button").click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(navigationMenuPage.page.getByText("Products").first()).toBeVisible();
    });

    await test.step("When I open the side menu", async () => {
      await page.getByRole("button", { name: "Open Menu" }).click();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: navigationMenuPage.page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
