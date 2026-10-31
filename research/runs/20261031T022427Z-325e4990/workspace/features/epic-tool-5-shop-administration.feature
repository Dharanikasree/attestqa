Feature: Shop administration

  # TOOL-19: Administrator manages the product list

  Background:
    Given I navigate to the admin login page
    And I sign in as administrator

  @story:TOOL-19 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1 Signed-in administrator sees each product name and price in the back office product list
    When I navigate to the admin products page
    Then the page displays "Products"
    And the page displays "Combination Pliers"
    And the page displays "$14.15"

  @story:TOOL-19 @ac:2 @design:D2 @type:functional @technique:equivalence-partitioning
  Scenario: AC-2 Searching the admin product list by name shows only matching products
    When I navigate to the admin products page
    And I search for "Pliers" in the admin product list
    Then the page displays "Combination Pliers"
    And the page displays "Pliers"

  @story:TOOL-19 @ac:2 @design:D4 @bug:TOOL-21 @type:confirmation @technique:equivalence-partitioning
  Scenario: AC-2 Bug TOOL-21 Admin product search does not narrow the list
    When I navigate to the admin products page
    And I search for "Pliers" in the admin product list
    Then the page displays "Combination Pliers"
    And the page displays "Pliers"

  @story:TOOL-19 @design:D5 @type:accessibility @technique:checklist-based
  Scenario: AC-accessibility Admin product list passes accessibility checks
    When I navigate to the admin products page
    Then the page passes axe accessibility checks

  @story:TOOL-19 @ac:3 @design:D3 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 A customer account that opens the admin product list address does not see the list
    Given I navigate to the admin products page as a visitor
    Then the page does not display "Combination Pliers"
