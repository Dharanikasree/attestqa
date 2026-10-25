Feature: Product list
  As a customer I want to sort the products by name or price.

  @story:111 @ac:1 @design:D1 @type:functional @technique:state-transition
  Scenario: AC-1 Product list is sorted A to Z by name when it first opens
    Given I am on the product list page
    Then the page displays "Name (A to Z)"
    And the first product name is alphabetically first

  @story:111 @ac:2 @design:D2 @type:functional @technique:state-transition
  Scenario: AC-2 Sorting by name Z to A reverses the order
    Given I am on the product list page
    When I click "Name (Z to A)"
    Then the page displays "Name (Z to A)"
    And the first product name is alphabetically last

  @story:111 @ac:3 @design:D3 @type:functional @technique:state-transition
  Scenario: AC-3a Sorting by price low to high lists the cheapest product first
    Given I am on the product list page
    When I click "Price (low to high)"
    Then the page displays "Price (low to high)"
    And the first product has the lowest price

  @story:111 @ac:3 @design:D4 @type:functional @technique:state-transition
  Scenario: AC-3b Sorting by price high to low lists the most expensive product first
    Given I am on the product list page
    When I click "Price (high to low)"
    Then the page displays "Price (high to low)"
    And the first product has the highest price

  @story:111 @design:D5 @type:accessibility @technique:checklist-based
  Scenario: AC-story Product list page passes accessibility checks
    Given I am on the product list page
    Then the product list passes axe accessibility checks
