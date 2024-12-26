const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const locators = require('../locators/login.json');

Given('I navigate to the test site', { timeout: 100 * 1000 }, async function () {

  await this.page.goto('https://rahulshettyacademy.com/client', { waitUntil: 'load' });
});

When('I fill up the {string} and {string}', { timeout: 100 * 1000 }, async function (userName, userPassword) {
  await this.page.locator(locators.email).fill(userName);
  await this.page.locator(locators.password).fill(userPassword);
});

When('I click the login button', { timeout: 100 * 1000 }, async function () {
  await this.page.locator(locators.loginButton).waitFor();
  await this.page.locator(locators.loginButton).click();

});

Then('the {string} should display', { timeout: 100 * 1000 }, async function (text) {
  console.log(`Print the text message:${text}`);
  expect(await this.page.locator(locators.errorMessage)).toContain(text);

}

)