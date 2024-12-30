const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const locators = require('../locators/forgotPassword.json');

When('I click on {string} button', async function (button) {
    const element = locators.saveNewPwdbtn;
    await this.page.locator(element).click();
});

Then('The following text should display', async function (table) {
    const values = table.rowsHash();
    
    if (values.email) {
        const element = locators.genericText.replace('{txt}',values.email);
        const elementText = await this.page.locator(element).textContent();
        console.log(`I'm checking the branch revert testing:${elementText}`);
        expect(elementText).toContain(values.email);

    } if (values.password) {
        const element = locators.genenircExactText.replace('{txt}',values.password);
        const elementText = await this.page.locator(element).textContent();
        expect(elementText).toContain(values.password);

    } if (values.confirmPassword) {
        const element = locators.genenircExactText.replace('{txt}',values.confirmPassword);
        const elementText = await this.page.locator(element).textContent();
        expect(elementText).toContain(values.confirmPassword);
    }

});

When('I click on the {string} link', async function (link) {
    let element = locators.genericLink.replace('{txt}', link);
    switch (link) {
        case 'Login':
            await this.page.locator(element).click();
            break;
        case 'Register':
            await this.page.locator(element).click();
            break;
        case 'Forgot password':
            await this.page.locator(element).click();
            break;
        default:
            throw new Error(`We couldn't find any element: ${link}`);
    }

})

When('I click  browser back', async function () {
    await this.page.goBack();

})