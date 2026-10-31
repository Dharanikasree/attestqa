Feature: Customer account

  # TOOL-13: Customer signs in and signs out

  @story:TOOL-13 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1 Registered customer with correct credentials is signed in and sees their account page
    Given I navigate to "/auth/login"
    When I type "customer@example.com" into the Email address field
    And I type "customerpass" into the Password field
    And I click "Login"
    Then the page displays "My account"

  @story:TOOL-13 @ac:2 @design:D2 @type:functional @technique:equivalence-partitioning
  Scenario: AC-2 Wrong password shows error and customer stays on sign-in page
    Given I navigate to "/auth/login"
    When I type "customer@example.com" into the Email address field
    And I type "wrongpassword" into the Password field
    And I click "Login"
    Then the page displays "Invalid email or password."

  @story:TOOL-13 @ac:2 @design:D3 @type:functional @technique:equivalence-partitioning
  Scenario: AC-2b Error message does not reveal whether the email has an account
    Given I navigate to "/auth/login"
    When I type "notregistered@example.com" into the Email address field
    And I type "anypassword" into the Password field
    And I click "Login"
    Then the page displays "Invalid email or password."

  @story:TOOL-13 @ac:3 @design:D4 @type:functional @technique:state-transition
  Scenario: AC-3 Signing out from the customer menu signs the customer out and the header offers Sign in
    Given I navigate to "/auth/login"
    When I type "customer@example.com" into the Email address field
    And I type "customerpass" into the Password field
    And I click "Login"
    Then the page displays "My account"
    When I click "Sign out"
    Then the page displays "Sign in"

  @story:TOOL-13 @ac:4 @design:D5 @type:functional @technique:equivalence-partitioning
  Scenario: AC-4 Sign-in page is reachable from the Sign in link in the header
    Given I navigate to the home page
    When I click "Sign in"
    Then the page displays "Login"

  @story:TOOL-13 @ac:4 @design:D6 @type:accessibility @technique:checklist-based
  Scenario: AC-4 Sign-in page passes automated WCAG 2.1 A/AA accessibility scan
    Given I navigate to "/auth/login"
    Then the page passes axe accessibility checks

  @story:TOOL-13 @ac:2 @design:D7 @type:security @technique:equivalence-partitioning
  Scenario: AC-2c Both registered and unregistered emails show the same error message
    Given I navigate to "/auth/login"
    When I type "customer@example.com" into the Email address field
    And I type "wrongpassword" into the Password field
    And I click "Login"
    Then the page displays "Invalid email or password."
    When I type "notregistered@example.com" into the Email address field
    And I type "anypassword" into the Password field
    And I click "Login"
    Then the page displays "Invalid email or password."
