Feature: Register Page
    Scenario: Submit the registration form without providing any input
        Given I navigate to the test site
        When I click to the Register link
        And I click on the Register button
        Then the following text are displayed
            | firstName       | First Name is required       |
            | email           | Email is required            |
            | phoneNumber     | Phone Number is required     |
            | password        | Password is required         |
            | confirmPassword | Confirm Password is required |
            | ageConfirmation | Please check above checkbox  |
 
    Scenario: Submit the registration form with required field
        Given I navigate to the test site
        When I click to the Register link
        And I fill the following required field
            | firstName       | lamiya               |
            | lastName        | Soniya               |
            | email           | lamiya+2@yopmail.com |
            | phoneNumber     | 9101735448           |
            | password        | Tim1234@             |
            | confirmPassword | Tim1234@             |
            | ageConfirmation | check                |
        And I click on the Register button
        Then the "Account Created Successfully" text should display on confirmation page
