import { test, expect } from "@playwright/test";
import { SignInPage } from "../pages/sign-in.page";

test.describe("Customer account", () => {

  // @story:TOOL-13
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:state-transition
  test("AC-1 Valid credentials sign the customer in", async ({ page }, testInfo) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await signInPage.goto();
    });

    await test.step("When I find the \"Email address *\" field and enter the registered email", async () => {
      await page.getByLabel("Email address *").fill(process.env["AQA_APP_USER"] ?? "");
    });

    await test.step("And I find the \"Password *\" field and enter the registered password", async () => {
      await page.getByLabel("Password *").fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And I click \"Login\"", async () => {
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Then the page displays \"My Account\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(signInPage.page.getByText("My Account").first()).toBeVisible();
    });
  });

  // @story:TOOL-13
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-2a Wrong password shows an error and keeps the customer on the sign-in page", async ({ page }, testInfo) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await signInPage.goto();
    });

    await test.step("When I find the \"Email address *\" field and enter the registered email", async () => {
      await page.getByLabel("Email address *").fill(process.env["AQA_APP_USER"] ?? "");
    });

    await test.step("And I find the \"Password *\" field and enter \"wrongpassword\"", async () => {
      await page.getByLabel("Password *").fill("wrongpassword");
    });

    await test.step("And I click \"Login\"", async () => {
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Then the page displays \"Invalid email or password.\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(signInPage.page.getByText("Invalid email or password.").first()).toBeVisible();
    });

    await test.step("And the URL contains \"/auth/login\"", async () => {
      // @bdd2pw lane=rule rule=rule-39
      await expect(signInPage.page).toHaveURL(new RegExp("/auth/login"));
    });
  });

  // @story:TOOL-13
  // @ac:2
  // @design:D3
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-2b Error message does not reveal whether the email has an account [email=registered]", async ({ page }, testInfo) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await signInPage.goto();
    });

    await test.step("When I find the \"Email address *\" field and enter the registered email", async () => {
      await page.getByLabel("Email address *").fill(process.env["AQA_APP_USER"] ?? "");
    });

    await test.step("And I find the \"Password *\" field and enter \"wrongpassword\"", async () => {
      await page.getByLabel("Password *").fill("wrongpassword");
    });

    await test.step("And I click \"Login\"", async () => {
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Then the page displays \"Invalid email or password.\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(signInPage.page.getByText("Invalid email or password.").first()).toBeVisible();
    });
  });

  // @story:TOOL-13
  // @ac:2
  // @design:D3
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-2b Error message does not reveal whether the email has an account [email=unregistered]", async ({ page }, testInfo) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await signInPage.goto();
    });

    await test.step("When I find the \"Email address *\" field and enter an unregistered email", async () => {
      await page.getByLabel("Email address *").fill("unregistered.nobody.xyz@example.com");
    });

    await test.step("And I find the \"Password *\" field and enter \"wrongpassword\"", async () => {
      await page.getByLabel("Password *").fill("wrongpassword");
    });

    await test.step("And I click \"Login\"", async () => {
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Then the page displays \"Invalid email or password.\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(signInPage.page.getByText("Invalid email or password.").first()).toBeVisible();
    });
  });

  // @story:TOOL-13
  // @ac:3
  // @design:D4
  // @type:functional
  // @technique:state-transition
  test("AC-3 Signing out returns Sign in to the header", async ({ page }, testInfo) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I am signed in as a registered customer", async () => {
      await signInPage.goto();
      await page.getByLabel("Email address *").fill(process.env["AQA_APP_USER"] ?? "");
      await page.getByLabel("Password *").fill(process.env["AQA_APP_PASS"] ?? "");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.getByText("My Account").first()).toBeVisible({ timeout: 10000 });
    });

    await test.step("When I open the customer menu and click \"Sign out\"", async () => {
      // Open the user/account menu in the header, then click Sign out
      await page.getByTestId("nav-menu").click();
      await page.getByText("Sign out").click();
    });

    await test.step("Then the page displays \"Sign in\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(signInPage.page.getByText("Sign in").first()).toBeVisible();
    });
  });

  // @story:TOOL-13
  // @ac:4
  // @design:D5
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-4a Sign-in page renders and is reachable", async ({ page }, testInfo) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await signInPage.goto();
    });

    await test.step("Then the page displays \"Login\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(signInPage.page.getByText("Login").first()).toBeVisible();
    });
  });

  // @story:TOOL-13
  // @ac:4
  // @design:D6
  // @type:accessibility
  // @technique:checklist-based
  test("AC-4b Sign-in page passes axe accessibility checks", async ({ page }, testInfo) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await signInPage.goto();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      // Scope to the login form only, to avoid header/footer/widget violations unrelated to this story
      const axeResults = await new AxeBuilder({ page: signInPage.page })
        .include("app-login")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });

  // @story:TOOL-13
  // @ac:1
  // @design:D7
  // @type:security
  // @technique:state-transition
  test("AC-1 sec Session is established only after successful sign-in", async ({ page }, testInfo) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await signInPage.goto();
    });

    await test.step("When I find the \"Email address *\" field and enter the registered email", async () => {
      await page.getByLabel("Email address *").fill(process.env["AQA_APP_USER"] ?? "");
    });

    await test.step("And I find the \"Password *\" field and enter \"wrongpassword\"", async () => {
      await page.getByLabel("Password *").fill("wrongpassword");
    });

    await test.step("And I click \"Login\"", async () => {
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Then the page displays \"Invalid email or password.\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(signInPage.page.getByText("Invalid email or password.").first()).toBeVisible();
    });

    await test.step("When I find the \"Password *\" field and enter the registered password", async () => {
      await page.getByLabel("Password *").fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And I click \"Login\" again", async () => {
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Then the page displays \"My Account\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(signInPage.page.getByText("My Account").first()).toBeVisible();
    });
  });
});
