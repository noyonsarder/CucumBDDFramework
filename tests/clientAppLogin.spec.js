const { test, expect } = require('@playwright/test');
const { ObjpageStore } = require('../pageObjectModel/ObjpageStore');
const testData = require('../Utils/placeOrderTestData.json');
// const parsejsObject = JSON.parse(JSON.stringify(testData));


// JSON >> Convert It to String >> Convert to JScript Object
for (const data of testData){
test(`This is a sample test case based on user role: ${data.userName}`, async ({ page }) => {
    test.setTimeout(60000);
    const pomanager = new ObjpageStore(page);
    const product = `ADIDAS ORIGINAL`;
    const login = pomanager.getLoginPage();
    await login.navigateLoginPage();
    await login.validLogin(data.userName, data.passWord);
    await page.waitForTimeout(3000);
    await expect(page.url()).toContain('/dashboard');
    const dashBoard = pomanager.getDashBoardPage();
    await dashBoard.addToCart(`ADIDAS ORIGINAL`);
    await dashBoard.navigateToCart();
    const cart = pomanager.getCartDetail();
    await cart.verifyProductIsDisplayed(product);
    await cart.checkoutProduct();
    const order = pomanager.getOrderPage();
    await order.searchCountryAndSelect('Ban');
    await order.placeOrder();
    const testOrderID = await order.getPlaceOrderID();
    await dashBoard.navigateToOrderPage();
    const historyPage = pomanager.getOrderHistoryPage();
    historyPage.searchOrderAndSelect(testOrderID);
    await page.waitForTimeout(5000);
});
}