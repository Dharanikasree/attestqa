import { test, expect } from "@playwright/test";
import { AddressPage } from "../pages/address.page";

test.describe("Customer profile and orders", () => {

  test.beforeEach(async ({ page }) => {
    const addressPage = new AddressPage(page);

    await test.step("Given I navigate to \"/#/login\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await addressPage.goto();
    });
  });

  // @story:SCRUM-24
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-1: Submitting all required fields saves the address and shows a confirmation naming the city", async ({ page }, testInfo) => {
    const addressPage = new AddressPage(page);

    await test.step("When I find the Email field and enter \"aqa_user_email\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await addressPage.email.fill(process.env["AQA_APP_USER"] ?? "");
    });

    await test.step("And I find the Password field and enter \"aqa_user_pass\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByRole("textbox", { name: "Text field for the login password" }).fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And Click the \"Log in\" button", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await addressPage.loginButton.click();
    });

    await test.step("Then the account menu is displayed", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await expect(addressPage.showHideAccountMenuButton).toBeVisible();
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await addressPage.page.goto("/#/address/create");
      await addressPage.page.waitForURL("**/#/address/create");
      await addressPage.page.waitForURL("**/address/create");
    });

    await test.step("And I find the Country field and enter \"Germany\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByLabel("Country").first().fill("Germany");
    });

    await test.step("And I find the Name field and enter \"Test User\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByLabel("Name").first().fill("Test User");
    });

    await test.step("And I find the Mobile Number field and enter \"01234567890\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByLabel("Mobile Number").first().fill("01234567890");
    });

    await test.step("And I find the ZIP Code field and enter \"12345\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByLabel("ZIP Code").first().fill("12345");
    });

    await test.step("And I find the Address field and enter \"123 Test Street\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByLabel("Address").first().fill("123 Test Street");
    });

    await test.step("And I find the City field and enter \"Berlin\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByLabel("City").first().fill("Berlin");
    });

    await test.step("And I find the State field and enter \"Berlin\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByLabel("State").first().fill("Berlin");
    });

    await test.step("And I click \"Submit\"", async () => {
      await page.getByRole("button", { name: "Submit" }).click();
    });

    await test.step("Then the page displays \"Berlin\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(addressPage.page.getByText("Berlin").first()).toBeVisible();
    });
  });

  // @story:SCRUM-24
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-2: The saved address appears in the customer's saved addresses list", async ({ page }, testInfo) => {
    const addressPage = new AddressPage(page);

    await test.step("When I find the Email field and enter \"aqa_user_email\"", async () => {
      await addressPage.email.fill(process.env["AQA_APP_USER"] ?? "");
    });

    await test.step("And I find the Password field and enter \"aqa_user_pass\"", async () => {
      await page.getByRole("textbox", { name: "Text field for the login password" }).fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And Click the \"Log in\" button", async () => {
      await addressPage.loginButton.click();
    });

    await test.step("Then the account menu is displayed", async () => {
      await expect(addressPage.showHideAccountMenuButton).toBeVisible();
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      await addressPage.page.goto("/#/address/create");
      await addressPage.page.waitForLoadState("networkidle");
    });

    await test.step("And I find the Country field and enter \"Germany\"", async () => {
      await page.getByPlaceholder("Please provide a country.").fill("Germany");
    });

    await test.step("And I find the Name field and enter \"Test User\"", async () => {
      await page.getByPlaceholder("Please provide a name.").fill("Test User");
    });

    await test.step("And I find the Mobile Number field and enter \"01234567890\"", async () => {
      await page.getByPlaceholder("Please provide a mobile number.").fill("01234567890");
    });

    await test.step("And I find the ZIP Code field and enter \"12345\"", async () => {
      await page.getByPlaceholder("Please provide a ZIP code.").fill("12345");
    });

    await test.step("And I find the Address field and enter \"123 Test Street\"", async () => {
      await page.getByPlaceholder("Please provide an address.").fill("123 Test Street");
    });

    await test.step("And I find the City field and enter \"TestCity\"", async () => {
      await page.getByPlaceholder("Please provide a city.").fill("TestCity");
    });

    await test.step("And I find the State field and enter \"TestState\"", async () => {
      await page.getByPlaceholder("Please provide a state.").fill("TestState");
    });

    await test.step("And I click \"Submit\"", async () => {
      await page.getByRole("button", { name: "Submit" }).click();
    });

    await test.step("When I navigate to \"/#/address/saved\"", async () => {
      await addressPage.page.goto("/#/address/saved");
      await addressPage.page.waitForLoadState("networkidle");
    });

    await test.step("Then the page displays \"TestCity\"", async () => {
      await expect(addressPage.page.getByText("TestCity").first()).toBeVisible();
    });
  });

  // @story:SCRUM-24
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-3: Submit button is disabled when all required fields are empty", async ({ page }, testInfo) => {
    const addressPage = new AddressPage(page);

    await test.step("When I find the Email field and enter \"aqa_user_email\"", async () => {
      await addressPage.email.fill(process.env["AQA_APP_USER"] ?? "");
    });

    await test.step("And I find the Password field and enter \"aqa_user_pass\"", async () => {
      await page.getByRole("textbox", { name: "Text field for the login password" }).fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And Click the \"Log in\" button", async () => {
      await addressPage.loginButton.click();
    });

    await test.step("Then the account menu is displayed", async () => {
      await expect(addressPage.showHideAccountMenuButton).toBeVisible();
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      await addressPage.page.goto("/#/address/create");
      await addressPage.page.waitForLoadState("networkidle");
    });

    await test.step("Then the Submit button is disabled", async () => {
      await expect(page.getByRole("button", { name: "Submit" })).toBeDisabled();
    });
  });

  // @story:SCRUM-24
  // @ac:1
  // @design:D4
  // @type:security
  // @technique:state-transition
  test("AC-1 (security): Unauthenticated access to the address form is blocked", async ({ page }, testInfo) => {
    const addressPage = new AddressPage(page);

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      await addressPage.page.goto("/#/address/create");
    });

    await test.step("Then the page displays \"403\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(addressPage.page.getByText("403").first()).toBeVisible();
    });
  });

  // @story:SCRUM-24
  // @design:D5
  // @type:accessibility
  // @technique:checklist-based
  // @llm-generated
  test("AC-story: Address create page passes axe-core WCAG A/AA scan", async ({ page }, testInfo) => {
    const addressPage = new AddressPage(page);

    await test.step("When I find the Email field and enter \"user@example.com\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await addressPage.email.fill("user@example.com");
    });

    await test.step("And I find the Password field and enter \"pass\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await addressPage.password.fill("pass");
    });

    await test.step("And Click the \"Log in\" button", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await addressPage.loginButton.click();
    });

    await test.step("Then the account menu is displayed", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(addressPage.showHideAccountMenuButton).toBeVisible();
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await addressPage.goto();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: addressPage.page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
