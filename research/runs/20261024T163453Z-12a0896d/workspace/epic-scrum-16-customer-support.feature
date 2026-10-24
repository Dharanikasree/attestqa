Feature: Customer support — OWASP Juice Shop

  # ─── SCRUM-22: Customer sends feedback with the feedback form ───

  @story:SCRUM-22 @ac:1 @design:D1 @type:functional @technique:checklist-based
  Scenario: AC-1 — Feedback form asks for comment, rating and CAPTCHA answer
    Given I am on the Customer Feedback page
    Then the page displays "Comment"
    And the page displays "Rating"
    And the page displays "CAPTCHA"

  @story:SCRUM-22 @ac:2 @design:D2 @type:functional @technique:boundary-value-analysis
  Scenario: AC-2 — Submit stays disabled until all fields are filled
    Given I am on the Customer Feedback page
    Then the Submit button is disabled
    When I fill in the Comment textarea with "Great shop!"
    Then the Submit button is disabled
    When I fill in the CAPTCHA Result field with "15"
    Then the Submit button is enabled

  @story:SCRUM-22 @ac:3 @design:D3 @type:functional @technique:state-transition
  Scenario: AC-3 — Submitting with the correct CAPTCHA answer thanks the customer and clears the form
    Given I am on the Customer Feedback page
    When I fill in the Comment textarea with "Excellent service"
    And I fill in the CAPTCHA Result field with the correct answer
    And I click the Submit button
    Then the page displays "Thank you for your feedback"
    And the Comment textarea is cleared

  @story:SCRUM-22 @ac:4 @design:D4 @type:functional @technique:equivalence-partitioning
  Scenario: AC-4 — Submitting with a wrong CAPTCHA answer is refused with a message
    Given I am on the Customer Feedback page
    When I fill in the Comment textarea with "Nice shop"
    And I fill in the CAPTCHA Result field with "999"
    And I click the Submit button
    Then the page displays "Wrong answer to CAPTCHA"

  @story:SCRUM-22 @ac:1 @design:D5 @type:accessibility @technique:checklist-based
  Scenario: AC-5 — Customer Feedback page passes accessibility checks
    Given I am on the Customer Feedback page
    Then the page passes axe accessibility checks
