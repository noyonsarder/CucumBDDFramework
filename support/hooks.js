const { Before, After } = require('@cucumber/cucumber');
const { ObjpageStore } = require('../pageObjectModel/ObjpageStore');
const playwright = require('@playwright/test');

Before(async function () {
    // Launch browser and set context/page globally in the Cucumber world
    this.browser = await playwright.chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    // Initialize the Page Object Manager
    this.pomanager = new ObjpageStore(this.page);
});

After(async function () {
    await this.page.close();
    await this.context.close();
    await this.browser.close();
});
