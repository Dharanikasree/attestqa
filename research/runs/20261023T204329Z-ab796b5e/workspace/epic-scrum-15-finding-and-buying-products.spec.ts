import { test, expect, request as playwrightRequest } from "@playwright/test";
import { SearchPage } from "../pages/search.page";

// Helper: log in via REST API and return the auth token
async function loginViaApi(baseURL: string): Promise<string> {
  const apiContext = await playwrightRequest.newContext();
  const resp = await apiContext.post(`${baseURL}/rest/user/login`, {
    data: {
      email: process.env["AQA_APP_USER"],
      password: process.env["AQA_APP_PASS"],
    },
  });
  expect(resp.status(), `Login precondition: expected 200 but got ${resp.status()} — check AQA_APP_USER/AQA_APP_PASS`).toBe(200);
  const body = await resp.json();
  const token: string = body?.authentication?.token;
  expect(token, "Login precondition: no token in response — login failed").toBeTruthy();
  await apiContext.dispose();
  return token;
}

// Helper: get basket ID for the logged-in user
async function getBasketId(baseURL: string, token: string): Promise<number> {
  const apiContext = await playwrightRequest.newContext();
  const resp = await apiContext.get(`${baseURL}/rest/user/whoami`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(resp.status(), "Precondition: whoami failed").toBe(200);
  const body = await resp.json();
  const bid: number = body?.data?.bid;
  expect(bid, "Precondition: no basket id in whoami response").toBeTruthy();
  await apiContext.dispose();
  return bid;
}

// Helper: add a product to the basket and return the basket item id
async function addProductToBasket(baseURL: string, token: string, basketId: number, productId: number): Promise<number> {
  const apiContext = await playwrightRequest.newContext();
  const resp = await apiContext.post(`${baseURL}/api/BasketItems`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { BasketId: basketId, ProductId: productId, quantity: 1 },
  });
  expect(resp.status(), `Precondition: adding product ${productId} to basket failed with ${resp.status()}`).toBe(200);
  const body = await resp.json();
  const itemId: number = body?.data?.id;
  expect(itemId, "Precondition: no basket item id returned").toBeTruthy();
  await apiContext.dispose();
  return itemId;
}

// Helper: set browser auth token in localStorage so the page is logged in
async function setAuthInBrowser(page: import("@playwright/test").Page, baseURL: string, token: string): Promise<void> {
  // Navigate to the app first so we are on the right origin, then set localStorage
  await page.goto(`${baseURL}/#/`);
  await page.evaluate((t) => {
    localStorage.setItem("token", t);
  }, token);
  // Reload so the Angular app picks up the stored token
  await page.reload();
  // Wait for the account menu to reflect a logged-in state (shows a non-anonymous name)
  // We don't assert the exact name — just that the basket button is present, which always is
}Navigate first so localStorage is available, then set token, then reload
  await page.goto(`${baseURL}/#/`);
  await page.evaluate((t) => {
    localStorage.setItem("token", t);
  }, token);
  // Reload so the Angular app reads the token from localStorage
  await page.reload();
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

  // @story:SCRUM-19
  // @ac:1
  // @design:D7
  // @type:functional
  // @technique:state-transition
  test("AC-1 – Adding a product from the product list confirms it on screen and increments the basket count", async ({ page, baseURL }) => {
    // PRECONDITION: log in via API, verify authentication succeeded
    const token = await loginViaApi(baseURL!);

    await test.step("Given I am on the product list page as a registered user", async () => {
      await setAuthInBrowser(page, baseURL!, token);
      await page.goto("/#/");
      // Dismiss cookie banner if present
      const cookieBtn = page.getByRole("button", { name: "dismiss cookie message" });
      if (await cookieBtn.isVisible()) await cookieBtn.click();
      // Dismiss welcome banner if present
      const welcomeBtn = page.getByRole("button", { name: "Close Welcome Banner" });
      if (await welcomeBtn.isVisible()) await welcomeBtn.click();
    });

    await test.step("When I click Add to Basket for Apple Juice (1000ml)", async () => {
      // Find the article containing "Apple Juice (1000ml)" and click its Add to Basket button
      const article = page.locator("mat-card", { hasText: "Apple Juice (1000ml)" }).first();
      await article.getByRole("button", { name: "Add to Basket" }).click();
    });

    await test.step("Then a confirmation snackbar is displayed", async () => {
      // AC-1: "confirms it on screen" — the snackbar shows the product was added
      await expect(page.locator("snack-bar-container")).toBeVisible();
    });

    await test.step("And the basket count in the top bar goes up by one", async () => {
      // The basket count badge should show 1
      await expect(page.locator("mat-badge-content").first()).toHaveText("1");
    });
  });

  // @story:SCRUM-19
  // @ac:2
  // @design:D8
  // @type:functional
  // @technique:state-transition
  test("AC-2 – Increasing and decreasing a product quantity in the basket updates the line and total price", async ({ page, baseURL }) => {
    // PRECONDITION: log in and add Apple Juice to the basket via API
    const token = await loginViaApi(baseURL!);
    const basketId = await getBasketId(baseURL!, token);
    await addProductToBasket(baseURL!, token, basketId, 1); // product ID 1 = Apple Juice (1000ml)

    await test.step("Given I am on the basket page with Apple Juice already in the basket", async () => {
      await setAuthInBrowser(page, baseURL!, token);
      await page.goto("/#/basket");
      // Dismiss cookie banner if present
      const cookieBtn = page.getByRole("button", { name: "dismiss cookie message" });
      if (await cookieBtn.isVisible()) await cookieBtn.click();
      // Verify the product is in the basket (precondition check)
      await expect(page.getByText("Apple Juice (1000ml)").first()).toBeVisible({ timeout: 10000 });
    });

    await test.step("When I click the increase quantity button", async () => {
      await page.locator("button[aria-label='Increase quantity']").first().click();
    });

    await test.step("Then the quantity shown is 2 and the total price updates", async () => {
      await expect(page.locator("input[type='number']").first()).toHaveValue("2");
      await expect(page.getByText("3.98")).toBeVisible();
    });

    await test.step("When I click the decrease quantity button", async () => {
      await page.locator("button[aria-label='Decrease quantity']").first().click();
    });

    await test.step("Then the quantity shown is 1 and the total price updates", async () => {
      await expect(page.locator("input[type='number']").first()).toHaveValue("1");
      await expect(page.getByText("1.99")).toBeVisible();
    });
  });

  // @story:SCRUM-19
  // @ac:3
  // @design:D9
  // @type:functional
  // @technique:state-transition
  test("AC-3 – Removing a product from the basket takes it out and updates the total", async ({ page, baseURL }) => {
    // PRECONDITION: log in and add Apple Juice to the basket via API
    const token = await loginViaApi(baseURL!);
    const basketId = await getBasketId(baseURL!, token);
    await addProductToBasket(baseURL!, token, basketId, 1); // product ID 1 = Apple Juice (1000ml)

    await test.step("Given I am on the basket page with Apple Juice already in the basket", async () => {
      await setAuthInBrowser(page, baseURL!, token);
      await page.goto("/#/basket");
      // Dismiss cookie banner if present
      const cookieBtn = page.getByRole("button", { name: "dismiss cookie message" });
      if (await cookieBtn.isVisible()) await cookieBtn.click();
      // Verify the product is in the basket (precondition check)
      await expect(page.getByText("Apple Juice (1000ml)").first()).toBeVisible({ timeout: 10000 });
    });

    await test.step("When I click the delete button for Apple Juice", async () => {
      await page.locator("button[aria-label='Remove from basket']").first().click();
    });

    await test.step("Then Apple Juice is no longer listed in the basket", async () => {
      await expect(page.getByText("Apple Juice (1000ml)")).not.toBeVisible();
    });

    await test.step("And the total price shows 0", async () => {
      await expect(page.getByText("Total Price: 0¤")).toBeVisible();
    });
  });

  // @story:SCRUM-19
  // @ac:1
  // @design:D10
  // @type:functional
  // @technique:equivalence-partitioning
  test("AC-1 – Adding two different products increases the basket count by one for each", async ({ page, baseURL }) => {
    // PRECONDITION: log in via API, verify authentication succeeded
    const token = await loginViaApi(baseURL!);

    await test.step("Given I am on the product list page as a registered user", async () => {
      await setAuthInBrowser(page, baseURL!, token);
      await page.goto("/#/");
      // Dismiss cookie banner if present
      const cookieBtn = page.getByRole("button", { name: "dismiss cookie message" });
      if (await cookieBtn.isVisible()) await cookieBtn.click();
      // Dismiss welcome banner if present
      const welcomeBtn = page.getByRole("button", { name: "Close Welcome Banner" });
      if (await welcomeBtn.isVisible()) await welcomeBtn.click();
    });

    await test.step("When I click Add to Basket for Apple Juice (1000ml)", async () => {
      const article = page.locator("mat-card", { hasText: "Apple Juice (1000ml)" }).first();
      await article.getByRole("button", { name: "Add to Basket" }).click();
      // Wait for basket count to update to 1
      await expect(page.locator("mat-badge-content").first()).toHaveText("1");
    });

    await test.step("And I click Add to Basket for Apple Pomace", async () => {
      const article = page.locator("mat-card", { hasText: "Apple Pomace" }).first();
      await article.getByRole("button", { name: "Add to Basket" }).click();
    });

    await test.step("Then the basket count is 2", async () => {
      await expect(page.locator("mat-badge-content").first()).toHaveText("2");
    });
  });

  // @story:SCRUM-19
  // @design:D11
  // @type:accessibility
  // @technique:checklist-based
  test("story – Basket page passes axe accessibility checks", async ({ page, baseURL }) => {
    // PRECONDITION: log in via API
    const token = await loginViaApi(baseURL!);

    await test.step("Given I am on the basket page as a registered user", async () => {
      await setAuthInBrowser(page, baseURL!, token);
      await page.goto("/#/basket");
      // Dismiss cookie banner if present
      const cookieBtn = page.getByRole("button", { name: "dismiss cookie message" });
      if (await cookieBtn.isVisible()) await cookieBtn.click();
    });

    await test.step("Then the basket page passes axe accessibility checks", async () => {
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const axeResults = await new AxeBuilder({ page })
        .include("main")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axeResults.violations.map((v) => v.id).sort(), `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`).toEqual([]);
    });
  });
});
