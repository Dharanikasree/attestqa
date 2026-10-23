Feature: Finding and buying products
  As a customer I want to find products and buy them.

  @story:SCRUM-18 @ac:1 @design:D1 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1 Searching for part of a product name lists only matching products
    Given I am on the home page
    When I click the search icon
    And I enter "Juice" in the search box
    Then the page displays "Apple Juice (1000ml)"
    And the page displays "Banana Juice (1000ml)"

  @story:SCRUM-18 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2 The results page displays which term was searched for
    Given I am on the home page
    When I click the search icon
    And I enter "Apple" in the search box
    Then the page displays "Apple"

  @story:SCRUM-18 @ac:3 @design:D3 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 Searching for a term with no matches shows a no-results message
    Given I am on the home page
    When I click the search icon
    And I enter "xyznonexistentproduct" in the search box
    Then the page displays "No results found"

  @story:SCRUM-18 @design:D4 @type:accessibility @technique:checklist-based
  Scenario: AC-story Accessibility scan of the search results page
    Given I am on the home page
    When I click the search icon
    And I enter "Juice" in the search box
    Then the page passes axe accessibility checks
