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
  Scenario: AC-1 Searching for a matching word shows only products whose names contain that word
    Given I navigate to the home page
    When I type "Pliers" into the Search field
    And I click "Search"
    Then the page displays "Combination Pliers"
    And the page displays "Pliers"

  @story:TOOL-9 @ac:2 @design:D12 @type:functional @technique:equivalence-partitioning
  Scenario: AC-2 Searching for a word no product contains shows a no-results message
    Given I navigate to the home page
    When I type "Zzzyyyxxx" into the Search field
    And I click "Search"
    Then the page displays "There are no products found."

  @story:TOOL-9 @ac:3 @design:D13 @type:functional @technique:state-transition
  Scenario: AC-3 Clearing the search restores the full product list
    Given I navigate to the home page
    When I type "Pliers" into the Search field
    And I click "Search"
    Then the page displays "Combination Pliers"
    When I click "X"
    Then the page displays "Combination Pliers"
    And the page displays "Bolt Cutters"

  @story:TOOL-9 @design:D14 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility Search results pass accessibility checks
    Given I navigate to the home page
    Then the page passes axe accessibility checks

  # TOOL-10: Shopper sorts products by name and price

  @story:TOOL-10 @ac:1 @design:D15 @type:functional @technique:state-transition
  Scenario: AC-1 Sorting by name A to Z lists products in alphabetical order
    Given I navigate to the home page
    When I select "Name (A - Z)" from the "sort" combobox
    Then the page displays "Bolt Cutters"
    And the page displays "Combination Pliers"

  @story:TOOL-10 @ac:2 @design:D16 @type:functional @technique:state-transition
  Scenario: AC-2 Sorting by price low to high lists the cheapest product first
    Given I navigate to the home page
    When I select "Price (Low - High)" from the "sort" combobox
    Then the page displays "Slip Joint Pliers"
    And the page displays "$9.17"

  @story:TOOL-10 @ac:3 @design:D17 @type:functional @technique:state-transition
  Scenario: AC-3 Sorting by price high to low lists the most expensive product first
    Given I navigate to the home page
    When I select "Price (High - Low)" from the "sort" combobox
    Then the page displays "Bolt Cutters"
    And the page displays "$48.41"

  @story:TOOL-10 @ac:2 @design:D18 @type:functional @technique:state-transition
  Scenario: AC-2b Sorting applies to filtered products only
    Given I navigate to the home page
    When I check the "Hammer" checkbox
    And I select "Price (Low - High)" from the "sort" combobox
    Then the page displays "Thor Hammer"
    And the page displays "$11.14"

  @story:TOOL-10 @ac:1 @design:D19 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility Sort control passes accessibility checks
    Given I navigate to the home page
    Then the page passes axe accessibility checks

  # TOOL-11: Shopper opens a product's detail page

  @story:TOOL-11 @ac:1 @design:D20 @type:functional @technique:state-transition
  Scenario: AC-1 Opening a product from the list shows its name, price, description and Add to cart button
    Given I navigate to the home page
    When I click "Combination Pliers"
    Then the page displays "Combination Pliers"
    And the page displays "$14.15"
    And the page displays "Add to cart"

  @story:TOOL-11 @ac:2 @design:D21 @type:functional @technique:boundary-value-analysis
  Scenario: AC-2a Quantity starts at 1 and the minus button cannot reduce it below 1
    Given I navigate to the home page
    When I click "Combination Pliers"
    Then the quantity field shows "1"
    When I click the decrease quantity button
    Then the quantity field shows "1"

  @story:TOOL-11 @ac:2 @design:D21 @type:functional @technique:boundary-value-analysis
  Scenario: AC-2b Quantity increases when the plus button is clicked
    Given I navigate to the home page
    When I click "Combination Pliers"
    Then the quantity field shows "1"
    When I click the increase quantity button
    Then the quantity field shows "2"

  @story:TOOL-11 @ac:3 @design:D22 @type:functional @technique:state-transition
  Scenario: AC-3 Choosing a related product opens its own detail page
    Given I navigate to the home page
    When I click "Combination Pliers"
    Then the page displays "Related products"
    When I click a related product
    Then the page displays "Add to cart"

  @story:TOOL-11 @design:D23 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility Product detail page passes accessibility checks
    Given I navigate to the home page
    When I click "Combination Pliers"
    Then the page passes axe accessibility checks
