Feature: Cart and checkout

  # TOOL-12: Shopper adds tools to the cart and changes quantities

  @story:TOOL-12 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1 Adding a product to the cart shows a confirmation and updates the cart icon count
    Given I navigate to the home page
    Then the page displays "Combination Pliers"
    When I navigate to the product page for "Combination Pliers"
    And I click "Add to cart"
    Then the page displays "Product added to shopping cart."
    And the cart icon count is shown in the header

  @story:TOOL-12 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2 Changing a line quantity in the cart updates the line total and cart total
    Given I navigate to the product page for "Combination Pliers"
    And I click "Add to cart"
    And I navigate to the cart page
    Then the page displays "Combination Pliers"
    When I set the cart line quantity to "2"
    Then the cart line total reflects quantity "2"
    And the cart total reflects the updated quantity

  @story:TOOL-12 @ac:3 @design:D3 @type:functional @technique:state-transition
  Scenario: AC-3 Removing a line from the cart removes it and updates the cart total
    Given I navigate to the product page for "Combination Pliers"
    And I click "Add to cart"
    And I navigate to the cart page
    Then the page displays "Combination Pliers"
    When I click the remove line button
    Then the page does not display "Combination Pliers"
    And the cart total is shown

  @story:TOOL-12 @design:D4 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility Cart page passes accessibility checks
    Given I navigate to the product page for "Combination Pliers"
    And I click "Add to cart"
    And I navigate to the cart page
    Then the page passes axe accessibility checks

  # TOOL-16: Signed-in customer checks out and pays

  @story:TOOL-16 @ac:1 @design:D6 @type:functional @technique:state-transition
  Scenario: AC-1 Signed-in customer proceeds through checkout to payment without re-authentication
    Given I sign in with registered credentials
    And I add "Combination Pliers" to the cart via the API
    When I navigate to the cart page
    And I click "Proceed to checkout"
    Then the URL contains "checkout"
    And the page displays "Billing"

  @story:TOOL-16 @ac:2 @design:D7 @type:functional @technique:state-transition
  Scenario: AC-2 Billing address step is pre-filled from the customer profile
    Given I sign in with registered credentials
    And I add "Combination Pliers" to the cart via the API
    And I navigate to the checkout billing address page
    Then the billing first name field is pre-filled
    And the billing last name field is pre-filled
    And the billing address line field is pre-filled

  @story:TOOL-16 @ac:3 @design:D8 @type:functional @technique:state-transition
  Scenario: AC-3 Paying with cash on delivery confirms the order
    Given I sign in with registered credentials
    And I add "Combination Pliers" to the cart via the API
    And I navigate to the checkout payment page
    When I select "Cash on Delivery" as the payment method
    And I click "Confirm"
    Then the page displays "Payment was successful"

  @story:TOOL-16 @ac:1 @design:D9 @type:security @technique:state-transition
  Scenario: AC-1 Unauthenticated user is redirected to sign-in when accessing checkout directly
    Given I am on the home page
    When I navigate directly to the checkout page
    Then the URL contains "login"

  @story:TOOL-16 @design:D10 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility Checkout page passes accessibility checks
    Given I sign in with registered credentials
    And I add "Combination Pliers" to the cart via the API
    When I navigate to the cart page
    And I click "Proceed to checkout"
    Then the page passes axe accessibility checks

  @story:TOOL-16 @bug:TOOL-20 @ac:2 @design:D11 @type:confirmation @technique:state-transition
  Scenario: AC-2 Bug TOOL-20 Billing address is not pre-filled from the customer profile
    Given I sign in with registered credentials
    And I add "Combination Pliers" to the cart via the API
    And I navigate to the checkout billing address page
    Then the billing first name field is pre-filled
    And the billing last name field is pre-filled
    And the billing address line field is pre-filled
