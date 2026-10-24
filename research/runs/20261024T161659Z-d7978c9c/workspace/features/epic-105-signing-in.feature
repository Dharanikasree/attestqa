Feature: Signing in
  As a customer I want to sign in so that I can shop.

  @story:109 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1 Standard user signs in with correct password
    Given I am on the sign-in page
    When I fill in the username with the standard user credentials
    And I fill in the password with the standard user credentials
    And I click "Login"
    Then the page displays "Products"

  @story:109 @ac:2 @design:D2 @type:functional @technique:equivalence-partitioning
  Scenario: AC-2 Wrong password shows an error and the product list is not shown
    Given I am on the sign-in page
    When I fill in the username with the standard user credentials
    And I fill in the password with a wrong password
    And I click "Login"
    Then the page displays "Username and password do not match any user in this service"

  @story:109 @ac:3 @design:D3 @type:functional @technique:boundary-value-analysis
  Scenario: AC-3 Empty username shows a required-field error
    Given I am on the sign-in page
    When I leave the Username field empty
    And I click "Login"
    Then the page displays "Epic sadface: Username is required"

  @story:109 @bug:121 @design:D4 @type:confirmation @technique:state-transition
  Scenario: AC-1 Problem user product images are distinct after sign-in
    Given I am on the sign-in page
    When I fill in the username with the problem user credentials
    And I fill in the password with the standard user credentials
    And I click "Login"
    Then the page displays "Products"
    And each product image is distinct

  @story:109 @design:D5 @type:accessibility @technique:checklist-based
  Scenario: AC-story Sign-in page passes accessibility checks
    Given I am on the sign-in page
    Then the page passes axe accessibility checks
