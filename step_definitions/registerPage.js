const locators = require('../locators/register.json');
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I click to the Register link', { timeout: 100 * 1000 },async function () {

    await this.page.locator(locators.registerLink).click();
});

When('I click on the Register button',{ timeout: 100 * 1000 }, async function () {
    await this.page.locator(locators.registerBtn).click();
    await this.page.waitForTimeout(5000);
});

Then('the following text are displayed', { timeout: 100 * 1000 },async function (table) {
    const values = table.rowsHash();
    if (values.firstName) {
        const errMsgLocator = this.page.locator(`//div[contains(text(), 'First Name is required')]`);
        const actualErrorMessage = await errMsgLocator.textContent();
        expect(actualErrorMessage).toContain(values.firstName);
    }
    if (values.email) {
        const errMsgLocator = this.page.locator(`//div[contains(text(), 'Email is required')]`);
        const actualErrorMessage = await errMsgLocator.textContent();
        console.log(actualErrorMessage);
        expect(actualErrorMessage).toContain(values.email);
    }
    if (values.phoneNumber) {
        const errMsgLocator = this.page.locator(`//div[contains(text(), 'Phone Number is required')]`);
        const actualErrorMessage = await errMsgLocator.textContent();
        console.log(actualErrorMessage);
        expect(actualErrorMessage).toContain(values.phoneNumber);
    }
    if (values.password) {
        const errMsgLocator = this.page.locator(`//div[text()='*Password is required']`);
        const actualErrorMessage = await errMsgLocator.textContent();
        console.log(actualErrorMessage);
        expect(actualErrorMessage).toContain(values.password);
    }
    if (values.confirmPassword) {
        const errMsgLocator = this.page.locator(`//div[text()='Confirm Password is required']`);
        const actualErrorMessage = await errMsgLocator.textContent();
        console.log(actualErrorMessage);
        expect(actualErrorMessage).toContain(values.confirmPassword);
    }
    if (values.ageConfirmation) {
        const errMsgLocator = this.page.locator(`//div[contains(text(), 'Please check above checkbox')]`);
        const actualErrorMessage = await errMsgLocator.textContent();
        console.log(actualErrorMessage);
        expect(actualErrorMessage).toContain(values.ageConfirmation);
    }
});