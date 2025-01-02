const { test, expect } = require('@playwright/test');
let newWebContext;
test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client", { waitUntil: "load" });
    await page.waitForLoadState('networkidle');

    await page.locator(`//input[@id='userEmail']`).fill(`sumon4@yopmail.com`);
    await page.locator(`//input[@id='userPassword']`).fill(`Tim1234@`);
    await page.locator(`//input[@value='Login']`).click();

    await page.waitForSelector(`//p[text()='Automation Practice']`);

    await context.storageState({ path: `state.json` });
    newWebContext = await browser.newContext({ storageState: `state.json` });


})


test("ByPass the login by setting the strorageState in new context", async () => {
    const page = await newWebContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client", { waitUntil: "load" });
    await page.pause();


});
