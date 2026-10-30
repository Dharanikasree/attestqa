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

  @story:TOOL-7 @ac:1 @design:D6 @type:functional @technique:state-transition
  Scenario: AC-1 Ticking a category shows only products in that category
    Given I navigate to the home page
    When I check the "Hammer" checkbox
    Then the page displays "Hammer"
    And the page displays "Claw Hammer"

  @story:TOOL-7 @ac:2 @design:D7 @type:functional @technique:state-transition
  Scenario: AC-2 Ticking a brand shows only products of that brand
    Given I navigate to the home page
    When I check the "ForgeFlex Tools" checkbox
    Then the page displays "ForgeFlex Tools"

  @story:TOOL-7 @ac:3 @design:D8 @type:functional @technique:state-transition
  Scenario: AC-3 Unticking the filter shows the full list again
    Given I navigate to the home page
    When I check the "Hammer" checkbox
    Then the page displays "Hammer"
    When I uncheck the "Hammer" checkbox
    Then the page displays "Combination Pliers"

  @story:TOOL-7 @ac:1 @design:D9 @type:functional @technique:state-transition
  Scenario: AC-1b Filter persists when changing page
    Given I navigate to the home page
    When I check the "Hand Tools" checkbox
    And I click "Page-2"
    Then the current page is page 2
    And the page displays "Hand Saw"

  @story:TOOL-7 @design:D10 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility Filter panel passes accessibility checks
    Given I navigate to the home page
    Then the product list passes axe accessibility checks

  # TOOL-9: Shopper searches products by name

  @story:TOOL-9 @ac:1 @design:D11 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1 Searching for a known word shows only matching products
    Given I navigate to the home page
    When I fill in the "Search" field with "Pliers"
    And I click "Search"
    Then the page displays "Combination Pliers"
    And the page displays "Long Nose Pliers"

  @story:TOOL-9 @ac:2 @design:D12 @type:functional @technique:equivalence-partitioning
  Scenario: AC-2 Searching for a word no product contains shows no-results message
    Given I navigate to the home page
    When I fill in the "Search" field with "xyznotaproduct"
    And I click "Search"
    Then the page displays "No results found."

  @story:TOOL-9 @ac:3 @design:D13 @type:functional @technique:state-transition
  Scenario: AC-3 Clearing the search restores the full product list
    Given I navigate to the home page
    When I fill in the "Search" field with "Pliers"
    And I click "Search"
    Then the page displays "Combination Pliers"
    When I click "X"
    Then the page displays "Combination Pliers"
    And the page displays "Bolt Cutters"

  @story:TOOL-9 @design:D14 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility Search results pass accessibility checks
    Given I navigate to the home page
    When I fill in the "Search" field with "Pliers"
    And I click "Search"
    Then the product list passes axe accessibility checks
