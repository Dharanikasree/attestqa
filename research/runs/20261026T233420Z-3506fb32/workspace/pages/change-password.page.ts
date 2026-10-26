/**
 * @bdd2pw generated 2026-10-26T23:39:32.729Z
 * @bdd2pw dom-hash 187af09b9d763c2d240ca24e36c354812586c9c8d99d24032fa9ea15951f80db
 * @bdd2pw url http://localhost:3100/#/privacy-security/change-password
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
  readonly changePasswordCurrentPasswordNewPass: Locator;
  readonly changePasswordHeading: Locator;
  readonly error: Locator;
  readonly currentPassword: Locator;
  readonly fieldToEnterTheCurrentPasswordInput: Locator;
  readonly newPassword: Locator;
  readonly fieldForTheNewPasswordInput: Locator;
  readonly imgElements: Locator;
  readonly repeatNewPassword: Locator;
  readonly fieldToRepeatTheNewPasswordInput: Locator;
  readonly buttonToConfirmTheChangeButton: Locator;
  readonly cdkDescribedbyMessageNg12: Locator;
  readonly cdkDescribedbyMessageNg13: Locator;
  readonly cdkDescribedbyMessageNg14: Locator;
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
    this.changePasswordCurrentPasswordNewPass = page.locator("mat-card");
    this.changePasswordHeading = page.getByRole("heading", { name: "Change Password" });
    this.error = page.locator(".error");
    this.currentPassword = page.getByLabel("Current Password");
    this.fieldToEnterTheCurrentPasswordInput = page.getByRole("textbox", { name: "Field to enter the current password" });
    this.newPassword = page.getByLabel("New Password");
    this.fieldForTheNewPasswordInput = page.getByRole("textbox", { name: "Field for the new password" });
    this.imgElements = page.locator("svg");
    this.repeatNewPassword = page.getByLabel("Repeat New Password");
    this.fieldToRepeatTheNewPasswordInput = page.getByRole("textbox", { name: "Field to repeat the new password" });
    this.buttonToConfirmTheChangeButton = page.getByRole("button", { name: "Button to confirm the change" });
    this.cdkDescribedbyMessageNg12 = page.locator("#cdk-describedby-message-ng-1-2");
    this.cdkDescribedbyMessageNg13 = page.locator("#cdk-describedby-message-ng-1-3");
    this.cdkDescribedbyMessageNg14 = page.locator("#cdk-describedby-message-ng-1-4");
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
    await this.page.goto("http://localhost:3100/#/privacy-security/change-password");
  }
}
