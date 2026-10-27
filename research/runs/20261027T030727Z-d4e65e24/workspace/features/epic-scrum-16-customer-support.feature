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

  # ─── SCRUM-23: Customer resets a forgotten password with the security question ───

  @story:SCRUM-23 @ac:1 @design:D6 @type:functional @technique:state-transition
  Scenario: AC-1 — Security question appears after a registered email is entered
    Given I am on the Forgot Password page
    When I find the Email address field and enter "jim@juice-sh.op"
    Then the Security Question field is visible
    And the Security Question field is not empty

  @story:SCRUM-23 @ac:2 @design:D7 @type:functional @technique:state-transition
  Scenario: AC-2 — Correct answer and new password changes the password and shows confirmation
    Given I am on the Forgot Password page
    When I find the Email address field and enter "jim@juice-sh.op"
    And I find the Field for the answer to the security question and enter "ncc-1701"
    And I find the Field for New Password and enter "NewPass123"
    And I find the Field to confirm the new password and enter "NewPass123"
    And I click "Change"
    Then the page displays "Your password has been changed"

  @story:SCRUM-23 @ac:3 @design:D8 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 — Wrong answer does not change the password and shows an error message
    Given I am on the Forgot Password page
    When I find the Email address field and enter "jim@juice-sh.op"
    And I find the Field for the answer to the security question and enter "wronganswer"
    And I find the Field for New Password and enter "NewPass123"
    And I find the Field to confirm the new password and enter "NewPass123"
    And I click "Change"
    Then the page displays "Wrong answer to security question"

  @story:SCRUM-23 @ac:4 @design:D9 @type:functional @technique:equivalence-partitioning
  Scenario: AC-4 — Entering an unknown email shows no indication of whether an account exists
    Given I am on the Forgot Password page
    When I find the Email address field and enter "doesnotexist@example.com"
    Then the Security Question field is not visible

  @story:SCRUM-23 @ac:4 @design:D10 @type:accessibility @technique:checklist-based
  Scenario: AC-10 — Forgot Password page passes accessibility checks
    Given I am on the Forgot Password page
    Then the page passes axe accessibility checks

  @story:SCRUM-23 @ac:4 @design:D11 @type:security @technique:equivalence-partitioning
  Scenario: AC-11 — The form treats registered and unregistered emails identically before the security question is answered
    Given I am on the Forgot Password page
    When I find the Email address field and enter "doesnotexist@example.com"
    Then the Security Question field is not visible
    When I find the Email address field and enter "jim@juice-sh.op"
    Then the Security Question field is visible
