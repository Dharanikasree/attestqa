Feature: Product list
  As a customer I want to sort the products by name or price.

  @story:111 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1 Product list is sorted A to Z by name when it first opens
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    And the sort dropdown shows "Name (A to Z)"
    And the first product name comes before the last product name alphabetically

  @story:111 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2 Sorting by name Z to A reverses the order
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I select "Name (Z to A)" from the sort dropdown
    Then the sort dropdown shows "Name (Z to A)"
    And the first product name comes after the last product name alphabetically

  @story:111 @ac:3 @design:D3 @type:functional @technique:state-transition
  Scenario: AC-3a Sorting by price low to high lists the cheapest product first
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I select "Price (low to high)" from the sort dropdown
    Then the sort dropdown shows "Price (low to high)"
    And the first product price is less than or equal to the last product price

  @story:111 @ac:3 @design:D4 @type:functional @technique:state-transition
  Scenario: AC-3b Sorting by price high to low lists the most expensive product first
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I select "Price (high to low)" from the sort dropdown
    Then the sort dropdown shows "Price (high to low)"
    And the first product price is greater than or equal to the last product price

  @story:111 @design:D5 @type:accessibility @technique:checklist-based
  Scenario: AC-story Product list page passes accessibility checks
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    Then the page passes axe accessibility checks

  @story:112 @ac:1 @design:D6 @type:functional @technique:state-transition
  Scenario: AC-1 Clicking a product name opens its detail page with matching name, description and price
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first product name in the list
    Then the product detail page is shown
    And the product name on the detail page matches the name from the list
    And the product description on the detail page matches the description from the list
    And the product price on the detail page matches the price from the list

  @story:112 @ac:2 @design:D7 @type:functional @technique:state-transition
  Scenario: AC-2 Adding a product from its detail page changes button to Remove and cart shows 1
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first product name in the list
    Then the product detail page is shown
    When I click "Add to cart"
    Then the page displays "Remove"
    And the cart badge shows "1"

  @story:112 @ac:3 @design:D8 @type:functional @technique:state-transition
  Scenario: AC-3 Back to products returns to the product list
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first product name in the list
    Then the product detail page is shown
    When I click "Back to products"
    Then the page displays "Products"

  @story:112 @design:D9 @type:accessibility @technique:checklist-based
  Scenario: AC-story Product detail page passes accessibility checks
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first product name in the list
    Then the product detail page is shown
    Then the page passes axe accessibility checks

  @story:113 @ac:1 @design:D10 @type:functional @technique:state-transition
  Scenario: AC-1 Adding a product from the list changes its button to Remove and shows cart badge
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    Then the first product button in the list shows "Remove"
    And the cart badge shows "1"

  @story:113 @ac:2 @design:D11 @type:functional @technique:state-transition
  Scenario: AC-2 Removing the product changes the button back and hides the badge
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    Then the first product button in the list shows "Remove"
    And the cart badge shows "1"
    When I click the first Remove button in the product list
    Then the first product button in the list shows "Add to cart"
    And the cart badge is not shown

  @story:113 @ac:3 @design:D12 @type:functional @technique:state-transition
  Scenario: AC-3 Products added stay in the cart after navigating away and back
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    Then the cart badge shows "1"
    When I click the first product name in the list
    Then the product detail page is shown
    When I click "Back to products"
    Then the page displays "Products"
    And the cart badge shows "1"

  @story:113 @design:D13 @type:accessibility @technique:checklist-based
  Scenario: AC-story Product list with cart items passes accessibility checks
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    Then the page passes axe accessibility checks

  @story:113 @ac:2 @design:D14 @type:functional @technique:boundary-value-analysis
  Scenario: AC-2 Adding a second product increases the cart badge to 2
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    Then the cart badge shows "1"
    When I click the second Add to cart button in the product list
    Then the cart badge shows "2"

  @story:119 @ac:1 @design:D15 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1 Each product in the list shows its own unique picture
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    Then every product image in the list is visible
    And all product images in the list have unique src values

  @story:119 @ac:1 @bug:121 @design:D16 @type:confirmation @technique:equivalence-partitioning
  Scenario: AC-1 Problem user sees each product's own picture not the same picture for all
    Given I am on the sign-in page
    When I find the Username field and enter "problem_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    Then every product image in the list is visible
    And all product images in the list have unique src values

  @story:119 @ac:2 @design:D17 @type:functional @technique:state-transition
  Scenario: AC-2 A product's picture on its detail page is the same as in the list
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    When I record the first product image src from the list
    And I click the first product name in the list
    Then the product detail page is shown
    And the product detail image src matches the recorded list image src

  @story:119 @design:D18 @type:accessibility @technique:checklist-based
  Scenario: AC-story Product images pass accessibility checks
    Given I am on the sign-in page
    When I find the Username field and enter "standard_user"
    And I find the Password field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Products"
    Then the page passes axe accessibility checks
