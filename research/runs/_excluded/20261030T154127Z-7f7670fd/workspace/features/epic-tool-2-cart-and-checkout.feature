Feature: Cart and checkout

  # TOOL-12: Shopper adds tools to the cart and changes quantities

  @story:TOOL-12 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1a Adding a product to the cart shows a confirmation
    Given I navigate to the home page
    When I click "Combination Pliers"
    And I click "Add to cart"
    Then the page displays "Product added to shopping cart."

  @story:TOOL-12 @ac:1 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-1b Cart icon in the header shows the number of items in the cart
    Given I navigate to the home page
    When I click "Combination Pliers"
    And I click "Add to cart"
    Then the cart badge shows "1"
    When I navigate to the home page
    And I click "Bolt Cutters"
    And I click "Add to cart"
    Then the cart badge shows "2"

  @story:TOOL-12 @ac:2 @design:D3 @type:functional @technique:state-transition
  Scenario: AC-2 Changing a line quantity in the cart updates the line total and cart total
    Given I navigate to the home page
    When I click "Combination Pliers"
    And I click "Add to cart"
    And I navigate to the cart page
    And I set the quantity of the first cart item to "2"
    Then the cart line total reflects the updated quantity
    And the cart total reflects the updated quantity

  @story:TOOL-12 @ac:3 @design:D4 @type:functional @technique:state-transition
  Scenario: AC-3 Removing a line takes it out of the cart and updates the cart total
    Given I navigate to the home page
    When I click "Combination Pliers"
    And I click "Add to cart"
    And I navigate to the cart page
    And I click the remove item button
    Then the page displays "Your cart is empty."

  @story:TOOL-12 @design:D5 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility Cart page passes accessibility checks
    Given I navigate to the cart page
    Then the page passes axe accessibility checks
