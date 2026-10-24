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
});
