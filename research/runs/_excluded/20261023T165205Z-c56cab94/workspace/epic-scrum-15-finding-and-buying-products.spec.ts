import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/search.page";

test.describe("Finding and buying products", () => {

  // @story:SCRUM-18
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:equivalence-partitioning
  // @llm-generated
  test("AC-1 Searching for a partial name shows only matching products", async ({ page }, testInfo) => {
    const searchPage = new SearchPage(page);

    await test.step("Given I am on the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await searchPage.goto();
    });

    await test.step("When I click the search icon", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await searchPage.clickToSearch.click();
    });

    await test.step("And I enter \"apple\" into the search field", async () => {
      // @bdd2pw lane=rule rule=rule-27
      await searchPage.textboxElement.fill("apple");
      await searchPage.textboxElement.press("Enter");
    });

    await test.step("Then only products matching \"apple\" are listed", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      // Wait for search results to update - URL should contain the search term
      await page.waitForURL(/search/);
      // Product name text lives inside the article button (the "Click for more information" button)
      const productArticles = page.locator("mat-grid-tile mat-card");
      await expect(productArticles.first()).toBeVisible();
      const count = await productArticles.count();
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        const nameButton = productArticles.nth(i).locator("button").first();
        await expect(nameButton).toContainText(/apple/i);
      }
    });
  });

  // @story:SCRUM-18
  // @ac:1
  // @design:D4
  // @type:functional
  // @technique:boundary-value-analysis
  // @llm-generated
  test("AC-1b Searching with a single character shows only matching products", async ({ page }, testInfo) => {
    const searchPage = new SearchPage(page);

    await test.step("Given I am on the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await searchPage.goto();
    });

    await test.step("When I click the search icon", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await searchPage.clickToSearch.click();
    });

    await test.step("And I enter \"b\" into the search field", async () => {
      // @bdd2pw lane=rule rule=rule-27
      await searchPage.textboxElement.fill("b");
    });

    await test.step("Then only products matching \"b\" are listed", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      const productCards = page.locator('mat-card, .product, [class*="product"]');
      const count = await productCards.count();
      for (let i = 0; i < count; i++) {
        await expect(productCards.nth(i)).toContainText(/b/i);
      }
    });
  });

  // @story:SCRUM-18
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:state-transition
  test("AC-2 Results page shows the searched term", async ({ page }, testInfo) => {
    const searchPage = new SearchPage(page);

    await test.step("Given I am on the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await searchPage.goto();
    });

    await test.step("When I click the search icon", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await searchPage.clickToSearch.click();
    });

    await test.step("And I enter \"apple\" into the search field", async () => {
      // @bdd2pw lane=rule rule=rule-27
      await searchPage.textboxElement.fill("apple");
      await searchPage.textboxElement.press("Enter");
    });

    await test.step("Then the page displays \"apple\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(searchPage.page.getByText("apple").first()).toBeVisible();
    });
  });

  // @story:SCRUM-18
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-3 Searching for an unmatched term shows a not-found message", async ({ page }, testInfo) => {
    const searchPage = new SearchPage(page);

    await test.step("Given I am on the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await searchPage.goto();
    });

    await test.step("When I click the search icon", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await searchPage.clickToSearch.click();
    });

    await test.step("And I enter \"xyznotaproduct123\" into the search field", async () => {
      // @bdd2pw lane=rule rule=rule-27
      await searchPage.textboxElement.fill("xyznotaproduct123");
      await searchPage.textboxElement.press("Enter");
    });

    await test.step("Then the page displays \"No results found\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(searchPage.page.getByText("No results found").first()).toBeVisible();
    });
  });

  // @story:SCRUM-18
  // @ac:1
  // @design:D5
  // @type:accessibility
  // @technique:checklist-based
  test("AC-story Accessibility of the search feature", async ({ page }, testInfo) => {
    const searchPage = new SearchPage(page);

    await test.step("Given I am on the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await searchPage.goto();
    });

    await test.step("When I click the search icon", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await searchPage.clickToSearch.click();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: searchPage.page })
        .include("mat-toolbar")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
