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
  Scenario: AC-1 Correct current password and matching new password changes the password and shows confirmation
    Given I am logged in as a registered customer
    When I navigate to "/#/privacy-security/change-password"
    And I find the Current Password field and enter "currentPass"
    And I find the New Password field and enter "newPass123"
    And I find the Repeat New Password field and enter "newPass123"
    And I click "Change"
    Then the page displays "Password successfully changed"

  @story:SCRUM-25 @ac:2 @design:D7 @type:functional @technique:equivalence-partitioning
  Scenario: AC-2 Wrong current password causes the change to be refused with a message
    Given I am logged in as a registered customer
    When I navigate to "/#/privacy-security/change-password"
    And I find the Current Password field and enter "wrongPassword!"
    And I find the New Password field and enter "newPass123"
    And I find the Repeat New Password field and enter "newPass123"
    And I click "Change"
    Then the page displays "Current password is not correct"

  @story:SCRUM-25 @ac:3 @design:D8 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 New password and repeat that differ causes the Change button to be disabled
    Given I am logged in as a registered customer
    When I navigate to "/#/privacy-security/change-password"
    And I find the Current Password field and enter "currentPass"
    And I find the New Password field and enter "newPass123"
    And I find the Repeat New Password field and enter "differentPass!"
    Then the Change button is disabled

  @story:SCRUM-25 @ac:1 @design:D9 @type:security @technique:state-transition
  Scenario: AC-1b After password change the old password no longer works
    Given I am logged in as a registered customer
    When I navigate to "/#/privacy-security/change-password"
    And I find the Current Password field and enter "currentPass"
    And I find the New Password field and enter "newPass123"
    And I find the Repeat New Password field and enter "newPass123"
    And I click "Change"
    Then the page displays "Password successfully changed"
    When I navigate to "/#/logout"
    And I navigate to "/#/login"
    And I find the Email field and enter "testuser@example.com"
    And I find the Password field and enter "currentPass"
    And I click "Log in"
    Then the page displays "Invalid email or password"

  @story:SCRUM-25 @design:D10 @type:accessibility @technique:checklist-based
  Scenario: AC-story Accessibility of the Change Password form
    Given I am logged in as a registered customer
    When I navigate to "/#/privacy-security/change-password"
    Then the page passes axe accessibility checks

  @story:SCRUM-26 @ac:1 @design:D11 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1 Choosing another language from the menu shows the shop's labels in that language
    Given I am on the home page
    When I click "Language selection menu"
    And I click "Deutsch"
    Then the page displays "Alle Produkte"

  @story:SCRUM-26 @ac:2 @design:D12 @type:functional @technique:state-transition
  Scenario: AC-2 The chosen language is kept when the page is reloaded
    Given I am on the home page
    When I click "Language selection menu"
    And I click "Deutsch"
    Then the page displays "Alle Produkte"
    When I reload the page
    Then the page displays "Alle Produkte"

  @story:SCRUM-26 @ac:3 @design:D13 @type:functional @technique:state-transition
  Scenario: AC-3 The page declares the chosen language to assistive technology
    Given I am on the home page
    When I click "Language selection menu"
    And I click "Deutsch"
    Then the document language attribute is "de"

  @story:SCRUM-26 @design:D14 @type:accessibility @technique:checklist-based
  Scenario: AC-story Accessibility of the language selection
    Given I am on the home page
    Then the page passes axe accessibility checks

  @story:SCRUM-27 @ac:1 @design:D15 @type:functional @technique:state-transition
  Scenario: AC-1a Order history shows placed orders with order number and total
    Given I am logged in as a registered customer
    When I navigate to "/#/order-history"
    Then the page displays "Order History"
    And the order list is not empty

  @story:SCRUM-27 @ac:1 @design:D16 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1b Order history with no orders shows the empty-state message
    Given I am on the login page
    And I am logged in as a new customer with no orders
    When I navigate to "/#/order-history"
    Then the page displays "You have not placed any orders yet."

  @story:SCRUM-27 @ac:2 @design:D17 @type:functional @technique:equivalence-partitioning
  Scenario: AC-2 Tracking an order shows its status and ordered products
    Given I am logged in as a registered customer
    When I navigate to "/#/order-history"
    And I click the track order button for the first order
    Then the page displays "Ordered products"
    And the order status section is visible

  @story:SCRUM-27 @ac:3 @design:D18 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3a Order history only shows the current customer's own orders
    Given I am logged in as a registered customer
    When I navigate to "/#/order-history"
    Then I only see orders belonging to the current user

  @story:SCRUM-27 @ac:3 @design:D19 @type:security @technique:error-guessing
  Scenario: AC-3b Tracking an order by number does not reveal another customer's order to a different signed-in user
    Given I am logged in as a registered customer
    When I navigate to "/#/track-result?orderId=1"
    Then the page does not display another customer's order details

  @story:SCRUM-27 @bug:SCRUM-28 @design:D20 @type:confirmation @technique:error-guessing
  Scenario: AC-3c Order tracking does not show another customer's order to an anonymous user
    Given I am on the login page
    When I navigate to "/#/track-result?orderId=1"
    Then the page does not display order details for an anonymous user

  @story:SCRUM-27 @design:D21 @type:accessibility @technique:checklist-based
  Scenario: AC-story Accessibility of the order history page
    Given I am logged in as a registered customer
    When I navigate to "/#/order-history"
    Then the page passes axe accessibility checks
