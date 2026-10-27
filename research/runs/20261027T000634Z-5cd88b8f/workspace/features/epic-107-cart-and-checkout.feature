Feature: Cart and checkout
  As a customer I want to see what is in my cart before I check out.

  @story:114 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1 Cart lists each added product with its quantity, name and price
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    Then the cart badge shows "1"
    When I navigate to the cart page
    Then the cart item quantity is displayed
    And the cart item name is displayed
    And the cart item price is displayed

  @story:114 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2a Removing a product from the cart takes it off the list
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    Then the cart badge shows "1"
    When I navigate to the cart page
    Then the cart item name is displayed
    When I click "Remove"
    Then the cart list is empty

  @story:114 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2b Removing a product from the cart lowers the cart badge
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    Then the cart badge shows "1"
    When I navigate to the cart page
    When I click "Remove"
    Then the cart badge is not shown

  @story:114 @ac:3 @design:D3 @type:functional @technique:state-transition
  Scenario: AC-3 Continue shopping returns to the product list with the cart unchanged
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    Then the cart badge shows "1"
    When I navigate to the cart page
    When I click "Continue Shopping"
    Then the page displays "Products"
    And the cart badge shows "1"

  @story:114 @design:D4 @type:accessibility @technique:checklist-based
  Scenario: AC-story Cart page passes accessibility checks
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    When I navigate to the cart page
    Then the page passes axe accessibility checks
