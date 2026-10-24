import { test, expect } from "@playwright/test";
import { SignInPage } from "../pages/sign-in.page";

test.describe("Signing in", () => {

  // @story:109
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-1 Standard user signs in with correct password", async ({ page }, testInfo) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await signInPage.goto();
    });

    await test.step("When I fill in the username with the standard user credentials", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await signInPage.usernameInput.fill("standard_user");
    });

    await test.step("And I fill in the password with the standard user credentials", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await signInPage.passwordInput.fill("secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await signInPage.loginButton.click();
    });

    await test.step("Then the URL changes away from the login page", async () => {
      await expect(signInPage.page).not.toHaveURL(/.*\/$/);
    });

    await test.step("And the page displays \"Products\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(signInPage.page.getByText("Products").first()).toBeVisible();
    });
  });

  // @story:109
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:equivalence-partitioning
  // @llm-generated
  test("AC-2 Wrong password shows an error and the product list is not shown", async ({ page }, testInfo) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await signInPage.goto();
    });

    await test.step("When I fill in the username with the standard user credentials", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await signInPage.usernameInput.fill("standard_user");
    });

    await test.step("And I fill in the password with a wrong password", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await signInPage.passwordInput.fill("wrong_password");
    });

    await test.step("And Click the \"Login\" button", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await signInPage.loginButton.click();
    });

    await test.step("Then the page displays \"Username and password do not match any user in this service\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(signInPage.page.getByText("Username and password do not match any user in this service").first()).toBeVisible();
    });
  });

  // @story:109
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:boundary-value-analysis
  test("AC-3 Empty username shows a required-field error", async ({ page }, testInfo) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await signInPage.goto();
    });

    await test.step("When I leave the Username field empty", async () => {
      // @bdd2pw lane=rule rule=rule-44
      // intentionally left empty: Username
    });

    await test.step("And Click the \"Login\" button", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await signInPage.loginButton.click();
    });

    await test.step("Then the page displays \"Epic sadface: Username is required\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(signInPage.page.getByText("Epic sadface: Username is required").first()).toBeVisible();
    });
  });

  // @story:109
  // @bug:121
  // @design:D4
  // @type:confirmation
  // @technique:state-transition
  // @llm-generated
  test("AC-1 Problem user product images are distinct after sign-in", async ({ page }, testInfo) => {
    test.fail(true, "Bug #121 Active: Problem user sees the same picture for every product");
    const signInPage = new SignInPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await signInPage.goto();
    });

    await test.step("When I fill in the username with the problem user credentials", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await signInPage.usernameInput.fill("problem_user");
    });

    await test.step("And I fill in the password with the standard user credentials", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await signInPage.passwordInput.fill("secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await signInPage.login.click();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(signInPage.page.getByText("Products").first()).toBeVisible();
    });

    await test.step("And each product image is distinct", async () => {
      const images = signInPage.page.locator(".inventory_item img");
      const count = await images.count();
      const srcs: string[] = [];
      for (let i = 0; i < count; i++) {
        const src = await images.nth(i).getAttribute("src");
        srcs.push(src ?? "");
      }
      const uniqueSrcs = new Set(srcs);
      expect(uniqueSrcs.size, `Expected each product to have a distinct image src, but got ${uniqueSrcs.size} unique src(s) out of ${count} products: ${JSON.stringify(srcs)}`).toBe(count);
    });
  });

  // @story:109
  // @design:D5
  // @type:accessibility
  // @technique:checklist-based
  test("AC-story Sign-in page passes accessibility checks", async ({ page }, testInfo) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await signInPage.goto();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: signInPage.page })
        .include("form")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });

  // @story:110
  // @ac:1
  // @design:D6
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-1 Locked-out user sees lockout error and product list is not shown", async ({ page }) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await signInPage.goto();
    });

    await test.step("When I enter the locked_out_user credentials", async () => {
      await page.getByRole("textbox", { name: "Username" }).fill("locked_out_user");
      await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce");
    });

    await test.step("And I click Login", async () => {
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Then the page displays the lockout error", async () => {
      await expect(page.getByText("Epic sadface: Sorry, this user has been locked out.").first()).toBeVisible();
    });

    await test.step("And the product list is not shown", async () => {
      await expect(page.getByText("Products")).not.toBeVisible();
    });
  });

  // @story:110
  // @ac:2
  // @design:D7
  // @type:functional
  // @technique:state-transition
  test("AC-2 Navigating to product list without signing in shows sign-in page with error", async ({ page }) => {
    await test.step("Given I navigate to the product list address directly", async () => {
      await page.goto("/inventory.html");
    });

    await test.step("Then the sign-in page is shown", async () => {
      await expect(page.getByText("Swag Labs").first()).toBeVisible();
    });

    await test.step("And an error saying sign-in is needed is shown", async () => {
      await expect(page.getByText("Epic sadface: You can only access '/inventory.html' when you are logged in.").first()).toBeVisible();
    });
  });

  // @story:110
  // @ac:3
  // @design:D8
  // @type:functional
  // @technique:error-guessing
  test("AC-3a Sign-in page renders key form elements", async ({ page }) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await signInPage.goto();
    });

    await test.step("Then the page displays Swag Labs", async () => {
      await expect(page.getByText("Swag Labs").first()).toBeVisible();
    });

    await test.step("And the Username field is visible", async () => {
      await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
    });

    await test.step("And the Password field is visible", async () => {
      await expect(page.getByRole("textbox", { name: "Password" })).toBeVisible();
    });

    await test.step("And the Login button is enabled", async () => {
      await expect(page.getByRole("button", { name: "Login" })).toBeEnabled();
    });
  });

  // @story:110
  // @ac:3
  // @design:D9
  // @type:accessibility
  // @technique:checklist-based
  test("AC-3b Sign-in page passes WCAG 2.1 A/AA accessibility scan", async ({ page }) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I am on the sign-in page", async () => {
      await signInPage.goto();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page })
        .include("form")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
