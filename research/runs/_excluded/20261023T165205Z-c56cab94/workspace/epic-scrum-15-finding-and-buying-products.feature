Feature: Finding and buying products
  As a customer I want to search the products by name so that I can find what I came for without scrolling.

  @story:SCRUM-18 @ac:1 @design:D1 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1 Searching for a partial name shows only matching products
    Given I am on the home page
    When I click the search icon
    And I enter "apple" in the search field
    Then only products matching "apple" are listed

  @story:SCRUM-18 @ac:1 @design:D4 @type:functional @technique:boundary-value-analysis
  Scenario: AC-1b Searching with a single character shows only matching products
    Given I am on the home page
    When I click the search icon
    And I enter "b" in the search field
    Then only products matching "b" are listed

  @story:SCRUM-18 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2 Results page shows the searched term
    Given I am on the home page
    When I click the search icon
    And I enter "apple" in the search field
    Then the page displays "apple"

  @story:SCRUM-18 @ac:3 @design:D3 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 Searching for an unmatched term shows a not-found message
    Given I am on the home page
    When I click the search icon
    And I enter "xyznotaproduct123" in the search field
    Then the page displays "No results found"

  @story:SCRUM-18 @ac:1 @design:D5 @type:accessibility @technique:checklist-based
  Scenario: AC-story Accessibility of the search feature
    Given I am on the home page
    When I click the search icon
    Then the page passes axe accessibility checks
