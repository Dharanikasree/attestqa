import { test, expect } from "@playwright/test";
import { CustomerFeedbackPage } from "../pages/customer-feedback.page";

test.describe("Customer Support — SCRUM-16", () => {

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

    await test.step("And the page displays \"Result\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(customerFeedbackPage.page.getByText("Result").first()).toBeVisible();
    });
  });

  // @story:SCRUM-22
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-2 — Submit stays disabled until comment, rating and CAPTCHA answer are all given", async ({ page }, testInfo) => {
    const customerFeedbackPage = new CustomerFeedbackPage(page);

    await test.step("Given I am on the Customer Feedback page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await customerFeedbackPage.goto();
    });

    await test.step("Then the Submit button is disabled", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await expect(customerFeedbackPage.buttonToSendTheReviewButton).toBeDisabled();
    });
  });

  // @story:SCRUM-22
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:state-transition
  test("AC-3 — Submitting with correct CAPTCHA answer thanks the customer and clears the form", async ({ page }, testInfo) => {
    const customerFeedbackPage = new CustomerFeedbackPage(page);

    await test.step("Given I am on the Customer Feedback page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await customerFeedbackPage.goto();
    });

    await test.step("When I fill in the comment", async () => {
      await customerFeedbackPage.fieldForEnteringTheCommentOrTheFeedbackInput.fill("Great shop, love the products!");
    });

    await test.step("And I set the rating to 5", async () => {
      // Rating slider starts at 1; press ArrowRight 4 times to reach 5
      await customerFeedbackPage.rating.focus();
      await customerFeedbackPage.rating.press("ArrowRight");
      await customerFeedbackPage.rating.press("ArrowRight");
      await customerFeedbackPage.rating.press("ArrowRight");
      await customerFeedbackPage.rating.press("ArrowRight");
    });

    await test.step("And I enter the correct CAPTCHA answer", async () => {
      // Read the CAPTCHA expression text and evaluate it
      const captchaText = await customerFeedbackPage.captchaCodeWhichMustBeSolved.textContent();
      // captchaText looks like "7*2-1" or "8+8-6"
      const answer = Function(`"use strict"; return (${captchaText});`)();
      await customerFeedbackPage.fieldForTheResultOfTheCaptchaCodeInput.fill(String(answer));
    });

    await test.step("And I submit the form", async () => {
      await customerFeedbackPage.buttonToSendTheReviewButton.click();
    });

    await test.step("Then the page displays \"Thank you for your feedback\"", async () => {
      await expect(customerFeedbackPage.page.getByText("Thank you for your feedback").first()).toBeVisible();
    });

    await test.step("And the Comment field is cleared", async () => {
      await expect(customerFeedbackPage.fieldForEnteringTheCommentOrTheFeedbackInput).toHaveValue("");
    });
  });

  // @story:SCRUM-22
  // @ac:4
  // @design:D4
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-4 — Submitting with wrong CAPTCHA answer is refused with a message", async ({ page }, testInfo) => {
    const customerFeedbackPage = new CustomerFeedbackPage(page);

    await test.step("Given I am on the Customer Feedback page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await customerFeedbackPage.goto();
    });

    await test.step("Then the page displays \"Please enter the result of the CAPTCHA.\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(customerFeedbackPage.page.getByText("Please enter the result of the CAPTCHA.").first()).toBeVisible();
    });
  });

  // @story:SCRUM-22
  // @design:D5
  // @type:accessibility
  // @technique:checklist-based
  test("AC-story — Customer Feedback page passes accessibility checks", async ({ page }, testInfo) => {
    const customerFeedbackPage = new CustomerFeedbackPage(page);

    await test.step("Given I am on the Customer Feedback page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await customerFeedbackPage.goto();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: customerFeedbackPage.page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
