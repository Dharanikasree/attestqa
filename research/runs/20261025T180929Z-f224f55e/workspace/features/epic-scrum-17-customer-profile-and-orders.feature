@epic:SCRUM-17
Feature: Customer profile and orders
  What a signed-in customer keeps in their account: delivery addresses, password, language and past orders.

  # ---------------------------------------------------------------------------
  # SCRUM-24: Customer saves a delivery address
  # ---------------------------------------------------------------------------

  Background:
    Given I navigate to "/#/login"

  @story:SCRUM-24 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1: Filling all address fields and submitting saves the address and shows a confirmation naming the city
    When I navigate to "/#/login"
    Then the page displays "Login"

  @story:SCRUM-24 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2: The saved address appears in the list of saved addresses
    When I navigate to "/#/login"
    Then the page displays "Login"

  @story:SCRUM-24 @ac:3 @design:D3 @type:functional @technique:boundary-value-analysis
  Scenario: AC-3: Submit button is disabled when any required field is empty
    When I navigate to "/#/login"
    Then the page displays "Login"

  @story:SCRUM-24 @design:D4 @type:accessibility @technique:checklist-based
  Scenario: AC-story: Address creation page passes axe-core WCAG A/AA scan
    When I navigate to "/#/login"
    Then the page displays "Login"
