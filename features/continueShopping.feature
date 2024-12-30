@smoke
Feature: Continue Shopping

   Scenario: Continue to shopping as a user
   Given I navigate to the test site
   When I fill up the "sumon4@yopmail.com" and "Tim1234@"
   And I click the login button
   Then the "Automation" should display
   And I click add to cart for the product "ADIDAS ORIGINAL"
   And I click on the "Continue Shopping" button
   Then The "Home |" text should display
