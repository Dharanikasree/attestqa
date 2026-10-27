Feature: Cart and checkout
  As a customer I want to see what is in my cart before I check out.

  @story:114 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1 Cart lists added product with quantity, name and price
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    Then the cart badge shows "1"
    When I click the cart icon
    Then the page displays "Your Cart"
    And the cart item quantity shows "1"
    And the cart item name is visible
    And the cart item price is visible

  @story:114 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2 Removing a product from the cart takes it off the list and lowers the badge
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    Then the cart badge shows "1"
    When I click the cart icon
    Then the page displays "Your Cart"
    And the cart item name is visible
    When I click "Remove"
    Then the cart item list is empty
    And the cart badge is not shown

  @story:114 @ac:3 @design:D3 @type:functional @technique:state-transition
  Scenario: AC-3 Continue shopping returns to the product list with cart unchanged
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    Then the cart badge shows "1"
    When I click the cart icon
    Then the page displays "Your Cart"
    When I click "Continue Shopping"
    Then the page displays "Products"
    And the cart badge shows "1"

  @story:114 @design:D4 @type:accessibility @technique:checklist-based
  Scenario: AC-story Cart page passes axe accessibility checks
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    When I click the cart icon
    Then the page displays "Your Cart"
    Then the page passes axe accessibility checks

  @story:114 @ac:1 @design:D5 @type:security @technique:equivalence-partitioning
  Scenario: AC-1 Unauthenticated user navigating directly to the cart sees the sign-in page
    Given I navigate to the cart directly
    Then the page displays "Swag Labs"
