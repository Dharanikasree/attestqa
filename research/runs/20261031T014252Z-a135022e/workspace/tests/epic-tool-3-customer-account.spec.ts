import { test, expect } from "@playwright/test";
import { CustomerAccountPage } from "../pages/customer-account.page";

test.describe("Customer account", () => {

  // @story:TOOL-13
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-1 A registered customer with correct credentials is signed in and sees their account page", async ({ page }, testInfo) => {
    const customerAccountPage = new CustomerAccountPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      await customerAccountPage.page.goto("/auth/login");
    });

    await test.step("When I fill the \"email\" field with the registered email", async () => {
      await customerAccountPage.page.getByLabel("Email address *").fill(process.env["AQA_APP_USER"] ?? "");
    });

    await test.step("And I fill the \"password\" field with the registered password", async () => {
      await customerAccountPage.page.getByLabel("Password *").fill(process.env["AQA_APP_PASS"] ?? "");
    });

    await test.step("And I click the \"login\" button", async () => {
      await customerAccountPage.page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Then the page displays \"My Account\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(customerAccountPage.page.getByText("My Account").first()).toBeVisible();
    });
  });

  // @story:TOOL-13
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-2 A wrong password shows an error and the customer stays on the sign-in page", async ({ page }, testInfo) => {
    const customerAccountPage = new CustomerAccountPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      await customerAccountPage.page.goto("/auth/login");
    });

    await test.step("When I fill the \"email\" field with the registered email", async () => {
      await customerAccountPage.page.getByLabel("Email address *").fill(process.env["AQA_APP_USER"] ?? "");
    });

    await test.step("And I fill the \"password\" field with a wrong password", async () => {
      await customerAccountPage.page.getByLabel("Password *").fill("this-is-a-wrong-password-xyz");
    });

    await test.step("And I click the \"login\" button", async () => {
      await customerAccountPage.page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Then the page displays \"Invalid email or password.\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(customerAccountPage.page.getByText("Invalid email or password.").first()).toBeVisible();
    });
  });

  // @story:TOOL-13
  // @ac:2
  // @design:D3
  // @type:security
  // @technique:error-guessing
  test("AC-2b The error message does not reveal whether the email has an account", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 3 step(s) not bound — When I fill the \"email\" field with an unregistered email | And I fill the \"password\" field with any password | And I click the \"login\" button");
    const customerAccountPage = new CustomerAccountPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await customerAccountPage.goto();
    });

    await test.step("[SKIPPED] When I fill the \"email\" field with an unregistered email", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "When I fill the "email" field with an unregistered email" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I fill the \"password\" field with any password", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I fill the "password" field with any password" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I click the \"login\" button", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click the "login" button" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("Then the page displays \"Invalid email or password.\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(customerAccountPage.page.getByText("Invalid email or password.").first()).toBeVisible();
    });
  });

  // @story:TOOL-13
  // @ac:3
  // @design:D4
  // @type:functional
  // @technique:state-transition
  test("AC-3 Signing out from the customer menu signs the customer out and the header offers Sign in", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 4 step(s) not bound — When I fill the \"email\" field with the registered email | And I fill the \"password\" field with the registered password | And I click the \"login\" button (+1 more)");
    const customerAccountPage = new CustomerAccountPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await customerAccountPage.goto();
    });

    await test.step("[SKIPPED] When I fill the \"email\" field with the registered email", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "When I fill the "email" field with the registered email" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I fill the \"password\" field with the registered password", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I fill the "password" field with the registered password" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("[SKIPPED] And I click the \"login\" button", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I click the "login" button" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("Then the page displays \"My Account\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(customerAccountPage.page.getByText("My Account").first()).toBeVisible();
    });

    await test.step("[SKIPPED] When I sign out via the customer menu", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "When I sign out via the customer menu" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("Then the page displays \"Sign in\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(customerAccountPage.page.getByText("Sign in").first()).toBeVisible();
    });
  });

  // @story:TOOL-13
  // @ac:4
  // @design:D5
  // @type:functional
  // @technique:state-transition
  test("AC-4 The sign-in page is reached by clicking Sign in in the header", async ({ page }, testInfo) => {
    const customerAccountPage = new CustomerAccountPage(page);

    await test.step("Given I navigate to the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await customerAccountPage.goto();
    });

    await test.step("When I click the sign-in link in the header", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await customerAccountPage.signInLink.click();
    });

    await test.step("Then the page displays \"Login\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(customerAccountPage.page.getByText("Login").first()).toBeVisible();
    });

    await test.step("And the URL contains \"auth/login\"", async () => {
      // @bdd2pw lane=rule rule=rule-39
      await expect(customerAccountPage.page).toHaveURL(new RegExp("auth/login"));
    });
  });

  // @story:TOOL-13
  // @ac:4
  // @design:D6
  // @type:accessibility
  // @technique:checklist-based
  test("AC-accessibility The sign-in page passes an automated accessibility scan", async ({ page }, testInfo) => {
    const customerAccountPage = new CustomerAccountPage(page);

    await test.step("Given I navigate to the sign-in page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await customerAccountPage.goto();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: customerAccountPage.page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
