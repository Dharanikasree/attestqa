/**
 * @bdd2pw generated 2026-10-26T23:54:57.551Z
 * @bdd2pw dom-hash 30cc0c9a8038dc5349f038898b323b4c0792fd60ef4f16ceefededb3ff6ec7d2
 * @bdd2pw url https://www.saucedemo.com/cart.html
 *
 * The dom-hash line is used by bdd2pw to detect DOM drift on
 * re-scaffold. Do not edit it by hand — regenerate with `bdd2pw
 * scaffold` or `bdd2pw update-pom` to refresh.
 */
import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly epicSadfaceYouCanOnlyAccessCart: Locator;
  readonly login: Locator;
  readonly usernameInput: Locator;
  readonly imgElements: Locator;
  readonly passwordInput: Locator;
  readonly errorMessageContainer: Locator;
  readonly epicSadfaceYouCanOnlyAccessCartHtmlWhenYouAreLoggedInAlert: Locator;
  readonly errorButton: Locator;
  readonly loginButton: Locator;
  readonly acceptedUsernamesAreHeading: Locator;
  readonly passwordForAllUsersHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.epicSadfaceYouCanOnlyAccessCart = page.locator(".login_wrapper");
    this.login = page.getByText("Epic sadface: You can only access '/cart.html' when you are logged in.");
    this.usernameInput = page.getByRole("textbox", { name: "Username" });
    this.imgElements = page.locator("svg");
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.errorMessageContainer = page.locator(".error-message-container");
    this.epicSadfaceYouCanOnlyAccessCartHtmlWhenYouAreLoggedInAlert = page.getByRole("alert", { name: "Epic sadface: You can only access '/cart.html' when you are logged in." });
    this.errorButton = page.getByRole("button", { name: "Dismiss error" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.acceptedUsernamesAreHeading = page.getByRole("heading", { name: "Accepted usernames are:" });
    this.passwordForAllUsersHeading = page.getByRole("heading", { name: "Password for all users:" });
  }

  async goto(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com/cart.html");
  }
}
