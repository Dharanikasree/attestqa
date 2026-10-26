/**
 * @bdd2pw generated 2026-10-24T16:39:23.610Z
 * @bdd2pw dom-hash 41655d1c5b247098d751e4830cfd5d44581c8987283aff300ae742cff6fbe492
 * @bdd2pw url http://localhost:3100/#/contact
 *
 * The dom-hash line is used by bdd2pw to detect DOM drift on
 * re-scaffold. Do not edit it by hand — regenerate with `bdd2pw
 * scaffold` or `bdd2pw update-pom` to refresh.
 */
import { Page, Locator, expect } from "@playwright/test";

export class CustomerFeedbackPage {
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
  readonly customerFeedbackHeading: Locator;
  readonly author: Locator;
  readonly fieldWithTheNameOfTheAuthorInput: Locator;
  readonly comment: Locator;
  readonly fieldForEnteringTheCommentOrTheFeedbackInput: Locator;
  readonly imgElement: Locator;
  readonly rating: Locator;
  readonly sliderForSelectingTheStarRating: Locator;
  readonly captcha: Locator;
  readonly captchaCodeWhichMustBeSolved: Locator;
  readonly element: Locator;
  readonly result: Locator;
  readonly fieldForTheResultOfTheCaptchaCodeInput: Locator;
  readonly buttonToSendTheReviewButton: Locator;
  readonly sendImage: Locator;
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
    this.customerFeedbackHeading = page.getByRole("heading", { name: "Customer Feedback" });
    this.author = page.getByLabel("Author");
    this.fieldWithTheNameOfTheAuthorInput = page.getByRole("textbox", { name: "Field with the name of the author" });
    this.comment = page.getByLabel("Comment");
    this.fieldForEnteringTheCommentOrTheFeedbackInput = page.getByRole("textbox", { name: "Field for entering the comment or the feedback" });
    this.imgElement = page.locator("svg");
    this.rating = page.getByLabel("Rating");
    this.sliderForSelectingTheStarRating = page.getByText("1★");
    this.captcha = page.getByLabel("CAPTCHA:");
    this.captchaCodeWhichMustBeSolved = page.getByText("8+3*5");
    this.element = page.getByLabel("?");
    this.result = page.getByLabel("Result");
    this.fieldForTheResultOfTheCaptchaCodeInput = page.getByRole("textbox", { name: "Field for the result of the CAPTCHA code" });
    this.buttonToSendTheReviewButton = page.getByRole("button", { name: "Button to send the review" });
    this.sendImage = page.getByText("send");
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
    await this.page.goto("/#/contact");
  }
}
