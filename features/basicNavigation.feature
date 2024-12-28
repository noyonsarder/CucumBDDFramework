@basic
Feature: Basic Navigation

    Scenario: Basic Header Navigation of the site
        Given I navigate to the test site
        When I fill up the "sumon4@yopmail.com" and "Tim1234@"
        And I click the login button
        Then the "Automation" should display
        When I click orders button
        Then The "Your Orders" text should display
        When I click Cart button
        Then The "My Cart" text should display
        When I clcik logout button
        Then The "Why People Choose Us?" text should display
