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
  Scenario: AC-1 – Adding a product from the product list confirms it on screen and increments basket count
    Given I am logged in as a registered customer
    And I navigate to "/#/"
    When I click "Add to Basket"
    Then the page displays "Apple Juice (1000ml) added to basket."
    And the basket count shows "1"

  @story:SCRUM-19 @ac:2 @design:D8 @type:functional @technique:state-transition
  Scenario: AC-2 – Increasing the quantity of a basket item updates the line quantity and total price
    Given I am logged in as a registered customer
    And I navigate to "/#/"
    And I click "Add to Basket"
    And I navigate to "/#/basket"
    When I click the increase quantity button
    Then the quantity field shows "2"
    And the total price has increased

  @story:SCRUM-19 @ac:3 @design:D9 @type:functional @technique:state-transition
  Scenario: AC-3 – Removing a product from the basket removes it and updates the total
    Given I am logged in as a registered customer
    And I navigate to "/#/"
    And I click "Add to Basket"
    And I navigate to "/#/basket"
    When I click the delete item button
    Then no basket items are shown
    And the page displays "Total Price: 0¤"

  @story:SCRUM-19 @design:D10 @type:accessibility @technique:checklist-based
  Scenario: story – Basket page passes axe accessibility checks
    Given I am logged in as a registered customer
    And I navigate to "/#/basket"
    Then the page passes axe accessibility checks
