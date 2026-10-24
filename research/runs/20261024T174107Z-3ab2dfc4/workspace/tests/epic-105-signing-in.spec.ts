import { test, expect } from "@playwright/test";
import { SignInPage } from "../pages/sign-in.page";

test.describe("Signing in", () => {

  // @story:109
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-1 Standard user signs in with correct password and sees the product list", async ({ page }, testInfo) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await signInPage.goto();
    });

    await test.step("When I find the \"username\" field and enter \"standard_user\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await signInPage.usernameInput.fill("standard_user");
    });

    await test.step("And I find the \"password\" field and enter \"secret_sauce\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await signInPage.passwordInput.fill("secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await signInPage.loginButton.click();
    });

    await test.step("Then the URL contains \"/inventory\"", async () => {
      // @bdd2pw lane=rule rule=rule-39
      await expect(signInPage.page).toHaveURL(new RegExp("/inventory"));
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
  test("AC-2 Wrong password shows credentials do not match error and no product list", async ({ page }, testInfo) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await signInPage.goto();
    });

    await test.step("When I find the \"username\" field and enter \"standard_user\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await signInPage.usernameInput.fill("standard_user");
    });

    await test.step("And I find the \"password\" field and enter \"wrong_password\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await signInPage.passwordInput.fill("wrong_password");
    });

    await test.step("And Click the \"Login\" button", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await signInPage.loginButton.click();
    });

    await test.step("Then the page displays \"Epic sadface: Username and password do not match any user in this service\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(signInPage.page.getByText("Epic sadface: Username and password do not match any user in this service").first()).toBeVisible();
    });

    await test.step("And the page does not display \"Products\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await expect(page.getByText("Products").first()).not.toBeVisible();
    });
  });

  // @story:109
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-3 Signing in with username empty shows an error saying the username is required", async ({ page }, testInfo) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await signInPage.goto();
    });

    await test.step("When I leave the Username field empty", async () => {
      // @bdd2pw lane=rule rule=rule-44
      // intentionally left empty: Username
    });

    await test.step("And I find the \"password\" field and enter \"secret_sauce\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await signInPage.passwordInput.fill("secret_sauce");
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
  test("Bug 121 Problem user product images are distinct after sign-in", async ({ page }, testInfo) => {
    test.fail(true, "Bug #121 Active: Problem user sees the same picture for every product");
    const signInPage = new SignInPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await signInPage.goto();
    });

    await test.step("When I find the \"username\" field and enter \"problem_user\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await signInPage.usernameInput.fill("problem_user");
    });

    await test.step("And I find the \"password\" field and enter \"secret_sauce\"", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await signInPage.passwordInput.fill("secret_sauce");
    });

    await test.step("And Click the \"Login\" button", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await signInPage.login.click();
    });

    await test.step("Then the URL contains \"/inventory\"", async () => {
      // @bdd2pw lane=rule rule=rule-39
      await expect(signInPage.page).toHaveURL(new RegExp("/inventory"));
    });

    await test.step("And each product image has a distinct src attribute", async () => {
      const images = page.locator(".inventory_item_img img");
      await expect(images.first()).toBeVisible();
      const count = await images.count();
      const srcs: string[] = [];
      for (let i = 0; i < count; i++) {
        const src = await images.nth(i).getAttribute("src");
        srcs.push(src ?? "");
      }
      const uniqueSrcs = new Set(srcs);
      expect(uniqueSrcs.size, `Expected ${count} distinct image src values but found ${uniqueSrcs.size}: ${JSON.stringify(srcs)}`).toBe(count);
    });
  });

  // @story:109
  // @design:D5
  // @type:accessibility
  // @technique:checklist-based
  test("Story accessibility Sign-in page passes WCAG 2.1 A/AA automated scan", async ({ page }, testInfo) => {
    const signInPage = new SignInPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
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
});
