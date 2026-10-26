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
  test("AC-1 Correct current password and matching new password changes the password and shows confirmation", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 2 step(s) not bound — And I click \"Change\" | And I click \"Change\"");
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

    await test.step("And I find the \"Field to enter the current password\" field and enter \"current_password_placeholder\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByPlaceholder("Field to enter the current password").first().fill("current_password_placeholder");
    });

    await test.step("And I find the \"Field for the new password\" field and enter \"new_password_placeholder\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByPlaceholder("Field for the new password").first().fill("new_password_placeholder");
    });

    await test.step("And I find the \"Field to repeat the new password\" field and enter \"new_password_placeholder\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByPlaceholder("Field to repeat the new password").first().fill("new_password_placeholder");
    });

    await test.step("[SKIPPED] And I click \"Change\"", async () => {
      // @bdd2pw lane=todo
      // TODO: No POM field for a 'Change' button exists on ChangePasswordPage; the available buttons are Login, dismiss cookie message, Open Sidenav, etc. A locator for the Change button cannot be resolved without a DOM snapshot or POM entry.
    });

    await test.step("Then the page displays \"Password successfully changed\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(changePasswordPage.page.getByText("Password successfully changed").first()).toBeVisible();
    });

    await test.step("And I find the \"Field to enter the current password\" field and enter \"new_password_placeholder\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByPlaceholder("Field to enter the current password").first().fill("new_password_placeholder");
    });

    await test.step("And I find the \"Field for the new password\" field and enter \"current_password_placeholder\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByPlaceholder("Field for the new password").first().fill("current_password_placeholder");
    });

    await test.step("And I find the \"Field to repeat the new password\" field and enter \"current_password_placeholder\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByPlaceholder("Field to repeat the new password").first().fill("current_password_placeholder");
    });

    await test.step("[SKIPPED] And I click \"Change\"", async () => {
      // @bdd2pw lane=todo
      // TODO: No POM field for a 'Change' button exists on ChangePasswordPage; the available buttons are Login, dismiss cookie message, Open Sidenav, etc. A locator for the Change button cannot be resolved without a DOM snapshot or POM entry.
    });

    await test.step("Then the page displays \"Password successfully changed\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(changePasswordPage.page.getByText("Password successfully changed").first()).toBeVisible();
    });
  });

  // @story:SCRUM-25
  // @ac:2
  // @design:D7
  // @type:functional
  // @technique:equivalence-partitioning
  // @llm-generated
  test("AC-2 Wrong current password is refused with an error message", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — And I click \"Change\"");
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

    await test.step("And I find the \"Field to enter the current password\" field and enter \"wrongpassword123\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByLabel('Field to enter the current password').first().fill('wrongpassword123');
    });

    await test.step("And I find the \"Field for the new password\" field and enter \"NewPass1!\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByLabel('Field for the new password').first().fill('NewPass1!');
    });

    await test.step("And I find the \"Field to repeat the new password\" field and enter \"NewPass1!\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByLabel('Field to repeat the new password').first().fill('NewPass1!');
    });

    await test.step("[SKIPPED] And I click \"Change\"", async () => {
      // @bdd2pw lane=todo
      // TODO: No POM field for a 'Change' button exists on ChangePasswordPage; the available buttons are Login, dismiss cookie message, Open Sidenav, etc. A locator for the Change button cannot be resolved without a DOM snapshot or POM entry.
    });

    await test.step("Then the page displays \"Current password is not correct\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(changePasswordPage.page.getByText("Current password is not correct").first()).toBeVisible();
    });
  });

  // @story:SCRUM-25
  // @ac:3
  // @design:D8
  // @type:functional
  // @technique:equivalence-partitioning
  // @llm-generated
  test("AC-3 Mismatched new password and repeat disables the Change button", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 2 step(s) not bound — And I find the \"Field to repeat the new password\" field and enter \"DifferentPass2@\" | Then the \"Button to confirm the change\" button is disabled");
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

    await test.step("And I find the \"Field to enter the current password\" field and enter \"current_password_placeholder\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await page.getByPlaceholder("Field to enter the current password").first().fill("current_password_placeholder");
    });

    await test.step("And I find the \"Field for the new password\" field and enter \"NewPass1!\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await page.getByLabel('Field for the new password').first().fill('NewPass1!');
    });

    await test.step("[SKIPPED] And I find the \"Field to repeat the new password\" field and enter \"DifferentPass2@\"", async () => {
      // @bdd2pw lane=todo
      // TODO: No POM field matches 'Field to repeat the new password' (a repeat/confirm password input on a change-password form). The POM only exposes login-page fields. Please add a confirmPassword or repeatPassword field to the POM and hand-edit this step.
    });

    await test.step("[SKIPPED] Then the \"Button to confirm the change\" button is disabled", async () => {
      // @bdd2pw lane=todo
      // TODO: No POM field matches 'Button to confirm the change' and the matcher 'toBeDisabled' is not in the allowed matcher list; please add a POM field for the confirm-change button and assert expect(locator).toBeDisabled() manually.
    });
  });

  // @story:SCRUM-25
  // @ac:1
  // @design:D9
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-1 Password length boundary — <label> [label=4-character password refused, password=abcd, state=disabled]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — Then the \"Button to confirm the change\" button is disabled");
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

    await test.step("And I find the \"Field to enter the current password\" field and enter \"current_password_placeholder\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await page.getByPlaceholder("Field to enter the current password").first().fill("current_password_placeholder");
    });

    await test.step("And I find the \"Field for the new password\" field and enter \"abcd\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByLabel("Field for the new password").first().fill("abcd");
    });

    await test.step("And I find the \"Field to repeat the new password\" field and enter \"abcd\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByLabel("Field to repeat the new password").first().fill("abcd");
    });

    await test.step("[SKIPPED] Then the \"Button to confirm the change\" button is disabled", async () => {
      // @bdd2pw lane=todo
      // TODO: No POM field matches 'Button to confirm the change' and the matcher 'toBeDisabled' is not in the allowed matcher list; please add a POM field for the confirm-change button and assert expect(locator).toBeDisabled() manually.
    });
  });

  // @story:SCRUM-25
  // @ac:1
  // @design:D9
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-1 Password length boundary — <label> [label=5-character password accepted, password=abcde, state=enabled]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 3 step(s) not bound — And I find the \"Field for the new password\" field and enter \"abcde\" | And I find the \"Field to repeat the new password\" field and enter \"abcde\" | Then the \"Button to confirm the change\" button is enabled");
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

    await test.step("And I find the \"Field to enter the current password\" field and enter \"current_password_placeholder\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await page.getByPlaceholder("Field to enter the current password").first().fill("current_password_placeholder");
    });

    await test.step("[SKIPPED] And I find the \"Field for the new password\" field and enter \"abcde\"", async () => {
      // @bdd2pw lane=todo
      // TODO: No POM field matches 'Field for the new password'; this field likely exists on a change-password page not captured in the current POM snapshot — add a 'newPassword' or similar field to the POM and re-run.
    });

    await test.step("[SKIPPED] And I find the \"Field to repeat the new password\" field and enter \"abcde\"", async () => {
      // @bdd2pw lane=todo
      // TODO: No POM field matches 'Field to repeat the new password'; this field likely exists on a change-password page not captured in the current POM snapshot — add a 'repeatNewPassword' or similar field to the POM and re-run.
    });

    await test.step("[SKIPPED] Then the \"Button to confirm the change\" button is enabled", async () => {
      // @bdd2pw lane=todo
      // TODO: No POM field matches 'Button to confirm the change' and 'enabled' (not disabled) is not a supported matcher in the current assertion set — add the button to the POM and use a not.toBeDisabled assertion, then re-run.
    });
  });

  // @story:SCRUM-25
  // @ac:1
  // @design:D9
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-1 Password length boundary — <label> [label=40-character password accepted, password=abcdefghijklmnopqrstuvwxyzabcdefghijklmn, state=enabled]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — Then the \"Button to confirm the change\" button is enabled");
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

    await test.step("And I find the \"Field to enter the current password\" field and enter \"current_password_placeholder\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await page.getByPlaceholder("Field to enter the current password").first().fill("current_password_placeholder");
    });

    await test.step("And I find the \"Field for the new password\" field and enter \"abcdefghijklmnopqrstuvwxyzabcdefghijklmn\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByLabel("Field for the new password").first().fill("abcdefghijklmnopqrstuvwxyzabcdefghijklmn");
    });

    await test.step("And I find the \"Field to repeat the new password\" field and enter \"abcdefghijklmnopqrstuvwxyzabcdefghijklmn\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await page.getByLabel("Field to repeat the new password").first().fill("abcdefghijklmnopqrstuvwxyzabcdefghijklmn");
    });

    await test.step("[SKIPPED] Then the \"Button to confirm the change\" button is enabled", async () => {
      // @bdd2pw lane=todo
      // TODO: No POM field matches 'Button to confirm the change' and 'enabled' (not disabled) is not a supported matcher in the current assertion set — add the button to the POM and use a not.toBeDisabled assertion, then re-run.
    });
  });

  // @story:SCRUM-25
  // @design:D10
  // @type:accessibility
  // @technique:checklist-based
  // @llm-generated
  test("AC-story Accessibility of the Change Password form", async ({ page }, testInfo) => {
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
