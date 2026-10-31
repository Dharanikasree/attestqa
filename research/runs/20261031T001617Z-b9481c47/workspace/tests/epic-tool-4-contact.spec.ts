import { test, expect } from "@playwright/test";
import { ContactPage } from "../pages/contact.page";

test.describe("Contact form", () => {

  // @story:TOOL-18
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:state-transition
  test("AC-1 Submitting the form with all required fields shows a thank-you message", async ({ page }, testInfo) => {

    const contactPage = new ContactPage(page);

    await test.step("Given I am on the contact page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await contactPage.goto();
    });

    await test.step("When I find the First name field and enter \"Jane\"", async () => {
      await contactPage.page.getByLabel("First name").fill("Jane");
    });

    await test.step("And I find the Last name field and enter \"Doe\"", async () => {
      await contactPage.page.getByLabel("Last name").fill("Doe");
    });

    await test.step("And I find the Email address field and enter a valid email", async () => {
      await contactPage.page.getByLabel("Email address").fill("jane.doe@example.com");
    });

    await test.step("And I find the Message field and enter \"I would like to ask about my recent order and need some assistance.\"", async () => {
      await contactPage.page.getByLabel("Message *").fill("I would like to ask about my recent order and need some assistance.");
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
  test("AC-2 Leaving a required field empty shows a validation message [field=First name, message=First name is required]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — And I click \"Send\"");
    const contactPage = new ContactPage(page);

    await test.step("Given I am on the contact page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await contactPage.goto();
    });

    await test.step("When I leave the First name field empty", async () => {
      // @bdd2pw lane=rule rule=rule-44
      // intentionally left empty: First name
    });

    await test.step("[SKIPPED] And I click \"Send\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Send"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
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
  test("AC-2 Leaving a required field empty shows a validation message [field=Last name, message=Last name is required]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — And I click \"Send\"");
    const contactPage = new ContactPage(page);

    await test.step("Given I am on the contact page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await contactPage.goto();
    });

    await test.step("When I leave the Last name field empty", async () => {
      // @bdd2pw lane=rule rule=rule-44
      // intentionally left empty: Last name
    });

    await test.step("[SKIPPED] And I click \"Send\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Send"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
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
  test("AC-2 Leaving a required field empty shows a validation message [field=Email address, message=Email is required]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — And I click \"Send\"");
    const contactPage = new ContactPage(page);

    await test.step("Given I am on the contact page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await contactPage.goto();
    });

    await test.step("When I leave the Email address field empty", async () => {
      // @bdd2pw lane=rule rule=rule-44
      // intentionally left empty: Email address
    });

    await test.step("[SKIPPED] And I click \"Send\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Send"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
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
  test("AC-2 Leaving a required field empty shows a validation message [field=Message, message=Message is required]", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — And I click \"Send\"");
    const contactPage = new ContactPage(page);

    await test.step("Given I am on the contact page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await contactPage.goto();
    });

    await test.step("When I leave the Message field empty", async () => {
      // @bdd2pw lane=rule rule=rule-44
      // intentionally left empty: Message
    });

    await test.step("[SKIPPED] And I click \"Send\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Send"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
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
  test("AC-3 An email without an @ is refused with an email format message", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 5 step(s) not bound — When I find the First name field and enter \"Jane\" | And I find the Last name field and enter \"Doe\" | And I find the Email address field and enter \"janedoe.example.com\" (+2 more)");
    const contactPage = new ContactPage(page);

    await test.step("Given I am on the contact page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await contactPage.goto();
    });

    await test.step("[SKIPPED] When I find the First name field and enter \"Jane\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "When I find the First name field and enter "Jane"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I find the Last name field and enter \"Doe\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I find the Last name field and enter "Doe"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I find the Email address field and enter \"janedoe.example.com\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I find the Email address field and enter "janedoe.example.com"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I find the Message field and enter \"I would like to ask about my recent order and need assistance.\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I find the Message field and enter "I would like to ask about my recent order and need assistance."" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I click \"Send\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click "Send"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("Then the page displays \"Email format is invalid\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(contactPage.page.getByText("Email format is invalid").first()).toBeVisible();
    });
  });

  // @story:TOOL-18
  // @ac:story
  // @design:D4
  // @type:accessibility
  // @technique:checklist-based
  test("Accessibility scan of the contact form", async ({ page }, testInfo) => {
    const contactPage = new ContactPage(page);

    await test.step("Given I am on the contact page", async () => {
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
