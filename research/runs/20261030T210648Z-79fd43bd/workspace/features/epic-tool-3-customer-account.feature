Feature: Customer account

  # TOOL-13: Customer signs in and signs out

  @story:TOOL-13 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1 Valid credentials sign the customer in
    Given I navigate to the sign-in page
    When I find the "Email address *" field and enter "[REGISTERED_EMAIL]"
    And I find the "Password *" field and enter "[REGISTERED_PASS]"
    And Click the "Login" button
    Then the page displays "My Account"

  @story:TOOL-13 @ac:2 @design:D2 @type:functional @technique:equivalence-partitioning
  Scenario: AC-2a Wrong password shows an error and keeps the customer on the sign-in page
    Given I navigate to the sign-in page
    When I find the "Email address *" field and enter "[REGISTERED_EMAIL]"
    And I find the "Password *" field and enter "wrongpassword"
    And Click the "Login" button
    Then the page displays "Invalid email or password."
    And the URL contains "/auth/login"

  @story:TOOL-13 @ac:2 @design:D3 @type:functional @technique:equivalence-partitioning
  Scenario Outline: AC-2b Error message does not reveal whether the email has an account
    Given I navigate to the sign-in page
    When I find the "Email address *" field and enter "<email>"
    And I find the "Password *" field and enter "wrongpassword"
    And Click the "Login" button
    Then the page displays "Invalid email or password."

    Examples:
      | email                          |
      | [REGISTERED_EMAIL]             |
      | nonexistent@example.com        |

  @story:TOOL-13 @ac:3 @design:D4 @type:functional @technique:state-transition
  Scenario: AC-3 Signing out returns Sign in to the header
    Given I am signed in as a registered customer
    When I sign out from the customer menu
    Then the page displays "Sign in"

  @story:TOOL-13 @ac:4 @design:D5 @type:functional @technique:equivalence-partitioning
  Scenario: AC-4a Sign-in page renders and is reachable
    Given I navigate to the sign-in page
    Then the page displays "Login"

  @story:TOOL-13 @ac:4 @design:D6 @type:accessibility @technique:checklist-based
  Scenario: AC-4b Sign-in page passes axe accessibility checks
    Given I navigate to the sign-in page
    Then the page passes axe accessibility checks

  @story:TOOL-13 @ac:1 @design:D7 @type:security @technique:state-transition
  Scenario: AC-1 sec Session is established only after successful sign-in
    Given I navigate to the sign-in page
    When I find the "Email address *" field and enter "[REGISTERED_EMAIL]"
    And I find the "Password *" field and enter "wrongpassword"
    And Click the "Login" button
    Then the page displays "Invalid email or password."
    When I find the "Password *" field and enter "[REGISTERED_PASS]"
    And Click the "Login" button
    Then the page displays "My Account"
