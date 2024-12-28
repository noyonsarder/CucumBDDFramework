const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const locators = require('../locators/basicNavigation.json');

When('I click orders button', { timeout: 100 * 1000 }, async function () {
    await this.page.locator(locators.orders).click();
    await this.page.pause();
});

When('I click Cart button', { timeout: 100 * 1000 }, async function () {
    await this.page.locator(locators.cart).click();
});

When('I clcik logout button',{ timeout: 100 * 1000 }, async function () {
    await this.page.locator(locators.logout).click();
});

Then('The {string} text should display', { timeout: 100 * 1000 },async function (text) {
    let element;
    switch (text) {
        case 'Your Orders':
            element = locators.genericText.replaceAll('{txt}',text);
            break;
        case 'My Cart':
            element = locators.genericText.replaceAll('{txt}',text);
            break;
        case 'Why People Choose Us?':
            element = locators.genericText.replaceAll('{txt}',text);
            break;
        default:
            throw new error(`We couldn't find any element: ${text}`);
    }
    const elementText = await this.page.locator(element).textContent();
    expect(elementText).toContain(text);

})