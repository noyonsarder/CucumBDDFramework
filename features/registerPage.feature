@register
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
