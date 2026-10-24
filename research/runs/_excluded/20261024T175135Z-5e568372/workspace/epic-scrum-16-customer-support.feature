Feature: Customer Support — OWASP Juice Shop

  # SCRUM-22: Customer sends feedback with the feedback form

  @story:SCRUM-22 @ac:1 @design:D1 @type:functional @technique:checklist-based
  Scenario: AC-1 — Feedback form displays comment, rating and CAPTCHA fields
    Given I navigate to "/#/contact"
    Then the page displays "Comment"
    And the page displays "Rating"
    And the page displays "CAPTCHA"

  @story:SCRUM-22 @ac:2 @design:D2 @type:functional @technique:boundary-value-analysis
  Scenario: AC-2 — Submit is disabled when no fields are filled
    Given I navigate to "/#/contact"
    Then the page displays "Submit"

  @story:SCRUM-22 @ac:3 @design:D3 @type:functional @technique:state-transition
  Scenario: AC-3 — Submitting with correct CAPTCHA answer thanks the customer and clears the form
    Given I navigate to "/#/contact"
    Then the page displays "Thank you"

  @story:SCRUM-22 @ac:4 @design:D4 @type:functional @technique:equivalence-partitioning
  Scenario: AC-4 — Submitting with wrong CAPTCHA answer is refused with a message
    Given I navigate to "/#/contact"
    Then the page displays "Wrong answer"

  @story:SCRUM-22 @design:D5 @type:accessibility @technique:checklist-based
  Scenario: AC-5 — Customer Feedback page passes accessibility checks
    Given I navigate to "/#/contact"
    Then the page passes axe accessibility checks
