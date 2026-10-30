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
        .exclude(".checkbox")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(
        axeResults.violations.map((v) => v.id).sort(),
        `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`
      ).toEqual([]);
    });
  });

  // TOOL-7: Shopper filters products by category and brand

  // @story:TOOL-7
  // @ac:1
  // @design:D6
  // @type:functional
  // @technique:state-transition
  test("AC-1 Ticking a category shows only products in that category", async ({ page }) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I navigate to the home page", async () => {
      await productCataloguePage.goto();
    });

    await test.step("When I check the \"Hammer\" checkbox", async () => {
      await page.getByRole("checkbox", { name: "Hammer" }).check();
    });

    await test.step("Then the Hammer checkbox is checked (action took effect)", async () => {
      await expect(
        page.getByRole("checkbox", { name: "Hammer" }),
        "Hammer checkbox should be checked after ticking it"
      ).toBeChecked();
    });

    await test.step("And the page displays \"Hammer\"", async () => {
      // Use exact match on the product name heading to avoid matching "Claw Hammer" or "Claw Hammer with Shock Reduction Grip"
      await expect(page.getByRole("heading", { name: /^Hammer$/, level: 5 })).toBeVisible();
    });

    await test.step("And the page displays \"Claw Hammer\"", async () => {
      await expect(page.getByRole("heading", { name: /^Claw Hammer$/, level: 5 }).first()).toBeVisible();
    });

    await test.step("And the page does not display \"Pliers\"", async () => {
      // Exact match: "Pliers" should not appear as a product heading; "Combination Pliers" etc. are different
      await expect(page.getByRole("heading", { name: /^Pliers$/, level: 5 })).toHaveCount(0);
    });

    await test.step("And the page does not display \"Bolt Cutters\"", async () => {
      await expect(page.getByRole("heading", { name: /^Bolt Cutters$/, level: 5 })).toHaveCount(0);
    });
  });

  // @story:TOOL-7
  // @ac:2
  // @design:D7
  // @type:functional
  // @technique:state-transition
  test("AC-2 Ticking a brand shows only products of that brand", async ({ page }) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I navigate to the home page", async () => {
      await productCataloguePage.goto();
    });

    await test.step("When I check the \"ForgeFlex Tools\" checkbox", async () => {
      await page.getByRole("checkbox", { name: "ForgeFlex Tools" }).check();
    });

    await test.step("Then the ForgeFlex Tools checkbox is checked (action took effect)", async () => {
      await expect(
        page.getByRole("checkbox", { name: "ForgeFlex Tools" }),
        "ForgeFlex Tools checkbox should be checked after ticking it"
      ).toBeChecked();
    });

    await test.step("And the page displays \"ForgeFlex Tools\"", async () => {
      // At least one product from ForgeFlex Tools brand should appear in the list
      await expect(page.getByText("ForgeFlex Tools").first()).toBeVisible();
    });

    await test.step("And the page does not display \"MightyCraft Hardware\" products", async () => {
      // After filtering by ForgeFlex Tools brand, MightyCraft Hardware products should not appear
      // We check that no product card link contains MightyCraft Hardware brand text
      await expect(page.locator(".card").filter({ hasText: "MightyCraft Hardware" })).toHaveCount(0);
    });
  });

  // @story:TOOL-7
  // @ac:3
  // @design:D8
  // @type:functional
  // @technique:state-transition
  test("AC-3 Unticking a category filter shows the full list again", async ({ page }) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I navigate to the home page", async () => {
      await productCataloguePage.goto();
    });

    await test.step("When I check the \"Hammer\" checkbox", async () => {
      await page.getByRole("checkbox", { name: "Hammer" }).check();
    });

    await test.step("And the Hammer checkbox is checked (action took effect)", async () => {
      await expect(
        page.getByRole("checkbox", { name: "Hammer" }),
        "Hammer checkbox should be checked before unticking"
      ).toBeChecked();
    });

    await test.step("And I uncheck the \"Hammer\" checkbox", async () => {
      await page.getByRole("checkbox", { name: "Hammer" }).uncheck();
    });

    await test.step("And the Hammer checkbox is unchecked (action took effect)", async () => {
      await expect(
        page.getByRole("checkbox", { name: "Hammer" }),
        "Hammer checkbox should be unchecked after unticking it"
      ).not.toBeChecked();
    });

    await test.step("Then the page displays \"Combination Pliers\"", async () => {
      await expect(page.getByText("Combination Pliers").first()).toBeVisible();
    });

    await test.step("And the page displays \"Bolt Cutters\"", async () => {
      await expect(page.getByText("Bolt Cutters").first()).toBeVisible();
    });

    await test.step("And the page displays \"Pliers\"", async () => {
      await expect(page.getByRole("heading", { name: "Pliers", level: 5 }).first()).toBeVisible();
    });
  });

  // @story:TOOL-7
  // @ac:1
  // @design:D9
  // @type:functional
  // @technique:state-transition
  test("AC-1 Category filter persists when the shopper changes page", async ({ page }) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I navigate to the home page", async () => {
      await productCataloguePage.goto();
    });

    await test.step("When I check the \"Hand Tools\" checkbox", async () => {
      await page.getByRole("checkbox", { name: "Hand Tools" }).check();
    });

    await test.step("And the Hand Tools checkbox is checked (action took effect)", async () => {
      await expect(
        page.getByRole("checkbox", { name: "Hand Tools" }),
        "Hand Tools checkbox should be checked before changing page"
      ).toBeChecked();
    });

    await test.step("And I click \"Page-2\"", async () => {
      await productCataloguePage.page2Button.click();
    });

    await test.step("Then the \"Hand Tools\" checkbox is still checked (filter persisted)", async () => {
      await expect(
        page.getByRole("checkbox", { name: "Hand Tools" }),
        "Hand Tools checkbox should remain checked after navigating to page 2"
      ).toBeChecked();
    });

    await test.step("And the page displays \"Hand Saw\"", async () => {
      await expect(page.getByText("Hand Saw").first()).toBeVisible();
    });
  });

  // @story:TOOL-7
  // @design:D10
  // @type:accessibility
  // @technique:checklist-based
  test("AC-accessibility Filter panel passes accessibility checks", async ({ page }) => {
    const productCataloguePage = new ProductCataloguePage(page);

    await test.step("Given I navigate to the home page", async () => {
      await productCataloguePage.goto();
    });

    await test.step("Then the product list passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page })
        .include(".filters, [class*='filter'], aside, .col-3, .col-md-3")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(
        axeResults.violations.map((v) => v.id).sort(),
        `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`
      ).toEqual([]);
    });
  });
});
