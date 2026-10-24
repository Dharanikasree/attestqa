Feature: Signing in
  As a customer I want to sign in so that I can shop.

  @story:109 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1 Standard user signs in with correct password and sees the product list
    Given I navigate to the sign-in page
    When I find the "username" field and enter "standard_user"
    And I find the "password" field and enter "secret_sauce"
    And I click "Login"
    Then the URL contains "/inventory"
    And the page displays "Products"

  @story:109 @ac:2 @design:D2 @type:functional @technique:equivalence-partitioning
  Scenario: AC-2 Wrong password shows credentials do not match error and no product list
    Given I navigate to the sign-in page
    When I find the "username" field and enter "standard_user"
    And I find the "password" field and enter "wrong_password"
    And I click "Login"
    Then the page displays "Epic sadface: Username and password do not match any user in this service"
    And the page does not display "Products"

  @story:109 @ac:3 @design:D3 @type:functional @technique:boundary-value-analysis
  Scenario: AC-3 Signing in with username empty shows an error saying the username is required
    Given I navigate to the sign-in page
    When I leave the Username field empty
    And I find the "password" field and enter "secret_sauce"
    And I click "Login"
    Then the page displays "Epic sadface: Username is required"

  @story:109 @bug:121 @design:D4 @type:confirmation @technique:state-transition
  Scenario: Bug 121 Problem user product images are distinct after sign-in
    Given I navigate to the sign-in page
    When I find the "username" field and enter "problem_user"
    And I find the "password" field and enter "secret_sauce"
    And I click "Login"
    Then the URL contains "/inventory"
    And each product image has a distinct src attribute

  @story:109 @design:D5 @type:accessibility @technique:checklist-based
  Scenario: Story accessibility Sign-in page passes WCAG 2.1 A/AA automated scan
    Given I navigate to the sign-in page
    Then the page passes axe accessibility checks
