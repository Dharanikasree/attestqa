Feature: Finding and buying products
  As a customer I want to find products and buy them

  @story:SCRUM-18 @ac:1 @design:D1 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1 Searching by partial name lists only matching products
    Given I am on the product list page
    When I click the search icon
    And I type "apple" into the search bar
    Then only products matching "apple" are shown

  @story:SCRUM-18 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2 Results page shows the searched term
    Given I am on the product list page
    When I click the search icon
    And I type "apple" into the search bar
    Then the page displays "apple"

  @story:SCRUM-18 @ac:3 @design:D3 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 Searching for a term with no matches shows a not-found message
    Given I am on the product list page
    When I click the search icon
    And I type "xyznotaproduct123" into the search bar
    Then the page displays "No results found"

  @story:SCRUM-18 @design:D4 @type:accessibility @technique:checklist-based
  Scenario: D4 Product search page passes accessibility checks
    Given I am on the product list page
    When I click the search icon
    And I type "juice" into the search bar
    Then the page passes axe accessibility checks
