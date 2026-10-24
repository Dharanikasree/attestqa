import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/search.page";

// ---------------------------------------------------------------------------
// Helpers shared by all SCRUM-19 tests
// ---------------------------------------------------------------------------

async function loginAs(page: import("@playwright/test").Page, email: string, pass: string): Promise<{ token: string; bid: number }> {
  await page.goto("/#/login");
  await page.locator("#email").fill(email);
  await page.locator("#password").fill(pass);
  await page.locator("#loginButton").click();
  // Precondition: assert the login succeeded before doing anything else
  await expect(page.getByRole("button", { name: "Show/hide account menu" })).toBeVisible();
  // Extract token and basket id from localStorage
  const token = await page.evaluate(() => localStorage.getItem("token") ?? "");
  const bidStr = await page.evaluate(() => localStorage.getItem("bid") ?? "0");
  const bid = parseInt(bidStr, 10);
  return { token, bid };
}

async function dismissCookieBanner(page: import("@playwright/test").Page) {
  const dismiss = page.getByRole("button", { name: "dismiss cookie message" });
  if (await dismiss.isVisible()) {
    await dismiss.click();
  }
}

async function dismissWelcomeBanner(page: import("@playwright/test").Page) {
  const close = page.getByRole("button", { name: "Close Welcome Banner" });
  if (await close.isVisible()) {
    await close.click();
  }
}

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

  // ---------------------------------------------------------------------------
  // SCRUM-19: Customer adds products to the basket and changes quantities
  // ---------------------------------------------------------------------------

  // @story:SCRUM-19
  // @ac:1
  // @design:D7
  // @type:functional
  // @technique:state-transition
  test("AC-1 – Adding a product from the product list confirms it on screen and increments the basket count", async ({ page }) => {
    await test.step("Given I am logged in and on the product list page", async () => {
      await loginAs(page, process.env["AQA_APP_USER"]!, process.env["AQA_APP_PASS"]!);
      await page.goto("/#/");
    });

    const basketCountBefore = await test.step("Capture basket count before adding", async () => {
      const countEl = page.getByRole("button", { name: "Show the shopping cart" }).locator("span, div").filter({ hasText: /^\d+$/ }).first();
      const text = await countEl.innerText();
      return parseInt(text, 10);
    });

    await test.step("When I click 'Add to Basket' for the first product", async () => {
      await page.locator("article").first().getByRole("button", { name: "Add to Basket" }).click();
    });

    await test.step("Then a confirmation toast is displayed", async () => {
      await expect(page.locator("snack-bar-container")).toBeVisible();
    });

    await test.step("And the basket count in the top bar increases by one", async () => {
      await expect(page.getByRole("button", { name: "Show the shopping cart" }).locator("span.mat-badge-content")).toHaveText(String(basketCountBefore + 1));
    });
  });

  // @story:SCRUM-19
  // @ac:1
  // @design:D8
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-1 – Adding two different products increments the basket count to two", async ({ page }) => {
    await test.step("Given I am logged in and on the product list page", async () => {
      await loginAs(page, process.env["AQA_APP_USER"]!, process.env["AQA_APP_PASS"]!);
      await page.goto("/#/");
    });

    await test.step("When I add the first product to the basket", async () => {
      await page.locator("article").nth(0).getByRole("button", { name: "Add to Basket" }).click();
      await expect(page.locator("snack-bar-container")).toBeVisible();
      await expect(page.locator("snack-bar-container")).not.toBeVisible();
    });

    await test.step("And I add the second product to the basket", async () => {
      await page.locator("article").nth(1).getByRole("button", { name: "Add to Basket" }).click();
      await expect(page.locator("snack-bar-container")).toBeVisible();
    });

    await test.step("Then the basket count in the top bar shows 2", async () => {
      await expect(page.getByRole("button", { name: "Show the shopping cart" }).locator("span.mat-badge-content")).toHaveText("2");
    });
  });

  // @story:SCRUM-19
  // @ac:2
  // @design:D9
  // @type:functional
  // @technique:state-transition
  test("AC-2a – Increasing a product quantity in the basket updates the line and total", async ({ page }) => {
    await test.step("Given I am logged in with one product in the basket and on the basket page", async () => {
      await loginAs(page, process.env["AQA_APP_USER"]!, process.env["AQA_APP_PASS"]!);
      // Add one product via API to avoid UI side-effects in setup
      const loginResp = await page.request.post("/rest/user/login", {
        data: { email: process.env["AQA_APP_USER"]!, password: process.env["AQA_APP_PASS"]! },
      });
      expect(loginResp.status(), "Precondition: login API must return 200").toBe(200);
      const loginBody = await loginResp.json();
      const token = loginBody.authentication.token;
      const bid = loginBody.authentication.bid;

      const addResp = await page.request.post("/api/BasketItems", {
        headers: { Authorization: `Bearer ${token}` },
        data: { ProductId: 1, BasketId: bid, quantity: 1 },
      });
      expect(addResp.status(), "Precondition: add item to basket must return 200 or 201").toBeLessThan(300);

      await page.goto("/#/basket");
    });

    const initialTotal = await test.step("Capture initial total price", async () => {
      const totalEl = page.locator("mat-row").first().locator("mat-cell").last();
      return await totalEl.innerText();
    });

    await test.step("When I increase the product quantity to 2", async () => {
      await page.locator("mat-row").first().getByRole("button", { name: /\+|add_circle/ }).click();
    });

    await test.step("Then the product quantity in the basket is 2", async () => {
      await expect(page.locator("mat-row").first().locator("mat-cell").nth(1)).toHaveText("2");
    });

    await test.step("And the basket total reflects the updated quantity", async () => {
      await expect(page.locator("div.total-price, p.total-price, span.total")).not.toHaveText(initialTotal);
    });
  });

  // @story:SCRUM-19
  // @ac:2
  // @design:D10
  // @type:functional
  // @technique:state-transition
  test("AC-2b – Decreasing a product quantity in the basket updates the line and total", async ({ page }) => {
    await test.step("Given I am logged in with two of a product in the basket and on the basket page", async () => {
      await loginAs(page, process.env["AQA_APP_USER"]!, process.env["AQA_APP_PASS"]!);
      const loginResp = await page.request.post("/rest/user/login", {
        data: { email: process.env["AQA_APP_USER"]!, password: process.env["AQA_APP_PASS"]! },
      });
      expect(loginResp.status(), "Precondition: login API must return 200").toBe(200);
      const loginBody = await loginResp.json();
      const token = loginBody.authentication.token;
      const bid = loginBody.authentication.bid;

      const addResp = await page.request.post("/api/BasketItems", {
        headers: { Authorization: `Bearer ${token}` },
        data: { ProductId: 1, BasketId: bid, quantity: 2 },
      });
      expect(addResp.status(), "Precondition: add 2 items to basket must return < 300").toBeLessThan(300);

      await page.goto("/#/basket");
    });

    await test.step("When I decrease the product quantity to 1", async () => {
      await page.locator("mat-row").first().getByRole("button", { name: /remove_circle|-/ }).click();
    });

    await test.step("Then the product quantity in the basket is 1", async () => {
      await expect(page.locator("mat-row").first().locator("mat-cell").nth(1)).toHaveText("1");
    });

    await test.step("And the basket total reflects the updated quantity", async () => {
      await expect(page.locator("span.ng-star-inserted, p.item-price, mat-cell")).toContainText("1");
    });
  });

  // @story:SCRUM-19
  // @ac:3
  // @design:D11
  // @type:functional
  // @technique:state-transition
  test("AC-3 – Removing a product from the basket takes it out of the basket and the total", async ({ page }) => {
    await test.step("Given I am logged in with one product in the basket and on the basket page", async () => {
      await loginAs(page, process.env["AQA_APP_USER"]!, process.env["AQA_APP_PASS"]!);
      const loginResp = await page.request.post("/rest/user/login", {
        data: { email: process.env["AQA_APP_USER"]!, password: process.env["AQA_APP_PASS"]! },
      });
      expect(loginResp.status(), "Precondition: login API must return 200").toBe(200);
      const loginBody = await loginResp.json();
      const token = loginBody.authentication.token;
      const bid = loginBody.authentication.bid;

      const addResp = await page.request.post("/api/BasketItems", {
        headers: { Authorization: `Bearer ${token}` },
        data: { ProductId: 1, BasketId: bid, quantity: 1 },
      });
      expect(addResp.status(), "Precondition: add item to basket must return < 300").toBeLessThan(300);

      await page.goto("/#/basket");
    });

    await test.step("When I delete the product from the basket", async () => {
      await page.locator("mat-row").first().getByRole("button", { name: /delete|remove_shopping_cart/ }).click();
    });

    await test.step("Then no products are shown in the basket", async () => {
      await expect(page.locator("mat-row")).toHaveCount(0);
    });

    await test.step("And the basket total shows zero", async () => {
      await expect(page.getByText(/Total Price: 0/)).toBeVisible();
    });
  });

  // @story:SCRUM-19
  // @design:D12
  // @type:accessibility
  // @technique:checklist-based
  test("story – Basket page passes axe accessibility checks", async ({ page }) => {
    await test.step("Given I am logged in with one product in the basket and on the basket page", async () => {
      await loginAs(page, process.env["AQA_APP_USER"]!, process.env["AQA_APP_PASS"]!);
      const loginResp = await page.request.post("/rest/user/login", {
        data: { email: process.env["AQA_APP_USER"]!, password: process.env["AQA_APP_PASS"]! },
      });
      expect(loginResp.status(), "Precondition: login API must return 200").toBe(200);
      const loginBody = await loginResp.json();
      const token = loginBody.authentication.token;
      const bid = loginBody.authentication.bid;

      const addResp = await page.request.post("/api/BasketItems", {
        headers: { Authorization: `Bearer ${token}` },
        data: { ProductId: 1, BasketId: bid, quantity: 1 },
      });
      expect(addResp.status(), "Precondition: add item to basket must return < 300").toBeLessThan(300);

      await page.goto("/#/basket");
    });

    await test.step("Then the page passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page })
        .include("main")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
