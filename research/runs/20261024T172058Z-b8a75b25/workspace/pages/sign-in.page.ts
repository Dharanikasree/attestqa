/**
 * @bdd2pw generated 2026-10-24T17:25:08.063Z
 * @bdd2pw dom-hash 0222fb54f27e1818a256a6d3a7a03c94a2a5a19d1801445a95f0f02b1b387a26
 * @bdd2pw url https://www.saucedemo.com
 *
 * The dom-hash line is used by bdd2pw to detect DOM drift on
 * re-scaffold. Do not edit it by hand — regenerate with `bdd2pw
 * scaffold` or `bdd2pw update-pom` to refresh.
 */
import { Page, Locator, expect } from "@playwright/test";

export class SignInPage {
  readonly page: Page;
  readonly acceptedUsernamesAreStandardUserlock: Locator;
  readonly login: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly errorMessageContainer: Locator;
  readonly loginButton: Locator;
  readonly acceptedUsernamesAreHeading: Locator;
  readonly passwordForAllUsersHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptedUsernamesAreStandardUserlock = page.locator(".login_wrapper");
    this.login = page.locator("form");
    this.usernameInput = page.getByRole("textbox", { name: "Username" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.errorMessageContainer = page.locator(".error-message-container");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.acceptedUsernamesAreHeading = page.getByRole("heading", { name: "Accepted usernames are:" });
    this.passwordForAllUsersHeading = page.getByRole("heading", { name: "Password for all users:" });
  }

  async goto(): Promise<void> {
    await this.page.goto("/");
  }
}
