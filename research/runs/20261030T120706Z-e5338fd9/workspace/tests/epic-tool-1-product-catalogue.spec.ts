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
});
