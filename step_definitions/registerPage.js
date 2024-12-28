const locators = require('../locators/register.json');
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I click to the Register link', async function () {

    await this.page.locator(locators.registerLink).click();
});

When('I click on the Register button', async function () {
    await this.page.locator(locators.registerBtn).click();
});

Then('the following text are displayed',  async function (table) {
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

When('I fill the following required field', async function (table) {
    const values = table.rowsHash();
    if (values.firstName) {
        await this.page.locator(locators.firstName).fill(values.firstName);
    }
    if (values.lastName) {
        await this.page.locator(locators.lastName).fill(values.lastName);
    }
    if (values.email) {
        await this.page.locator(locators.email).fill(values.email);
    }
    if (values.phoneNumber) {
        await this.page.locator(locators.phoneNumber).fill(values.phoneNumber);
    }
    if (values.password) {
        await this.page.locator(locators.password).fill(values.password);
    }
    if (values.confirmPassword) {
        await this.page.locator(locators.confirmPassword).fill(values.confirmPassword);
    }
    if (values.ageConfirmation) {
        await this.page.locator(locators.ageConfirmation).check();
    }
});

Then('the {string} text should display on confirmation page', async function(text){
    const confirmation= await this.page.locator(locators.accountConfirmation);
    const confirmationMsg= await confirmation.textContent();
    console.log(`This is confirmation message:${confirmationMsg}`);
    expect(confirmationMsg).toContain(text);

})