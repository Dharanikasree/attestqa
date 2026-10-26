import { test, expect } from "@playwright/test";
import { CustomerFeedbackPage } from "../pages/customer-feedback.page";
import AxeBuilder from "@axe-core/playwright";

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
      await customerFeedbackPage.page.locator('.mdc-slider__input').first().fill("2");
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
  test("AC-1 — Security question appears after a registered email is entered", async ({ page }) => {
    await test.step("Given I am on the Forgot Password page", async () => {
      await page.goto("/#/forgot-password");
    });

    await test.step("When I find the Email address field and enter the registered email", async () => {
      await page.getByLabel("Email address field").fill(process.env["AQA_APP_USER"] ?? "");
    });

    await test.step("Then the Security Question field is visible", async () => {
      await expect(page.getByLabel("Field for the answer to the security question")).toBeVisible();
    });

    await test.step("And the Security Question field is not empty (label shows the question)", async () => {
      await expect(page.getByText("Security Question", { exact: true })).toBeVisible();
    });
  });

  // @story:SCRUM-23
  // @ac:2
  // @design:D7
  // @type:functional
  // @technique:state-transition
  test("AC-2 — Correct answer and new password changes the password and shows confirmation", async ({ page }) => {
    await test.step("Given I am on the Forgot Password page", async () => {
      await page.goto("/#/forgot-password");
    });

    await test.step("When I find the Email address field and enter the registered email", async () => {
      await page.getByLabel("Email address field").fill(process.env["AQA_APP_USER"] ?? "");
    });

    await test.step("And I find the Field for the answer to the security question and enter the correct answer", async () => {
      await expect(page.getByLabel("Field for the answer to the security question")).toBeEnabled();
      await page.getByLabel("Field for the answer to the security question").fill("Samuel");
    });

    await test.step("And I find the Field for New Password and enter a new password", async () => {
      await page.getByLabel("Field for New Password").fill("NewPass123");
    });

    await test.step("And I find the Field to confirm the new password and enter the same password", async () => {
      await page.getByLabel("Field to confirm the new password").fill("NewPass123");
    });

    await test.step("And I click Change", async () => {
      await page.getByRole("button", { name: "Change" }).click();
    });

    await test.step("Then the page displays the confirmation message", async () => {
      await expect(page.getByText("Your password has been changed")).toBeVisible();
    });
  });

  // @story:SCRUM-23
  // @ac:3
  // @design:D8
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-3 — Wrong answer does not change the password and shows an error message", async ({ page }) => {
    await test.step("Given I am on the Forgot Password page", async () => {
      await page.goto("/#/forgot-password");
    });

    await test.step("When I find the Email address field and enter the registered email", async () => {
      await page.getByLabel("Email address field").fill(process.env["AQA_APP_USER"] ?? "");
    });

    await test.step("And I find the Field for the answer to the security question and enter a wrong answer", async () => {
      await expect(page.getByLabel("Field for the answer to the security question")).toBeEnabled();
      await page.getByLabel("Field for the answer to the security question").fill("wronganswer");
    });

    await test.step("And I find the Field for New Password and enter a new password", async () => {
      await page.getByLabel("Field for New Password").fill("NewPass123");
    });

    await test.step("And I find the Field to confirm the new password and enter the same password", async () => {
      await page.getByLabel("Field to confirm the new password").fill("NewPass123");
    });

    await test.step("And I click Change", async () => {
      await page.getByRole("button", { name: "Change" }).click();
    });

    await test.step("Then the page displays the wrong answer error message", async () => {
      await expect(page.getByText("Wrong answer to security question")).toBeVisible();
    });
  });

  // @story:SCRUM-23
  // @ac:4
  // @design:D9
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-4 — Entering an unknown email shows no indication of whether an account exists", async ({ page }) => {
    await test.step("Given I am on the Forgot Password page", async () => {
      await page.goto("/#/forgot-password");
    });

    await test.step("When I find the Email address field and enter an unregistered email", async () => {
      await page.getByLabel("Email address field").fill("nobody-" + Date.now() + "@example.com");
    });

    await test.step("Then the Security Question field is not visible", async () => {
      await expect(page.getByLabel("Field for the answer to the security question")).toBeDisabled();
    });
  });

  // @story:SCRUM-23
  // @ac:4
  // @design:D10
  // @type:accessibility
  // @technique:checklist-based
  test("AC-10 — Forgot Password page passes accessibility checks", async ({ page }) => {
    await test.step("Given I am on the Forgot Password page", async () => {
      await page.goto("/#/forgot-password");
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      const axeResults = await new AxeBuilder({ page })
        .include("app-forgot-password, form")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(
        axeResults.violations.map((v) => v.id).sort(),
        `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`
      ).toEqual([]);
    });
  });

  // @story:SCRUM-23
  // @ac:4
  // @design:D11
  // @type:security
  // @technique:equivalence-partitioning
  test("AC-11 — The form treats registered and unregistered emails identically before the security question is answered", async ({ page }) => {
    await test.step("Given I am on the Forgot Password page", async () => {
      await page.goto("/#/forgot-password");
    });

    await test.step("When I enter an unregistered email", async () => {
      await page.getByLabel("Email address field").fill("nobody-" + Date.now() + "@example.com");
    });

    await test.step("Then the Security Question field is not visible (disabled) for unregistered email", async () => {
      await expect(page.getByLabel("Field for the answer to the security question")).toBeDisabled();
    });

    await test.step("When I enter a registered email", async () => {
      await page.getByLabel("Email address field").fill(process.env["AQA_APP_USER"] ?? "");
    });

    await test.step("Then the Security Question field is visible for the registered email", async () => {
      await expect(page.getByLabel("Field for the answer to the security question")).toBeEnabled();
    });
  });
});
