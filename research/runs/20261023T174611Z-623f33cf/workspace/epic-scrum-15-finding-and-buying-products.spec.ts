import { test, expect } from "@playwright/test";
import { ProductSearchPage } from "../pages/product-search.page";

test.describe("Finding and buying products", () => {

  // @story:SCRUM-18
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:equivalence-partitioning
  // @llm-generated
  test("AC-1 Searching by partial name lists only matching products", async ({ page }, testInfo) => {
    const productSearchPage = new ProductSearchPage(page);

    await test.step("Given I am on the product list page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await productSearchPage.goto();
    });

    await test.step("When I click the search icon", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await productSearchPage.clickToSearch.click();
    });

    await test.step("And I type \"apple\" into the search bar", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await productSearchPage.textboxElement.fill("apple");
      await productSearchPage.textboxElement.press("Enter");
    });

    await test.step("Then only products matching \"apple\" are shown", async () => {
      // @bdd2pw lane=todo
      // Verify all visible product cards contain "apple" (case-insensitive) in their name or description
      const articles = productSearchPage.page.locator("mat-card");
      await expect(articles.first()).toBeVisible();
      const count = await articles.count();
      for (let i = 0; i < count; i++) {
        const cardText = await articles.nth(i).textContent();
        expect(cardText?.toLowerCase(), `Product card ${i} does not contain "apple"`).toContain("apple");
      }
    });
  });

  // @story:SCRUM-18
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:state-transition
  // @llm-generated
  test("AC-2 Results page shows the searched term", async ({ page }, testInfo) => {
    const productSearchPage = new ProductSearchPage(page);

    await test.step("Given I am on the product list page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await productSearchPage.goto();
    });

    await test.step("When I click the search icon", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await productSearchPage.clickToSearch.click();
    });

    await test.step("And I type \"apple\" into the search bar", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await productSearchPage.textboxElement.fill("apple");
    });

    await test.step("Then the page displays \"apple\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      // Assert products are shown (search results exist) — first assertion: action took effect
      await expect(productSearchPage.page.locator("mat-card").first()).toBeVisible();
      // Assert the searched term appears on the page — second assertion: term is displayed (AC-2)
      await expect(productSearchPage.page.getByText("apple").first()).toBeVisible();
    });
  });

  // @story:SCRUM-18
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:equivalence-partitioning
  // @llm-generated
  test("AC-3 Searching for a term with no matches shows a not-found message", async ({ page }, testInfo) => {
    const productSearchPage = new ProductSearchPage(page);

    await test.step("Given I am on the product list page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await productSearchPage.goto();
    });

    await test.step("When I click the search icon", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await productSearchPage.clickToSearch.click();
    });

    await test.step("And I type \"xyznotaproduct123\" into the search bar", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await productSearchPage.textboxElement.fill("xyznotaproduct123");
      await productSearchPage.textboxElement.press("Enter");
    });

    await test.step("Then the page displays \"No results found\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(productSearchPage.page.getByText("No results found").first()).toBeVisible();
    });
  });

  // @story:SCRUM-18
  // @design:D4
  // @type:accessibility
  // @technique:checklist-based
  // @llm-generated
  test("D4 Product search page passes accessibility checks", async ({ page }, testInfo) => {
    const productSearchPage = new ProductSearchPage(page);

    await test.step("Given I am on the product list page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await productSearchPage.goto();
    });

    await test.step("When I click the search icon", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await productSearchPage.clickToSearch.click();
    });

    await test.step("And I type \"juice\" into the search bar", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=true governance=sanitised
      await productSearchPage.textboxElement.fill("juice");
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: productSearchPage.page })
        .include("mat-toolbar")
        .include("mat-grid-list")
        .include("app-product")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
