import { test, expect } from "@playwright/test";
import { ProductSearchPage } from "../pages/product-search.page";

test.describe("Finding and buying products", () => {

  // @story:SCRUM-18
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:equivalence-partitioning
  // @llm-generated
  test("AC-1 Searching for a partial name lists only matching products", async ({ page }, testInfo) => {
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
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await productSearchPage.textboxElement.fill("apple");
      await productSearchPage.page.keyboard.press("Enter");
    });

    await test.step("Then only products containing \"apple\" are listed", async () => {
      // Assert at least one product is shown
      const productCards = productSearchPage.page.locator("mat-card");
      await expect(productCards.first()).toBeVisible();
      // Assert every visible product name contains "apple" (case-insensitive)
      const count = await productCards.count();
      for (let i = 0; i < count; i++) {
        const cardText = await productCards.nth(i).innerText();
        expect(cardText.toLowerCase()).toContain("apple");
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

    await test.step("And I type \"banana\" into the search bar", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await productSearchPage.textboxElement.fill("banana");
    });

    await test.step("Then the page displays \"banana\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(productSearchPage.page.getByText("banana").first()).toBeVisible();
    });
  });

  // @story:SCRUM-18
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:equivalence-partitioning
  // @llm-generated
  test("AC-3 Searching for a non-matching term shows a not-found message", async ({ page }, testInfo) => {
    const productSearchPage = new ProductSearchPage(page);

    await test.step("Given I am on the product list page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await productSearchPage.goto();
    });

    await test.step("When I click the search icon", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await productSearchPage.clickToSearch.click();
    });

    await test.step("And I type \"zzznomatchzzz\" into the search bar", async () => {
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await productSearchPage.textboxElement.fill("zzznomatchzzz");
      await productSearchPage.page.keyboard.press("Enter");
    });

    await test.step("Then the page displays \"No results found\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(productSearchPage.page.getByText("No results found").first()).toBeVisible();
    });
  });

  // @story:SCRUM-18
  // @ac:1
  // @design:D4
  // @type:security
  // @technique:error-guessing
  test("AC-1 Search with a script injection term does not execute script", async ({ page }, testInfo) => {
    const productSearchPage = new ProductSearchPage(page);

    await test.step("Given I am on the product list page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await productSearchPage.goto();
    });

    await test.step("When I click the search icon", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await productSearchPage.clickToSearch.click();
    });

    await test.step("And I type \"<script>alert(1)</script>\" into the search bar", async () => {
      await productSearchPage.textboxElement.fill("<script>alert(1)</script>");
      await productSearchPage.page.keyboard.press("Enter");
    });

    await test.step("Then the page displays \"No results found\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(productSearchPage.page.getByText("No results found").first()).toBeVisible();
    });
  });

  // @story:SCRUM-18
  // @design:D5
  // @type:accessibility
  // @technique:checklist-based
  // @llm-generated
  test("AC-1 Search feature passes axe accessibility checks", async ({ page }, testInfo) => {
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
      // @bdd2pw lane=llm provider=anthropic model=claude-sonnet-4-6 cached=false governance=sanitised
      await productSearchPage.textboxElement.fill("juice");
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: productSearchPage.page })
        .include("mat-toolbar")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
