Feature: Cart and checkout

  # TOOL-12: Shopper adds tools to the cart and changes quantities

  @story:TOOL-12 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1 Adding a product shows a confirmation and updates the cart icon count
    Given I navigate to the home page
    When I open the "Combination Pliers" product page
    And I click "Add to cart"
    Then the page displays "Product added to shopping cart."
    And the cart icon count is "1"

  @story:TOOL-12 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2 Changing a line quantity in the cart updates the line total and cart total
    Given I navigate to the home page
    When I open the "Combination Pliers" product page
    And I click "Add to cart"
    And I navigate to the cart page
    And I update the cart line quantity to "2"
    Then the cart line total reflects quantity "2"
    And the cart total is updated

  @story:TOOL-12 @ac:3 @design:D3 @type:functional @technique:state-transition
  Scenario: AC-3 Removing a line from the cart removes it and updates the cart total
    Given I navigate to the home page
    When I open the "Combination Pliers" product page
    And I click "Add to cart"
    And I navigate to the cart page
    And I remove the first cart line
    Then the page displays "Your cart is empty"

  @story:TOOL-12 @design:D4 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility Cart page passes accessibility checks
    Given I navigate to the home page
    When I open the "Combination Pliers" product page
    And I click "Add to cart"
    And I navigate to the cart page
    Then the page passes axe accessibility checks
