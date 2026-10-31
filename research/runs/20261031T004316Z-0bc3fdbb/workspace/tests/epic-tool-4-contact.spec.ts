import { test, expect } from "@playwright/test";
import { ContactPage } from "../pages/contact.page";

test.describe("Contact", () => {

  // @story:TOOL-18
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-1 Submitting the form with all required fields shows a thank-you message", async ({ page }, testInfo) => {
    const contactPage = new ContactPage(page);

    await test.step("Given I navigate to the contact page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await contactPage.goto();
    });

    await test.step("When I fill the \"First name\" field with \"Jane\"", async () => {
      await contactPage.page.getByLabel("First name").fill("Jane");
    });

    await test.step("And I fill the \"Last name\" field with \"Doe\"", async () => {
      await contactPage.page.getByLabel("Last name").fill("Doe");
    });

    await test.step("And I fill the \"Email address\" field with a valid email", async () => {
      await contactPage.page.getByLabel("Email address").fill("jane.doe@example.com");
    });

    await test.step("And I select \"Customer service\" from the \"Subject\" dropdown", async () => {
      await contactPage.page.getByLabel("Subject").selectOption("Customer service");
    });

    await test.step("And I fill the \"Message *\" field with \"Hello, I have a question about my order and would like some help please.\"", async () => {
      await contactPage.page.locator("textarea[data-test='message'], textarea[name='message'], textarea").first().fill("Hello, I have a question about my order and would like some help please.");
    });

    await test.step("And I click \"Send\"", async () => {
      await contactPage.page.getByRole("button", { name: "Send" }).click();
    });

    await test.step("Then the page displays \"Thanks for your message\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(contactPage.page.getByText("Thanks for your message").first()).toBeVisible();
    });
  });

  // @story:TOOL-18
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:boundary-value-analysis
  test("AC-2 Submitting the form with all fields empty shows validation messages", async ({ page }, testInfo) => {
    const contactPage = new ContactPage(page);

    await test.step("Given I navigate to the contact page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await contactPage.goto();
    });

    await test.step("When I click \"Send\"", async () => {
      // Fill each required field with empty string and blur to trigger Angular touched state
      await contactPage.page.getByLabel("First name").fill("");
      await contactPage.page.getByLabel("First name").blur();
      await contactPage.page.getByLabel("Last name").fill("");
      await contactPage.page.getByLabel("Last name").blur();
      await contactPage.page.getByLabel("Email address").fill("");
      await contactPage.page.getByLabel("Email address").blur();
      await contactPage.page.getByRole("textbox", { name: "Message *" }).fill("");
      await contactPage.page.getByRole("textbox", { name: "Message *" }).blur();
      await contactPage.page.getByRole("button", { name: "Send" }).click();
    });

    await test.step("Then the page displays \"First name is required\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(contactPage.page.getByText("First name is required").first()).toBeVisible();
    });

    await test.step("And the page displays \"Last name is required\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(contactPage.page.getByText("Last name is required").first()).toBeVisible();
    });

    await test.step("And the page displays \"Email is required\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(contactPage.page.getByText("Email is required").first()).toBeVisible();
    });

    await test.step("And the page displays \"Message is required\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(contactPage.page.getByText("Message is required").first()).toBeVisible();
    });
  });

  // @story:TOOL-18
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-3 An email address without an @ is refused with a message about email format", async ({ page }, testInfo) => {
    const contactPage = new ContactPage(page);

    await test.step("Given I navigate to the contact page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await contactPage.goto();
    });

    await test.step("When I fill the \"First name\" field with \"Jane\"", async () => {
      await contactPage.page.getByLabel("First name").fill("Jane");
    });

    await test.step("And I fill the \"Last name\" field with \"Doe\"", async () => {
      await contactPage.page.getByLabel("Last name").fill("Doe");
    });

    await test.step("And I fill the \"Email address\" field with \"notanemail\"", async () => {
      await contactPage.page.getByLabel("Email address").fill("notanemail");
    });

    await test.step("And I fill the \"Message *\" field with \"Hello, I have a question about my order.\"", async () => {
      await contactPage.page.getByLabel("Message *").fill("Hello, I have a question about my order.");
    });

    await test.step("And I click \"Send\"", async () => {
      await contactPage.page.getByRole("button", { name: "Send" }).click();
    });

    await test.step("Then the page displays \"Email format is invalid\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(contactPage.page.getByText("Email format is invalid").first()).toBeVisible();
    });
  });

  // @story:TOOL-18
  // @ac:1
  // @design:D4
  // @type:accessibility
  // @technique:checklist-based
  test("AC-accessibility The contact page passes an automated accessibility scan", async ({ page }, testInfo) => {
    const contactPage = new ContactPage(page);

    await test.step("Given I navigate to the contact page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await contactPage.goto();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: contactPage.page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
