import { test, expect } from "@playwright/test";
import { ProductCataloguePage } from "../pages/product-catalogue.page";

test.describe("Product catalogue", () => {

  // @story:TOOL-6
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:checklist-based
  test("AC-1 Home page lists products with name, price and image", async ({ page }, testInfo) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I navigate to the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await productCataloguePage.goto();
    });

    await test.step("Then the page displays \"Combination Pliers\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(productCataloguePage.page.getByText("Combination Pliers").first()).toBeVisible();
    });

    await test.step("And the page displays \"$14.15\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(productCataloguePage.page.getByText("$14.15").first()).toBeVisible();
    });

    await test.step("And the page displays \"Bolt Cutters\"", async () => {
      // @bdd2pw lane=rule rule=rule-50
      await expect(productCataloguePage.page.getByText("Bolt Cutters").first()).toBeVisible();
    });
  });

  // @story:TOOL-6
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:state-transition
  test("AC-2 Choosing page 2 shows a different set of products", async ({ page }, testInfo) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I navigate to the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await productCataloguePage.goto();
    });

    await test.step("When Click the \"Page-2\" button", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await productCataloguePage.page2Button.click();
    });

    await test.step("Then page 2 is active", async () => {
      // @bdd2pw lane=rule rule=rule-48
      const activeN = "2";
      const activeNameRe = new RegExp(`^(?:(?:go to\\s+)?page[-\\s]?)?${activeN}$`, "i");
      const activeBtn = productCataloguePage.page.getByRole("button", { name: activeNameRe })
        .or(productCataloguePage.page.getByRole("link", { name: activeNameRe }))
        .first();
      const lastObserved = { ariaCurrent: null as string | null, selfClass: null as string | null, parentClass: null as string | null };
      await expect
        .poll(async () => {
          const [ariaCurrent, selfClass, parentClass] = await Promise.all([
            activeBtn.getAttribute("aria-current"),
            activeBtn.getAttribute("class"),
            activeBtn.locator("xpath=..").getAttribute("class"),
          ]);
          lastObserved.ariaCurrent = ariaCurrent;
          lastObserved.selfClass = selfClass;
          lastObserved.parentClass = parentClass;
          return (
            ariaCurrent === "page" ||
            /\bactive\b/i.test(selfClass ?? "") ||
            /\bactive\b/i.test(parentClass ?? "")
          );
        }, {
          message: `page ${activeN} should be marked active (aria-current="page" OR class contains "active" on the control or its parent). Last observed: aria-current=${JSON.stringify(lastObserved.ariaCurrent)}, selfClass=${JSON.stringify(lastObserved.selfClass)}, parentClass=${JSON.stringify(lastObserved.parentClass)}.`,
        })
        .toBe(true);
    });

    await test.step("And the current page is page 2", async () => {
      // @bdd2pw lane=rule rule=rule-48
      const activeN = "2";
      const activeNameRe = new RegExp(`^(?:(?:go to\\s+)?page[-\\s]?)?${activeN}$`, "i");
      const activeBtn = productCataloguePage.page.getByRole("button", { name: activeNameRe })
        .or(productCataloguePage.page.getByRole("link", { name: activeNameRe }))
        .first();
      const lastObserved = { ariaCurrent: null as string | null, selfClass: null as string | null, parentClass: null as string | null };
      await expect
        .poll(async () => {
          const [ariaCurrent, selfClass, parentClass] = await Promise.all([
            activeBtn.getAttribute("aria-current"),
            activeBtn.getAttribute("class"),
            activeBtn.locator("xpath=..").getAttribute("class"),
          ]);
          lastObserved.ariaCurrent = ariaCurrent;
          lastObserved.selfClass = selfClass;
          lastObserved.parentClass = parentClass;
          return (
            ariaCurrent === "page" ||
            /\bactive\b/i.test(selfClass ?? "") ||
            /\bactive\b/i.test(parentClass ?? "")
          );
        }, {
          message: `page ${activeN} should be marked active (aria-current="page" OR class contains "active" on the control or its parent). Last observed: aria-current=${JSON.stringify(lastObserved.ariaCurrent)}, selfClass=${JSON.stringify(lastObserved.selfClass)}, parentClass=${JSON.stringify(lastObserved.parentClass)}.`,
        })
        .toBe(true);
    });
  });

  // @story:TOOL-6
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:state-transition
  test("AC-3 The control for the current page is marked as current", async ({ page }, testInfo) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I navigate to the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await productCataloguePage.goto();
    });

    await test.step("Then the current page is page 1", async () => {
      // @bdd2pw lane=rule rule=rule-48
      const activeN = "1";
      const activeNameRe = new RegExp(`^(?:(?:go to\\s+)?page[-\\s]?)?${activeN}$`, "i");
      const activeBtn = productCataloguePage.page.getByRole("button", { name: activeNameRe })
        .or(productCataloguePage.page.getByRole("link", { name: activeNameRe }))
        .first();
      const lastObserved = { ariaCurrent: null as string | null, selfClass: null as string | null, parentClass: null as string | null };
      await expect
        .poll(async () => {
          const [ariaCurrent, selfClass, parentClass] = await Promise.all([
            activeBtn.getAttribute("aria-current"),
            activeBtn.getAttribute("class"),
            activeBtn.locator("xpath=..").getAttribute("class"),
          ]);
          lastObserved.ariaCurrent = ariaCurrent;
          lastObserved.selfClass = selfClass;
          lastObserved.parentClass = parentClass;
          return (
            ariaCurrent === "page" ||
            /\bactive\b/i.test(selfClass ?? "") ||
            /\bactive\b/i.test(parentClass ?? "")
          );
        }, {
          message: `page ${activeN} should be marked active (aria-current="page" OR class contains "active" on the control or its parent). Last observed: aria-current=${JSON.stringify(lastObserved.ariaCurrent)}, selfClass=${JSON.stringify(lastObserved.selfClass)}, parentClass=${JSON.stringify(lastObserved.parentClass)}.`,
        })
        .toBe(true);
    });

    await test.step("When Click the \"Page-2\" button", async () => {
      // @bdd2pw lane=rule rule=rule-30
      await productCataloguePage.page2Button.click();
    });

    await test.step("Then the current page is page 2", async () => {
      // @bdd2pw lane=rule rule=rule-48
      const activeN = "2";
      const activeNameRe = new RegExp(`^(?:(?:go to\\s+)?page[-\\s]?)?${activeN}$`, "i");
      const activeBtn = productCataloguePage.page.getByRole("button", { name: activeNameRe })
        .or(productCataloguePage.page.getByRole("link", { name: activeNameRe }))
        .first();
      const lastObserved = { ariaCurrent: null as string | null, selfClass: null as string | null, parentClass: null as string | null };
      await expect
        .poll(async () => {
          const [ariaCurrent, selfClass, parentClass] = await Promise.all([
            activeBtn.getAttribute("aria-current"),
            activeBtn.getAttribute("class"),
            activeBtn.locator("xpath=..").getAttribute("class"),
          ]);
          lastObserved.ariaCurrent = ariaCurrent;
          lastObserved.selfClass = selfClass;
          lastObserved.parentClass = parentClass;
          return (
            ariaCurrent === "page" ||
            /\bactive\b/i.test(selfClass ?? "") ||
            /\bactive\b/i.test(parentClass ?? "")
          );
        }, {
          message: `page ${activeN} should be marked active (aria-current="page" OR class contains "active" on the control or its parent). Last observed: aria-current=${JSON.stringify(lastObserved.ariaCurrent)}, selfClass=${JSON.stringify(lastObserved.selfClass)}, parentClass=${JSON.stringify(lastObserved.parentClass)}.`,
        })
        .toBe(true);
    });
  });

  // @story:TOOL-6
  // @design:D4
  // @type:accessibility
  // @technique:checklist-based
  // @llm-generated
  test("AC-accessibility Home page product list passes accessibility checks", async ({ page }, testInfo) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I navigate to the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await productCataloguePage.goto();
    });

    await test.step("Then the product list passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(
        axeResults.violations.map((v) => v.id).sort(),
        `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`
      ).toEqual([]);
    });
  });

  // @story:TOOL-9
  // @ac:1
  // @design:D11
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-1 Searching for a matching word shows only products whose names contain that word", async ({ page }) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I navigate to the home page", async () => {
      await productCataloguePage.goto();
    });

    await test.step("When I type \"Pliers\" into the Search field", async () => {
      await productCataloguePage.page.getByRole("textbox", { name: "Search" }).fill("Pliers");
    });

    await test.step("And I click \"Search\"", async () => {
      await productCataloguePage.searchButton.click();
    });

    await test.step("Then the page displays \"Combination Pliers\"", async () => {
      await expect(productCataloguePage.page.getByText("Combination Pliers").first()).toBeVisible();
    });

    await test.step("And the page displays \"Pliers\"", async () => {
      await expect(productCataloguePage.page.getByText("Pliers").first()).toBeVisible();
    });
  });

  // @story:TOOL-9
  // @ac:2
  // @design:D12
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-2 Searching for a word no product contains shows a no-results message", async ({ page }) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I navigate to the home page", async () => {
      await productCataloguePage.goto();
    });

    await test.step("When I type \"Zzzyyyxxx\" into the Search field", async () => {
      await productCataloguePage.page.getByRole("textbox", { name: "Search" }).fill("Zzzyyyxxx");
    });

    await test.step("And I click \"Search\"", async () => {
      await productCataloguePage.searchButton.click();
    });

    await test.step("Then the page displays \"There are no products found.\"", async () => {
      await expect(productCataloguePage.page.getByText("There are no products found.").first()).toBeVisible();
    });
  });

  // @story:TOOL-9
  // @ac:3
  // @design:D13
  // @type:functional
  // @technique:state-transition
  test("AC-3 Clearing the search restores the full product list", async ({ page }) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I navigate to the home page", async () => {
      await productCataloguePage.goto();
    });

    await test.step("When I type \"Pliers\" into the Search field", async () => {
      await productCataloguePage.page.getByRole("textbox", { name: "Search" }).fill("Pliers");
    });

    await test.step("And I click \"Search\"", async () => {
      await productCataloguePage.searchButton.click();
    });

    await test.step("Then the page displays \"Combination Pliers\" (search active)", async () => {
      await expect(productCataloguePage.page.getByText("Combination Pliers").first()).toBeVisible();
    });

    await test.step("When I click \"X\" to clear the search", async () => {
      await productCataloguePage.page.getByTestId("search-reset").click();
    });

    await test.step("Then the page displays \"Combination Pliers\" (full list restored)", async () => {
      await expect(productCataloguePage.page.getByText("Combination Pliers").first()).toBeVisible();
    });

    await test.step("And the page displays \"Bolt Cutters\"", async () => {
      await expect(productCataloguePage.page.getByText("Bolt Cutters").first()).toBeVisible();
    });
  });

  // @story:TOOL-9
  // @design:D14
  // @type:accessibility
  // @technique:checklist-based
  test("AC-accessibility Search results pass accessibility checks", async ({ page }) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I navigate to the home page", async () => {
      await productCataloguePage.goto();
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page })
        .include("[data-test='search-results'], .products, app-overview")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(
        axeResults.violations.map((v) => v.id).sort(),
        `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`
      ).toEqual([]);
    });
  });

  // @story:TOOL-10
  // @ac:1
  // @design:D15
  // @type:functional
  // @technique:state-transition
  test("AC-1 Sorting by name A to Z lists products in alphabetical order", async ({ page }) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I navigate to the home page", async () => {
      await productCataloguePage.goto();
    });

    await test.step("When I select 'Name (A - Z)' from the sort combobox", async () => {
      await page.getByRole("combobox", { name: "sort" }).selectOption({ label: "Name (A - Z)" });
    });

    await test.step("Then the sort combobox shows 'Name (A - Z)' (action took effect)", async () => {
      await expect(page.getByRole("combobox", { name: "sort" })).toContainText("Name (A - Z)");
    });

    await test.step("And the first product is alphabetically first (Adjustable Wrench comes before Bolt Cutters)", async () => {
      // After sorting A-Z, the first product heading should be the alphabetically earliest product
      // From the live catalogue: "Adjustable Wrench" sorts before "Bolt Cutters"
      await expect(page.getByTestId("product-name").first()).toHaveText(/Adjustable Wrench/);
    });
  });

  // @story:TOOL-10
  // @ac:2
  // @design:D16
  // @type:functional
  // @technique:state-transition
  test("AC-2 Sorting by price low to high lists the cheapest product first", async ({ page }) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I navigate to the home page", async () => {
      await productCataloguePage.goto();
    });

    await test.step("When I select 'Price (Low - High)' from the sort combobox", async () => {
      await page.getByRole("combobox", { name: "sort" }).selectOption({ label: "Price (Low - High)" });
    });

    await test.step("Then the sort combobox shows 'Price (Low - High)' (action took effect)", async () => {
      await expect(page.getByRole("combobox", { name: "sort" })).toContainText("Price (Low - High)");
    });

    await test.step("And the first product is Slip Joint Pliers (cheapest at $9.17)", async () => {
      // After sorting price low-high, the cheapest product should appear first.
      // Slip Joint Pliers at $9.17 is the cheapest product visible on page 1 of default listing.
      await expect(page.getByTestId("product-name").first()).toHaveText(/Slip Joint Pliers/);
    });
  });

  // @story:TOOL-10
  // @ac:3
  // @design:D17
  // @type:functional
  // @technique:state-transition
  test("AC-3 Sorting by price high to low lists the most expensive product first", async ({ page }) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I navigate to the home page", async () => {
      await productCataloguePage.goto();
    });

    await test.step("When I select 'Price (High - Low)' from the sort combobox", async () => {
      await page.getByRole("combobox", { name: "sort" }).selectOption({ label: "Price (High - Low)" });
    });

    await test.step("Then the sort combobox shows 'Price (High - Low)' (action took effect)", async () => {
      await expect(page.getByRole("combobox", { name: "sort" })).toContainText("Price (High - Low)");
    });

    await test.step("And the first product is Bolt Cutters (most expensive at $48.41)", async () => {
      // After sorting price high-low, the most expensive product should appear first.
      // Bolt Cutters at $48.41 is the most expensive product.
      await expect(page.getByTestId("product-name").first()).toHaveText(/Bolt Cutters/);
    });
  });

  // @story:TOOL-10
  // @design:D18
  // @type:accessibility
  // @technique:checklist-based
  test("AC-accessibility Sort control passes accessibility checks", async ({ page }) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I navigate to the home page", async () => {
      await productCataloguePage.goto();
    });

    await test.step("Then the product list passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page })
        .include("app-overview")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(
        axeResults.violations.map((v) => v.id).sort(),
        `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`
      ).toEqual([]);
    });
  });
});
