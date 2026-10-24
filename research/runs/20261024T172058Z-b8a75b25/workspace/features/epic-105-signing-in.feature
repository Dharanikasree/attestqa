Feature: Signing in
  As a customer I want to sign in so that I can shop.

  @story:109 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1 — Valid credentials show the product list
    Given I navigate to the sign-in page
    When I fill in "user-name" with the standard user credential
    And I fill in "password" with the standard password credential
    And I click "Login"
    Then the page displays "Products"

  @story:109 @ac:2 @design:D2 @type:functional @technique:equivalence-partitioning
  Scenario: AC-2 — Wrong password shows credentials error and no product list
    Given I navigate to the sign-in page
    When I fill in "user-name" with the standard user credential
    And I fill in "password" with a wrong password
    And I click "Login"
    Then the page displays "Epic sadface: Username and password do not match any user in this service"
    And the product list is not shown

  @story:109 @ac:3 @design:D3 @type:functional @technique:boundary-value-analysis
  Scenario: AC-3 — Empty username shows username required error
    Given I navigate to the sign-in page
    When I leave the Username field empty
    And I fill in "password" with the standard password credential
    And I click "Login"
    Then the page displays "Epic sadface: Username is required"
    And the product list is not shown

  @story:109 @bug:121 @design:D4 @type:confirmation @technique:state-transition
  Scenario: Bug 121 — Problem user product images are distinct after sign-in
    Given I navigate to the sign-in page
    When I fill in "user-name" with the problem user credential
    And I fill in "password" with the standard password credential
    And I click "Login"
    Then the page displays "Products"
    And each product image is distinct

  @story:109 @design:D5 @type:accessibility @technique:checklist-based
  Scenario: Story accessibility — Sign-in page passes WCAG 2.1 A/AA automated scan
    Given I navigate to the sign-in page
    Then the page passes axe accessibility checks
