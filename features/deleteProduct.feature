@smoke
Feature: Delete Product

    Scenario: Delete Product after adding it to the Basket
        Given I navigate to the test site
        When I fill up the "sumon4@yopmail.com" and "Tim1234@"
        And I click the login button
        Then the "Automation" should display
        When I click add to cart for the product "ADIDAS ORIGINAL"
        And I clcik on the delete button
        Then The "No Products in Your Cart" text should display
