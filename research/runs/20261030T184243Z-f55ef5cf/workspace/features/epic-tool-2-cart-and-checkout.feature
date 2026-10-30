Feature: Cart and checkout

  # TOOL-12: Shopper adds tools to the cart and changes quantities

  @story:TOOL-12 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1a Adding a product to the cart shows a confirmation
    Given I navigate to the home page
    When I click "Combination Pliers"
    And I click "Add to cart"
    Then the page displays "Product added to shopping cart."

  @story:TOOL-12 @ac:1 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-1b Cart icon in the header shows the number of items after adding a product
    Given I navigate to the home page
    When I click "Combination Pliers"
    And I click "Add to cart"
    Then the cart icon shows item count "1"

  @story:TOOL-12 @ac:2 @design:D3 @type:functional @technique:state-transition
  Scenario: AC-2 Changing a line quantity in the cart updates the line total and cart total
    Given I navigate to the home page
    When I click "Combination Pliers"
    And I click "Add to cart"
    And I navigate to the cart page
    And I set the cart line quantity to "2"
    Then the line total reflects quantity "2"
    And the cart total reflects the updated quantity

  @story:TOOL-12 @ac:3 @design:D4 @type:functional @technique:state-transition
  Scenario: AC-3 Removing a line takes it out of the cart and updates the cart total
    Given I navigate to the home page
    When I click "Combination Pliers"
    And I click "Add to cart"
    And I navigate to the cart page
    And I click the remove line button
    Then the page displays "Your cart is empty"

  @story:TOOL-12 @design:D5 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility Cart page passes accessibility checks
    Given I navigate to the home page
    When I click "Combination Pliers"
    And I click "Add to cart"
    And I navigate to the cart page
    Then the page passes axe accessibility checks
