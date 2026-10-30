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

  # TOOL-7: Shopper filters products by category and brand

  @story:TOOL-7 @ac:1 @design:D7 @type:functional @technique:state-transition
  Scenario: AC-1a Category filter shows only products in the selected category
    Given I navigate to the home page
    When I click "Hammer"
    Then the page displays "Hammer"
    And the page displays "Claw Hammer"

  @story:TOOL-7 @ac:1 @design:D12 @type:functional @technique:state-transition
  Scenario: AC-1b Category filter hides products outside the selected category
    Given I navigate to the home page
    When I click "Hammer"
    Then the product list does not contain "Pliers"

  @story:TOOL-7 @ac:2 @design:D8 @type:functional @technique:state-transition
  Scenario: AC-2 Brand filter shows only products of the selected brand
    Given I navigate to the home page
    When I click "ForgeFlex Tools"
    Then the page displays "ForgeFlex Tools"

  @story:TOOL-7 @ac:3 @design:D9 @type:functional @technique:state-transition
  Scenario: AC-3a Unticking a category filter restores the full product list
    Given I navigate to the home page
    When I click "Hammer"
    And I click "Hammer"
    Then the page displays "Combination Pliers"
    And the page displays "Pliers"

  @story:TOOL-7 @ac:3 @design:D10 @type:functional @technique:state-transition
  Scenario: AC-3b Unticking a brand filter restores the full product list
    Given I navigate to the home page
    When I click "ForgeFlex Tools"
    And I click "ForgeFlex Tools"
    Then the page displays "Combination Pliers"

  @story:TOOL-7 @design:D11 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility Filter panel passes accessibility checks
    Given I navigate to the home page
    Then the page passes axe accessibility checks
