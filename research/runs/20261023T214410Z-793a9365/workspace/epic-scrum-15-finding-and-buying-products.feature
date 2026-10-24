Feature: Finding and buying products
  As a customer I want to search the products by name so that I can find what I came for without scrolling.

  @story:SCRUM-18 @ac:1 @design:D1 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1 – Searching for part of a product name lists only matching products
    Given I am on the search results page for "apple"
    Then the page displays "Apple Juice (1000ml)"
    And the page displays "Apple Pomace"
    And the page displays "Pineapple Juice (1000ml)"

  @story:SCRUM-18 @ac:1 @design:D2 @type:functional @technique:boundary-value-analysis
  Scenario: AC-1 – Searching for a term that matches no product shows no product cards
    Given I am on the search results page for "xyznotaproduct123"
    Then no product cards are displayed

  @story:SCRUM-18 @ac:2 @design:D3 @type:functional @technique:state-transition
  Scenario: AC-2 – After searching the results page displays the search term
    Given I am on the search results page for "apple"
    Then the page displays "Search Results - apple"

  @story:SCRUM-18 @ac:3 @design:D4 @type:functional @technique:error-guessing
  Scenario: AC-3 – Searching for a term with no matches shows a not-found message
    Given I am on the search results page for "xyznotaproduct123"
    Then the page displays "No results found"

  @story:SCRUM-18 @design:D5 @type:accessibility @technique:checklist-based
  Scenario: story – Search page passes axe accessibility checks
    Given I am on the search results page for "apple"
    Then the page passes axe accessibility checks

  @story:SCRUM-19 @ac:1 @design:D7 @type:functional @technique:state-transition
  Scenario: AC-1 – Adding a product from the product list confirms it on screen and increments the basket count
    Given I am logged in and on the product list page
    When I add the first product to the basket
    Then the basket item count increases by one
    And a confirmation message is shown

  @story:SCRUM-19 @ac:1 @design:D8 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1 – Adding two different products increments the basket count to two
    Given I am logged in and on the product list page
    When I add the first product to the basket
    And I add the second product to the basket
    Then the basket item count shows 2

  @story:SCRUM-19 @ac:2 @design:D9 @type:functional @technique:state-transition
  Scenario: AC-2a – Increasing a product quantity in the basket updates the line and total
    Given I am logged in with one product in the basket and on the basket page
    When I increase the product quantity to 2
    Then the product quantity in the basket is 2
    And the basket total reflects the updated quantity

  @story:SCRUM-19 @ac:2 @design:D10 @type:functional @technique:state-transition
  Scenario: AC-2b – Decreasing a product quantity in the basket updates the line and total
    Given I am logged in with two of a product in the basket and on the basket page
    When I decrease the product quantity to 1
    Then the product quantity in the basket is 1
    And the basket total reflects the updated quantity

  @story:SCRUM-19 @ac:3 @design:D11 @type:functional @technique:state-transition
  Scenario: AC-3 – Removing a product from the basket takes it out of the basket and the total
    Given I am logged in with one product in the basket and on the basket page
    When I delete the product from the basket
    Then no products are shown in the basket

  @story:SCRUM-19 @design:D12 @type:accessibility @technique:checklist-based
  Scenario: story – Basket page passes axe accessibility checks
    Given I am logged in with one product in the basket and on the basket page
    Then the page passes axe accessibility checks
