/**
 * @bdd2pw generated 2026-10-31T00:50:08.153Z
 * @bdd2pw dom-hash 0c92d029755fee51801cdef47a0b698ac9379e4eff09fca3854fe5e4d333116d
 * @bdd2pw url http://localhost:4200/contact
 *
 * The dom-hash line is used by bdd2pw to detect DOM drift on
 * re-scaffold. Do not edit it by hand — regenerate with `bdd2pw
 * scaffold` or `bdd2pw update-pom` to refresh.
 */
import { Page, Locator, expect } from "@playwright/test";

export class ContactPage {
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
  readonly imgElement: Locator;
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
    this.imgElement = page.locator("svg");
    this.privacyPolicyLink = page.getByRole("link", { name: "Privacy Policy" });
    this.barnImagesLink = page.getByRole("link", { name: "Barn Images" });
    this.unsplashLink = page.getByRole("link", { name: "Unsplash" });
    this.openChatButton = page.getByRole("button", { name: "Open chat" });
    this.showLiveShopActivityButton = page.getByRole("button", { name: "Show live shop activity" });
  }

  async goto(): Promise<void> {
    await this.page.goto("http://localhost:4200/contact");
  }
}
