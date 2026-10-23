Feature: Finding and buying products
  As a customer I want to find products and manage my basket

  @story:SCRUM-18 @ac:1 @design:D1 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1 Searching for a partial product name shows only matching products
    Given I navigate to "/#/search?q=Juice"
    Then the page displays "Apple Juice (1000ml)"

  @story:SCRUM-18 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2 Results page displays the searched-for term
    Given I navigate to "/#/search?q=Apple"
    Then the URL contains "search?q=Apple"
    And the page displays "Apple"

  @story:SCRUM-18 @ac:3 @design:D3 @type:functional @technique:equivalence-partitioning
  Scenario: AC-3 Searching for a term with no matches shows a not-found message
    Given I navigate to "/#/search?q=xyznonexistentproduct123"
    Then the page displays "No results found"

  @story:SCRUM-18 @design:D4 @type:accessibility @technique:checklist-based
  Scenario: AC-story Accessibility scan of the search results page
    Given I navigate to "/#/search?q=Juice"
    Then the page passes axe accessibility checks
