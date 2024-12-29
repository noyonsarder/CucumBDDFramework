const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const locators = require('../locators/basicNavigation.json');


When('I clcik on the delete button', async function(){
    const element = locators.deleteButton;
    await this.page.locator(element).click();
})