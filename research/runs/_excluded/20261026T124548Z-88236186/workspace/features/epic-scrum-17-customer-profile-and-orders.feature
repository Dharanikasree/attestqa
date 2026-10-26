Feature: Customer profile and orders
  As a signed-in customer I want to manage my account details,
  including delivery addresses, so that I can check out faster.

  Background:
    Given I am on the login page

  @story:SCRUM-24 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1 Adding a new address saves it and confirmation names the city
    Given I am logged in as a registered customer
    When I navigate to "/#/address/create"
    And I fill in the address form with country "Germany" name "Test User" mobile "01234567890" zip "10115" address "Unter den Linden 1" city "Berlin" state "Berlin"
    And I click "Submit"
    Then the page displays "Berlin"

  @story:SCRUM-24 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2 The saved address is listed among the customer's addresses
    Given I am logged in as a registered customer
    When I navigate to "/#/address/create"
    And I fill in the address form with country "Germany" name "Test User" mobile "01234567890" zip "10115" address "Unter den Linden 1" city "Berlin" state "Berlin"
    And I click "Submit"
    Then the page displays "Berlin"
    When I navigate to "/#/address/select"
    Then the page displays "Unter den Linden 1"

  @story:SCRUM-24 @ac:3 @design:D3 @type:functional @technique:boundary-value-analysis
  Scenario Outline: AC-3 Address cannot be submitted while any required field is empty
    Given I am logged in as a registered customer
    When I navigate to "/#/address/create"
    And I leave the <field> field empty and fill all other required fields
    Then the Submit button is disabled

    Examples:
      | field         |
      | Country       |
      | Name          |
      | Mobile Number |
      | ZIP Code      |
      | Address       |
      | City          |
      | State         |

  @story:SCRUM-24 @design:D4 @type:accessibility @technique:checklist-based
  Scenario: AC-story Accessibility of the Create Address form
    Given I am logged in as a registered customer
    When I navigate to "/#/address/create"
    Then the page passes axe accessibility checks

  @story:SCRUM-24 @ac:2 @design:D5 @type:security @technique:error-guessing
  Scenario: AC-2 security A customer cannot access another customer's saved addresses
    Given I am logged in as a registered customer
    When I navigate to "/#/address/select"
    Then I only see addresses belonging to the current user

  @story:SCRUM-25 @ac:1 @design:D6 @type:functional @technique:state-transition
  Scenario: AC-1 Correct current password and new password entered twice changes the password and shows confirmation
    Given I am logged in as a registered customer
    When I navigate to "/#/privacy-security/change-password"
    And I find the "Field to enter the current password" field and enter the current password
    And I find the "Field for the new password" field and enter "NewP@ss99"
    And I find the "Field to repeat the new password" field and enter "NewP@ss99"
    And I click "Change"
    Then the page displays "Password successfully changed"
    Then I find the "Field to enter the current password" field and enter "NewP@ss99"
    And I find the "Field for the new password" field and enter the current password
    And I find the "Field to repeat the new password" field and enter the current password
    And I click "Change"
    Then the page displays "Password successfully changed"

  @story:SCRUM-25 @ac:2 @design:D7 @type:functional @technique:equivalence-partitioning
  Scenario: AC-2 Wrong current password is refused with a message
    Given I am logged in as a registered customer
    When I navigate to "/#/privacy-security/change-password"
    And I find the "Field to enter the current password" field and enter "WrongPassword123"
    And I find the "Field for the new password" field and enter "NewP@ss99"
    And I find the "Field to repeat the new password" field and enter "NewP@ss99"
    And I click "Change"
    Then the page displays "Current password is not correct."

  @story:SCRUM-25 @ac:3 @design:D8 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 Mismatched new password and repeat are refused
    Given I am logged in as a registered customer
    When I navigate to "/#/privacy-security/change-password"
    And I find the "Field to enter the current password" field and enter the current password
    And I find the "Field for the new password" field and enter "NewP@ss99"
    And I find the "Field to repeat the new password" field and enter "DifferentP@ss88"
    Then the "Button to confirm the change" button is disabled

  @story:SCRUM-25 @ac:1 @design:D9 @type:security @technique:error-guessing
  Scenario: AC-1 security Unauthenticated user cannot access the change password page
    When I navigate to "/#/privacy-security/change-password"
    Then the URL contains "/#/login"

  @story:SCRUM-25 @ac:1 @design:D11 @type:accessibility @technique:checklist-based
  Scenario: AC-1 Accessibility of the Change Password form
    Given I am logged in as a registered customer
    When I navigate to "/#/privacy-security/change-password"
    Then the page passes axe accessibility checks
