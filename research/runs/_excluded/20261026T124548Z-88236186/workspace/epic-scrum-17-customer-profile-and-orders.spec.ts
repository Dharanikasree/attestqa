import { test, expect } from "@playwright/test";
import { ChangePasswordPage } from "../pages/change-password.page";

test.describe("Customer profile and orders", () => {

  test.beforeEach(async ({ page }) => {
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am on the login page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });
  });

  // @story:SCRUM-24
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-1 Adding a new address saves it and confirmation names the city", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — And I fill in the address form with country \"Germany\" name \"Test User\" mobile \"01234567890\" zip \"10115\" address \"Unter den Linden 1\" city \"Berlin\" state \"Berlin\"");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await changePasswordPage.goto();
      await changePasswordPage.closeWelcomeBannerButton.click();
      await changePasswordPage.email.fill("customer@example.com");
      await changePasswordPage.password.fill("Customer1!");
      await changePasswordPage.loginButton.click();
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I fill in the address form with country \"Germany\" name \"Test User\" mobile \"01234567890\" zip \"10115\" address \"Unter den Linden 1\" city \"Berlin\" state \"Berlin\"", async () => {
      // @bdd2pw lane=todo
      // TODO: No address form fields (country, name, mobile, zip, address, city, state) exist in the POM for ChangePasswordPage; this step requires address form locators that are not present — add them to the POM before generating this binding.
    });

    await test.step("And I click \"Submit\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await page.getByRole("button", { name: "Submit" }).first().click();
    });

    await test.step("Then the page displays \"Berlin\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(changePasswordPage.page.getByText("Berlin").first()).toBeVisible();
    });
  });

  // @story:SCRUM-24
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-2 The saved address is listed among the customer's addresses", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — And I fill in the address form with country \"Germany\" name \"Test User\" mobile \"01234567890\" zip \"10115\" address \"Unter den Linden 1\" city \"Berlin\" state \"Berlin\"");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await changePasswordPage.goto();
      await changePasswordPage.closeWelcomeBannerButton.click();
      await changePasswordPage.email.fill("customer@example.com");
      await changePasswordPage.password.fill("Customer1!");
      await changePasswordPage.loginButton.click();
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I fill in the address form with country \"Germany\" name \"Test User\" mobile \"01234567890\" zip \"10115\" address \"Unter den Linden 1\" city \"Berlin\" state \"Berlin\"", async () => {
      // @bdd2pw lane=todo
      // TODO: No address form fields (country, name, mobile, zip, address, city, state) exist in the POM for ChangePasswordPage; this step requires address form locators that are not present — add them to the POM before generating this binding.
    });

    await test.step("And I click \"Submit\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await page.getByRole("button", { name: "Submit" }).first().click();
    });

    await test.step("Then the page displays \"Berlin\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(changePasswordPage.page.getByText("Berlin").first()).toBeVisible();
    });

    await test.step("When I navigate to \"/#/address/select\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("Then the page displays \"Unter den Linden 1\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(changePasswordPage.page.getByText("Unter den Linden 1").first()).toBeVisible();
    });
  });

  // @story:SCRUM-24
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-3 Address cannot be submitted while any required field is empty [field=Country]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — And I leave the Country field empty and fill all other required fields");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await changePasswordPage.goto();
      await changePasswordPage.closeWelcomeBannerButton.click();
      await changePasswordPage.email.fill("customer@example.com");
      await changePasswordPage.password.fill("Customer1!");
      await changePasswordPage.loginButton.click();
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the Country field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: The step references a 'Country' field and 'other required fields' that do not exist in the POM for ChangePasswordPage (which is a login page with only Email, Password, and Remember Me fields). Cannot determine which fields to fill or leave empty without a matching POM or DOM context.
    });

    await test.step("Then the Submit button is disabled", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(page.getByRole("button", { name: "Submit" }).first()).toHaveAttribute("disabled", "");
    });
  });

  // @story:SCRUM-24
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-3 Address cannot be submitted while any required field is empty [field=Name]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — And I leave the Name field empty and fill all other required fields");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await changePasswordPage.goto();
      await changePasswordPage.closeWelcomeBannerButton.click();
      await changePasswordPage.email.fill("customer@example.com");
      await changePasswordPage.password.fill("Customer1!");
      await changePasswordPage.loginButton.click();
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the Name field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: The step references a 'Name field' and 'other required fields' that do not correspond to any POM fields on ChangePasswordPage (which only has Email, Password, and related login fields). Cannot determine which fields to fill or leave empty without additional POM context or a DOM snapshot.
    });

    await test.step("Then the Submit button is disabled", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(page.getByRole("button", { name: "Submit" }).first()).toHaveAttribute("disabled", "");
    });
  });

  // @story:SCRUM-24
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-3 Address cannot be submitted while any required field is empty [field=Mobile Number]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — And I leave the Mobile Number field empty and fill all other required fields");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await changePasswordPage.goto();
      await changePasswordPage.closeWelcomeBannerButton.click();
      await changePasswordPage.email.fill("customer@example.com");
      await changePasswordPage.password.fill("Customer1!");
      await changePasswordPage.loginButton.click();
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the Mobile Number field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: The step references a 'Mobile Number' field and 'all other required fields', but no such fields exist in the POM — the POM only contains Email and Password inputs for a login page. Cannot determine which fields to fill or leave empty without a matching POM or DOM snapshot.
    });

    await test.step("Then the Submit button is disabled", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(page.getByRole("button", { name: "Submit" }).first()).toHaveAttribute("disabled", "");
    });
  });

  // @story:SCRUM-24
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-3 Address cannot be submitted while any required field is empty [field=ZIP Code]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — And I leave the ZIP Code field empty and fill all other required fields");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await changePasswordPage.goto();
      await changePasswordPage.closeWelcomeBannerButton.click();
      await changePasswordPage.email.fill("customer@example.com");
      await changePasswordPage.password.fill("Customer1!");
      await changePasswordPage.loginButton.click();
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the ZIP Code field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: The step references a ZIP Code field and other required fields, but none of these fields exist in the current POM (which is scoped to a Login/ChangePassword page with no registration or address form fields). Cannot determine which locators to use without a matching POM or DOM snapshot.
    });

    await test.step("Then the Submit button is disabled", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(page.getByRole("button", { name: "Submit" }).first()).toHaveAttribute("disabled", "");
    });
  });

  // @story:SCRUM-24
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-3 Address cannot be submitted while any required field is empty [field=Address]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — And I leave the Address field empty and fill all other required fields");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await changePasswordPage.goto();
      await changePasswordPage.closeWelcomeBannerButton.click();
      await changePasswordPage.email.fill("customer@example.com");
      await changePasswordPage.password.fill("Customer1!");
      await changePasswordPage.loginButton.click();
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the Address field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: The step references an 'Address field' and 'all other required fields' but no address-related POM fields exist on ChangePasswordPage (which is a login page). Cannot determine which fields to fill or leave empty without a matching POM or DOM snapshot.
    });

    await test.step("Then the Submit button is disabled", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(page.getByRole("button", { name: "Submit" }).first()).toHaveAttribute("disabled", "");
    });
  });

  // @story:SCRUM-24
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-3 Address cannot be submitted while any required field is empty [field=City]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — And I leave the City field empty and fill all other required fields");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await changePasswordPage.goto();
      await changePasswordPage.closeWelcomeBannerButton.click();
      await changePasswordPage.email.fill("customer@example.com");
      await changePasswordPage.password.fill("Customer1!");
      await changePasswordPage.loginButton.click();
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the City field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: No 'City' field or related POM fields exist in the ChangePasswordPage POM; this step references a registration/address form that is not represented here and cannot be deterministically mapped without the correct POM and DOM context.
    });

    await test.step("Then the Submit button is disabled", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(page.getByRole("button", { name: "Submit" }).first()).toHaveAttribute("disabled", "");
    });
  });

  // @story:SCRUM-24
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-3 Address cannot be submitted while any required field is empty [field=State]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — And I leave the State field empty and fill all other required fields");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await changePasswordPage.goto();
      await changePasswordPage.closeWelcomeBannerButton.click();
      await changePasswordPage.email.fill("customer@example.com");
      await changePasswordPage.password.fill("Customer1!");
      await changePasswordPage.loginButton.click();
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the State field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: No 'State' field or equivalent POM locator exists in the ChangePasswordPage POM, and the step does not specify which 'other required fields' to fill or with what values. Manual implementation required.
    });

    await test.step("Then the Submit button is disabled", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(page.getByRole("button", { name: "Submit" }).first()).toHaveAttribute("disabled", "");
    });
  });

  // @story:SCRUM-24
  // @design:D4
  // @type:accessibility
  // @technique:checklist-based
  // @llm-generated
  test("AC-story Accessibility of the Create Address form", async ({ page }, testInfo) => {
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      await page.goto("/#/login");
      await page.getByLabel("Email").fill(process.env["AQA_APP_USER"] ?? "");
      await page.getByRole("textbox", { name: "Text field for the login password" }).fill(process.env["AQA_APP_PASS"] ?? "");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page).not.toHaveURL(/\/#\/login/, { timeout: 10000 });
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: changePasswordPage.page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });

  // @story:SCRUM-24
  // @ac:2
  // @design:D5
  // @type:security
  // @technique:error-guessing
  // @llm-generated
  test("AC-2 security A customer cannot access another customer's saved addresses", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — Then I only see addresses belonging to the current user");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await changePasswordPage.goto();
      await changePasswordPage.closeWelcomeBannerButton.click();
      await changePasswordPage.email.fill("customer@example.com");
      await changePasswordPage.password.fill("Customer1!");
      await changePasswordPage.loginButton.click();
    });

    await test.step("When I navigate to \"/#/address/select\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] Then I only see addresses belonging to the current user", async () => {
      // @bdd2pw lane=todo
      // TODO: Cannot determine a specific locator or assertion for 'addresses belonging to the current user' — no address-related POM fields exist on ChangePasswordPage and no quoted text is provided to match against. Hand-edit this step to add the appropriate locator and assertion.
    });
  });

  // @story:SCRUM-25
  // @ac:1
  // @design:D6
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-1 Correct current password and new password entered twice changes the password and shows confirmation", async ({ page }, testInfo) => {
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      await page.goto("/#/login");
      await page.getByLabel("Email").fill(process.env["AQA_APP_USER"] ?? "");
      await page.getByLabel("Password").fill(process.env["AQA_APP_PASS"] ?? "");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page).not.toHaveURL(/\/#\/login/, { timeout: 10000 });
    });

    await test.step("When I navigate to \"/#/privacy-security/change-password\"", async () => {
      await page.goto("/#/privacy-security/change-password");
      await expect(page.getByRole("heading", { name: "Change Password" })).toBeVisible();
    });

    await test.step("And I find the \"Field to enter the current password\" field and enter the current password", async () => {
      await page.getByLabel("Field to enter the current password").fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And I find the \"Field for the new password\" field and enter \"NewP@ss99\"", async () => {
      await page.getByLabel('Field for the new password').fill('NewP@ss99');
    });

    await test.step("And I find the \"Field to repeat the new password\" field and enter \"NewP@ss99\"", async () => {
      await page.getByLabel('Field to repeat the new password').fill('NewP@ss99');
    });

    await test.step("And I click \"Change\"", async () => {
      await page.getByRole("button", { name: "Button to confirm the change" }).click();
    });

    await test.step("Then the page displays \"Password successfully changed\"", async () => {
      await expect(page.getByText("Password successfully changed").first()).toBeVisible();
    });

    await test.step("Then I find the \"Field to enter the current password\" field and enter \"NewP@ss99\"", async () => {
      await page.getByLabel('Field to enter the current password').fill('NewP@ss99');
    });

    await test.step("And I find the \"Field for the new password\" field and enter the current password", async () => {
      await page.getByLabel('Field for the new password').fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And I find the \"Field to repeat the new password\" field and enter the current password", async () => {
      await page.getByLabel('Field to repeat the new password').fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And I click \"Change\"", async () => {
      await page.getByRole("button", { name: "Button to confirm the change" }).click();
    });

    await test.step("Then the page displays \"Password successfully changed\"", async () => {
      await expect(page.getByText("Password successfully changed").first()).toBeVisible();
    });
  });

  // @story:SCRUM-25
  // @ac:2
  // @design:D7
  // @type:functional
  // @technique:equivalence-partitioning
  // @llm-generated
  test("AC-2 Wrong current password is refused with a message", async ({ page }, testInfo) => {
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      await page.goto("/#/login");
      await page.getByLabel("Email").fill(process.env["AQA_APP_USER"] ?? "");
      await page.getByRole("textbox", { name: "Text field for the login password" }).fill(process.env["AQA_APP_PASS"] ?? "");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page).not.toHaveURL(/\/#\/login/, { timeout: 10000 });
    });

    await test.step("When I navigate to \"/#/privacy-security/change-password\"", async () => {
      await page.goto("/#/privacy-security/change-password");
      await expect(page.getByRole("heading", { name: "Change Password" })).toBeVisible();
    });

    await test.step("And I find the \"Field to enter the current password\" field and enter \"WrongPassword123\"", async () => {
      await page.getByLabel("Field to enter the current password").fill("WrongPassword123");
    });

    await test.step("And I find the \"Field for the new password\" field and enter \"NewP@ss99\"", async () => {
      await page.getByLabel('Field for the new password').fill('NewP@ss99');
    });

    await test.step("And I find the \"Field to repeat the new password\" field and enter \"NewP@ss99\"", async () => {
      await page.getByLabel('Field to repeat the new password').fill('NewP@ss99');
    });

    await test.step("And I click \"Change\"", async () => {
      await page.getByRole("button", { name: "Button to confirm the change" }).click();
    });

    await test.step("Then the page displays \"Current password is not correct.\"", async () => {
      await expect(page.getByText("Current password is not correct.").first()).toBeVisible();
    });
  });

  // @story:SCRUM-25
  // @ac:3
  // @design:D8
  // @type:functional
  // @technique:equivalence-partitioning
  // @llm-generated
  test("AC-3 Mismatched new password and repeat are refused", async ({ page }, testInfo) => {
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      await page.goto("/#/login");
      await page.getByLabel("Email").fill(process.env["AQA_APP_USER"] ?? "");
      await page.getByRole("textbox", { name: "Text field for the login password" }).fill(process.env["AQA_APP_PASS"] ?? "");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page).not.toHaveURL(/\/#\/login/, { timeout: 10000 });
    });

    await test.step("When I navigate to \"/#/privacy-security/change-password\"", async () => {
      await page.goto("/#/privacy-security/change-password");
      await expect(page.getByRole("heading", { name: "Change Password" })).toBeVisible();
    });

    await test.step("And I find the \"Field to enter the current password\" field and enter the current password", async () => {
      await page.getByLabel("Field to enter the current password").fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And I find the \"Field for the new password\" field and enter \"NewP@ss99\"", async () => {
      await page.getByLabel("Field for the new password").fill("NewP@ss99");
    });

    await test.step("And I find the \"Field to repeat the new password\" field and enter \"DifferentP@ss88\"", async () => {
      await page.getByLabel("Field to repeat the new password").fill("DifferentP@ss88");
    });

    await test.step("Then the \"Button to confirm the change\" button is disabled", async () => {
      await expect(page.getByRole("button", { name: "Button to confirm the change" })).toBeDisabled();
    });
  });

  // @story:SCRUM-25
  // @ac:1
  // @design:D9
  // @type:security
  // @technique:error-guessing
  test("AC-1 security Unauthenticated user cannot access the change password page", async ({ page }, testInfo) => {
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("When I navigate to \"/#/privacy-security/change-password\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("Then the URL contains \"/#/login\"", async () => {
      // @bdd2pw lane=rule rule=rule-39
      await expect(changePasswordPage.page).toHaveURL(new RegExp("/#/login"));
    });
  });

  // @story:SCRUM-25
  // @ac:1
  // @design:D11
  // @type:accessibility
  // @technique:checklist-based
  // @llm-generated
  test("AC-1 Accessibility of the Change Password form", async ({ page }, testInfo) => {
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await changePasswordPage.goto();
      await changePasswordPage.closeWelcomeBannerButton.click();
      await changePasswordPage.email.fill("customer@example.com");
      await changePasswordPage.password.fill("Customer1!");
      await changePasswordPage.loginButton.click();
    });

    await test.step("When I navigate to \"/#/privacy-security/change-password\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: changePasswordPage.page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
