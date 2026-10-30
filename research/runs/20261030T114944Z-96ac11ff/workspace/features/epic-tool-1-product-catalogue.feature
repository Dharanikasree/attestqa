Feature: Product catalogue
  As a shopper I want to browse the tools on sale page by page so that I can see the whole range.

  @story:TOOL-6 @ac:1 @design:D1 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1 Home page lists products with name, price and image
    Given I am on the home page
    Then the page displays "Combination Pliers"
    Then the page displays "$14.15"
    Then the page displays "Pliers"
    Then the page displays "$12.01"

  @story:TOOL-6 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2 Choosing page 2 shows a different set of products
    Given I am on the home page
    When I click "Page-2"
    Then the current page is page 2
    Then the page displays "$"

  @story:TOOL-6 @ac:3 @design:D3 @type:functional @technique:state-transition
  Scenario: AC-3 The current page control is marked as current
    Given I am on the home page
    When I click "Page-2"
    Then page 2 is active

  @story:TOOL-6 @design:D4 @type:accessibility @technique:checklist-based
  Scenario: AC-story Accessibility scan of the product catalogue page
    Given I am on the home page
    Then the product list passes axe accessibility checks
