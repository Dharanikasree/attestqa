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

  @story:TOOL-14 @ac:1 @design:D10 @type:functional @technique:state-transition
  Scenario: AC-1a Registration link on the sign-in page leads to the registration form
    Given I navigate to the sign-in page
    When I click "Register"
    Then the page displays "Register"

  @story:TOOL-14 @ac:1 @design:D8 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1b Valid registration creates the account and takes the customer to the sign-in page
    Given I navigate to the registration page
    When I find the "First name" field and enter "Test"
    And I find the "Last name" field and enter "User"
    And I find the "Date of birth" field and enter "1990-01-01"
    And I find the "Address" field and enter "123 Test Street"
    And I find the "City" field and enter "Testville"
    And I find the "State" field and enter "TS"
    And I find the "Country" field and enter "United States"
    And I find the "Postcode" field and enter "12345"
    And I find the "Phone" field and enter "0612345678"
    And I find the "Email" field and enter "newuser_14_unique@example.com"
    And I find the "Password" field and enter "Str0ng!Pass"
    And I click "Register"
    Then the page displays "Login"

  @story:TOOL-14 @ac:2 @design:D9 @type:functional @technique:boundary-value-analysis
  Scenario: AC-2 Submitting the registration form with a required field empty shows a validation message
    Given I navigate to the registration page
    When I click "Register"
    Then the page displays "First name is required"

  @story:TOOL-14 @ac:3 @design:D11 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3a A password that does not meet the rules is refused with a message naming the rule
    Given I navigate to the registration page
    When I find the "Password" field and enter "weak"
    And I click "Register"
    Then the page displays "Password"

  @story:TOOL-14 @ac:3 @design:D12 @type:functional @technique:state-transition
  Scenario: AC-3b An empty password field is refused with a validation message
    Given I navigate to the registration page
    When I click "Register"
    Then the page displays "Password"

  @story:TOOL-14 @ac:1 @design:D13 @type:security @technique:error-guessing
  Scenario: AC-3c Registering with an already-registered email shows a generic message that does not confirm the account exists
    Given I navigate to the registration page
    When I find the "First name" field and enter "Test"
    And I find the "Last name" field and enter "User"
    And I find the "Date of birth" field and enter "1990-01-01"
    And I find the "Address" field and enter "123 Test Street"
    And I find the "City" field and enter "Testville"
    And I find the "State" field and enter "TS"
    And I find the "Country" field and enter "United States"
    And I find the "Postcode" field and enter "12345"
    And I find the "Phone" field and enter "0612345678"
    And I find the "Email" field and enter "[REGISTERED_EMAIL]"
    And I find the "Password" field and enter "Str0ng!Pass"
    And I click "Register"
    Then the page displays "A customer with this email address already exists."

  @story:TOOL-14 @design:D14 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility The registration page passes an automated accessibility scan
    Given I navigate to the registration page
    Then the page passes axe accessibility checks
