Feature: Product Search
    @product
    Scenario: Verify the product count after performing a product search
        Given I navigate to the test site
        When I fill up the "sumon4@yopmail.com" and "Tim1234@"
        And I click the login button
        And I typed "ADIDAS ORIGINAL" in the search box and hit enter
        Then the "Showing 1 results" text should display after search
        And the product name is showing "ADIDAS ORIGINAL"
