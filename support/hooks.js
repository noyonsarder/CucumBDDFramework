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

    console.log('Browser, context, and pomanager initialized in Before hook.');
});

After(async function () {
    console.log("Closing browser in After hook.");
    if (this.browser) {
        await this.browser.close();
    }
});
