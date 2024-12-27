const locators = require('../locators/search.json');
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');


When('I typed {string} in the search box and hit enter', async function (productName) {
    await this.page.locator(locators.searchProduct).fill(productName);
    await this.page.locator(locators.searchProduct).press('Enter');
});

Then('the {string} text should display after search', async function (text) {
    const rawText = await this.page.locator(`//div[contains(text(),'Showing 1 results')]`).textContent();
    const trimmedText = rawText.replace(/\s*\|\s*$/, '').trim(); // Normalize whitespace and trim
    expect(trimmedText).toContain(text);
});

Then('the product name is showing {string}', async function (productName) {
    const element = await this.page.locator(locators.afterSearch).textContent();
    expect(element).toContain(productName);
});