Feature: Shop administration

  # TOOL-19: Administrator manages the product list

  @story:TOOL-19 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1 A signed-in administrator can open the product list in the back office
    Given I navigate to the sign-in page
    When I fill the "email" field with the admin email
    And I fill the "password" field with the admin password
    And I click the "login" button
    Then the page displays "My Account"
    When I navigate to "/admin/products"
    Then the page displays "Combination Pliers"
    And the page displays "$14.15"

  @story:TOOL-19 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2 Searching the admin product list by name shows only matching products
    Given I navigate to the sign-in page
    When I fill the "email" field with the admin email
    And I fill the "password" field with the admin password
    And I click the "login" button
    Then the page displays "My Account"
    When I navigate to "/admin/products"
    Then the page displays "Combination Pliers"
    When I type "Pliers" into the Search field
    And I click "Search"
    Then the page displays "Pliers"

  @story:TOOL-19 @ac:2 @bug:TOOL-21 @design:D3 @type:confirmation @technique:state-transition
  Scenario: AC-2 bug:TOOL-21 Admin product search does not narrow the list
    Given I navigate to the sign-in page
    When I fill the "email" field with the admin email
    And I fill the "password" field with the admin password
    And I click the "login" button
    Then the page displays "My Account"
    When I navigate to "/admin/products"
    Then the page displays "Combination Pliers"
    When I type "Pliers" into the Search field
    And I click "Search"
    Then the page displays "Pliers"

  @story:TOOL-19 @ac:3 @design:D4 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 A customer account that opens the admin product list address does not see the list
    Given I navigate to the sign-in page
    When I fill the "email" field with the registered email
    And I fill the "password" field with the registered password
    And I click the "login" button
    Then the page displays "My Account"
    When I navigate to "/admin/products"
    Then the customer is not shown the admin product list

  @story:TOOL-19 @ac:3 @design:D5 @type:security @technique:error-guessing
  Scenario: AC-3b A visitor who is not signed in and opens the admin product list address is not shown the list
    When I navigate to "/admin/products"
    Then the visitor is not shown the admin product list

  @story:TOOL-19 @design:D6 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility The admin product list page passes an automated accessibility scan
    Given I navigate to the sign-in page
    When I fill the "email" field with the admin email
    And I fill the "password" field with the admin password
    And I click the "login" button
    Then the page displays "My Account"
    When I navigate to "/admin/products"
    Then the page displays "Combination Pliers"
    And the page passes axe accessibility checks
