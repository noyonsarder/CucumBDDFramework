# CucumBDDFramework
Cucumber is a Behavior-Driven Development (BDD) framework that allows you to write test scenarios in plain English using Gherkin syntax. This makes it easier for non-technical stakeholders (e.g., business analysts, QA, and developers) to collaborate on defining application behavior.

**Key Features:**
**Gherkin Syntax**: Scenarios are written in a simple "Given-When-Then" format.

```
Given: Sets up initial context.
When: Describes the action to perform.
Then: Verifies the expected outcome.
```

**Integration with JavaScript**:
Typically used with Node.js.

Implements step definitions using JavaScript, which define the actual behavior behind Gherkin steps.

**Test Automation**: Works with testing tools like Selenium, Puppeteer, or Playwright for browser automation.

**Readable Tests**: Makes test cases human-readable, bridging the gap between technical and non-technical team members.

**Workflow**:
Write Feature Files: Written in .feature files using Gherkin syntax.

**gherkin**
```
Feature: Login functionality
  Scenario: Successful login
    Given the user is on the login page
    When the user enters valid credentials
    Then the user is redirected to the dashboard
```
    
**Define Step Definitions**: Implement the behavior for each Gherkin step in JavaScript.
```
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// Assuming the Playwright `page` object is passed through a custom world object in Cucumber.
Given('the user is on the login page', async function () {
  await this.page.goto('https://example.com/login');
});

When('the user enters valid credentials', async function () {
  await this.page.fill('#username', 'validUser'); 
  await this.page.fill('#password', 'validPassword'); 
  await this.page.click('#loginButton'); 
});

Then('the user is redirected to the dashboard', async function () {
  await this.page.waitForURL('https://example.com/dashboard');
  expect(this.page.url()).toBe('https://example.com/dashboard');
});
```

```
**Advantages**:
Collaboration: Improves communication between business and technical teams.
Clarity: Plain English scenarios ensure clarity of requirements.
Reusability: Step definitions can be reused across scenarios.
```

**Prerequisites**:

**Install Dependencies**:

npm install @cucumber/cucumber @playwright/test

**Set Up a Custom World**: 
Configure a custom Cucumber world to initialize and manage the Playwright browser and page objects for each scenario.

**Run the Test**: Use the Cucumber CLI to execute the .feature file and step definitions:

**npx cucumber-js**

**Test Result:**


![Screenshot (16)](https://github.com/user-attachments/assets/27c7f9b8-7c33-417c-9ec1-4dc9dab56f7e)
