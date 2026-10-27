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

  @story:115 @ac:1 @design:D7 @type:functional @technique:state-transition
  Scenario: AC-1 Continuing with all fields filled in goes to the order overview
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    And I click the cart icon
    Then the page displays "Your Cart"
    When I click "Checkout"
    Then the page displays "Checkout: Your Information"
    When I find the First Name field and enter "Jane"
    And I find the Last Name field and enter "Doe"
    And I find the Zip/Postal Code field and enter "12345"
    And I click "Continue"
    Then the page displays "Checkout: Overview"

  @story:115 @ac:2 @design:D8 @type:functional @technique:boundary-value-analysis
  Scenario: AC-2a Empty first name shows an error saying the first name is required
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    And I click the cart icon
    Then the page displays "Your Cart"
    When I click "Checkout"
    Then the page displays "Checkout: Your Information"
    When I leave the First Name field empty
    And I find the Last Name field and enter "Doe"
    And I find the Zip/Postal Code field and enter "12345"
    And I click "Continue"
    Then the page displays "First Name is required"

  @story:115 @ac:2 @design:D9 @type:functional @technique:boundary-value-analysis
  Scenario: AC-2b Empty last name shows an error saying the last name is required
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    And I click the cart icon
    Then the page displays "Your Cart"
    When I click "Checkout"
    Then the page displays "Checkout: Your Information"
    When I find the First Name field and enter "Jane"
    And I leave the Last Name field empty
    And I find the Zip/Postal Code field and enter "12345"
    And I click "Continue"
    Then the page displays "Last Name is required"

  @story:115 @ac:2 @design:D10 @type:functional @technique:boundary-value-analysis
  Scenario: AC-2c Empty postal code shows an error saying the postal code is required
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    And I click the cart icon
    Then the page displays "Your Cart"
    When I click "Checkout"
    Then the page displays "Checkout: Your Information"
    When I find the First Name field and enter "Jane"
    And I find the Last Name field and enter "Doe"
    And I leave the Zip/Postal Code field empty
    And I click "Continue"
    Then the page displays "Postal Code is required"

  @story:115 @ac:3 @design:D11 @type:functional @technique:state-transition
  Scenario: AC-3 Cancel returns to the cart with the cart unchanged
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    And I click the cart icon
    Then the page displays "Your Cart"
    And the cart badge shows "1"
    When I click "Checkout"
    Then the page displays "Checkout: Your Information"
    When I click "Cancel"
    Then the page displays "Your Cart"
    And the cart badge shows "1"

  @story:115 @design:D12 @type:accessibility @technique:checklist-based
  Scenario: AC-story Checkout information page passes axe accessibility checks
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    And I click the cart icon
    Then the page displays "Your Cart"
    When I click "Checkout"
    Then the page displays "Checkout: Your Information"
    Then the page passes axe accessibility checks
