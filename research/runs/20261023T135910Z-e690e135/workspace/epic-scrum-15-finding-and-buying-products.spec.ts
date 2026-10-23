import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/search.page";

test.describe("Finding and buying products", () => {

  // @story:SCRUM-18
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-1 Searching for part of a product name lists only matching products", async ({ page }, testInfo) => {
    const searchPage = new SearchPage(page);

    await test.step("Given I am on the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await searchPage.goto();
    });

    await test.step("When I click the search icon", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await searchPage.clickToSearch.click();
    });

    await test.step("And I enter \"Juice\" into the search box", async () => {
      // @bdd2pw lane=rule rule=rule-27
      await searchPage.textboxElement.fill("Juice");
    });

    await test.step("Then the page displays \"Apple Juice (1000ml)\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(searchPage.page.getByText("Apple Juice (1000ml)").first()).toBeVisible();
    });

    await test.step("And the page displays \"Banana Juice (1000ml)\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(searchPage.page.getByText("Banana Juice (1000ml)").first()).toBeVisible();
    });
  });

  // @story:SCRUM-18
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:state-transition
  test("AC-2 The results page displays which term was searched for", async ({ page }, testInfo) => {
    const searchPage = new SearchPage(page);

    await test.step("Given I am on the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await searchPage.goto();
    });

    await test.step("When I click the search icon", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await searchPage.clickToSearch.click();
    });

    await test.step("And I enter \"Apple\" into the search box", async () => {
      // @bdd2pw lane=rule rule=rule-27
      await searchPage.textboxElement.fill("Apple");
    });

    await test.step("Then the page displays \"Apple\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(searchPage.page.getByText("Apple").first()).toBeVisible();
    });
  });

  // @story:SCRUM-18
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-3 Searching for a term with no matches shows a no-results message", async ({ page }, testInfo) => {
    const searchPage = new SearchPage(page);

    await test.step("Given I am on the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await searchPage.goto();
    });

    await test.step("When I click the search icon", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await searchPage.clickToSearch.click();
    });

    await test.step("And I enter \"xyznonexistentproduct\" into the search box", async () => {
      // @bdd2pw lane=rule rule=rule-27
      await searchPage.textboxElement.fill("xyznonexistentproduct");
      await searchPage.page.keyboard.press("Enter");
    });

    await test.step("Then the page displays \"No results found\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(searchPage.page.getByText("No results found").first()).toBeVisible();
    });
  });

  // @story:SCRUM-18
  // @design:D4
  // @type:accessibility
  // @technique:checklist-based
  test("AC-story Accessibility scan of the search results page", async ({ page }, testInfo) => {
    const searchPage = new SearchPage(page);

    await test.step("Given I am on the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await searchPage.goto();
    });

    await test.step("When I click the search icon", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await searchPage.clickToSearch.click();
    });

    await test.step("And I enter \"Juice\" into the search box", async () => {
      // @bdd2pw lane=rule rule=rule-27
      await searchPage.textboxElement.fill("Juice");
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      // @bdd2pw lane=rule rule=rule-49
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page: searchPage.page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
