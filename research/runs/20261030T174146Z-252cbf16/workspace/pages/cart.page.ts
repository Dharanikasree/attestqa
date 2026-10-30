/**
 * @bdd2pw generated 2026-10-30T17:48:43.646Z
 * @bdd2pw dom-hash ff8a4711c817004322e423cc2aa6bbcc41b2a645810e9605ec1cff57eb04791b
 * @bdd2pw url http://localhost:4200
 *
 * The dom-hash line is used by bdd2pw to detect DOM drift on
 * re-scaffold. Do not edit it by hand — regenerate with `bdd2pw
 * scaffold` or `bdd2pw update-pom` to refresh.
 */
import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly documentationLink: Locator;
  readonly testingNotificationBar: Locator;
  readonly testingGuideButton: Locator;
  readonly showLiveShopActivityButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.documentationLink = page.getByRole("link", { name: "Documentation" });
    this.testingNotificationBar = page.locator(".testing-notification-bar");
    this.testingGuideButton = page.getByRole("button", { name: "Testing Guide" });
    this.showLiveShopActivityButton = page.getByRole("button", { name: "Show live shop activity" });
  }

  async goto(): Promise<void> {
    await this.page.goto("http://localhost:4200");
  }
}
