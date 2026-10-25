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

  @story:SCRUM-23 @ac:1 @design:D7 @type:functional @technique:state-transition
  Scenario: AC-1 — After entering a registered email the form shows that account's security question
    Given I am on the Forgot Password page
    When I find the Email field and enter "jim@example.com"
    Then the Security Question field is visible

  @story:SCRUM-23 @ac:2 @design:D8 @type:functional @technique:state-transition
  Scenario: AC-2 — With the right answer and a new password entered twice the password is changed and a confirmation is shown
    Given I am on the Forgot Password page
    When I find the Email field and enter "jim@example.com"
    And I find the Security Answer field and enter "West Side!"
    And I find the New Password field and enter "NewPass123!"
    And I find the Repeat New Password field and enter "NewPass123!"
    And I click "Change Password"
    Then the page displays "Your password has been changed"

  @story:SCRUM-23 @ac:3 @design:D9 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 — With a wrong answer the password is not changed and a message says the answer is wrong
    Given I am on the Forgot Password page
    When I find the Email field and enter "jim@example.com"
    And I find the Security Answer field and enter "WrongAnswer"
    And I find the New Password field and enter "NewPass123!"
    And I find the Repeat New Password field and enter "NewPass123!"
    And I click "Change Password"
    Then the page displays "Wrong answer to security question"

  @story:SCRUM-23 @ac:4 @design:D10 @type:security @technique:equivalence-partitioning
  Scenario: AC-4a — An unregistered email address gives no indication that no account exists
    Given I am on the Forgot Password page
    When I find the Email field and enter "notregistered@example.com"
    Then the page displays "Please provide an answer to your security question."

  @story:SCRUM-23 @ac:4 @design:D11 @type:functional @technique:equivalence-partitioning
  Scenario: AC-4b — The form reveals no account information before the security question is answered correctly
    Given I am on the Forgot Password page
    When I find the Email field and enter "jim@example.com"
    Then the Security Question field is visible
    And the page does not display "jim@example.com exists"

  @story:SCRUM-23 @ac:1 @design:D12 @type:accessibility @technique:checklist-based
  Scenario: AC-6 — Forgot Password page passes accessibility checks
    Given I am on the Forgot Password page
    Then the page passes axe accessibility checks

  # ─── SCRUM-23: Customer resets a forgotten password with the security question ───

  @story:SCRUM-23 @ac:1 @design:D7 @type:functional @technique:state-transition
  Scenario: AC-1 — After entering a registered email the form shows the security question
    Given I am on the Forgot Password page
    When I find the Email field and enter "jim@juice-sh.op"
    Then the page displays "What's the name of your favorite pet?"

  @story:SCRUM-23 @ac:2 @design:D8 @type:functional @technique:state-transition
  Scenario: AC-2 — With correct answer and new password entered twice the password is changed and confirmation shown
    Given I am on the Forgot Password page
    When I find the Email field and enter "jim@juice-sh.op"
    And I find the Answer field and enter "tiger"
    And I find the New Password field and enter "NewPass123!"
    And I find the Repeat New Password field and enter "NewPass123!"
    And I click "Change Password"
    Then the page displays "Your password was successfully changed."

  @story:SCRUM-23 @ac:3 @design:D9 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 — With a wrong answer the password is not changed and an error message is shown
    Given I am on the Forgot Password page
    When I find the Email field and enter "jim@juice-sh.op"
    And I find the Answer field and enter "wronganswer"
    And I find the New Password field and enter "NewPass123!"
    And I find the Repeat New Password field and enter "NewPass123!"
    And I click "Change Password"
    Then the page displays "Wrong answer to security question."

  @story:SCRUM-23 @ac:4 @design:D10 @type:security @technique:equivalence-partitioning
  Scenario: AC-4a — An unregistered email does not reveal whether an account exists
    Given I am on the Forgot Password page
    When I find the Email field and enter "notauser@example.com"
    Then the page does not display "What's the name of your favorite pet?"

  @story:SCRUM-23 @ac:4 @design:D11 @type:functional @technique:equivalence-partitioning
  Scenario: AC-4b — The security question is only shown after email is submitted, not before
    Given I am on the Forgot Password page
    Then the page does not display "What's the name of your favorite pet?"

  @story:SCRUM-23 @ac:1 @design:D12 @type:accessibility @technique:checklist-based
  Scenario: AC-6 — Forgot Password page passes accessibility checks
    Given I am on the Forgot Password page
    Then the page passes axe accessibility checks

  # ─── SCRUM-23: Customer resets a forgotten password with the security question ───

  @story:SCRUM-23 @ac:1 @design:D7 @type:functional @technique:state-transition
  Scenario: AC-1 — After entering a registered email the form shows that account's security question
    Given I am on the Forgot Password page
    When I find the Email field and enter "admin@juice-sh.op"
    Then the security question for that account is displayed

  @story:SCRUM-23 @ac:2 @design:D8 @type:functional @technique:state-transition
  Scenario: AC-2 — With the right answer and a new password the password is changed and a confirmation is shown
    Given I am on the Forgot Password page
    When I find the Email field and enter "admin@juice-sh.op"
    And I find the Answer field and enter "Mother of god"
    And I find the New Password field and enter "NewPass123!"
    And I find the Repeat New Password field and enter "NewPass123!"
    And I click "Change Password"
    Then the page displays "Your password has been changed"

  @story:SCRUM-23 @ac:3 @design:D9 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 — With a wrong answer the password is not changed and a message says the answer is wrong
    Given I am on the Forgot Password page
    When I find the Email field and enter "admin@juice-sh.op"
    And I find the Answer field and enter "WrongAnswerXYZ"
    And I find the New Password field and enter "NewPass123!"
    And I find the Repeat New Password field and enter "NewPass123!"
    And I click "Change Password"
    Then the page displays "Wrong answer to security question"

  @story:SCRUM-23 @ac:4 @design:D10 @type:security @technique:equivalence-partitioning
  Scenario: AC-4a — An unregistered email shows no security question and gives no account hint
    Given I am on the Forgot Password page
    When I find the Email field and enter "notregistered@example.com"
    Then no security question is displayed

  @story:SCRUM-23 @ac:4 @design:D11 @type:functional @technique:equivalence-partitioning
  Scenario: AC-4b — The form reveals no account information before the security question is answered correctly
    Given I am on the Forgot Password page
    When I find the Email field and enter "admin@juice-sh.op"
    Then the security question for that account is displayed
    And the page does not display "admin@juice-sh.op exists"

  @story:SCRUM-23 @ac:1 @design:D12 @type:accessibility @technique:checklist-based
  Scenario: AC-6 — Forgot Password page passes accessibility checks
    Given I am on the Forgot Password page
    Then the page passes axe accessibility checks
