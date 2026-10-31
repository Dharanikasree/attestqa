import { test, expect } from "@playwright/test";
import { AdminProductPage } from "../pages/admin-product.page";

test.describe("Shop administration", () => {

  test.beforeEach(async ({ page }) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — And I sign in as administrator");
    const adminProductPage = new AdminProductPage(page);

    await test.step("Given I navigate to the admin login page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await adminProductPage.goto();
    });

    await test.step("[SKIPPED] And I sign in as administrator", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I sign in as administrator" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });
  });

  // @story:TOOL-19
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:state-transition
  test("AC-1 Signed-in administrator sees each product name and price in the back office product list", async ({ page }, testInfo) => {
    const adminProductPage = new AdminProductPage(page);

    await test.step("When I navigate to the admin products page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await adminProductPage.goto();
    });

    await test.step("Then the page displays \"Products\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(adminProductPage.page.getByText("Products").first()).toBeVisible();
    });

    await test.step("And the page displays \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(adminProductPage.page.getByText("Combination Pliers").first()).toBeVisible();
    });

    await test.step("And the page displays \"$14.15\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(adminProductPage.page.getByText("$14.15").first()).toBeVisible();
    });
  });

  // @story:TOOL-19
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-2 Searching the admin product list by name shows only matching products", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — And I search for \"Pliers\" in the admin product list");
    const adminProductPage = new AdminProductPage(page);

    await test.step("When I navigate to the admin products page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await adminProductPage.goto();
    });

    await test.step("[SKIPPED] And I search for \"Pliers\" in the admin product list", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I search for "Pliers" in the admin product list" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("Then the page displays \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(adminProductPage.page.getByText("Combination Pliers").first()).toBeVisible();
    });

    await test.step("And the page displays \"Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(adminProductPage.page.getByText("Pliers").first()).toBeVisible();
    });
  });

  // @story:TOOL-19
  // @ac:2
  // @design:D4
  // @bug:TOOL-21
  // @type:confirmation
  // @technique:equivalence-partitioning
  test("AC-2 Bug TOOL-21 Admin product search does not narrow the list", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — And I search for \"Pliers\" in the admin product list");
    const adminProductPage = new AdminProductPage(page);

    await test.step("When I navigate to the admin products page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await adminProductPage.goto();
    });

    await test.step("[SKIPPED] And I search for \"Pliers\" in the admin product list", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "And I search for "Pliers" in the admin product list" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });

    await test.step("Then the page displays \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(adminProductPage.page.getByText("Combination Pliers").first()).toBeVisible();
    });

    await test.step("And the page displays \"Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(adminProductPage.page.getByText("Pliers").first()).toBeVisible();
    });
  });

  // @story:TOOL-19
  // @design:D5
  // @type:accessibility
  // @technique:checklist-based
  test("AC-accessibility Admin product list passes accessibility checks", async ({ page }, testInfo) => {
    const adminProductPage = new AdminProductPage(page);

    await test.step("When I navigate to the admin products page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await adminProductPage.goto();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: adminProductPage.page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });

  // @story:TOOL-19
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-3 A customer account that opens the admin product list address does not see the list", async ({ page }, testInfo) => {
    test.fixme(true, "bdd2pw: 1 step(s) not bound — Then the page does not display \"Combination Pliers\"");
    const adminProductPage = new AdminProductPage(page);

    await test.step("Given I navigate to the admin products page as a visitor", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await adminProductPage.goto();
    });

    await test.step("[SKIPPED] Then the page does not display \"Combination Pliers\"", async () => {
      // @bdd2pw lane=todo
      // TODO: no rule matched: "Then the page does not display "Combination Pliers"" (LLM fallback also failed: Governance sidecar unreachable; refusing to call LLM (fail-closed). ai-governance sidecar unreachable at http://127.0.0.1:4900/sanitize. Start it with: 'uvicorn service.app:app --port 4900' from the ai-governance repo, or pass --skip-governance for non-production runs (NOT recommended). Underlying error: connect ECONNREFUSED 127.0.0.1:4900)
    });
  });
});
