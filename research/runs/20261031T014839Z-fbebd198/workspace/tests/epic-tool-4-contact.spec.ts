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
      await contactPage.goto();
    });

    await test.step("When I type \"John\" into the \"First name\" field", async () => {
      await page.getByLabel("First name").fill("John");
    });

    await test.step("And I type \"Doe\" into the \"Last name\" field", async () => {
      await page.getByLabel("Last name").fill("Doe");
    });

    await test.step("And I type \"john.doe@example.com\" into the \"Email address\" field", async () => {
      await page.getByLabel("Email address").fill("john.doe.test@example.com");
    });

    await test.step("And I select \"Customer service\" from the \"Subject\" combobox", async () => {
      await page.getByLabel("Subject").selectOption("Customer service");
    });

    await test.step("And I type a message into the \"Message *\" field", async () => {
      await page.getByLabel("Message *").fill("I would like to ask about my recent order and get more details about the product.");
    });

    await test.step("And I click \"Send\"", async () => {
      await page.getByRole("button", { name: "Send" }).click();
    });

    await test.step("Then the page displays \"Thanks for your message!\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(contactPage.page.getByText("Thanks for your message!").first()).toBeVisible();
    });
  });

  // @story:TOOL-18
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:boundary-value-analysis
  test("AC-2a Leaving the first name field empty shows a validation message and the form is not sent", async ({ page }, testInfo) => {
    const contactPage = new ContactPage(page);

    await test.step("Given I navigate to the contact page", async () => {
      await contactPage.goto();
    });

    await test.step("When I type \"Doe\" into the \"Last name\" field", async () => {
      await page.getByLabel("Last name").fill("Doe");
    });

    await test.step("And I type \"john.doe@example.com\" into the \"Email address\" field", async () => {
      await page.getByLabel("Email address").fill("john.doe@example.com");
    });

    await test.step("And I select \"Customer service\" from the \"Subject\" combobox", async () => {
      await page.getByLabel("Subject").selectOption("Customer service");
    });

    await test.step("And I type a message into the \"Message *\" field", async () => {
      await page.getByLabel("Message *").fill("I would like to ask about my recent order and get more details about the product.");
    });

    await test.step("And I click \"Send\"", async () => {
      await page.getByRole("button", { name: "Send" }).click();
    });

    await test.step("Then the page displays \"First name is required\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(contactPage.page.getByText("First name is required").first()).toBeVisible();
    });
  });

  // @story:TOOL-18
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:boundary-value-analysis
  test("AC-2b Leaving the last name field empty shows a validation message and the form is not sent", async ({ page }, testInfo) => {
    const contactPage = new ContactPage(page);

    await test.step("Given I navigate to the contact page", async () => {
      await contactPage.goto();
    });

    await test.step("When I type \"John\" into the \"First name\" field", async () => {
      await page.getByLabel("First name").fill("John");
    });

    await test.step("And I type \"john.doe@example.com\" into the \"Email address\" field", async () => {
      await page.getByLabel("Email address").fill("john.doe@example.com");
    });

    await test.step("And I select \"Customer service\" from the \"Subject\" combobox", async () => {
      await page.getByLabel("Subject").selectOption("Customer service");
    });

    await test.step("And I type a message into the \"Message *\" field", async () => {
      await page.getByLabel("Message *").fill("I would like to ask about my recent order and get more details about the product.");
    });

    await test.step("And I click \"Send\"", async () => {
      await page.getByRole("button", { name: "Send" }).click();
    });

    await test.step("Then the page displays \"Last name is required\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(contactPage.page.getByText("Last name is required").first()).toBeVisible();
    });
  });

  // @story:TOOL-18
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:boundary-value-analysis
  test("AC-2c Leaving the email field empty shows a validation message and the form is not sent", async ({ page }, testInfo) => {
    const contactPage = new ContactPage(page);

    await test.step("Given I navigate to the contact page", async () => {
      await contactPage.goto();
    });

    await test.step("When I type \"John\" into the \"First name\" field", async () => {
      await page.getByLabel("First name").fill("John");
    });

    await test.step("And I type \"Doe\" into the \"Last name\" field", async () => {
      await page.getByLabel("Last name").fill("Doe");
    });

    await test.step("And I select \"Customer service\" from the \"Subject\" combobox", async () => {
      await page.getByLabel("Subject").selectOption("Customer service");
    });

    await test.step("And I type a message into the \"Message *\" field", async () => {
      await page.getByLabel("Message *").fill("I would like to ask about my recent order and get more details about the product.");
    });

    await test.step("And I click \"Send\"", async () => {
      await page.getByRole("button", { name: "Send" }).click();
    });

    await test.step("Then the page displays \"Email is required\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(contactPage.page.getByText("Email is required").first()).toBeVisible();
    });
  });

  // @story:TOOL-18
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:boundary-value-analysis
  test("AC-2d Leaving the message field empty shows a validation message and the form is not sent", async ({ page }, testInfo) => {
    const contactPage = new ContactPage(page);

    await test.step("Given I navigate to the contact page", async () => {
      await contactPage.goto();
    });

    await test.step("When I type \"John\" into the \"First name\" field", async () => {
      await page.getByLabel("First name").fill("John");
    });

    await test.step("And I type \"Doe\" into the \"Last name\" field", async () => {
      await page.getByLabel("Last name").fill("Doe");
    });

    await test.step("And I type \"john.doe@example.com\" into the \"Email address\" field", async () => {
      await page.getByLabel("Email address").fill("john.doe@example.com");
    });

    await test.step("And I select \"Customer service\" from the \"Subject\" combobox", async () => {
      await page.getByLabel("Subject").selectOption("Customer service");
    });

    await test.step("And I click \"Send\"", async () => {
      await page.getByRole("button", { name: "Send" }).click();
    });

    await test.step("Then the page displays \"Message is required\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(contactPage.page.getByText("Message is required").first()).toBeVisible();
    });
  });

  // @story:TOOL-18
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-3 Entering an email without an at sign is refused with a format error message", async ({ page }, testInfo) => {
    const contactPage = new ContactPage(page);

    await test.step("Given I navigate to the contact page", async () => {
      await contactPage.goto();
    });

    await test.step("When I type \"John\" into the \"First name\" field", async () => {
      await page.getByLabel("First name").fill("John");
    });

    await test.step("And I type \"Doe\" into the \"Last name\" field", async () => {
      await page.getByLabel("Last name").fill("Doe");
    });

    await test.step("And I type \"johndoeexample.com\" into the \"Email address\" field", async () => {
      await page.getByLabel("Email address").fill("johndoeexample.com");
    });

    await test.step("And I select \"Customer service\" from the \"Subject\" combobox", async () => {
      await page.getByLabel("Subject").selectOption("Customer service");
    });

    await test.step("And I type a message into the \"Message *\" field", async () => {
      await page.getByLabel("Message *").fill("I would like to ask about my recent order and get more details about the product.");
    });

    await test.step("And I click \"Send\"", async () => {
      await page.getByRole("button", { name: "Send" }).click();
    });

    await test.step("Then the page displays \"Email format is invalid\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(contactPage.page.getByText("Email format is invalid").first()).toBeVisible();
    });
  });

  // @story:TOOL-18
  // @design:D4
  // @type:accessibility
  // @technique:checklist-based
  test("AC-accessibility Contact form passes accessibility checks", async ({ page }, testInfo) => {
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

  // @story:TOOL-18
  // @ac:2
  // @design:D5
  // @type:security
  // @technique:error-guessing
  test("AC-2e Submitting with all fields empty does not expose a server error", async ({ page }, testInfo) => {
    const contactPage = new ContactPage(page);

    await test.step("Given I navigate to the contact page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await contactPage.goto();
    });

    await test.step("When I click \"Send\"", async () => {
      await page.getByRole("button", { name: "Send" }).click();
    });

    await test.step("Then the page displays \"First name is required\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(contactPage.page.getByText("First name is required").first()).toBeVisible();
    });
  });
});
