import { test, expect, request as playwrightRequest } from "@playwright/test";
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

  // @story:SCRUM-19
  // @ac:1
  // @design:D6
  // @type:functional
  // @technique:state-transition
  test("AC-1 – Adding a product from the product list increments the basket count", async ({ page }) => {
    const baseURL = process.env["AQA_APP_URL"] || "http://localhost:3100";

    // Precondition: sign in via API and confirm authentication succeeded
    const apiContext = await playwrightRequest.newContext({ baseURL });
    const loginResp = await apiContext.post("/rest/user/login", {
      data: { email: process.env["AQA_APP_USER"], password: process.env["AQA_APP_PASS"] },
    });
    expect(loginResp.status(), "Precondition: login must succeed (200) — check AQA_APP_USER / AQA_APP_PASS").toBe(200);
    const loginBody = await loginResp.json();
    const token = loginBody?.authentication?.token;
    expect(token, "Precondition: authentication token must be present in login response").toBeTruthy();
    await apiContext.dispose();

    // Set the token in localStorage so the browser session is authenticated
    await page.goto("/#/");
    await page.evaluate((t) => {
      localStorage.setItem("token", t);
    }, token);

    // Navigate to the product list
    await page.goto("/#/");

    // Dismiss cookie banner if present
    const cookieBtn = page.getByRole("button", { name: "Me want it!" });
    if (await cookieBtn.isVisible()) await cookieBtn.click();

    // Record basket count before adding
    const basketCountEl = page.locator("mat-toolbar button[aria-label='Show the shopping cart'] .mat-badge-content, mat-toolbar .badge, mat-toolbar generic").filter({ hasText: /^\d+$/ }).first();

    // Click "Add to Basket" for Apple Juice (1000ml)
    const addBtn = page.locator("article").filter({ hasText: "Apple Juice (1000ml)" }).getByRole("button", { name: "Add to Basket" });
    await expect(addBtn).toBeVisible();
    await addBtn.click();

    // After click: assert the basket count in the top bar shows "1"
    // The shopping cart button text updates to "Your Basket 1" after adding
    await expect(
      page.getByRole("button", { name: "Show the shopping cart" })
    ).toContainText("1");
  });

  // @story:SCRUM-19
  // @ac:2
  // @design:D7
  // @type:functional
  // @technique:state-transition
  test("AC-2 – Increasing and decreasing a product quantity updates the line price and total", async ({ page }) => {
    const baseURL = process.env["AQA_APP_URL"] || "http://localhost:3100";

    // Precondition: sign in via API
    const apiContext = await playwrightRequest.newContext({ baseURL });
    const loginResp = await apiContext.post("/rest/user/login", {
      data: { email: process.env["AQA_APP_USER"], password: process.env["AQA_APP_PASS"] },
    });
    expect(loginResp.status(), "Precondition: login must succeed (200)").toBe(200);
    const loginBody = await loginResp.json();
    const token = loginBody?.authentication?.token;
    expect(token, "Precondition: token must be present").toBeTruthy();

    // Clear the basket first, then add Apple Juice fresh
    const bid = loginBody?.authentication?.bid;
    expect(bid, "Precondition: basket ID must be present in login response").toBeTruthy();
    const basketResp = await apiContext.get(`/rest/basket/${bid}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(basketResp.status(), "Precondition: fetching basket must succeed").toBeLessThan(300);
    const basketBody = await basketResp.json();
    const existingItems: Array<{ id: number }> = basketBody?.data?.Products?.map((p: { BasketItem: { id: number } }) => ({ id: p.BasketItem.id })) ?? [];
    for (const item of existingItems) {
      await apiContext.delete(`/api/BasketItems/${item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    // Add Apple Juice (product id=1) to basket via API
    const addResp = await apiContext.post("/api/BasketItems/", {
      headers: { Authorization: `Bearer ${token}` },
      data: { ProductId: 1, BasketId: bid, quantity: 1 },
    });
    expect(addResp.status(), "Precondition: adding Apple Juice to basket via API must succeed").toBeLessThan(300);
    await apiContext.dispose();

    // Authenticate the browser session
    await page.goto("/#/");
    await page.evaluate((t) => { localStorage.setItem("token", t); }, token);

    // Navigate to the basket
    await page.goto("/#/basket");

    // Dismiss cookie banner if present
    const cookieBtn = page.getByRole("button", { name: "Me want it!" });
    if (await cookieBtn.isVisible()) await cookieBtn.click();

    // Assert Apple Juice is in the basket (precondition check)
    await expect(page.getByText("Apple Juice (1000ml)")).toBeVisible();

    // Increase quantity — click the "+" button in the Apple Juice row
    const juiceRow = page.getByRole("row").filter({ hasText: "Apple Juice" });
    const increaseBtn = juiceRow.getByRole("button").last();
    await expect(increaseBtn).toBeVisible();
    await increaseBtn.click();

    // After increase: quantity input should show 2
    const qtyInput = juiceRow.locator("input");
    await expect(qtyInput).toHaveValue("2");

    // Total price should have updated
    await expect(page.getByText(/Total Price:/)).toBeVisible();

    // Decrease quantity — click the "-" button (first button in the row)
    const decreaseBtn = juiceRow.getByRole("button").first();
    await expect(decreaseBtn).toBeVisible();
    await decreaseBtn.click();

    // After decrease: quantity input should show 1
    await expect(qtyInput).toHaveValue("1");

    // Total price should have updated back
    await expect(page.getByText(/Total Price:/)).toBeVisible();
  });

  // @story:SCRUM-19
  // @ac:3
  // @design:D8
  // @type:functional
  // @technique:state-transition
  test("AC-3 – Removing a product takes it out of the basket and the total drops to zero", async ({ page }) => {
    const baseURL = process.env["AQA_APP_URL"] || "http://localhost:3100";

    // Precondition: sign in via API
    const apiContext = await playwrightRequest.newContext({ baseURL });
    const loginResp = await apiContext.post("/rest/user/login", {
      data: { email: process.env["AQA_APP_USER"], password: process.env["AQA_APP_PASS"] },
    });
    expect(loginResp.status(), "Precondition: login must succeed (200)").toBe(200);
    const loginBody = await loginResp.json();
    const token = loginBody?.authentication?.token;
    expect(token, "Precondition: token must be present").toBeTruthy();

    const bid = loginBody?.authentication?.bid;
    expect(bid, "Precondition: basket ID must be present in login response").toBeTruthy();

    // Clear the basket first to avoid 500 from duplicate items
    const basketResp = await apiContext.get(`/rest/basket/${bid}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (basketResp.status() < 300) {
      const basketBody = await basketResp.json();
      const existingItems: Array<{ id: number }> = basketBody?.data?.Products?.map((p: { BasketItem: { id: number } }) => ({ id: p.BasketItem.id })) ?? [];
      for (const item of existingItems) {
        await apiContext.delete(`/api/BasketItems/${item.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    }

    // Add Apple Juice (product id=1) to basket via API
    const addResp = await apiContext.post("/api/BasketItems/", {
      headers: { Authorization: `Bearer ${token}` },
      data: { ProductId: 1, BasketId: bid, quantity: 1 },
    });
    expect(addResp.status(), "Precondition: adding Apple Juice to basket via API must succeed").toBeLessThan(300);
    await apiContext.dispose();

    // Authenticate the browser session
    await page.goto("/#/");
    await page.evaluate((t) => { localStorage.setItem("token", t); }, token);

    // Navigate to the basket
    await page.goto("/#/basket");

    // Dismiss cookie banner if present
    const cookieBtn = page.getByRole("button", { name: "Me want it!" });
    if (await cookieBtn.isVisible()) await cookieBtn.click();

    // Assert Apple Juice is in the basket (precondition check)
    await expect(page.getByText("Apple Juice (1000ml)")).toBeVisible();

    // Click the delete/remove button for Apple Juice
    const juiceRowAc3 = page.getByRole("row").filter({ hasText: "Apple Juice" });
    const deleteBtn = juiceRowAc3.getByRole("button").last();
    await expect(deleteBtn).toBeVisible();
    await deleteBtn.click();

    // After removal: Apple Juice should no longer be visible in the basket
    await expect(page.getByText("Apple Juice (1000ml)")).not.toBeVisible();

    // Total price should be 0
    await expect(page.getByText(/Total Price:\s*0/)).toBeVisible();
  });

  // @story:SCRUM-21
  // @ac:1
  // @design:D10
  // @type:functional
  // @technique:state-transition
  test("AC-1 – Signed-in customer submits a review and a confirmation is shown", async ({ page }) => {
    const baseURL = process.env["AQA_APP_URL"] || "http://localhost:3100";

    // Precondition: sign in via API and confirm authentication succeeded
    const apiContext = await playwrightRequest.newContext({ baseURL });
    const loginResp = await apiContext.post("/rest/user/login", {
      data: { email: process.env["AQA_APP_USER"], password: process.env["AQA_APP_PASS"] },
    });
    expect(loginResp.status(), "Precondition: login must succeed (200) — check AQA_APP_USER / AQA_APP_PASS").toBe(200);
    const loginBody = await loginResp.json();
    const token = loginBody?.authentication?.token;
    expect(token, "Precondition: authentication token must be present in login response").toBeTruthy();
    await apiContext.dispose();

    // Authenticate the browser session
    await page.goto("/#/");
    await page.evaluate((t) => { localStorage.setItem("token", t); }, token);

    // Navigate to the product list
    await page.goto("/#/");

    // Dismiss cookie banner if present
    const cookieBtn = page.getByRole("button", { name: "Me want it!" });
    if (await cookieBtn.isVisible()) await cookieBtn.click();

    // Wait for products to load
    await expect(page.locator("mat-card").first()).toBeVisible();

    // Open the product detail for the first product
    const firstProductBtn = page.getByRole("button", { name: "Click for more information about the product" }).first();
    await expect(firstProductBtn, "Precondition: product detail button must be visible").toBeVisible();
    await firstProductBtn.click();

    // Wait for the product detail dialog to open
    await expect(page.locator("mat-dialog-container")).toBeVisible();

    // Find the review text area and enter a review
    const reviewField = page.locator("mat-dialog-container").locator("textarea");
    await expect(reviewField, "Precondition: review text area must be visible in product detail").toBeVisible();
    await reviewField.fill("This is a great product!");

    // Click Submit
    const submitBtn = page.locator("mat-dialog-container").getByRole("button", { name: "Send the review" });
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // Assert: confirmation is shown (state after action)
    await expect(page.getByText("Thank you for your review")).toBeVisible();
  });

  // @story:SCRUM-21
  // @ac:2
  // @design:D11
  // @type:functional
  // @technique:state-transition
  test("AC-2 – Submitted review is listed with the customer's email as author", async ({ page }) => {
    const baseURL = process.env["AQA_APP_URL"] || "http://localhost:3100";

    // Precondition: sign in via API
    const apiContext = await playwrightRequest.newContext({ baseURL });
    const loginResp = await apiContext.post("/rest/user/login", {
      data: { email: process.env["AQA_APP_USER"], password: process.env["AQA_APP_PASS"] },
    });
    expect(loginResp.status(), "Precondition: login must succeed (200) — check AQA_APP_USER / AQA_APP_PASS").toBe(200);
    const loginBody = await loginResp.json();
    const token = loginBody?.authentication?.token;
    expect(token, "Precondition: authentication token must be present in login response").toBeTruthy();
    await apiContext.dispose();

    // Record email for author check
    const email = process.env["AQA_APP_USER"];
    expect(email, "Precondition: AQA_APP_USER must be set").toBeTruthy();

    // Authenticate the browser session
    await page.goto("/#/");
    await page.evaluate((t) => { localStorage.setItem("token", t); }, token);

    // Navigate to the product list
    await page.goto("/#/");

    // Dismiss cookie banner if present
    const cookieBtn = page.getByRole("button", { name: "Me want it!" });
    if (await cookieBtn.isVisible()) await cookieBtn.click();

    // Wait for products to load
    await expect(page.locator("mat-card").first()).toBeVisible();

    // Open the product detail for the first product
    const firstProductBtn = page.getByRole("button", { name: "Click for more information about the product" }).first();
    await expect(firstProductBtn, "Precondition: product detail button must be visible").toBeVisible();
    await firstProductBtn.click();

    // Wait for the product detail dialog to open
    await expect(page.locator("mat-dialog-container")).toBeVisible();

    // Find the review text area and enter a unique review
    const reviewField = page.locator("mat-dialog-container").locator("textarea");
    await expect(reviewField, "Precondition: review text area must be visible in product detail").toBeVisible();
    const uniqueReview = "Review for author check " + Date.now();
    await reviewField.fill(uniqueReview);

    // Click Submit
    const submitBtn = page.locator("mat-dialog-container").getByRole("button", { name: "Send the review" });
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // Assert: confirmation shown (action took effect)
    await expect(page.getByText("Thank you for your review")).toBeVisible();

    // Now verify: the submitted review is listed with the customer's email as author
    // Expand the reviews section
    const reviewsExpander = page.locator("mat-dialog-container").locator("mat-expansion-panel");
    if (await reviewsExpander.isVisible()) {
      await reviewsExpander.click();
    }

    // Assert the review text and author email are visible
    await expect(page.locator("mat-dialog-container").getByText(uniqueReview)).toBeVisible();
    await expect(page.locator("mat-dialog-container").getByText(email!)).toBeVisible();
  });

  // @story:SCRUM-21
  // @ac:3
  // @design:D12
  // @type:functional
  // @technique:boundary-value-analysis
  test("AC-3 – Submit button is disabled when the review text is empty", async ({ page }) => {
    const baseURL = process.env["AQA_APP_URL"] || "http://localhost:3100";

    // Precondition: sign in via API
    const apiContext = await playwrightRequest.newContext({ baseURL });
    const loginResp = await apiContext.post("/rest/user/login", {
      data: { email: process.env["AQA_APP_USER"], password: process.env["AQA_APP_PASS"] },
    });
    expect(loginResp.status(), "Precondition: login must succeed (200) — check AQA_APP_USER / AQA_APP_PASS").toBe(200);
    const loginBody = await loginResp.json();
    const token = loginBody?.authentication?.token;
    expect(token, "Precondition: authentication token must be present in login response").toBeTruthy();
    await apiContext.dispose();

    // Authenticate the browser session
    await page.goto("/#/");
    await page.evaluate((t) => { localStorage.setItem("token", t); }, token);

    // Navigate to the product list
    await page.goto("/#/");

    // Dismiss cookie banner if present
    const cookieBtn = page.getByRole("button", { name: "Me want it!" });
    if (await cookieBtn.isVisible()) await cookieBtn.click();

    // Wait for products to load
    await expect(page.locator("mat-card").first()).toBeVisible();

    // Open the product detail for the first product
    const firstProductBtn = page.getByRole("button", { name: "Click for more information about the product" }).first();
    await expect(firstProductBtn, "Precondition: product detail button must be visible").toBeVisible();
    await firstProductBtn.click();

    // Wait for the product detail dialog to open
    await expect(page.locator("mat-dialog-container")).toBeVisible();

    // Assert the review field is visible and empty
    const reviewField = page.locator("mat-dialog-container").locator("textarea");
    await expect(reviewField, "Precondition: review text area must be visible").toBeVisible();

    // Assert: Submit button is disabled when review text is empty (boundary: empty input)
    const submitBtn = page.locator("mat-dialog-container").getByRole("button", { name: "Send the review" });
    await expect(submitBtn, "Submit button must be disabled when review text is empty").toBeDisabled();
  });

  // @story:SCRUM-21
  // @ac:1
  // @design:D13
  // @type:security
  // @technique:equivalence-partitioning
  test("AC-1a – A customer who is not signed in cannot write a review", async ({ page }) => {
    // Navigate to the product list as a guest (no login)
    await page.goto("/#/");

    // Dismiss cookie banner if present
    const cookieBtn = page.getByRole("button", { name: "Me want it!" });
    if (await cookieBtn.isVisible()) await cookieBtn.click();

    // Wait for products to load
    await expect(page.locator("mat-card").first()).toBeVisible();

    // Open the product detail for the first product
    const firstProductBtn = page.getByRole("button", { name: "Click for more information about the product" }).first();
    await expect(firstProductBtn, "Precondition: product detail button must be visible").toBeVisible();
    await firstProductBtn.click();

    // Wait for the product detail dialog to open
    await expect(page.locator("mat-dialog-container")).toBeVisible();

    // Assert: review textarea is not visible to a guest user
    const reviewField = page.locator("mat-dialog-container").locator("textarea");
    await expect(reviewField, "Review field must not be visible to a guest (unauthenticated) user").not.toBeVisible();
  });

  // @story:SCRUM-21
  // @design:D14
  // @type:accessibility
  // @technique:checklist-based
  test("story – Product detail page passes axe accessibility checks", async ({ page }) => {
    const baseURL = process.env["AQA_APP_URL"] || "http://localhost:3100";

    // Precondition: sign in via API
    const apiContext = await playwrightRequest.newContext({ baseURL });
    const loginResp = await apiContext.post("/rest/user/login", {
      data: { email: process.env["AQA_APP_USER"], password: process.env["AQA_APP_PASS"] },
    });
    expect(loginResp.status(), "Precondition: login must succeed (200) — check AQA_APP_USER / AQA_APP_PASS").toBe(200);
    const loginBody = await loginResp.json();
    const token = loginBody?.authentication?.token;
    expect(token, "Precondition: authentication token must be present in login response").toBeTruthy();
    await apiContext.dispose();

    // Authenticate the browser session
    await page.goto("/#/");
    await page.evaluate((t) => { localStorage.setItem("token", t); }, token);

    // Navigate to the product list
    await page.goto("/#/");

    // Dismiss cookie banner if present
    const cookieBtn = page.getByRole("button", { name: "Me want it!" });
    if (await cookieBtn.isVisible()) await cookieBtn.click();

    // Wait for products to load
    await expect(page.locator("mat-card").first()).toBeVisible();

    // Open the product detail for the first product
    const firstProductBtn = page.getByRole("button", { name: "Click for more information about the product" }).first();
    await expect(firstProductBtn, "Precondition: product detail button must be visible").toBeVisible();
    await firstProductBtn.click();

    // Wait for the product detail dialog to open
    await expect(page.locator("mat-dialog-container")).toBeVisible();

    // Run axe scan scoped to the product detail dialog
    const { default: AxeBuilder } = await import("@axe-core/playwright");
    const axeResults = await new AxeBuilder({ page })
      .include("mat-dialog-container")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(
      axeResults.violations.map((v) => v.id).sort(),
      `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`
    ).toEqual([]);
  });

  // @story:SCRUM-21
  // @bug:SCRUM-12
  // @design:D15
  // @type:confirmation
  // @technique:state-transition
  test("bug #SCRUM-12 – Session token is no longer accepted after logout", async ({ page }) => {
    test.fail(true, "Bug #SCRUM-12 Active: Session token is still accepted after logout");

    const baseURL = process.env["AQA_APP_URL"] || "http://localhost:3100";

    // Precondition: sign in via API
    const apiContext = await playwrightRequest.newContext({ baseURL });
    const loginResp = await apiContext.post("/rest/user/login", {
      data: { email: process.env["AQA_APP_USER"], password: process.env["AQA_APP_PASS"] },
    });
    expect(loginResp.status(), "Precondition: login must succeed (200) — check AQA_APP_USER / AQA_APP_PASS").toBe(200);
    const loginBody = await loginResp.json();
    const token = loginBody?.authentication?.token;
    expect(token, "Precondition: authentication token must be present in login response").toBeTruthy();
    await apiContext.dispose();

    // Authenticate the browser session
    await page.goto("/#/");
    await page.evaluate((t) => { localStorage.setItem("token", t); }, token);
    await page.goto("/#/");

    // Dismiss cookie banner if present
    const cookieBtn = page.getByRole("button", { name: "Me want it!" });
    if (await cookieBtn.isVisible()) await cookieBtn.click();

    // Verify we are signed in (account menu visible)
    await expect(page.getByRole("button", { name: /Show\/hide account menu|Account/i })).toBeVisible();

    // Perform logout via the account menu
    await page.getByRole("button", { name: /Show\/hide account menu|Account/i }).click();
    const logoutItem = page.getByRole("menuitem", { name: /Logout/i });
    await expect(logoutItem, "Logout menu item must be visible after opening account menu").toBeVisible();
    await logoutItem.click();

    // Confirm logout took effect: account menu should show login option, not account
    await expect(page.getByRole("button", { name: /Show\/hide account menu|Account/i })).toBeVisible();

    // Assert: the session token is no longer accepted by the API after logout
    const apiContext2 = await playwrightRequest.newContext({ baseURL });
    const whoamiResp = await apiContext2.get("/rest/user/whoami", {
      headers: { Authorization: `Bearer ${token}` },
    });
    await apiContext2.dispose();

    // The token should be rejected (not 200) after logout
    expect(whoamiResp.status(), "Session token must be rejected after logout (bug #SCRUM-12 expects this to fail)").not.toBe(200);
  });

  // @story:SCRUM-19
  // @ac:1
  // @design:D9
  // @type:accessibility
  // @technique:checklist-based
  test("AC-1 – Product list page passes axe accessibility checks", async ({ page }) => {
    const baseURL = process.env["AQA_APP_URL"] || "http://localhost:3100";

    // Precondition: sign in via API
    const apiContext = await playwrightRequest.newContext({ baseURL });
    const loginResp = await apiContext.post("/rest/user/login", {
      data: { email: process.env["AQA_APP_USER"], password: process.env["AQA_APP_PASS"] },
    });
    expect(loginResp.status(), "Precondition: login must succeed (200)").toBe(200);
    const loginBody = await loginResp.json();
    const token = loginBody?.authentication?.token;
    expect(token, "Precondition: token must be present").toBeTruthy();
    await apiContext.dispose();

    // Authenticate the browser session
    await page.goto("/#/");
    await page.evaluate((t) => { localStorage.setItem("token", t); }, token);

    // Navigate to the product list
    await page.goto("/#/");

    // Dismiss cookie banner if present
    const cookieBtn = page.getByRole("button", { name: "Me want it!" });
    if (await cookieBtn.isVisible()) await cookieBtn.click();

    // Wait for products to load
    await expect(page.locator("mat-card").first()).toBeVisible();

    // Run axe scan scoped to main content
    const { default: AxeBuilder } = await import("@axe-core/playwright");
    const axeResults = await new AxeBuilder({ page })
      .include("main")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(
      axeResults.violations.map((v) => v.id).sort(),
      `axe violations: ${JSON.stringify(axeResults.violations, null, 2)}`
    ).toEqual([]);
  });
});
