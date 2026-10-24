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
    Given I am on the product list page as a registered user
    When I click "Add to Basket"
    Then the page displays "Apple Juice (1000ml)"
    And the basket count is "1"

  @story:SCRUM-19 @ac:2 @design:D8 @type:functional @technique:state-transition
  Scenario: AC-2 – Increasing and decreasing a product quantity in the basket updates the line and total price
    Given I am on the basket page as a registered user with a product in the basket
    When I click the increase quantity button
    Then the quantity is "2" and the total price is updated
    When I click the decrease quantity button
    Then the quantity is "1" and the total price is updated

  @story:SCRUM-19 @ac:3 @design:D9 @type:functional @technique:state-transition
  Scenario: AC-3 – Removing a product from the basket takes it out and updates the total
    Given I am on the basket page as a registered user with a product in the basket
    When I click the delete button for the product
    Then the basket is empty and the total is "0¤"

  @story:SCRUM-19 @ac:1 @design:D10 @type:functional @technique:equivalence-partitioning
  Scenario: AC-1 – Adding two different products increases the basket count by one for each
    Given I am on the product list page as a registered user
    When I add two different products to the basket
    Then the basket count is "2"

  @story:SCRUM-19 @design:D11 @type:accessibility @technique:checklist-based
  Scenario: story – Basket page passes axe accessibility checks
    Given I am on the basket page as a registered user
    Then the page passes axe accessibility checks
