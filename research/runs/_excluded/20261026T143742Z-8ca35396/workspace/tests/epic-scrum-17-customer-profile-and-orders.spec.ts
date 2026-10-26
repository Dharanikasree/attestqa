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
    test.fixme(true, "bdd2pw: 3 step(s) not bound — Given I am logged in as a registered customer | And I fill in the address form with country \"Germany\" name \"Test User\" mobile \"01234567890\" zip \"10115\" address \"Unter den Linden 1\" city \"Berlin\" state \"Berlin\" | And I click \"Submit\"");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("[SKIPPED] Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=todo
      // TODO: No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I fill in the address form with country \"Germany\" name \"Test User\" mobile \"01234567890\" zip \"10115\" address \"Unter den Linden 1\" city \"Berlin\" state \"Berlin\"", async () => {
      // @bdd2pw lane=todo
      // TODO: No address form fields (country, name, mobile, zip, address, city, state) exist in the ChangePasswordPage POM; this step belongs to an address/delivery page, not the change-password page.
    });

    await test.step("[SKIPPED] And I click \"Submit\"", async () => {
      // @bdd2pw lane=todo
      // TODO: No 'Submit' button field exists in the ChangePasswordPage POM; the available confirm button is 'buttonToConfirmTheChangeButton' but it is unclear if that maps to a generic 'Submit' action in this context.
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
    test.fixme(true, "bdd2pw: 3 step(s) not bound — Given I am logged in as a registered customer | And I fill in the address form with country \"Germany\" name \"Test User\" mobile \"01234567890\" zip \"10115\" address \"Unter den Linden 1\" city \"Berlin\" state \"Berlin\" | And I click \"Submit\"");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("[SKIPPED] Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=todo
      // TODO: No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I fill in the address form with country \"Germany\" name \"Test User\" mobile \"01234567890\" zip \"10115\" address \"Unter den Linden 1\" city \"Berlin\" state \"Berlin\"", async () => {
      // @bdd2pw lane=todo
      // TODO: No address form fields (country, name, mobile, zip, address, city, state) exist in the ChangePasswordPage POM; this step belongs to an address/delivery page, not the change-password page.
    });

    await test.step("[SKIPPED] And I click \"Submit\"", async () => {
      // @bdd2pw lane=todo
      // TODO: No 'Submit' button field exists in the ChangePasswordPage POM; the available confirm button is 'buttonToConfirmTheChangeButton' but it is unclear if that maps to a generic 'Submit' action in this context.
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
    test.fixme(true, "bdd2pw: 2 step(s) not bound — Given I am logged in as a registered customer | And I leave the Country field empty and fill all other required fields");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("[SKIPPED] Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=todo
      // TODO: No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the Country field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: This step references a 'Country field' which does not exist on the ChangePasswordPage POM (which only has Current Password, New Password, and Repeat New Password fields). Cannot determine which fields constitute 'all other required fields' without a form context that includes a Country field. Please hand-edit this step binding.
    });

    await test.step("Then the Submit button is disabled", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(changePasswordPage.buttonToConfirmTheChangeButton).toHaveAttribute("disabled", "");
    });
  });

  // @story:SCRUM-24
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-3 Address cannot be submitted while any required field is empty [field=Name]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 2 step(s) not bound — Given I am logged in as a registered customer | And I leave the Name field empty and fill all other required fields");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("[SKIPPED] Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=todo
      // TODO: No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the Name field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: The Change Password page POM has no 'Name' field — it only has currentPassword, newPassword, and repeatNewPassword fields. It is unclear which field should be left empty or what 'Name' refers to in this context; manual mapping is required.
    });

    await test.step("Then the Submit button is disabled", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(changePasswordPage.buttonToConfirmTheChangeButton).toHaveAttribute("disabled", "");
    });
  });

  // @story:SCRUM-24
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-3 Address cannot be submitted while any required field is empty [field=Mobile Number]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 2 step(s) not bound — Given I am logged in as a registered customer | And I leave the Mobile Number field empty and fill all other required fields");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("[SKIPPED] Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=todo
      // TODO: No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the Mobile Number field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: The step references a 'Mobile Number' field, but no such field exists in the ChangePasswordPage POM. The POM only contains currentPassword, newPassword, and repeatNewPassword fields. Cannot determine which fields constitute 'all other required fields' without a Mobile Number input present on this page.
    });

    await test.step("Then the Submit button is disabled", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(changePasswordPage.buttonToConfirmTheChangeButton).toHaveAttribute("disabled", "");
    });
  });

  // @story:SCRUM-24
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-3 Address cannot be submitted while any required field is empty [field=ZIP Code]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 2 step(s) not bound — Given I am logged in as a registered customer | And I leave the ZIP Code field empty and fill all other required fields");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("[SKIPPED] Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=todo
      // TODO: No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the ZIP Code field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: This step references a ZIP Code field and 'all other required fields', but the ChangePasswordPage POM contains no ZIP Code field or any address/registration form fields — only password-related inputs (currentPassword, newPassword, repeatNewPassword). Cannot map this step to any POM field without knowing which page/form is intended.
    });

    await test.step("Then the Submit button is disabled", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(changePasswordPage.buttonToConfirmTheChangeButton).toHaveAttribute("disabled", "");
    });
  });

  // @story:SCRUM-24
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-3 Address cannot be submitted while any required field is empty [field=Address]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 2 step(s) not bound — Given I am logged in as a registered customer | And I leave the Address field empty and fill all other required fields");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("[SKIPPED] Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=todo
      // TODO: No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the Address field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: This step references an 'Address field' which does not exist on the ChangePasswordPage POM (which only has Current Password, New Password, and Repeat New Password fields). The step cannot be mapped without knowing which page/form contains the Address field and what 'all other required fields' are.
    });

    await test.step("Then the Submit button is disabled", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(changePasswordPage.buttonToConfirmTheChangeButton).toHaveAttribute("disabled", "");
    });
  });

  // @story:SCRUM-24
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-3 Address cannot be submitted while any required field is empty [field=City]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 2 step(s) not bound — Given I am logged in as a registered customer | And I leave the City field empty and fill all other required fields");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("[SKIPPED] Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=todo
      // TODO: No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the City field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: The Change Password page POM has no 'City' field or any address/city-related fields; this step cannot be mapped to any POM element and requires manual implementation.
    });

    await test.step("Then the Submit button is disabled", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(changePasswordPage.buttonToConfirmTheChangeButton).toHaveAttribute("disabled", "");
    });
  });

  // @story:SCRUM-24
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-3 Address cannot be submitted while any required field is empty [field=State]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 2 step(s) not bound — Given I am logged in as a registered customer | And I leave the State field empty and fill all other required fields");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("[SKIPPED] Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=todo
      // TODO: No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the State field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: The step references a 'State field' but no such field exists in the ChangePasswordPage POM (which only has currentPassword, newPassword, and repeatNewPassword fields). Cannot determine which fields to fill or leave empty without more context.
    });

    await test.step("Then the Submit button is disabled", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(changePasswordPage.buttonToConfirmTheChangeButton).toHaveAttribute("disabled", "");
    });
  });

  // @story:SCRUM-24
  // @design:D4
  // @type:accessibility
  // @technique:checklist-based
  // @llm-generated
  test("AC-story Accessibility of the Create Address form", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — Given I am logged in as a registered customer");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("[SKIPPED] Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=todo
      // TODO: No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
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
    test.fixme(true, "bdd2pw: 2 step(s) not bound — Given I am logged in as a registered customer | Then I only see addresses belonging to the current user");
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("[SKIPPED] Given I am logged in as a registered customer", async () => {
      // @bdd2pw lane=todo
      // TODO: No login credentials or authentication flow are defined in the POM; cannot determine how to log in as a registered customer without a username/password or a dedicated login helper method.
    });

    await test.step("When I navigate to \"/#/address/select\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] Then I only see addresses belonging to the current user", async () => {
      // @bdd2pw lane=todo
      // TODO: Cannot determine a locator or assertion for 'addresses belonging to the current user' — no address list or user-scoped address field exists in the ChangePasswordPage POM. This step likely belongs to a different page (e.g. AddressPage) and will need a hand-written assertion against the appropriate locator.
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
      await page.fill("#email", process.env["AQA_APP_USER"] ?? "");
      await page.fill("#password", process.env["AQA_APP_PASS"] ?? "");
      await page.click("#loginButton");
      const response = await page.waitForResponse(r => r.url().includes("/rest/user/login") && r.request().method() === "POST");
      expect(response.status(), "Precondition: login must succeed (check AQA_APP_USER and AQA_APP_PASS)").toBe(200);
    });

    await test.step("When I navigate to \"/#/privacy-security/change-password\"", async () => {
      await changePasswordPage.goto();
    });

    await test.step("And I find the Current Password field and enter the current password", async () => {
      await changePasswordPage.currentPassword.fill(process.env["AQA_APP_PASS"] ?? "");
    });

    const newPass = "AqaTemp!9";

    await test.step("And I find the New Password field and enter the new password", async () => {
      await changePasswordPage.newPassword.fill(newPass);
    });

    await test.step("And I find the Repeat New Password field and enter the new password", async () => {
      await changePasswordPage.repeatNewPassword.fill(newPass);
    });

    await test.step("And Click the \"Change\" button", async () => {
      await changePasswordPage.buttonToConfirmTheChangeButton.click();
    });

    await test.step("Then the page displays \"Password successfully changed\"", async () => {
      await expect(changePasswordPage.page.getByText("Password successfully changed").first()).toBeVisible();
    });

    // Restore original password so other tests keep working (per product owner comment)
    await test.step("When I find the Current Password field and enter the new password", async () => {
      await changePasswordPage.currentPassword.fill(newPass);
    });

    await test.step("And I find the New Password field and enter the original password", async () => {
      await changePasswordPage.newPassword.fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And I find the Repeat New Password field and enter the original password", async () => {
      await changePasswordPage.repeatNewPassword.fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And Click the \"Change\" button", async () => {
      await changePasswordPage.buttonToConfirmTheChangeButton.click();
    });

    await test.step("Then the page displays \"Password successfully changed\"", async () => {
      await expect(changePasswordPage.page.getByText("Password successfully changed").first()).toBeVisible();
    });
  });

  // @story:SCRUM-25
  // @ac:2
  // @design:D7
  // @type:functional
  // @technique:equivalence-partitioning
  // @llm-generated
  test("AC-2 Wrong current password refuses the change with a message", async ({ page }, testInfo) => {
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      await page.goto("/#/login");
      await page.fill("#email", process.env["AQA_APP_USER"] ?? "");
      await page.fill("#password", process.env["AQA_APP_PASS"] ?? "");
      await page.click("#loginButton");
      const response = await page.waitForResponse(r => r.url().includes("/rest/user/login") && r.request().method() === "POST");
      expect(response.status(), "Precondition: login must succeed (check AQA_APP_USER and AQA_APP_PASS)").toBe(200);
    });

    await test.step("When I navigate to \"/#/privacy-security/change-password\"", async () => {
      await changePasswordPage.goto();
    });

    await test.step("And I find the Current Password field and enter \"wrongpassword123\"", async () => {
      await changePasswordPage.currentPassword.fill("wrongpassword123");
    });

    await test.step("And I find the New Password field and enter \"newpass123\"", async () => {
      await changePasswordPage.newPassword.fill("newpass123");
    });

    await test.step("And I find the Repeat New Password field and enter \"newpass123\"", async () => {
      await changePasswordPage.repeatNewPassword.fill("newpass123");
    });

    await test.step("And Click the \"Change\" button", async () => {
      await changePasswordPage.buttonToConfirmTheChangeButton.click();
    });

    await test.step("Then the page displays \"Current password is not correct\"", async () => {
      await expect(changePasswordPage.page.getByText("Current password is not correct").first()).toBeVisible();
    });
  });

  // @story:SCRUM-25
  // @ac:3
  // @design:D8
  // @type:functional
  // @technique:decision-table
  // @llm-generated
  test("AC-3 New password and repeat differ keeps the Change button disabled", async ({ page }, testInfo) => {
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("When I navigate to \"/#/privacy-security/change-password\"", async () => {
      await changePasswordPage.goto();
    });

    await test.step("And I find the Current Password field and enter a value", async () => {
      await changePasswordPage.currentPassword.fill("somepassword1");
    });

    await test.step("And I find the New Password field and enter \"newpass123\"", async () => {
      await changePasswordPage.fieldForTheNewPasswordInput.fill("newpass123");
    });

    await test.step("And I find the Repeat New Password field and enter \"differentpass456\"", async () => {
      await changePasswordPage.fieldToRepeatTheNewPasswordInput.fill("differentpass456");
    });

    await test.step("Then the Change button is disabled", async () => {
      await expect(changePasswordPage.buttonToConfirmTheChangeButton).toBeDisabled();
    });
  });

  // @story:SCRUM-25
  // @design:D9
  // @type:accessibility
  // @technique:checklist-based
  // @llm-generated
  test("AC-story Accessibility of the Change Password form", async ({ page }, testInfo) => {
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      await page.goto("/#/login");
      await page.fill("#email", process.env["AQA_APP_USER"] ?? "");
      await page.fill("#password", process.env["AQA_APP_PASS"] ?? "");
      await page.click("#loginButton");
      const response = await page.waitForResponse(r => r.url().includes("/rest/user/login") && r.request().method() === "POST");
      expect(response.status(), "Precondition: login must succeed (check AQA_APP_USER and AQA_APP_PASS)").toBe(200);
    });

    await test.step("When I navigate to \"/#/privacy-security/change-password\"", async () => {
      await changePasswordPage.goto();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: changePasswordPage.page })
        .include("mat-card")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });

  // @story:SCRUM-25
  // @ac:1
  // @design:D10
  // @type:security
  // @technique:error-guessing
  test("AC-1 security Change password form is only accessible to signed-in customers", async ({ page }, testInfo) => {
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
});
