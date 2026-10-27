Feature: Cart and checkout

  # Story 114: Customer reviews the cart

  @story:114 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1 Cart lists each added product with its quantity, name and price
    Given I am on the home page
    When I click "Login"
    And I click "Add to cart"
    And I click the cart icon
    Then the cart item quantity is visible
    And the cart item name is visible
    And the cart item price is visible

  @story:114 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2 Removing a product in the cart takes it off the list and lowers the cart badge
    Given I am on the home page
    When I click "Login"
    And I click "Add to cart"
    And I click the cart icon
    And I click "Remove"
    Then the cart list is empty
    And the cart badge is not shown

  @story:114 @ac:3 @design:D3 @type:functional @technique:state-transition
  Scenario: AC-3 Continue shopping returns to the product list with the cart unchanged
    Given I am on the home page
    When I click "Login"
    And I click "Add to cart"
    And I click the cart icon
    And I click "Continue Shopping"
    Then the product list is displayed
    And the cart badge shows "1"

  @story:114 @design:D4 @type:accessibility @technique:checklist-based
  Scenario: D4 Cart page passes axe accessibility checks
    Given I am on the home page
    When I click "Login"
    And I click "Add to cart"
    And I click the cart icon
    Then the page passes axe accessibility checks
