@smoke @monkey-reset
Feature: Forgot Password
    
    Scenario: Submit the forgot password form with empty data
        Given I navigate to the test site
        And I click on the "Forgot password" link
        Then The "Enter New Password" text should display
        And I click on "Save New Password" button
        Then The following text should display
            | email           | Email is required             |
            | password        | *Password is required         |
            | confirmPassword | *Confirm Password is required |
        When I click on the "Login" link
        Then The "Log in" text should display
        When I click  browser back
        Then The "Enter New Password" text should display
        When I click on the "Register" link
        Then The "Register" text should display
