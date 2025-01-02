const { test, expect, request } = require('@playwright/test');
const { PlaceOrderAPIs } = require('../apiUtils/PlaceOrderAPIs');
const { stringify } = require('querystring');
let productfound = false;

let loginDetails = {
    "userEmail": "sumon4@yopmail.com",
    "userPassword": "Tim1234@"
};
let orderDetails = {
    "orders": [
        {
            "country": "Indonesia",
            "productOrderedId": "6581ca979fd99c85e8ee7faf"
        }
    ]
};
let response = null;
let loginToken = null;

test.beforeEach("Hook Setup:", async () => {

    const apiContext = await request.newContext();
    const PlaceOrderAPI = new PlaceOrderAPIs(apiContext);
    loginToken =await PlaceOrderAPI.getToken(loginDetails);
    response = await PlaceOrderAPI.placeOrderID(orderDetails, loginDetails); // Pass loginDetails // loginDetails
});


test("Search a Product and Navigate to Details of the Product:", async ({ page }) => {
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, loginToken);

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(`//button[@routerlink='/dashboard/myorders']`).click();
    await page.waitForLoadState('load');
    await page.waitForSelector(`//table[contains(@class,'table')]`);
    const viewButton = await page.locator(`//table[contains(@class,'table')]//tbody/tr/td//button[text()='View']`);
    const allTableId = await page.locator(`//table[contains(@class,'table')]//tbody/tr/th`).all();
    let i = 0;
    for (const table of allTableId) {

        const parseString = await table.textContent();
        if (parseString.includes(response.orderId)) {
            await viewButton.nth(i).click();
            await page.pause();
            productfound = true;
            break;
        }
        i++;
    }
    expect(productfound).toBeTruthy();
    await page.waitForLoadState('load');
})

test("ByPass login by setting the localstorage for testing purpose:", async ({ page }) => {

    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, loginToken);
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.waitForLoadState('load');
    await expect(page.locator(`//p[text()='Automation Practice']`)).toHaveText('Automation Practice');
})
