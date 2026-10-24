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
  Scenario: AC-1 — After entering a registered email the security question is shown
    Given I am on the Forgot Password page
    When I find the Email address field and enter "[REGISTERED_EMAIL]"
    Then the page displays "Security Question"
    And the Field for the answer to the security question is enabled

  @story:SCRUM-23 @ac:2 @design:D7 @type:functional @technique:state-transition
  Scenario: AC-2 — Correct answer and matching new passwords changes the password and shows confirmation
    Given I am on the Forgot Password page
    When I find the Email address field and enter "[REGISTERED_EMAIL]"
    And I find the Field for the answer to the security question and enter "[SECURITY_ANSWER]"
    And I find the Field for New Password and enter "[NEW_PASSWORD]"
    And I find the Field to confirm the new password and enter "[NEW_PASSWORD]"
    Then the Button to confirm the changes is enabled
    When I click "Change"
    Then the page displays "Your password was successfully changed."

  @story:SCRUM-23 @ac:3 @design:D8 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 — Wrong answer leaves the password unchanged and shows an error
    Given I am on the Forgot Password page
    When I find the Email address field and enter "[REGISTERED_EMAIL]"
    And I find the Field for the answer to the security question and enter "WrongAnswerXYZ"
    And I find the Field for New Password and enter "NewPass123"
    And I find the Field to confirm the new password and enter "NewPass123"
    And I click "Change"
    Then the page displays "Wrong answer to security question."

  @story:SCRUM-23 @ac:4 @design:D9 @type:functional @technique:equivalence-partitioning
  Scenario: AC-4a — A non-existent email leaves the security question field empty and disabled
    Given I am on the Forgot Password page
    When I find the Email address field and enter "notexist@example.com"
    Then the Field for the answer to the security question is disabled

  @story:SCRUM-23 @ac:4 @design:D10 @type:security @technique:equivalence-partitioning
  Scenario: AC-4b — The form gives no sign of whether an email has an account before the question is answered
    Given I am on the Forgot Password page
    When I find the Email address field and enter "notexist@example.com"
    Then the page does not display "No account with that email address exists"
    And the page does not display "Invalid email"

  @story:SCRUM-23 @ac:1 @design:D11 @type:accessibility @technique:checklist-based
  Scenario: AC-6 — Forgot Password page passes accessibility checks
    Given I am on the Forgot Password page
    Then the page passes axe accessibility checks

  # (duplicate block removed)
    Given I am on the Forgot Password page
    When I find the Email address field and enter "jim@juice-sh.op"
    Then the Security Question field is enabled

  @story:SCRUM-23 @ac:2 @design:D7 @type:functional @technique:state-transition
  Scenario: AC-2 — Correct answer and matching new passwords changes the password and shows confirmation
    Given I am on the Forgot Password page
    When I find the Email address field and enter "jim@juice-sh.op"
    And I find the Field for the answer to the security question and enter "Yorkshire"
    And I find the Field for New Password and enter "NewPass1!"
    And I find the Field to confirm the new password and enter "NewPass1!"
    And I click "Change"
    Then the page displays "Your password has been changed"

  @story:SCRUM-23 @ac:3 @design:D8 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 — Wrong security question answer does not change the password and shows error
    Given I am on the Forgot Password page
    When I find the Email address field and enter "jim@juice-sh.op"
    And I find the Field for the answer to the security question and enter "WrongAnswer"
    And I find the Field for New Password and enter "NewPass1!"
    And I find the Field to confirm the new password and enter "NewPass1!"
    And I click "Change"
    Then the page displays "Wrong answer to security question"

  @story:SCRUM-23 @ac:4 @design:D9 @type:functional @technique:equivalence-partitioning
  Scenario: AC-4a — A non-existent email leaves the security question field empty and disabled
    Given I am on the Forgot Password page
    When I find the Email address field and enter "nobody@example.com"
    Then the Security Question field is disabled

  @story:SCRUM-23 @ac:4 @design:D10 @type:security @technique:equivalence-partitioning
  Scenario: AC-4b — A non-existent email does not show a message revealing whether an account exists
    Given I am on the Forgot Password page
    When I find the Email address field and enter "nobody@example.com"
    Then the page does not display "no account"
    And the page does not display "not found"
    And the page does not display "does not exist"

  @story:SCRUM-23 @ac:1 @design:D11 @type:accessibility @technique:checklist-based
  Scenario: AC-6 — Forgot Password page passes accessibility checks
    Given I am on the Forgot Password page
    Then the page passes axe accessibility checks
