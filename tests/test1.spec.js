const testData = require('@playwright/test');
const { expect, chromium } = require('@playwright/test');
const {customTest} =require(`../Utils/fixtureTesting`);

customTest("This is a test project", async ({loginDetails}) => {

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client", {waitUntil:'load'});
    await page.locator(`//input[@id='userEmail']`).fill(loginDetails.userName);
    await page.locator(`//input[@id='userPassword']`).fill(loginDetails.passWord);
    await page.locator(`//input[@value='Login']`).click();
    await page.waitForLoadState('load');
    await expect(page.locator(`//p[text()='Automation Practice']`)).toHaveText('Automation Practice');
}

);