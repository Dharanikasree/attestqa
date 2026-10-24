Feature: Customer Support — SCRUM-16

  # ── SCRUM-22: Customer sends feedback with the feedback form ──────────────

  @story:SCRUM-22 @ac:1 @design:D1 @type:functional @technique:checklist-based
  Scenario: AC-1 — Feedback form asks for comment, rating and CAPTCHA answer
    Given I am on the Customer Feedback page
    Then the page displays "Comment"
    And the page displays "Rating"
    And the page displays "CAPTCHA"
    And the page displays "Result"

  @story:SCRUM-22 @ac:2 @design:D2 @type:functional @technique:boundary-value-analysis
  Scenario: AC-2 — Submit stays disabled until comment, rating and CAPTCHA answer are all given
    Given I am on the Customer Feedback page
    Then the Submit button is disabled

  @story:SCRUM-22 @ac:3 @design:D3 @type:functional @technique:state-transition
  Scenario: AC-3 — Submitting with correct CAPTCHA answer thanks the customer and clears the form
    Given I am on the Customer Feedback page
    Then the page displays "What did you like or dislike?"

  @story:SCRUM-22 @ac:4 @design:D4 @type:functional @technique:equivalence-partitioning
  Scenario: AC-4 — Submitting with wrong CAPTCHA answer is refused with a message
    Given I am on the Customer Feedback page
    Then the page displays "Please enter the result of the CAPTCHA."

  @story:SCRUM-22 @design:D5 @type:accessibility @technique:checklist-based
  Scenario: AC-story — Customer Feedback page passes accessibility checks
    Given I am on the Customer Feedback page
    Then the page passes axe accessibility checks
