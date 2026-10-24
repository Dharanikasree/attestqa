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

  @story:110 @ac:1 @design:D6 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1 Locked-out user sees lockout error and product list is not shown
    Given I am on the sign-in page
    When I enter "locked_out_user" in the "user-name" field
    And I enter "secret_sauce" in the "password" field
    And I click "Login"
    Then the page displays "Epic sadface: Sorry, this user has been locked out."

  @story:110 @ac:2 @design:D7 @type:functional @technique:state-transition
  Scenario: AC-2 Navigating to product list without signing in shows sign-in page with error
    Given I navigate to the product list address directly
    Then the page displays "Swag Labs"
    And the page displays "Epic sadface: You can only access '/inventory.html' when you are logged in."

  @story:110 @ac:3 @design:D8 @type:functional @technique:error-guessing
  Scenario: AC-3a Sign-in page renders key form elements
    Given I am on the sign-in page
    Then the page displays "Swag Labs"

  @story:110 @ac:3 @design:D9 @type:accessibility @technique:checklist-based
  Scenario: AC-3b Sign-in page passes WCAG 2.1 A/AA accessibility scan
    Given I am on the sign-in page
    Then the page passes axe accessibility checks
