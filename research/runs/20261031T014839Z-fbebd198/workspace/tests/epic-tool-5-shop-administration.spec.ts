import { test, expect } from "@playwright/test";
import { ShopAdministrationPage } from "../pages/shop-administration.page";

test.describe("Shop administration", () => {

  // @story:TOOL-19
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:state-transition
  test("AC-1 A signed-in administrator can open the product list in the back office", async ({ page }, testInfo) => {
    const shopAdministrationPage = new ShopAdministrationPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      await page.goto("/auth/login");
    });

    await test.step("When I fill the \"email\" field with the admin email", async () => {
      await page.getByLabel("Email address *").fill(process.env["AQA_APP_USER"] ?? "");
    });

    await test.step("And I fill the \"password\" field with the admin password", async () => {
      await page.getByLabel("Password *").fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And I click the \"login\" button", async () => {
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Then the page displays \"My Account\"", async () => {
      await expect(page.getByText("My Account").first()).toBeVisible();
    });

    await test.step("When I navigate to \"/admin/products\"", async () => {
      await page.goto("/admin/products");
    });

    await test.step("Then the page displays \"Combination Pliers\"", async () => {
      await expect(page.getByText("Combination Pliers").first()).toBeVisible();
    });

    await test.step("And the page displays \"$14.15\"", async () => {
      await expect(page.getByText("$14.15").first()).toBeVisible();
    });
  });

  // @story:TOOL-19
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:state-transition
  test("AC-2 Searching the admin product list by name shows only matching products", async ({ page }, testInfo) => {
    const shopAdministrationPage = new ShopAdministrationPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      await page.goto("/auth/login");
    });

    await test.step("When I fill the \"email\" field with the admin email", async () => {
      await page.getByLabel("Email address *").fill(process.env["AQA_APP_USER"] ?? "");
    });

    await test.step("And I fill the \"password\" field with the admin password", async () => {
      await page.getByLabel("Password *").fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And I click the \"login\" button", async () => {
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Then the page displays \"My Account\"", async () => {
      await expect(page.getByText("My Account").first()).toBeVisible();
    });

    await test.step("When I navigate to \"/admin/products\"", async () => {
      await page.goto("/admin/products");
    });

    await test.step("Then the page displays \"Combination Pliers\"", async () => {
      await expect(page.getByText("Combination Pliers").first()).toBeVisible();
    });

    await test.step("When I type \"Pliers\" into the Search field", async () => {
      await shopAdministrationPage.searchHeading.fill("Pliers");
    });

    await test.step("And I click \"Search\"", async () => {
      await shopAdministrationPage.searchButton.click();
    });

    await test.step("Then the page displays \"Pliers\"", async () => {
      await expect(page.getByText("Pliers").first()).toBeVisible();
    });
  });

  // @story:TOOL-19
  // @ac:2
  // @bug:TOOL-21
  // @design:D3
  // @type:confirmation
  // @technique:state-transition
  test("AC-2 bug:TOOL-21 Admin product search does not narrow the list", async ({ page }, testInfo) => {
    test.fail(true, "Bug #TOOL-21 Active: Admin product search does not narrow the list");
    const shopAdministrationPage = new ShopAdministrationPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      await page.goto("/auth/login");
    });

    await test.step("When I fill the \"email\" field with the admin email", async () => {
      await page.getByLabel("Email address *").fill(process.env["AQA_APP_USER"] ?? "");
    });

    await test.step("And I fill the \"password\" field with the admin password", async () => {
      await page.getByLabel("Password *").fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And I click the \"login\" button", async () => {
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Then the page displays \"My Account\"", async () => {
      await expect(page.getByText("My Account").first()).toBeVisible();
    });

    await test.step("When I navigate to \"/admin/products\"", async () => {
      await page.goto("/admin/products");
    });

    await test.step("Then the page displays \"Combination Pliers\"", async () => {
      await expect(page.getByText("Combination Pliers").first()).toBeVisible();
    });

    await test.step("When I type \"Pliers\" into the Search field", async () => {
      await shopAdministrationPage.searchHeading.fill("Pliers");
    });

    await test.step("And I click \"Search\"", async () => {
      await shopAdministrationPage.searchButton.click();
    });

    await test.step("Then the page displays \"Pliers\"", async () => {
      await expect(page.getByText("Pliers").first()).toBeVisible();
    });

    await test.step("And the page does not display \"Bolt Cutters\"", async () => {
      await expect(page.getByText("Bolt Cutters").first()).not.toBeVisible();
    });
  });

  // @story:TOOL-19
  // @ac:3
  // @design:D4
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-3 A customer account that opens the admin product list address does not see the list", async ({ page }, testInfo) => {
    const shopAdministrationPage = new ShopAdministrationPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      await page.goto("/auth/login");
    });

    await test.step("When I fill the \"email\" field with the registered email", async () => {
      await page.getByLabel("Email address *").fill(process.env["AQA_APP_USER"] ?? "");
    });

    await test.step("And I fill the \"password\" field with the registered password", async () => {
      await page.getByLabel("Password *").fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And I click the \"login\" button", async () => {
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Then the page displays \"My Account\"", async () => {
      await expect(page.getByText("My Account").first()).toBeVisible();
    });

    await test.step("When I navigate to \"/admin/products\"", async () => {
      await page.goto("/admin/products");
    });

    await test.step("Then the customer is not shown the admin product list", async () => {
      // A customer navigating to /admin/products should not see the admin product table
      await expect(page.getByRole("table")).not.toBeVisible();
    });
  });

  // @story:TOOL-19
  // @ac:3
  // @design:D5
  // @type:security
  // @technique:error-guessing
  test("AC-3b A visitor who is not signed in and opens the admin product list address is not shown the list", async ({ page }, testInfo) => {
    const shopAdministrationPage = new ShopAdministrationPage(page);

    await test.step("When I navigate to \"/admin/products\"", async () => {
      await page.goto("/admin/products");
    });

    await test.step("Then the visitor is not shown the admin product list", async () => {
      // A visitor navigating to /admin/products should not see the admin product table
      await expect(page.getByRole("table")).not.toBeVisible();
    });
  });

  // @story:TOOL-19
  // @design:D6
  // @type:accessibility
  // @technique:checklist-based
  test("AC-accessibility The admin product list page passes an automated accessibility scan", async ({ page }, testInfo) => {
    const shopAdministrationPage = new ShopAdministrationPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      await page.goto("/auth/login");
    });

    await test.step("When I fill the \"email\" field with the admin email", async () => {
      await page.getByLabel("Email address *").fill(process.env["AQA_APP_USER"] ?? "");
    });

    await test.step("And I fill the \"password\" field with the admin password", async () => {
      await page.getByLabel("Password *").fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And I click the \"login\" button", async () => {
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Then the page displays \"My Account\"", async () => {
      await expect(page.getByText("My Account").first()).toBeVisible();
    });

    await test.step("When I navigate to \"/admin/products\"", async () => {
      await page.goto("/admin/products");
    });

    await test.step("Then the page displays \"Combination Pliers\"", async () => {
      await expect(page.getByText("Combination Pliers").first()).toBeVisible();
    });

    await test.step("And the page passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
