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

  @story:SCRUM-19 @ac:1 @design:D6 @type:functional @technique:state-transition
  Scenario: AC-1 – Adding a product from the product list increments the basket count
    Given I am on the product list page logged in as a registered user
    When I add "Apple Juice (1000ml)" to the basket
    Then the basket count shows "1"

  @story:SCRUM-19 @ac:2 @design:D7 @type:functional @technique:state-transition
  Scenario: AC-2 – Increasing and decreasing a product quantity updates the line price and total
    Given I am on the basket page with "Apple Juice (1000ml)" already added
    When I increase the quantity of "Apple Juice (1000ml)" in the basket
    Then the item quantity is "2"
    And the basket total is updated
    When I decrease the quantity of "Apple Juice (1000ml)" in the basket
    Then the item quantity is "1"

  @story:SCRUM-19 @ac:3 @design:D8 @type:functional @technique:state-transition
  Scenario: AC-3 – Removing a product takes it out of the basket and the total drops to zero
    Given I am on the basket page with "Apple Juice (1000ml)" already added
    When I delete "Apple Juice (1000ml)" from the basket
    Then the basket is empty
    And the basket total shows "0"

  @story:SCRUM-19 @ac:1 @design:D9 @type:accessibility @technique:checklist-based
  Scenario: AC-1 – Product list page passes axe accessibility checks
    Given I am on the product list page logged in as a registered user
    Then the page passes axe accessibility checks

  @story:SCRUM-21 @ac:1 @design:D10 @type:functional @technique:state-transition
  Scenario: AC-1 – Signed-in customer submits a review and a confirmation is shown
    Given I am on the product list page logged in as a registered user
    When I click "Click for more information about the product"
    And I find the Review field and enter "This is a great product!"
    And I click "Submit"
    Then the page displays "Thank you for your review"
    And the Review field is empty

  @story:SCRUM-21 @ac:2 @design:D11 @type:functional @technique:state-transition
  Scenario: AC-2 – Submitted review is listed with the customer's email as author
    Given I am on the product list page logged in as a registered user
    When I click "Click for more information about the product"
    And I find the Review field and enter "Review for author check"
    And I click "Submit"
    Then the page displays "Review for author check"
    And the page displays the customer's email as the review author

  @story:SCRUM-21 @ac:3 @design:D12 @type:functional @technique:boundary-value-analysis
  Scenario: AC-3 – Submit button is disabled when the review text is empty
    Given I am on the product list page logged in as a registered user
    When I click "Click for more information about the product"
    Then the Submit button is disabled

  @story:SCRUM-21 @ac:1 @design:D13 @type:security @technique:equivalence-partitioning
  Scenario: AC-1a – A customer who is not signed in cannot write a review
    Given I am on the product detail page as a guest
    Then the Review field is not visible

  @story:SCRUM-21 @design:D14 @type:accessibility @technique:checklist-based
  Scenario: story – Product detail page passes axe accessibility checks
    Given I am on the product list page logged in as a registered user
    When I click "Click for more information about the product"
    Then the page passes axe accessibility checks

  @story:SCRUM-21 @bug:SCRUM-12 @design:D15 @type:confirmation @technique:state-transition
  Scenario: bug #SCRUM-12 – Session token is no longer accepted after logout
    Given I am on the product list page logged in as a registered user
    When I log out
    Then the session token is not accepted
