Feature: Customer account

  # TOOL-13: Customer signs in and signs out

  @story:TOOL-13 @ac:1 @design:D1 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1 A registered customer with correct credentials is signed in and sees their account page
    Given I navigate to the sign-in page
    Then the page displays "Email"
    When I fill the "email" field with the registered email
    And I fill the "password" field with the registered password
    And I click the "login" button
    Then the page displays "My Account"

  @story:TOOL-13 @ac:2 @design:D2 @type:functional @technique:equivalence-partitioning
  Scenario: AC-2 A wrong password shows an error and the customer stays on the sign-in page
    Given I navigate to the sign-in page
    When I fill the "email" field with the registered email
    And I fill the "password" field with a wrong password
    And I click the "login" button
    Then the page displays "Invalid email or password."

  @story:TOOL-13 @ac:2 @design:D3 @type:security @technique:error-guessing
  Scenario: AC-2b The error message does not reveal whether the email has an account
    Given I navigate to the sign-in page
    When I fill the "email" field with an unregistered email
    And I fill the "password" field with any password
    And I click the "login" button
    Then the page displays "Invalid email or password."

  @story:TOOL-13 @ac:3 @design:D4 @type:functional @technique:state-transition
  Scenario: AC-3 Signing out from the customer menu signs the customer out and the header offers Sign in
    Given I navigate to the sign-in page
    When I fill the "email" field with the registered email
    And I fill the "password" field with the registered password
    And I click the "login" button
    Then the page displays "My Account"
    When I sign out via the customer menu
    Then the page displays "Sign in"

  @story:TOOL-13 @ac:4 @design:D5 @type:functional @technique:state-transition
  Scenario: AC-4 The sign-in page is reached by clicking Sign in in the header
    Given I navigate to the home page
    When I click the sign-in link in the header
    Then the page displays "Login"
    And the URL contains "auth/login"

  @story:TOOL-13 @ac:4 @design:D6 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility The sign-in page passes an automated accessibility scan
    Given I navigate to the sign-in page
    Then the page passes axe accessibility checks
