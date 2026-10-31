/**
 * @bdd2pw generated 2026-10-30T22:57:54.840Z
 * @bdd2pw dom-hash 36b573505787648ae1d309033c84d561e13022be55a0ac37927e20d1bdc9c149
 * @bdd2pw url http://localhost:4200
 *
 * The dom-hash line is used by bdd2pw to detect DOM drift on
 * re-scaffold. Do not edit it by hand — regenerate with `bdd2pw
 * scaffold` or `bdd2pw update-pom` to refresh.
 */
import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly documentationLink: Locator;
  readonly testingNotificationBar: Locator;
  readonly testingGuideButton: Locator;
  readonly navbarBrandLink: Locator;
  readonly mainMenu: Locator;
  readonly home: Locator;
  readonly homeLink: Locator;
  readonly categoriesHandToolsPowerToolsOtherSpe: Locator;
  readonly categoriesButton: Locator;
  readonly contact: Locator;
  readonly contactLink: Locator;
  readonly signIn: Locator;
  readonly signInLink: Locator;
  readonly selectLanguageButton: Locator;
  readonly imgElements: Locator;
  readonly practiceSoftwareTestingToolshopHeading: Locator;
  readonly sortHeading: Locator;
  readonly sortSelect: Locator;
  readonly priceRangeHeading: Locator;
  readonly ngxSlider: Locator;
  readonly ngxSlider2: Locator;
  readonly ngxSliderMax: Locator;
  readonly searchHeading: Locator;
  readonly searchInputs: Locator;
  readonly xButton: Locator;
  readonly searchButton: Locator;
  readonly filtersHeading: Locator;
  readonly byCategoryHeading: Locator;
  readonly byBrandHeading: Locator;
  readonly sustainabilityHeading: Locator;
  readonly showOnlyEcoFriendlyProductsCheckboxes: Locator;
  readonly cardTitleHeadings: Locator;
  readonly privacyPolicyLink: Locator;
  readonly barnImagesLink: Locator;
  readonly unsplashLink: Locator;
  readonly openChatButton: Locator;
  readonly showLiveShopActivityButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.documentationLink = page.getByRole("link", { name: "Documentation" });
    this.testingNotificationBar = page.locator(".testing-notification-bar");
    this.testingGuideButton = page.getByRole("button", { name: "Testing Guide" });
    this.navbarBrandLink = page.locator(".navbar-brand");
    this.mainMenu = page.getByRole("menubar", { name: "Main menu" });
    this.home = page.getByText("Home");
    this.homeLink = page.getByRole("link", { name: "Home" });
    this.categoriesHandToolsPowerToolsOtherSpe = page.getByText("Categories Hand ToolsPower ToolsOtherSpecial ToolsRentals");
    this.categoriesButton = page.getByRole("button", { name: "Categories" });
    this.contact = page.getByText("Contact");
    this.contactLink = page.getByRole("link", { name: "Contact" });
    this.signIn = page.getByText("Sign in");
    this.signInLink = page.getByRole("link", { name: "Sign in" });
    this.selectLanguageButton = page.getByRole("button", { name: "Select language" });
    this.imgElements = page.locator("svg");
    this.practiceSoftwareTestingToolshopHeading = page.getByRole("heading", { name: "Practice Software Testing - Toolshop" });
    this.sortHeading = page.getByRole("heading", { name: "Sort" });
    this.sortSelect = page.getByRole("combobox", { name: "sort" });
    this.priceRangeHeading = page.getByRole("heading", { name: "Price Range" });
    this.ngxSlider = page.getByText("02001100");
    this.ngxSlider2 = page.getByRole("slider", { name: "ngx-slider" });
    this.ngxSliderMax = page.getByRole("slider", { name: "ngx-slider-max" });
    this.searchHeading = page.getByRole("heading", { name: "Search" });
    this.searchInputs = page.getByLabel("Search");
    this.xButton = page.getByRole("button", { name: "X" });
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.filtersHeading = page.getByRole("heading", { name: "Filters" });
    this.byCategoryHeading = page.getByRole("heading", { name: "By category:" });
    this.byBrandHeading = page.getByRole("heading", { name: "By brand:" });
    this.sustainabilityHeading = page.getByRole("heading", { name: "Sustainability:" });
    this.showOnlyEcoFriendlyProductsCheckboxes = page.getByLabel("Show only eco-friendly products");
    this.cardTitleHeadings = page.locator(".card-title");
    this.privacyPolicyLink = page.getByRole("link", { name: "Privacy Policy" });
    this.barnImagesLink = page.getByRole("link", { name: "Barn Images" });
    this.unsplashLink = page.getByRole("link", { name: "Unsplash" });
    this.openChatButton = page.getByRole("button", { name: "Open chat" });
    this.showLiveShopActivityButton = page.getByRole("button", { name: "Show live shop activity" });
  }

  async goto(): Promise<void> {
    await this.page.goto("http://localhost:4200");
  }
}
