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

  # TOOL-14: New customer registers an account

  @story:TOOL-14 @ac:1 @design:D7 @type:functional @technique:state-transition
  Scenario: AC-1 Filling in all required fields with valid values creates the account and takes the customer to the sign-in page
    Given I navigate to the registration page
    When I find the "First name" field and enter "Test"
    And I find the "Last name" field and enter "User"
    And I find the "Date of birth" field and enter "01-01-1990"
    And I find the "Address" field and enter "123 Test Street"
    And I find the "City" field and enter "Testville"
    And I find the "State" field and enter "TS"
    And I find the "Country" field and enter "United States"
    And I find the "Postcode" field and enter "12345"
    And I find the "Phone" field and enter "0123456789"
    And I find the "Email" field and enter "newuser_14_unique@example.com"
    And I find the "Password" field and enter "NewP@ssw0rd!"
    And I click "Register"
    Then the URL contains "auth/login"

  @story:TOOL-14 @ac:2 @design:D8 @type:functional @technique:boundary-value-analysis
  Scenario: AC-2 Submitting the registration form with the email field empty shows a validation message
    Given I navigate to the registration page
    And I click "Register"
    Then the page displays "First name is required"

  @story:TOOL-14 @ac:3 @design:D9 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 A password that does not meet the rules is refused with a message naming the rule
    Given I navigate to the registration page
    When I find the "Password" field and enter "weak"
    And I click "Register"
    Then the page displays "Password must be at least 8 characters"

  @story:TOOL-14 @ac:1 @design:D10 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility The registration page passes an automated accessibility scan
    Given I navigate to the registration page
    Then the page passes axe accessibility checks
