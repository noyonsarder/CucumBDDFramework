Feature: Place Order

    Scenario: Place Order from checkout page
        Given Login to ecommerce site with "sumon4@yopmail.com" and "Tim1234@"
        When I click add to cart for the product "ADIDAS ORIGINAL"
        And I click on the checkout button with "ADIDAS ORIGINAL"
        And I fill the ship countrty for "Ban"
        Then I verified the order number
