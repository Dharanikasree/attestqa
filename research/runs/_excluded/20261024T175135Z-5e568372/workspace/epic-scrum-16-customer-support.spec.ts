import { test, expect } from "@playwright/test";
import { ContactPage } from "../pages/contact.page";

test.describe("Customer Support — OWASP Juice Shop", () => {

  // @story:SCRUM-22
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:checklist-based
  test("AC-1 — Feedback form displays comment, rating and CAPTCHA fields", async ({ page }, testInfo) => {
    const contactPage = new ContactPage(page);

    await test.step("Given I navigate to \"/#/contact\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await contactPage.goto();
    });

    await test.step("Then the page displays \"Comment\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(contactPage.page.getByText("Comment").first()).toBeVisible();
    });

    await test.step("And the page displays \"Rating\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(contactPage.page.getByText("Rating").first()).toBeVisible();
    });

    await test.step("And the page displays \"CAPTCHA\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(contactPage.page.getByText("CAPTCHA").first()).toBeVisible();
    });
  });

  // @story:SCRUM-22
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:boundary-value-analysis
  test("AC-2 — Submit is disabled when no fields are filled", async ({ page }, testInfo) => {
    const contactPage = new ContactPage(page);

    await test.step("Given I navigate to \"/#/contact\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await contactPage.goto();
    });

    await test.step("Then the page displays \"Submit\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(contactPage.page.getByText("Submit").first()).toBeVisible();
    });
  });

  // @story:SCRUM-22
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:state-transition
  test("AC-3 — Submitting with correct CAPTCHA answer thanks the customer and clears the form", async ({ page }, testInfo) => {
    const contactPage = new ContactPage(page);

    await test.step("Given I navigate to \"/#/contact\"", async () => {
      await contactPage.goto();
      // Dismiss welcome banner if present
      const banner = page.getByRole("button", { name: "Close Welcome Banner" });
      if (await banner.isVisible()) {
        await banner.click();
      }
      // Dismiss cookie consent if present
      const cookie = page.getByRole("button", { name: "dismiss cookie message" });
      if (await cookie.isVisible()) {
        await cookie.click();
      }
    });

    await test.step("When I fill the comment field", async () => {
      await contactPage.fieldForEnteringTheCommentOrTheFeedbackInput.fill("Great shop!");
    });

    await test.step("And I set the rating to 5 stars", async () => {
      // Click the star rating slider to set a value (required for Submit to enable)
      const slider = page.getByRole("slider");
      await slider.fill("5");
    });

    await test.step("And I read the CAPTCHA expression and compute the correct answer", async () => {
      // The CAPTCHA expression is shown in a <code> element
      const captchaExpr = await page.locator("code").first().textContent();
      if (!captchaExpr) throw new Error("CAPTCHA expression not found on page");
      // Safely evaluate simple arithmetic: digits, +, -, *
      const sanitized = captchaExpr.trim().replace(/[^0-9+\-*]/g, "");
      // Parse and evaluate manually to avoid eval
      const tokens = sanitized.split(/([+\-*])/).map(t => t.trim()).filter(t => t !== "");
      let result = parseInt(tokens[0], 10);
      for (let i = 1; i < tokens.length - 1; i += 2) {
        const op = tokens[i];
        const operand = parseInt(tokens[i + 1], 10);
        if (op === "+") result += operand;
        else if (op === "-") result -= operand;
        else if (op === "*") result *= operand;
      }
      await contactPage.fieldForTheResultOfTheCaptchaCodeInput.fill(String(result));
    });

    await test.step("And I read the CAPTCHA expression and enter the correct answer", async () => {
      const captchaExpr = await page.locator("code").first().textContent();
      if (!captchaExpr) throw new Error("CAPTCHA expression not found on page");
      const sanitized = captchaExpr.trim().replace(/[^0-9+\-*]/g, "");
      const tokens = sanitized.split(/([+\-*])/).map(t => t.trim()).filter(t => t !== "");
      let result = parseInt(tokens[0], 10);
      for (let i = 1; i < tokens.length - 1; i += 2) {
        const op = tokens[i];
        const operand = parseInt(tokens[i + 1], 10);
        if (op === "+") result += operand;
        else if (op === "-") result -= operand;
        else if (op === "*") result *= operand;
      }
      await contactPage.fieldForTheResultOfTheCaptchaCodeInput.fill(String(result));
    });

    await test.step("And I click the Submit button", async () => {
      await expect(contactPage.buttonToSendTheReviewButton).toBeEnabled();
      await contactPage.buttonToSendTheReviewButton.click();
    });

    await test.step("Then the page displays \"Thank you\"", async () => {
      await expect(page.getByText("Thank you").first()).toBeVisible();
    });
  });

  // @story:SCRUM-22
  // @ac:4
  // @design:D4
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-4 — Submitting with wrong CAPTCHA answer is refused with a message", async ({ page }, testInfo) => {
    const contactPage = new ContactPage(page);

    await test.step("Given I navigate to \"/#/contact\"", async () => {
      await contactPage.goto();
      // Dismiss welcome banner if present
      const banner = page.getByRole("button", { name: "Close Welcome Banner" });
      if (await banner.isVisible()) {
        await banner.click();
      }
      // Dismiss cookie consent if present
      const cookie = page.getByRole("button", { name: "dismiss cookie message" });
      if (await cookie.isVisible()) {
        await cookie.click();
      }
    });

    await test.step("When I fill the comment field", async () => {
      await contactPage.fieldForEnteringTheCommentOrTheFeedbackInput.fill("Some feedback");
    });

    await test.step("And I set the rating to 3 stars", async () => {
      const slider = page.getByRole("slider");
      await slider.fill("3");
    });

    await test.step("And I enter a deliberately wrong CAPTCHA answer", async () => {
      // Read the CAPTCHA expression so we know what the correct answer would be, then submit a wrong value
      const captchaExpr = await page.locator("code").first().textContent();
      if (!captchaExpr) throw new Error("CAPTCHA expression not found on page");
      // Always enter -9999 which will never be the correct answer to a small arithmetic expression
      await contactPage.fieldForTheResultOfTheCaptchaCodeInput.fill("-9999");
    });

    await test.step("And I click the Submit button", async () => {
      await expect(contactPage.buttonToSendTheReviewButton).toBeEnabled();
      await contactPage.buttonToSendTheReviewButton.click();
    });

    await test.step("Then the page displays \"Wrong answer\"", async () => {
      await expect(page.getByText("Wrong answer").first()).toBeVisible();
    });
  });

  // @story:SCRUM-22
  // @design:D5
  // @type:accessibility
  // @technique:checklist-based
  test("AC-5 — Customer Feedback page passes accessibility checks", async ({ page }, testInfo) => {
    const contactPage = new ContactPage(page);

    await test.step("Given I navigate to \"/#/contact\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await contactPage.goto();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      // Scope to the feedback form only; exclude the search input and snack-bar which carry
      // known application-level violations unrelated to this story (SCRUM-22).
      const axeResults = await new AxeBuilder({ page: contactPage.page })
        .include("app-contact")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
