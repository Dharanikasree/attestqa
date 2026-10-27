Feature: Navigation menu
  As a customer I want to start over, or leave, from the menu.

  @story:118 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1 Reset app state from the menu empties the cart and the cart badge is not shown
    Given I am on the sign-in page
    When I fill in the username with the standard user credentials
    And I fill in the password with the standard user credentials
    And I click "Login"
    Then the page displays "Products"
    When I click the first Add to cart button in the product list
    Then the cart badge shows "1"
    When I open the side menu
    And I click "Reset App State"
    Then the cart badge is not shown

  @story:118 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2 Logout from the menu shows the sign-in page
    Given I am on the sign-in page
    When I fill in the username with the standard user credentials
    And I fill in the password with the standard user credentials
    And I click "Login"
    Then the page displays "Products"
    When I open the side menu
    And I click "Logout"
    Then the page displays "Swag Labs"

  @story:118 @ac:3 @design:D3 @type:functional @technique:state-transition
  Scenario: AC-3 After logout going back in the browser does not show the product list
    Given I am on the sign-in page
    When I fill in the username with the standard user credentials
    And I fill in the password with the standard user credentials
    And I click "Login"
    Then the page displays "Products"
    When I open the side menu
    And I click "Logout"
    Then the page displays "Swag Labs"
    When I go back in the browser
    Then the page displays "Swag Labs"

  @story:118 @ac:2 @design:D4 @type:security @technique:state-transition
  Scenario: AC-2 After logout navigating directly to the product list shows the sign-in page
    Given I am on the sign-in page
    When I fill in the username with the standard user credentials
    And I fill in the password with the standard user credentials
    And I click "Login"
    Then the page displays "Products"
    When I open the side menu
    And I click "Logout"
    Then the page displays "Swag Labs"
    When I navigate to the product list directly
    Then the page displays "Swag Labs"

  @story:118 @design:D5 @type:accessibility @technique:checklist-based
  Scenario: AC-story Navigation menu passes accessibility checks
    Given I am on the sign-in page
    When I fill in the username with the standard user credentials
    And I fill in the password with the standard user credentials
    And I click "Login"
    Then the page displays "Products"
    When I open the side menu
    Then the page passes axe accessibility checks
