/**
 * @bdd2pw generated 2026-10-30T11:52:58.809Z
 * @bdd2pw dom-hash 148babc627d64eac302c23627542deac9cc131e6e7c246bfe05fe2f8c47b7856
 * @bdd2pw url http://localhost:4200/
 *
 * The dom-hash line is used by bdd2pw to detect DOM drift on
 * re-scaffold. Do not edit it by hand — regenerate with `bdd2pw
 * scaffold` or `bdd2pw update-pom` to refresh.
 */
import { Page, Locator, expect } from "@playwright/test";

export class ProductCataloguePage {
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
  readonly handToolsCheckboxes: Locator;
  readonly hammerCheckboxes: Locator;
  readonly handSawCheckboxes: Locator;
  readonly wrenchCheckboxes: Locator;
  readonly screwdriverCheckboxes: Locator;
  readonly pliersCheckboxes: Locator;
  readonly chiselsCheckboxes: Locator;
  readonly measuresCheckboxes: Locator;
  readonly powerToolsCheckboxes: Locator;
  readonly grinderCheckboxes: Locator;
  readonly sanderCheckboxes: Locator;
  readonly sawCheckboxes: Locator;
  readonly drillCheckboxes: Locator;
  readonly otherCheckboxes: Locator;
  readonly toolBeltsCheckboxes: Locator;
  readonly storageSolutionsCheckboxes: Locator;
  readonly workbenchCheckboxes: Locator;
  readonly safetyGearCheckboxes: Locator;
  readonly fastenersCheckboxes: Locator;
  readonly byBrandHeading: Locator;
  readonly forgeFlexToolsCheckboxes: Locator;
  readonly mightyCraftHardwareCheckboxes: Locator;
  readonly sustainabilityHeading: Locator;
  readonly showOnlyEcoFriendlyProductsCheckboxes: Locator;
  readonly combinationPliersAbcde1415Link: Locator;
  readonly compareButtons: Locator;
  readonly combinationPliersHeading: Locator;
  readonly pliersAbcde1201Link: Locator;
  readonly pliersHeading: Locator;
  readonly boltCuttersAbcde4841Link: Locator;
  readonly boltCuttersHeading: Locator;
  readonly longNosePliersAbcdeOutOfStock1424Link: Locator;
  readonly longNosePliersHeading: Locator;
  readonly slipJointPliersAbcde917Link: Locator;
  readonly slipJointPliersHeading: Locator;
  readonly clawHammerWithShockReductionGripAbcde1341Link: Locator;
  readonly clawHammerWithShockReductionGripHeading: Locator;
  readonly hammerAbcde1258Link: Locator;
  readonly hammerHeading: Locator;
  readonly clawHammerAbcde1148Link: Locator;
  readonly clawHammerHeading: Locator;
  readonly thorHammerAbcde1114Link: Locator;
  readonly thorHammerHeading: Locator;
  readonly previousButton: Locator;
  readonly page1Button: Locator;
  readonly page2Button: Locator;
  readonly page3Button: Locator;
  readonly page4Button: Locator;
  readonly page5Button: Locator;
  readonly nextButton: Locator;
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
    this.handToolsCheckboxes = page.getByLabel("Hand Tools");
    this.hammerCheckboxes = page.getByLabel("Hammer");
    this.handSawCheckboxes = page.getByLabel("Hand Saw");
    this.wrenchCheckboxes = page.getByLabel("Wrench");
    this.screwdriverCheckboxes = page.getByLabel("Screwdriver");
    this.pliersCheckboxes = page.getByLabel("Pliers");
    this.chiselsCheckboxes = page.getByLabel("Chisels");
    this.measuresCheckboxes = page.getByLabel("Measures");
    this.powerToolsCheckboxes = page.getByLabel("Power Tools");
    this.grinderCheckboxes = page.getByLabel("Grinder");
    this.sanderCheckboxes = page.getByLabel("Sander");
    this.sawCheckboxes = page.getByLabel("Saw");
    this.drillCheckboxes = page.getByLabel("Drill");
    this.otherCheckboxes = page.getByLabel("Other");
    this.toolBeltsCheckboxes = page.getByLabel("Tool Belts");
    this.storageSolutionsCheckboxes = page.getByLabel("Storage Solutions");
    this.workbenchCheckboxes = page.getByLabel("Workbench");
    this.safetyGearCheckboxes = page.getByLabel("Safety Gear");
    this.fastenersCheckboxes = page.getByLabel("Fasteners");
    this.byBrandHeading = page.getByRole("heading", { name: "By brand:" });
    this.forgeFlexToolsCheckboxes = page.getByLabel("ForgeFlex Tools");
    this.mightyCraftHardwareCheckboxes = page.getByLabel("MightyCraft Hardware");
    this.sustainabilityHeading = page.getByRole("heading", { name: "Sustainability:" });
    this.showOnlyEcoFriendlyProductsCheckboxes = page.getByLabel("Show only eco-friendly products");
    this.combinationPliersAbcde1415Link = page.getByRole("link", { name: "Combination Pliers ABCDE$14.15" });
    this.compareButtons = page.getByRole("button", { name: "Compare" });
    this.combinationPliersHeading = page.getByRole("heading", { name: "Combination Pliers" });
    this.pliersAbcde1201Link = page.getByRole("link", { name: "Pliers ABCDE$12.01" });
    this.pliersHeading = page.getByRole("heading", { name: "Pliers" });
    this.boltCuttersAbcde4841Link = page.getByRole("link", { name: "Bolt Cutters ABCDE$48.41" });
    this.boltCuttersHeading = page.getByRole("heading", { name: "Bolt Cutters" });
    this.longNosePliersAbcdeOutOfStock1424Link = page.getByRole("link", { name: "Long Nose Pliers ABCDEOut of stock$14.24" });
    this.longNosePliersHeading = page.getByRole("heading", { name: "Long Nose Pliers" });
    this.slipJointPliersAbcde917Link = page.getByRole("link", { name: "Slip Joint Pliers ABCDE$9.17" });
    this.slipJointPliersHeading = page.getByRole("heading", { name: "Slip Joint Pliers" });
    this.clawHammerWithShockReductionGripAbcde1341Link = page.getByRole("link", { name: "Claw Hammer with Shock Reduction Grip ABCDE$13.41" });
    this.clawHammerWithShockReductionGripHeading = page.getByRole("heading", { name: "Claw Hammer with Shock Reduction Grip" });
    this.hammerAbcde1258Link = page.getByRole("link", { name: "Hammer ABCDE$12.58" });
    this.hammerHeading = page.getByRole("heading", { name: "Hammer" });
    this.clawHammerAbcde1148Link = page.getByRole("link", { name: "Claw Hammer ABCDE$11.48" });
    this.clawHammerHeading = page.getByRole("heading", { name: "Claw Hammer" });
    this.thorHammerAbcde1114Link = page.getByRole("link", { name: "Thor Hammer ABCDE$11.14" });
    this.thorHammerHeading = page.getByRole("heading", { name: "Thor Hammer" });
    this.previousButton = page.getByRole("button", { name: "Previous" });
    this.page1Button = page.getByRole("button", { name: "Page-1" });
    this.page2Button = page.getByRole("button", { name: "Page-2" });
    this.page3Button = page.getByRole("button", { name: "Page-3" });
    this.page4Button = page.getByRole("button", { name: "Page-4" });
    this.page5Button = page.getByRole("button", { name: "Page-5" });
    this.nextButton = page.getByRole("button", { name: "Next" });
    this.privacyPolicyLink = page.getByRole("link", { name: "Privacy Policy" });
    this.barnImagesLink = page.getByRole("link", { name: "Barn Images" });
    this.unsplashLink = page.getByRole("link", { name: "Unsplash" });
    this.openChatButton = page.getByRole("button", { name: "Open chat" });
    this.showLiveShopActivityButton = page.getByRole("button", { name: "Show live shop activity" });
  }

  async goto(): Promise<void> {
    await this.page.goto("http://localhost:4200/");
  }
}
