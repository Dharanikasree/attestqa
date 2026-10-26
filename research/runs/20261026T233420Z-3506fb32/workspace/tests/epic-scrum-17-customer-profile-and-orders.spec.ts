import { test, expect } from "@playwright/test";
import { ChangePasswordPage } from "../pages/change-password.page";
import AxeBuilder from "@axe-core/playwright";

test.describe("Customer profile and orders", () => {

  test.beforeEach(async ({ page }) => {
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am on the login page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await page.goto("/#/login");
    });

    await test.step("Dismiss cookie consent if present", async () => {
      const dismissBtn = page.getByRole("button", { name: "dismiss cookie message" });
      await dismissBtn.waitFor({ state: "visible", timeout: 4000 }).catch(() => {});
      if (await dismissBtn.isVisible()) {
        await dismissBtn.click();
      }
    });

    await test.step("Dismiss welcome banner if present", async () => {
      const closeBtn = page.getByRole("button", { name: "Close Welcome Banner" });
      await closeBtn.waitFor({ state: "visible", timeout: 4000 }).catch(() => {});
      if (await closeBtn.isVisible()) {
        await closeBtn.click();
      }
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
      // TODO: No 'Submit' button field exists in the ChangePasswordPage POM.
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
      // TODO: No login credentials or authentication flow are defined in the POM.
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the Country field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: No Country field on ChangePasswordPage POM.
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
      // TODO: No login credentials or authentication flow are defined in the POM.
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the Name field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: No Name field on ChangePasswordPage POM.
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
      // TODO: No login credentials or authentication flow are defined in the POM.
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the Mobile Number field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: No Mobile Number field on ChangePasswordPage POM.
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
      // TODO: No login credentials or authentication flow are defined in the POM.
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the ZIP Code field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: No ZIP Code field on ChangePasswordPage POM.
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
      // TODO: No login credentials or authentication flow are defined in the POM.
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the Address field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: No Address field on ChangePasswordPage POM.
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
      // TODO: No login credentials or authentication flow are defined in the POM.
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the City field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: No City field on ChangePasswordPage POM.
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
      // TODO: No login credentials or authentication flow are defined in the POM.
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] And I leave the State field empty and fill all other required fields", async () => {
      // @bdd2pw lane=todo
      // TODO: No State field on ChangePasswordPage POM.
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
      // TODO: No login credentials or authentication flow are defined in the POM.
    });

    await test.step("When I navigate to \"/#/address/create\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
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
      // TODO: No login credentials or authentication flow are defined in the POM.
    });

    await test.step("When I navigate to \"/#/address/select\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await changePasswordPage.goto();
    });

    await test.step("[SKIPPED] Then I only see addresses belonging to the current user", async () => {
      // @bdd2pw lane=todo
      // TODO: Cannot determine a locator or assertion for 'addresses belonging to the current user'.
    });
  });

  // ---------------------------------------------------------------------------
  // SCRUM-25: Customer changes their password
  // ---------------------------------------------------------------------------

  // Helper: log in as the registered test customer
  async function loginAsTestUser(page: any) {
    await page.goto("/#/login");
    await page.getByLabel("Email").fill(process.env["AQA_APP_USER"] ?? "");
    await page.locator("input[type='password']").fill(process.env["AQA_APP_PASS"] ?? "");
    await page.getByRole("button", { name: "Login" }).click();
    // Precondition: verify login succeeded before proceeding
    await expect(page.getByRole("button", { name: "Show/hide account menu" })).toBeVisible({ timeout: 10000 });
  }

  // @story:SCRUM-25
  // @ac:1
  // @design:D6
  // @type:functional
  // @technique:state-transition
  test("AC-1 Correct current password and matching new password changes password and shows confirmation", async ({ page }, testInfo) => {
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      await loginAsTestUser(page);
    });

    await test.step("When I navigate to \"/#/privacy-security/change-password\"", async () => {
      await page.goto("/#/privacy-security/change-password");
    });

    await test.step("Precondition: change password form is visible", async () => {
      await expect(changePasswordPage.changePasswordHeading).toBeVisible({ timeout: 5000 });
    });

    await test.step("And I find the Current Password field and enter the current password", async () => {
      await changePasswordPage.currentPassword.fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And I find the New Password field and enter \"NewPass123!\"", async () => {
      await changePasswordPage.newPassword.fill("NewPass123!");
    });

    await test.step("And I find the Repeat New Password field and enter \"NewPass123!\"", async () => {
      await changePasswordPage.repeatNewPassword.fill("NewPass123!");
    });

    await test.step("And I click \"Change\"", async () => {
      await changePasswordPage.buttonToConfirmTheChangeButton.click();
    });

    await test.step("Then the page displays \"Password successfully changed\"", async () => {
      await expect(changePasswordPage.page.getByText("Password successfully changed").first()).toBeVisible({ timeout: 10000 });
    });

    // Restore the original password so other tests keep working
    await test.step("Restore original password: enter new password as current", async () => {
      await changePasswordPage.currentPassword.fill("NewPass123!");
    });

    await test.step("Restore original password: enter original password as new", async () => {
      await changePasswordPage.newPassword.fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("Restore original password: repeat original password", async () => {
      await changePasswordPage.repeatNewPassword.fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("Restore original password: click Change", async () => {
      await changePasswordPage.buttonToConfirmTheChangeButton.click();
    });

    await test.step("Restore confirmed: page displays \"Password successfully changed\"", async () => {
      await expect(changePasswordPage.page.getByText("Password successfully changed").first()).toBeVisible({ timeout: 10000 });
    });
  });

  // @story:SCRUM-25
  // @ac:2
  // @design:D7
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-2 Wrong current password is refused with a message", async ({ page }, testInfo) => {
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      await loginAsTestUser(page);
    });

    await test.step("When I navigate to \"/#/privacy-security/change-password\"", async () => {
      await page.goto("/#/privacy-security/change-password");
    });

    await test.step("Precondition: change password form is visible", async () => {
      await expect(changePasswordPage.changePasswordHeading).toBeVisible({ timeout: 5000 });
    });

    await test.step("And I find the Current Password field and enter \"WrongPassword999\"", async () => {
      await changePasswordPage.currentPassword.fill("WrongPassword999");
    });

    await test.step("And I find the New Password field and enter \"NewPass123!\"", async () => {
      await changePasswordPage.newPassword.fill("NewPass123!");
    });

    await test.step("And I find the Repeat New Password field and enter \"NewPass123!\"", async () => {
      await changePasswordPage.repeatNewPassword.fill("NewPass123!");
    });

    await test.step("And I click \"Change\"", async () => {
      await changePasswordPage.buttonToConfirmTheChangeButton.click();
    });

    await test.step("Then the page displays \"Current password is not correct\"", async () => {
      await expect(changePasswordPage.page.getByText("Current password is not correct").first()).toBeVisible({ timeout: 10000 });
    });
  });

  // @story:SCRUM-25
  // @ac:3
  // @design:D8
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-3 Mismatched new password and repeat disables the Change button", async ({ page }, testInfo) => {
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      await loginAsTestUser(page);
    });

    await test.step("When I navigate to \"/#/privacy-security/change-password\"", async () => {
      await page.goto("/#/privacy-security/change-password");
    });

    await test.step("Precondition: change password form is visible", async () => {
      await expect(changePasswordPage.changePasswordHeading).toBeVisible({ timeout: 5000 });
    });

    await test.step("And I find the Current Password field and enter the current password", async () => {
      await changePasswordPage.currentPassword.fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And I find the New Password field and enter \"NewPass123!\"", async () => {
      await changePasswordPage.newPassword.fill("NewPass123!");
    });

    await test.step("And I find the Repeat New Password field and enter \"DifferentPass456!\"", async () => {
      await changePasswordPage.repeatNewPassword.fill("DifferentPass456!");
    });

    await test.step("Then the Change button is disabled", async () => {
      await expect(changePasswordPage.buttonToConfirmTheChangeButton).toBeDisabled();
    });
  });

  // @story:SCRUM-25
  // @ac:1
  // @design:D9
  // @type:security
  // @technique:error-guessing
  test("AC-1 security Change password page redirects unauthenticated users", async ({ page }, testInfo) => {
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Precondition: ensure no auth token in storage (unauthenticated state)", async () => {
      await page.evaluate(() => {
        window.localStorage.removeItem("token");
        window.sessionStorage.clear();
      });
    });

    await test.step("When I navigate to \"/#/privacy-security/change-password\"", async () => {
      await page.goto("/#/privacy-security/change-password");
    });

    await test.step("Then the URL contains \"/#/login\"", async () => {
      // @bdd2pw lane=rule rule=rule-39
      await expect(changePasswordPage.page).toHaveURL(new RegExp("/#/login"), { timeout: 5000 });
    });
  });

  // @story:SCRUM-25
  // @design:D10
  // @type:accessibility
  // @technique:checklist-based
  test("AC-story Accessibility of the Change Password form", async ({ page }, testInfo) => {
    const changePasswordPage = new ChangePasswordPage(page);

    await test.step("Given I am logged in as a registered customer", async () => {
      await loginAsTestUser(page);
    });

    await test.step("When I navigate to \"/#/privacy-security/change-password\"", async () => {
      await page.goto("/#/privacy-security/change-password");
    });

    await test.step("Precondition: change password form is visible", async () => {
      await expect(changePasswordPage.changePasswordHeading).toBeVisible({ timeout: 5000 });
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      const axeResults = await new AxeBuilder({ page: changePasswordPage.page })
        .include("mat-card")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations on Change Password form: ${JSON.stringify(axeResults.violations.map(v => ({ id: v.id, description: v.description })), null, 2)}`).toEqual([]);
    });
  });
});
