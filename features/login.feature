Feature: Login Test
   @case
   Scenario Outline: Login Functionality Check for Invalid and Valid Login
   Given I navigate to the test site
   When I fill up the "<userEmail>" and "<userPassword>"
   And I click the login button
   Then the "<text>" should display

   Examples:
   |userEmail|userPassword|text|
   |sumon19@yopmail.com|Tim1234@|Incorrect email or password|
   # |sumon5@yopmail.com|Tim1234@|Automation|
