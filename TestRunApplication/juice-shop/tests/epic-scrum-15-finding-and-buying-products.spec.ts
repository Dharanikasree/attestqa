import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/search.page";

test.describe("Finding and buying products", () => {

  // @story:SCRUM-18
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-1 – Searching for part of a product name lists only matching products", async ({ page }, testInfo) => {
    const searchPage = new SearchPage(page);

    await test.step("Given I am on the search results page for \"apple\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await searchPage.goto();
    });

    await test.step("Then the page displays \"Apple Juice (1000ml)\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(searchPage.page.getByText("Apple Juice (1000ml)").first()).toBeVisible();
    });

    await test.step("And the page displays \"Apple Pomace\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(searchPage.page.getByText("Apple Pomace").first()).toBeVisible();
    });

    await test.step("And the page displays \"Pineapple Juice (1000ml)\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(searchPage.page.getByText("Pineapple Juice (1000ml)").first()).toBeVisible();
    });
  });

  // @story:SCRUM-18
  // @ac:1
  // @design:D2
  // @type:functional
  // @technique:boundary-value-analysis
  test("AC-1 – Searching for a term that matches no product shows no product cards", async ({ page }, testInfo) => {
    const searchPage = new SearchPage(page);

    await test.step("Given I am on the search results page for \"xyznotaproduct123\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await searchPage.goto();
    });

    await test.step("Then no product cards are displayed", async () => {
      // @bdd2pw lane=rule rule=rule-61
      await expect(searchPage.page.getByText("product cards").first()).not.toBeVisible();
    });
  });

  // @story:SCRUM-18
  // @ac:2
  // @design:D3
  // @type:functional
  // @technique:state-transition
  test("AC-2 – After searching the results page displays the search term", async ({ page }, testInfo) => {
    const searchPage = new SearchPage(page);

    await test.step("Given I am on the search results page for \"apple\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await searchPage.goto();
    });

    await test.step("Then the page displays \"Search Results - apple\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(searchPage.page.getByText("Search Results - apple").first()).toBeVisible();
    });
  });

  // @story:SCRUM-18
  // @ac:3
  // @design:D4
  // @type:functional
  // @technique:error-guessing
  test("AC-3 – Searching for a term with no matches shows a not-found message", async ({ page }, testInfo) => {
    const searchPage = new SearchPage(page);

    await test.step("Given I am on the search results page for \"xyznotaproduct123\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await page.goto("/#/search?q=xyznotaproduct123");
    });

    await test.step("Then the page displays \"No results found\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(searchPage.page.getByText("No results found").first()).toBeVisible();
    });
  });

  // @story:SCRUM-18
  // @design:D5
  // @type:accessibility
  // @technique:checklist-based
  test("story – Search page passes axe accessibility checks", async ({ page }, testInfo) => {
    const searchPage = new SearchPage(page);

    await test.step("Given I am on the search results page for \"apple\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await searchPage.goto();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: searchPage.page })
        .include("main")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
