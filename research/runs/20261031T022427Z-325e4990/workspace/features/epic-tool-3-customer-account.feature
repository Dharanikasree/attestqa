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

  @story:TOOL-14 @ac:1 @design:D7 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1 Completing registration with valid values creates the account and lands on the sign-in page
    Given I navigate to the registration page
    When I find the "first_name" field and enter "Test"
    And I find the "last_name" field and enter "User"
    And I find the "dob" field and enter "1990-01-01"
    And I find the "address" field and enter "123 Main Street"
    And I find the "postcode" field and enter "12345"
    And I find the "city" field and enter "Springfield"
    And I find the "state" field and enter "IL"
    And I find the "country" field and enter "US"
    And I find the "phone" field and enter "0612345678"
    And I find the "email" field and enter "tooltest14unique@example.com"
    And I find the "password" field and enter "Test1234!"
    And I click "Register"
    Then the URL contains "auth/login"

  @story:TOOL-14 @ac:2 @design:D8 @type:functional @technique:boundary-value-analysis
  Scenario: AC-2 Submitting the registration form with a required field empty shows a validation message
    Given I navigate to the registration page
    When I click "Register"
    Then the page displays "First name is required"

  @story:TOOL-14 @ac:3 @design:D9 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 A password that violates the password rules is refused with a message naming the rule
    Given I navigate to the registration page
    When I find the "first_name" field and enter "Test"
    And I find the "last_name" field and enter "User"
    And I find the "dob" field and enter "1990-01-01"
    And I find the "address" field and enter "123 Main Street"
    And I find the "postcode" field and enter "12345"
    And I find the "city" field and enter "Springfield"
    And I find the "state" field and enter "IL"
    And I find the "country" field and enter "US"
    And I find the "phone" field and enter "0612345678"
    And I find the "email" field and enter "tooltest14pw@example.com"
    And I find the "password" field and enter "weakpassword"
    And I click "Register"
    Then the page displays "Password must contain"

  @story:TOOL-14 @ac:1 @design:D10 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility The registration page passes an automated accessibility scan
    Given I navigate to the registration page
    Then the page passes axe accessibility checks

  # TOOL-17: Customer keeps a list of favourite tools

  @story:TOOL-17 @ac:1 @design:D11 @type:functional @technique:state-transition
  Scenario: AC-1 A signed-in customer can add a product to favourites from its detail page and then sees it in their favourites list
    Given I navigate to the sign-in page
    When I fill the "email" field with the registered email
    And I fill the "password" field with the registered password
    And I click the "login" button
    Then the page displays "My Account"
    When I navigate to the first product detail page
    And I click "Add to Favourites"
    Then the favourite button shows the product was added
    When I navigate to the favourites page
    Then the favourites list contains the added product

  @story:TOOL-17 @ac:2 @design:D12 @type:functional @technique:state-transition
  Scenario: AC-2 Removing a product from the favourites list takes it off the list
    Given I navigate to the sign-in page
    When I fill the "email" field with the registered email
    And I fill the "password" field with the registered password
    And I click the "login" button
    Then the page displays "My Account"
    When I navigate to the favourites page
    And I click "Remove" on the first favourite
    Then the removed product is no longer in the favourites list

  @story:TOOL-17 @ac:3 @design:D13 @type:functional @technique:state-transition
  Scenario: AC-3 A visitor who is not signed in and opens the favourites page is sent to the sign-in page
    Given I navigate to the favourites page as a visitor
    Then the URL contains "auth/login"
    And the page displays "Login"

  @story:TOOL-17 @ac:1 @design:D14 @type:security @technique:equivalence-partitioning
  Scenario: AC-1b A signed-in customer adding the same product to favourites twice does not duplicate it
    Given I navigate to the sign-in page
    When I fill the "email" field with the registered email
    And I fill the "password" field with the registered password
    And I click the "login" button
    Then the page displays "My Account"
    When I navigate to the first product detail page
    And I click "Add to Favourites"
    And I click "Add to Favourites"
    Then the favourites list has no duplicate entries

  @story:TOOL-17 @ac:1 @design:D15 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility The favourites page passes an automated accessibility scan
    Given I navigate to the sign-in page
    When I fill the "email" field with the registered email
    And I fill the "password" field with the registered password
    And I click the "login" button
    Then the page displays "My Account"
    When I navigate to the favourites page
    Then the page passes axe accessibility checks
