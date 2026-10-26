/**
 * @bdd2pw generated 2026-10-26T12:47:20.892Z
 * @bdd2pw dom-hash 1fb6c56103c65b6edaebd79d9503b79f688195b29509ae5d249e9a548b7f8248
 * @bdd2pw url http://localhost:3100/#/login
 *
 * The dom-hash line is used by bdd2pw to detect DOM drift on
 * re-scaffold. Do not edit it by hand — regenerate with `bdd2pw
 * scaffold` or `bdd2pw update-pom` to refresh.
 */
import { Page, Locator, expect } from "@playwright/test";

export class ChangePasswordPage {
  readonly page: Page;
  readonly cookieconsent: Locator;
  readonly learnMoreAboutCookiesButton: Locator;
  readonly dismissCookieMessageButton: Locator;
  readonly openSidenavButton: Locator;
  readonly menuImage: Locator;
  readonly backToHomepageButton: Locator;
  readonly clickToSearch: Locator;
  readonly openSearchButton: Locator;
  readonly searchImages: Locator;
  readonly textboxElement: Locator;
  readonly closeSearchButton: Locator;
  readonly closeImage: Locator;
  readonly showHideAccountMenuButton: Locator;
  readonly accountCircleImage: Locator;
  readonly showTheShoppingCartButton: Locator;
  readonly shoppingCartImage: Locator;
  readonly _0: Locator;
  readonly languageSelectionMenuButton: Locator;
  readonly languageImage: Locator;
  readonly loginHeading: Locator;
  readonly email: Locator;
  readonly textFieldForTheLoginEmailInput: Locator;
  readonly password: Locator;
  readonly textFieldForTheLoginPasswordInput: Locator;
  readonly buttonToDisplayThePasswordButton: Locator;
  readonly eyeImage: Locator;
  readonly forgotYourPasswordLink: Locator;
  readonly loginButton: Locator;
  readonly exitToAppImage: Locator;
  readonly rememberMe: Locator;
  readonly notYetACustomerLink: Locator;
  readonly cdkDescribedbyMessageNg12: Locator;
  readonly cdkDescribedbyMessageNg13: Locator;
  readonly cdkDescribedbyMessageNg14: Locator;
  readonly cdkDescribedbyMessageNg15: Locator;
  readonly welcomeToOwaspJuiceShopBeingAWeb: Locator;
  readonly welcomeToOwaspJuiceShopHeading: Locator;
  readonly openWorldwideApplicationSecurityProjectOwaspLink: Locator;
  readonly httpsOwaspJuiceShopHeading: Locator;
  readonly httpsOwaspJuiceShopLink: Locator;
  readonly schoolHelpGettingStartedButton: Locator;
  readonly schoolImage: Locator;
  readonly closeWelcomeBannerButton: Locator;
  readonly visibilityOffImage: Locator;
  readonly forcePageReloadButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cookieconsent = page.getByRole("dialog", { name: "cookieconsent" });
    this.learnMoreAboutCookiesButton = page.getByRole("button", { name: "learn more about cookies" });
    this.dismissCookieMessageButton = page.getByRole("button", { name: "dismiss cookie message" });
    this.openSidenavButton = page.getByRole("button", { name: "Open Sidenav" });
    this.menuImage = page.getByText("menu");
    this.backToHomepageButton = page.getByRole("button", { name: "Back to homepage" });
    this.clickToSearch = page.getByText("searchsearchclose");
    this.openSearchButton = page.getByRole("button", { name: "Open search" });
    this.searchImages = page.getByText("search");
    this.textboxElement = page.locator("input");
    this.closeSearchButton = page.getByRole("button", { name: "Close search" });
    this.closeImage = page.getByText("close");
    this.showHideAccountMenuButton = page.getByRole("button", { name: "Show/hide account menu" });
    this.accountCircleImage = page.getByText("account_circle");
    this.showTheShoppingCartButton = page.getByRole("button", { name: "Show the shopping cart" });
    this.shoppingCartImage = page.getByText("shopping_cart");
    this._0 = page.getByText("0");
    this.languageSelectionMenuButton = page.getByRole("button", { name: "Language selection menu" });
    this.languageImage = page.getByText("language");
    this.loginHeading = page.getByRole("heading", { name: "Login" });
    this.email = page.getByLabel("Email");
    this.textFieldForTheLoginEmailInput = page.getByRole("textbox", { name: "Text field for the login email" });
    this.password = page.getByLabel("Password");
    this.textFieldForTheLoginPasswordInput = page.getByRole("textbox", { name: "Text field for the login password" });
    this.buttonToDisplayThePasswordButton = page.getByRole("button", { name: "Button to display the password" });
    this.eyeImage = page.getByRole("img", { name: "Eye" });
    this.forgotYourPasswordLink = page.getByRole("link", { name: "Forgot your password?" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.exitToAppImage = page.getByText("exit_to_app");
    this.rememberMe = page.getByLabel("Remember me");
    this.notYetACustomerLink = page.getByRole("link", { name: "Not yet a customer?" });
    this.cdkDescribedbyMessageNg12 = page.locator("#cdk-describedby-message-ng-1-2");
    this.cdkDescribedbyMessageNg13 = page.locator("#cdk-describedby-message-ng-1-3");
    this.cdkDescribedbyMessageNg14 = page.locator("#cdk-describedby-message-ng-1-4");
    this.cdkDescribedbyMessageNg15 = page.locator("#cdk-describedby-message-ng-1-5");
    this.welcomeToOwaspJuiceShopBeingAWeb = page.locator("#mat-mdc-dialog-0");
    this.welcomeToOwaspJuiceShopHeading = page.getByRole("heading", { name: "Welcome to OWASP Juice Shop!" });
    this.openWorldwideApplicationSecurityProjectOwaspLink = page.getByRole("link", { name: "Open Worldwide Application Security Project (OWASP)" });
    this.httpsOwaspJuiceShopHeading = page.getByRole("heading", { name: "https://owasp-juice.shop" });
    this.httpsOwaspJuiceShopLink = page.getByRole("link", { name: "https://owasp-juice.shop" });
    this.schoolHelpGettingStartedButton = page.getByRole("button", { name: "school Help getting started" });
    this.schoolImage = page.getByText("school");
    this.closeWelcomeBannerButton = page.getByRole("button", { name: "Close Welcome Banner" });
    this.visibilityOffImage = page.getByText("visibility_off");
    this.forcePageReloadButton = page.getByRole("button", { name: "Force page reload" });
  }

  async goto(): Promise<void> {
    await this.page.goto("http://localhost:3100/#/login");
  }
}
