import { test, expect } from "@playwright/test";
import { ProductCataloguePage } from "../pages/product-catalogue.page";

test.describe("Product catalogue", () => {

  // @story:TOOL-6
  // @ac:1
  // @design:D1
  // @type:functional
  // @technique:equivalence-partitioning
  // @llm-generated
  test("AC-1 Home page lists products with name, price and image", async ({ page }, testInfo) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I am on the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await productCataloguePage.goto();
    });

    await test.step("Then each product card displays a name", async () => {
      // Each product card is a link containing an h5 heading for the product name.
      // Assert that at least one card is present and every card has a non-empty name.
      const cards = page.locator('a[href^="/product/"]');
      await expect(cards.first()).toBeVisible();
      const count = await cards.count();
      expect(count, "Expected at least one product card").toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        const name = cards.nth(i).locator("h5");
        await expect(name, `Product card ${i + 1} should display a name`).not.toBeEmpty();
      }
    });

    await test.step("And each product card displays a price", async () => {
      // Each product card's price is in the last generic (div) child of the card link,
      // containing a "$" prefixed price string.
      const cards = page.locator('a[href^="/product/"]');
      const count = await cards.count();
      for (let i = 0; i < count; i++) {
        // The price element is the last direct child div of the card link
        const priceEl = cards.nth(i).locator("div").last();
        await expect(priceEl, `Product card ${i + 1} should display a price`).toContainText("$");
      }
    });

    await test.step("And each product card displays an image", async () => {
      // Each product card contains an img element for the product.
      const cards = page.locator('a[href^="/product/"]');
      const count = await cards.count();
      for (let i = 0; i < count; i++) {
        const img = cards.nth(i).locator("img");
        await expect(img, `Product card ${i + 1} should display an image`).toBeVisible();
      }
    });
  });

  // @story:TOOL-6
  // @ac:2
  // @design:D2
  // @type:functional
  // @technique:state-transition
  test("AC-2 Choosing page 2 shows a different set of products", async ({ page }, testInfo) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I am on the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await productCataloguePage.goto();
    });

    await test.step("When Click the \"2\" button", async () => {
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
  });

  // @story:TOOL-6
  // @ac:3
  // @design:D3
  // @type:functional
  // @technique:state-transition
  test("AC-3 The control for the current page is marked as the current page", async ({ page }, testInfo) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I am on the home page", async () => {
      // @bdd2pw lane=rule rule=rule-26
      await productCataloguePage.goto();
    });

    await test.step("When Click the \"2\" button", async () => {
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
  // @design:D4
  // @type:accessibility
  // @technique:checklist-based
  // @llm-generated
  test("AC-story Catalogue home page passes axe accessibility checks", async ({ page }, testInfo) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I am on the home page", async () => {
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
});
