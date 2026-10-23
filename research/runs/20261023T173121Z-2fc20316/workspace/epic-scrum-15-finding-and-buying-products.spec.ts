import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/search.page";

test.describe("Finding and buying products", () => {

  // @story:SCRUM-18
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-1 Searching for a partial product name shows only matching products", async ({ page }, testInfo) => {
    const searchPage = new SearchPage(page);

    await test.step("Given I navigate to \"/#/search?q=Juice\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await searchPage.goto();
    });

    await test.step("Then the page displays \"Apple Juice (1000ml)\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(searchPage.page.getByText("Apple Juice (1000ml)").first()).toBeVisible();
    });
  });

  // @story:SCRUM-18
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:state-transition
  test("AC-2 Results page displays the searched-for term", async ({ page }, testInfo) => {
    const searchPage = new SearchPage(page);

    await test.step("Given I am on the home page", async () => {
      await searchPage.goto();
    });

    await test.step("When I click the search icon", async () => {
      await searchPage.openSearchButton.click();
    });

    await test.step("And I enter \"Apple\" in the search field and press Enter", async () => {
      await searchPage.textboxElement.fill("Apple");
      await searchPage.textboxElement.press("Enter");
    });

    await test.step("Then the URL contains \"search?q=Apple\" (action took effect)", async () => {
      await expect(searchPage.page).toHaveURL(new RegExp("search\\?q=Apple"));
    });

    await test.step("And the page displays \"Apple\" (results show the searched term)", async () => {
      await expect(searchPage.page.getByText("Apple").first()).toBeVisible();
    });
  });

  // @story:SCRUM-18
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-3 Searching for a term with no matches shows a not-found message", async ({ page }, testInfo) => {
    const searchPage = new SearchPage(page);

    await test.step("Given I navigate to \"/#/search?q=xyznonexistentproduct123\"", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await searchPage.page.goto("/#/search?q=xyznonexistentproduct123");
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

    await test.step("Given I navigate to \"/#/search?q=Juice\"", async () => {
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
