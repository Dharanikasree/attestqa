Feature: Finding and buying products
  As a customer I want to find products and buy them.

  # SCRUM-18: Customer searches the product list

  @story:SCRUM-18 @ac:1 @design:D1 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1 Searching for a partial name lists only matching products
    Given I am on the product list page
    When I click the search icon
    And I type "apple" into the search bar
    Then only products containing "apple" are listed

  @story:SCRUM-18 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2 Results page shows the searched term
    Given I am on the product list page
    When I click the search icon
    And I type "banana" into the search bar
    Then the page displays "banana"

  @story:SCRUM-18 @ac:3 @design:D3 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 Searching for a non-matching term shows a not-found message
    Given I am on the product list page
    When I click the search icon
    And I type "zzznomatchzzz" into the search bar
    Then the page displays "No results found"

  @story:SCRUM-18 @ac:1 @design:D4 @type:security @technique:error-guessing
  Scenario: AC-1 Search with a script injection term does not execute script
    Given I am on the product list page
    When I click the search icon
    And I type "<script>alert(1)</script>" into the search bar
    Then the page displays "No results found"

  @story:SCRUM-18 @design:D5 @type:accessibility @technique:checklist-based
  Scenario: AC-1 Search feature passes axe accessibility checks
    Given I am on the product list page
    When I click the search icon
    And I type "juice" into the search bar
    Then the page passes axe accessibility checks
