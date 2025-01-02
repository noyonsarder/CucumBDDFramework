
const { test, expect, request } = require('@playwright/test');
let token = null;
let orderId = null;
let productfound = false;

test("Search a Product and Add to the Cart:", async ({ page }) => {
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page.locator(`//p[text()='Automation Practice']`)).toHaveText('Automation Practice');;
    await page.waitForSelector(`//div[@class='card']`);
    const allProducts = page.locator(`//div[@class='card']`);
    const productCount = await allProducts.count();
    let productName = `ADIDAS ORIGINAL`;
    let productAdded = false;

    for (let i = 0; i < productCount; i++) {
        const product = allProducts.nth(i);
        const productText = await product.textContent();

        if (productText.includes(productName)) {
            const addToCartButton = product.locator(`button:has-text("Add To Cart")`);
            await addToCartButton.click();
            productAdded = true;
            break;
        }
    }
    if (!productAdded) {
        throw new Error(`Product "${productName}" not found in the list.`);
    }
    await page.locator(`//button[@routerlink='/dashboard/cart']`).click();
    await page.waitForLoadState('networkidle');
});

test("Search Product from my order and Navigate to details of the product:", async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(`//button[@routerlink='/dashboard/myorders']`).click();
    await page.waitForLoadState('load');
    await page.waitForSelector(`//table[contains(@class,'table')]`);
    const viewButton = await page.locator(`//table[contains(@class,'table')]//tbody/tr/td//button[text()='View']`);
    const allTableId = await page.locator(`//table[contains(@class,'table')]//tbody/tr/th`).all();
    let i = 0;
    for (const table of allTableId) {

        const parseString = await table.textContent();
        if (parseString.includes(orderId)) {
            console.log(`Print the order for if block:${orderId}`);
            await viewButton.nth(i).click();
            productfound = true;
            break;
        }
        i++;
    }
    expect(productfound).toBeTruthy();
    await page.waitForLoadState('load');
})

test.beforeEach("Hook Data setup:", async () => {

    const apiContext = await request.newContext();
    /* Create a Request Token */

    const storeData = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {

        data: {
            "userEmail": "sumon4@yopmail.com",
            "userPassword": "Tim1234@"
        }
    })

    const parseJSobject = await storeData.json();
    token = parseJSobject.token;


    /* Data processing for place order */
    const PlaceOrder = await apiContext.post(`https://rahulshettyacademy.com/api/ecom/order/create-order`, {
        data: {
            "orders": [
                {
                    "country": "Indonesia",
                    "productOrderedId": "6581ca979fd99c85e8ee7faf"
                }
            ]
        },
        headers: {
            "authorization": token,
            "content-type": "application/json"

        }
    })
    const parsePlaceOrder = await PlaceOrder.json();
    orderId = parsePlaceOrder.orders[0];
});

