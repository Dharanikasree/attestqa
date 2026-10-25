@epic:SCRUM-17
Feature: Customer profile and orders
  What a signed-in customer keeps in their account: delivery addresses, password, language and past orders.

  # ---------------------------------------------------------------------------
  # SCRUM-24: Customer saves a delivery address
  # ---------------------------------------------------------------------------

  Background:
    Given I navigate to "/#/login"

  @story:SCRUM-24 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1: Submitting all required fields saves the address and shows a confirmation naming the city
    When I find the Email field and enter "user@example.com"
    And I find the Password field and enter "pass"
    And I click "Log in"
    Then the account menu is displayed
    When I navigate to "/#/address/create"
    And I find the Country field and enter "Germany"
    And I find the Name field and enter "Test User"
    And I find the Mobile Number field and enter "01234567890"
    And I find the ZIP Code field and enter "12345"
    And I find the Address field and enter "123 Test Street"
    And I find the City field and enter "Berlin"
    And I find the State field and enter "Berlin"
    And I click "Submit"
    Then the page displays "Berlin"

  @story:SCRUM-24 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2: The saved address appears in the customer's saved addresses list
    When I find the Email field and enter "user@example.com"
    And I find the Password field and enter "pass"
    And I click "Log in"
    Then the account menu is displayed
    When I navigate to "/#/address/saved"
    Then the page displays "Berlin"

  @story:SCRUM-24 @ac:3 @design:D3 @type:functional @technique:boundary-value-analysis
  Scenario: AC-3: Submit button is disabled when all required fields are empty
    When I find the Email field and enter "user@example.com"
    And I find the Password field and enter "pass"
    And I click "Log in"
    Then the account menu is displayed
    When I navigate to "/#/address/create"
    Then the Submit button is disabled

  @story:SCRUM-24 @ac:1 @design:D4 @type:security @technique:state-transition
  Scenario: AC-1 (security): Unauthenticated access to the address form is blocked
    When I navigate to "/#/address/create"
    Then the page displays "403"

  @story:SCRUM-24 @design:D5 @type:accessibility @technique:checklist-based
  Scenario: AC-story: Address create page passes axe-core WCAG A/AA scan
    When I find the Email field and enter "user@example.com"
    And I find the Password field and enter "pass"
    And I click "Log in"
    Then the account menu is displayed
    When I navigate to "/#/address/create"
    Then the page passes axe accessibility checks
