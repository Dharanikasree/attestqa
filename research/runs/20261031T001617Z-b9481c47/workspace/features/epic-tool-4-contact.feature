Feature: Contact form
  As a customer I want to send the shop a message so that I can ask about an order or a product.

  @story:TOOL-18 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1 Submitting the form with all required fields shows a thank-you message
    Given I am on the contact page
    When I find the First name field and enter "Jane"
    And I find the Last name field and enter "Doe"
    And I find the Email address field and enter "jane@example.com"
    And I find the Message field and enter "I would like to ask about my recent order and need some assistance."
    And I click "Send"
    Then the Send button is no longer visible
    And the page displays "Thanks for your message"

  @story:TOOL-18 @ac:2 @design:D2 @type:functional @technique:boundary-value-analysis
  Scenario Outline: AC-2 Leaving a required field empty shows a validation message
    Given I am on the contact page
    When I leave the <field> field empty
    And I click "Send"
    Then the page displays "<message>"

    Examples:
      | field         | message                              |
      | First name    | First name is required               |
      | Last name     | Last name is required                |
      | Email address | Email is required                    |
      | Message       | Message is required                  |

  @story:TOOL-18 @ac:3 @design:D3 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 An email without an @ is refused with an email format message
    Given I am on the contact page
    When I find the First name field and enter "Jane"
    And I find the Last name field and enter "Doe"
    And I find the Email address field and enter "janedoe.example.com"
    And I find the Message field and enter "I would like to ask about my recent order and need assistance."
    And I click "Send"
    Then the page displays "Email format is invalid"

  @story:TOOL-18 @ac:story @design:D4 @type:accessibility @technique:checklist-based
  Scenario: Accessibility scan of the contact form
    Given I am on the contact page
    Then the page passes axe accessibility checks
