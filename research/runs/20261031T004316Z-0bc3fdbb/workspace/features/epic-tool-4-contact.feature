Feature: Contact

  # TOOL-18: Customer sends a message with the contact form

  @story:TOOL-18 @ac:1 @design:D1 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1 Submitting the form with all required fields shows a thank-you message
    Given I navigate to the contact page
    When I fill the "First name" field with "Jane"
    And I fill the "Last name" field with "Doe"
    And I fill the "Email address" field with "jane.doe@example.com"
    And I select "Customer service" from the "Subject" dropdown
    And I fill the "Message *" field with "Hello, I have a question about my order and would like some help please."
    And I click "Send"
    Then the page displays "Thanks for your message"

  @story:TOOL-18 @ac:2 @design:D2 @type:functional @technique:boundary-value-analysis
  Scenario: AC-2 Submitting the form with all fields empty shows validation messages
    Given I navigate to the contact page
    When I click "Send"
    Then the page displays "First name is required"
    And the page displays "Last name is required"
    And the page displays "Email is required"
    And the page displays "Message is required"

  @story:TOOL-18 @ac:3 @design:D3 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 An email address without an @ is refused with a message about email format
    Given I navigate to the contact page
    When I fill the "First name" field with "Jane"
    And I fill the "Last name" field with "Doe"
    And I fill the "Email address" field with "notanemail"
    And I fill the "Message *" field with "Hello, I have a question about my order."
    And I click "Send"
    Then the page displays "Email format is invalid"

  @story:TOOL-18 @ac:1 @design:D4 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility The contact page passes an automated accessibility scan
    Given I navigate to the contact page
    Then the page passes axe accessibility checks
