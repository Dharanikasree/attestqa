Feature: Product catalogue

  # TOOL-6: Shopper browses the catalogue page by page

  @story:TOOL-6 @ac:1 @design:D1 @type:functional @technique:checklist-based
  Scenario: AC-1 Home page lists products with name, price and image
    Given I navigate to the home page
    Then the page displays "Combination Pliers"
    And the page displays "$14.15"
    And the page displays "Bolt Cutters"

  @story:TOOL-6 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2 Choosing page 2 shows a different set of products
    Given I navigate to the home page
    When I click "Page-2"
    Then page 2 is active
    And the current page is page 2

  @story:TOOL-6 @ac:3 @design:D3 @type:functional @technique:state-transition
  Scenario: AC-3 The control for the current page is marked as current
    Given I navigate to the home page
    Then the current page is page 1
    When I click "Page-2"
    Then the current page is page 2

  @story:TOOL-6 @design:D4 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility Home page product list passes accessibility checks
    Given I navigate to the home page
    Then the product list passes axe accessibility checks
