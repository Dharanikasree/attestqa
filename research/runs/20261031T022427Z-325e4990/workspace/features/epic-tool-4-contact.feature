Feature: Contact

  # TOOL-18: Customer sends a message with the contact form

  @story:TOOL-18 @ac:1 @design:D1 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1 Submitting the form with all required fields shows a thank-you message
    Given I navigate to the contact page
    When I type "John" into the "First name" field
    And I type "Doe" into the "Last name" field
    And I type "john@example.com" into the "Email address" field
    And I select "Customer service" from the "Subject" combobox
    And I type "I would like to ask about my recent order and get more details about the product." into the "Message *" field
    And I click "Send"
    Then the page displays "Thanks for your message!"

  @story:TOOL-18 @ac:2 @design:D2 @type:functional @technique:boundary-value-analysis
  Scenario: AC-2a Leaving the first name field empty shows a validation message and the form is not sent
    Given I navigate to the contact page
    When I type "Doe" into the "Last name" field
    And I type "john@example.com" into the "Email address" field
    And I select "Customer service" from the "Subject" combobox
    And I type "I would like to ask about my recent order and get more details about the product." into the "Message *" field
    And I click "Send"
    Then the page displays "First name is required"

  @story:TOOL-18 @ac:2 @design:D2 @type:functional @technique:boundary-value-analysis
  Scenario: AC-2b Leaving the last name field empty shows a validation message and the form is not sent
    Given I navigate to the contact page
    When I type "John" into the "First name" field
    And I type "john@example.com" into the "Email address" field
    And I select "Customer service" from the "Subject" combobox
    And I type "I would like to ask about my recent order and get more details about the product." into the "Message *" field
    And I click "Send"
    Then the page displays "Last name is required"

  @story:TOOL-18 @ac:2 @design:D2 @type:functional @technique:boundary-value-analysis
  Scenario: AC-2c Leaving the email field empty shows a validation message and the form is not sent
    Given I navigate to the contact page
    When I type "John" into the "First name" field
    And I type "Doe" into the "Last name" field
    And I select "Customer service" from the "Subject" combobox
    And I type "I would like to ask about my recent order and get more details about the product." into the "Message *" field
    And I click "Send"
    Then the page displays "Email is required"

  @story:TOOL-18 @ac:2 @design:D2 @type:functional @technique:boundary-value-analysis
  Scenario: AC-2d Leaving the message field empty shows a validation message and the form is not sent
    Given I navigate to the contact page
    When I type "John" into the "First name" field
    And I type "Doe" into the "Last name" field
    And I type "john@example.com" into the "Email address" field
    And I select "Customer service" from the "Subject" combobox
    And I click "Send"
    Then the page displays "Message is required"

  @story:TOOL-18 @ac:3 @design:D3 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 Entering an email without an at sign is refused with a format error message
    Given I navigate to the contact page
    When I type "John" into the "First name" field
    And I type "Doe" into the "Last name" field
    And I type "johndoeexample.com" into the "Email address" field
    And I select "Customer service" from the "Subject" combobox
    And I type "I would like to ask about my recent order and get more details about the product." into the "Message *" field
    And I click "Send"
    Then the page displays "Email format is invalid"

  @story:TOOL-18 @design:D4 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility Contact form passes accessibility checks
    Given I navigate to the contact page
    Then the page passes axe accessibility checks

  @story:TOOL-18 @ac:2 @design:D5 @type:security @technique:error-guessing
  Scenario: AC-2e Submitting with all fields empty does not expose a server error
    Given I navigate to the contact page
    When I click "Send"
    Then the page displays "First name is required"
