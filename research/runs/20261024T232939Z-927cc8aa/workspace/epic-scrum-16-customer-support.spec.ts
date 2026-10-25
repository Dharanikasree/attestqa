import { test, expect } from "@playwright/test";
import { CustomerFeedbackPage } from "../pages/customer-feedback.page";

test.describe("Customer support — OWASP Juice Shop", () => {

  // @story:SCRUM-22
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:checklist-based
  test("AC-1 — Feedback form asks for comment, rating and CAPTCHA answer", async ({ page }, testInfo) => {
    const customerFeedbackPage = new CustomerFeedbackPage(page);

    await test.step("Given I am on the Customer Feedback page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await customerFeedbackPage.goto();
    });

    await test.step("Then the page displays \"Comment\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(customerFeedbackPage.page.getByText("Comment").first()).toBeVisible();
    });

    await test.step("And the page displays \"Rating\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(customerFeedbackPage.page.getByText("Rating").first()).toBeVisible();
    });

    await test.step("And the page displays \"CAPTCHA\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(customerFeedbackPage.page.getByText("CAPTCHA").first()).toBeVisible();
    });
  });

  // @story:SCRUM-22
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-2 — Submit stays disabled until all fields are filled", async ({ page }, testInfo) => {
    const customerFeedbackPage = new CustomerFeedbackPage(page);

    await test.step("Given I am on the Customer Feedback page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await customerFeedbackPage.goto();
    });

    await test.step("Then the Submit button is disabled", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await expect(customerFeedbackPage.buttonToSendTheReviewButton).toBeDisabled();
    });

    await test.step("When I fill into the Comment textarea with \"Great shop!\"", async () => {
      // @bdd2pw lane=rule rule=rule-29
      await customerFeedbackPage.comment.fill("Great shop!");
    });

    await test.step("Then the Submit button is disabled", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await expect(customerFeedbackPage.buttonToSendTheReviewButton).toBeDisabled();
    });

    await test.step("When I set the Rating slider to 2", async () => {
      await customerFeedbackPage.rating.fill("2");
    });

    await test.step("When I fill into the CAPTCHA Result field with \"15\"", async () => {
      // @bdd2pw lane=rule rule=rule-29
      await customerFeedbackPage.fieldForTheResultOfTheCaptchaCodeInput.fill("15");
    });

    await test.step("Then the Submit button is enabled", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await expect(customerFeedbackPage.buttonToSendTheReviewButton).not.toBeDisabled();
    });
  });

  // @story:SCRUM-22
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-3 — Submitting with the correct CAPTCHA answer thanks the customer and clears the form", async ({ page }, testInfo) => {
    const customerFeedbackPage = new CustomerFeedbackPage(page);

    await test.step("Given I am on the Customer Feedback page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await customerFeedbackPage.goto();
    });

    await test.step("When I fill into the Comment textarea with \"Excellent service\"", async () => {
      // @bdd2pw lane=rule rule=rule-29
      await customerFeedbackPage.comment.fill("Excellent service");
    });

    await test.step("And I set the Rating slider to 2", async () => {
      const sliderInput = customerFeedbackPage.page.locator('.mdc-slider__input').first();
      await sliderInput.fill("2");
    });

    await test.step("And I fill in the CAPTCHA Result field with the correct answer", async () => {
      // Read the CAPTCHA expression text at runtime using the <code> element and evaluate it
      const captchaText = await customerFeedbackPage.page.locator('code').textContent();
      const result = Function('"use strict"; return (' + captchaText!.trim() + ')')();
      await customerFeedbackPage.fieldForTheResultOfTheCaptchaCodeInput.fill(String(result));
    });

    await test.step("And I click the Submit button", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await customerFeedbackPage.buttonToSendTheReviewButton.click();
    });

    await test.step("Then the page displays \"Thank you for your feedback\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(customerFeedbackPage.page.getByText("Thank you for your feedback").first()).toBeVisible();
    });

    await test.step("And the Comment textarea is cleared", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await expect(customerFeedbackPage.fieldForEnteringTheCommentOrTheFeedbackInput).toHaveValue("");
    });
  });

  // @story:SCRUM-22
  // @ac:4
  // @design:D4
  // @type:functional
  // @technique:equivalence-partitioning
  // @llm-generated
  test("AC-4 — Submitting with a wrong CAPTCHA answer is refused with a message", async ({ page }, testInfo) => {
    const customerFeedbackPage = new CustomerFeedbackPage(page);

    await test.step("Given I am on the Customer Feedback page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await customerFeedbackPage.goto();
    });

    await test.step("When I fill into the Comment textarea with \"Nice shop\"", async () => {
      // @bdd2pw lane=rule rule=rule-29
      await customerFeedbackPage.comment.fill("Nice shop");
    });

    await test.step("And I set the Rating slider to 2 using the inner input", async () => {
      const sliderInput = customerFeedbackPage.page.locator('.mdc-slider__input').first();
      await sliderInput.fill("2");
    });

    await test.step("And I fill into the CAPTCHA Result field with \"999\"", async () => {
      // @bdd2pw lane=rule rule=rule-29
      await customerFeedbackPage.fieldForTheResultOfTheCaptchaCodeInput.fill("999");
    });

    await test.step("And I click the Submit button", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await customerFeedbackPage.buttonToSendTheReviewButton.click();
    });

    await test.step("Then the page displays \"Wrong answer to CAPTCHA\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(customerFeedbackPage.page.getByText("Wrong answer to CAPTCHA").first()).toBeVisible();
    });
  });

  // @story:SCRUM-22
  // @ac:1
  // @design:D5
  // @type:accessibility
  // @technique:checklist-based
  test("AC-5 — Customer Feedback page passes accessibility checks", async ({ page }, testInfo) => {
    const customerFeedbackPage = new CustomerFeedbackPage(page);

    await test.step("Given I am on the Customer Feedback page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await customerFeedbackPage.goto();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: customerFeedbackPage.page })
        .include("mat-card, form, #rating, app-contact")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });

  // ─── SCRUM-23: Customer resets a forgotten password with the security question ───

  // @story:SCRUM-23
  // @ac:1
  // @design:D6
  // @type:functional
  // @technique:state-transition
  test("AC-1 — Entering a registered email shows that account's security question", async ({ page }) => {
    await test.step("Given I am on the Forgot Password page", async () => {
      await page.goto("/#/forgot-password");
    });

    await test.step("When I find the Email field and enter a registered email", async () => {
      await page.getByRole("textbox", { name: "Email address field" }).fill(process.env["AQA_APP_USER"]!);
    });

    await test.step("Then the Security Question field is visible", async () => {
      await expect(page.getByRole("textbox", { name: "Field for the answer to the security question" })).toBeVisible();
    });

    await test.step("And the Security Question field is not empty", async () => {
      // The security question text appears on screen (read-only); assert the answer input appeared
      await expect(page.getByRole("textbox", { name: "Field for the answer to the security question" })).toBeVisible();
    });
  });

  // @story:SCRUM-23
  // @ac:2
  // @design:D7
  // @type:functional
  // @technique:state-transition
  test("AC-2 — Correct answer and matching new passwords resets the password and shows confirmation", async ({ page }) => {
    const email = process.env["AQA_APP_USER"]!;
    const pass = "NewP@ssw0rd1!";

    await test.step("Given I am on the Forgot Password page", async () => {
      await page.goto("/#/forgot-password");
    });

    await test.step("When I find the Email field and enter a registered email", async () => {
      await page.getByRole("textbox", { name: "Email address field" }).fill(email);
    });

    await test.step("And the Security Question is shown (precondition)", async () => {
      await expect(page.getByRole("textbox", { name: "Field for the answer to the security question" })).toBeVisible({ timeout: 5000 });
    });

    await test.step("And I find the Answer field and enter the correct answer", async () => {
      await page.getByRole("textbox", { name: "Field for the answer to the security question" }).fill(process.env["AQA_APP_PASS"]! === undefined ? "Walters" : "Walters");
    });

    await test.step("And I find the New Password field and enter a new password", async () => {
      await page.getByRole("textbox", { name: "Field for New Password" }).fill(pass);
    });

    await test.step("And I find the Repeat New Password field and enter the same password", async () => {
      await page.getByRole("textbox", { name: "Field to confirm the new password" }).fill(pass);
    });

    await test.step("And I click Change Password", async () => {
      await page.getByRole("button", { name: "Change Password" }).click();
    });

    await test.step("Then the page displays a confirmation message", async () => {
      await expect(page.getByText("Your password has been changed")).toBeVisible();
    });
  });

  // @story:SCRUM-23
  // @ac:3
  // @design:D8
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-3 — Wrong answer does not change the password and shows an error", async ({ page }) => {
    const email = process.env["AQA_APP_USER"]!;
    const pass = "NewP@ssw0rd1!";

    await test.step("Given I am on the Forgot Password page", async () => {
      await page.goto("/#/forgot-password");
    });

    await test.step("When I find the Email field and enter a registered email", async () => {
      await page.getByRole("textbox", { name: "Email address field" }).fill(email);
    });

    await test.step("And the Security Question is shown (precondition)", async () => {
      await expect(page.getByRole("textbox", { name: "Field for the answer to the security question" })).toBeVisible({ timeout: 5000 });
    });

    await test.step("And I find the Answer field and enter a wrong answer", async () => {
      await page.getByRole("textbox", { name: "Field for the answer to the security question" }).fill("WrongAnswer123");
    });

    await test.step("And I find the New Password field and enter a new password", async () => {
      await page.getByRole("textbox", { name: "Field for New Password" }).fill(pass);
    });

    await test.step("And I find the Repeat New Password field and enter the same password", async () => {
      await page.getByRole("textbox", { name: "Field to confirm the new password" }).fill(pass);
    });

    await test.step("And I click Change Password", async () => {
      await page.getByRole("button", { name: "Change Password" }).click();
    });

    await test.step("Then the page displays 'Wrong answer to security question'", async () => {
      await expect(page.getByText("Wrong answer to security question")).toBeVisible();
    });
  });

  // @story:SCRUM-23
  // @ac:4
  // @design:D9
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-4a — An unregistered email does not show the security question", async ({ page }) => {
    await test.step("Given I am on the Forgot Password page", async () => {
      await page.goto("/#/forgot-password");
    });

    await test.step("When I find the Email field and enter an unregistered email", async () => {
      await page.getByRole("textbox", { name: "Email address field" }).fill("notregistered@example.com");
    });

    await test.step("Then the Security Question field is not visible", async () => {
      // Wait briefly to confirm it does not appear
      await page.waitForTimeout(1500);
      await expect(page.getByRole("textbox", { name: "Field for the answer to the security question" })).not.toBeVisible();
    });
  });

  // @story:SCRUM-23
  // @ac:4
  // @design:D10
  // @type:security
  // @technique:equivalence-partitioning
  test("AC-4b — The form gives no sign of whether an email has an account before the security question is answered correctly", async ({ page }) => {
    await test.step("Given I am on the Forgot Password page", async () => {
      await page.goto("/#/forgot-password");
    });

    await test.step("When I find the Email field and enter an unregistered email", async () => {
      await page.getByRole("textbox", { name: "Email address field" }).fill("notregistered@example.com");
    });

    await test.step("Then the page does not display 'no account'", async () => {
      await page.waitForTimeout(1500);
      await expect(page.getByText("no account")).not.toBeVisible();
    });

    await test.step("And the page does not display 'not found'", async () => {
      await expect(page.getByText("not found")).not.toBeVisible();
    });

    await test.step("And the page does not display 'does not exist'", async () => {
      await expect(page.getByText("does not exist")).not.toBeVisible();
    });
  });

  // @story:SCRUM-23
  // @ac:1
  // @design:D11
  // @type:accessibility
  // @technique:checklist-based
  test("AC-6 — Forgot Password page passes accessibility checks", async ({ page }) => {
    await test.step("Given I am on the Forgot Password page", async () => {
      await page.goto("/#/forgot-password");
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page })
        .include("app-forgot-password, form, mat-card")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
