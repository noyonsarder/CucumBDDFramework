const { Before, After,setDefaultTimeout } = require('@cucumber/cucumber');
const { ObjpageStore } = require('../pageObjectModel/ObjpageStore');
const playwright = require('@playwright/test');
setDefaultTimeout(60 * 1000);


Before(async function () {
    // Launch browser and set context/page globally in the Cucumber world
    this.browser = await playwright.chromium.launch({ headless: true });
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
