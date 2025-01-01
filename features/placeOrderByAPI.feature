@mute
Feature: ByPass login

    Scenario: Using API ByPass login and add an product to the cart
        Given I login to the system by POST API call
        When I bypass login for user by setting token in the localStorage
        And I click add to cart button for the product "ADIDAS ORIGINAL"
        And I click Cart button
        Then Product should display in the my cart list "ADIDAS ORIGINAL"
