/**
 * @bdd2pw generated 2026-10-26T23:48:00.919Z
 * @bdd2pw dom-hash 0222fb54f27e1818a256a6d3a7a03c94a2a5a19d1801445a95f0f02b1b387a26
 * @bdd2pw url https://www.saucedemo.com
 *
 * The dom-hash line is used by bdd2pw to detect DOM drift on
 * re-scaffold. Do not edit it by hand — regenerate with `bdd2pw
 * scaffold` or `bdd2pw update-pom` to refresh.
 */
import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly acceptedUsernamesAreStandardUserlock: Locator;
  readonly login: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly errorMessageContainer: Locator;
  readonly loginButton: Locator;
  readonly acceptedUsernamesAreHeading: Locator;
  readonly passwordForAllUsersHeading: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  readonly addToCartButton: Locator;
  readonly cartItemName: Locator;
  readonly cartItemPrice: Locator;
  readonly cartItemQuantity: Locator;
  readonly cartItems: Locator;
  readonly removeButton: Locator;
  readonly continueShoppingButton: Locator;

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
    this.cartIcon = page.locator(".shopping_cart_link");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.addToCartButton = page.locator(".inventory_item button").first();
    this.cartItemName = page.locator(".cart_item .inventory_item_name").first();
    this.cartItemPrice = page.locator(".cart_item .inventory_item_price").first();
    this.cartItemQuantity = page.locator(".cart_quantity").first();
    this.cartItems = page.locator(".cart_item");
    this.removeButton = page.getByRole("button", { name: "Remove" });
    this.continueShoppingButton = page.getByRole("button", { name: "Continue Shopping" });
  }

  async goto(): Promise<void> {
    await this.page.goto("/");
  }
}
