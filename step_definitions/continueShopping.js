const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const locators = require('../locators/forgotPassword.json');

When('I click on the {string} button', async function (button) {
    const element =locators.genericButton.replace('{txt}',button);
    await this.page.locator(element).click();
    await this.page.waitForSelector(`(//p[contains(text(),Home)])[3]`);
});