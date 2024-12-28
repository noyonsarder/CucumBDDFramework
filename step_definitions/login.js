const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const locators = require('../locators/login.json');

Given('I navigate to the test site', async function () {

  await this.page.goto('https://rahulshettyacademy.com/client', { waitUntil: 'load' });
});

When('I fill up the {string} and {string}', async function (userName, userPassword) {
  await this.page.locator(locators.email).fill(userName);
  await this.page.locator(locators.password).fill(userPassword);
});

When('I click the login button', async function () {
  await this.page.locator(locators.loginButton).waitFor();
  await this.page.locator(locators.loginButton).click();

});

Then('the {string} should display', async function (text) {
  if(text==='Incorrect email or password'){
    expect(await this.page.locator(locators.errorMessage).textContent()).toContain(text);
  }
  if(text==='Automation'){
    expect(await this.page.locator(locators.dashboardPage).textContent()).toContain(text);
    await this.page.waitForTimeout(2000);
  }
});
