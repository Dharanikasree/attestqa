/**
 * @bdd2pw generated 2026-10-25T18:01:36.867Z
 * @bdd2pw dom-hash 0100a771d46f354f53442f6d74f2c773e91dfb17bf980ee5ed964aaeb30f2ea8
 * @bdd2pw url https://www.saucedemo.com/inventory.html
 *
 * The dom-hash line is used by bdd2pw to detect DOM drift on
 * re-scaffold. Do not edit it by hand — regenerate with `bdd2pw
 * scaffold` or `bdd2pw update-pom` to refresh.
 */
import { Page, Locator, expect } from "@playwright/test";

export class ProductListPage {
  readonly page: Page;
  readonly epicSadfaceYouCanOnlyAccessInve: Locator;
  readonly login: Locator;
  readonly usernameInput: Locator;
  readonly imgElements: Locator;
  readonly passwordInput: Locator;
  readonly errorMessageContainer: Locator;
  readonly epicSadfaceYouCanOnlyAccessInventoryHtmlWhenYouAreLoggedInAlert: Locator;
  readonly errorButton: Locator;
  readonly loginButton: Locator;
  readonly acceptedUsernamesAreHeading: Locator;
  readonly passwordForAllUsersHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.epicSadfaceYouCanOnlyAccessInve = page.locator(".login_wrapper");
    this.login = page.getByText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
    this.usernameInput = page.getByRole("textbox", { name: "Username" });
    this.imgElements = page.locator("svg");
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.errorMessageContainer = page.locator(".error-message-container");
    this.epicSadfaceYouCanOnlyAccessInventoryHtmlWhenYouAreLoggedInAlert = page.getByRole("alert", { name: "Epic sadface: You can only access '/inventory.html' when you are logged in." });
    this.errorButton = page.getByRole("button", { name: "Dismiss error" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.acceptedUsernamesAreHeading = page.getByRole("heading", { name: "Accepted usernames are:" });
    this.passwordForAllUsersHeading = page.getByRole("heading", { name: "Password for all users:" });
  }

  async goto(): Promise<void> {
    await this.page.goto("/inventory.html");
  }
}
