const { Given, When, Then } = require('@cucumber/cucumber');
const { request, expect, chromium } = require('@playwright/test');
const testData = require('../apiUtils/testData.json');
let apiResponse;

When('I login to the system by POST API call', async function () {
        this.testData = testData;

        // Create an API request context
        const apiContext = await request.newContext();

        // Login via API
        apiResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: this.testData,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseBody = await apiResponse.json();
        if (!apiResponse.ok()) {
            throw new Error(`Login failed! Status: ${apiResponse.status()}, Response: ${JSON.stringify(responseBody)}`);
        }

        // Store the token and userId for future requests
        this.authToken = responseBody.token;
        this.userId = responseBody.userId;

        const browser = await chromium.launch({headless:true});
        const context = await browser.newContext();
        
        this.newBrowserContext = context;

        // Optionally, open a new page for UI actions
        const page = await this.newBrowserContext.newPage();
        this.page = page;
});

When('I bypass login for user by setting token in the localStorage', async function () {
        
        await this.page.goto('https://rahulshettyacademy.com/client', { waitUntil: 'domcontentloaded' });

        // Set the authentication token in localStorage
        await this.page.evaluate((args) => {
            const authToken = args[0]; // Access the first argument
            localStorage.setItem('token', authToken);
        }, [this.authToken]);

        await this.page.reload({ waitUntil: 'load' });

        // Verify if the page loaded correctly
        const currentURL = this.page.url();
        await expect(currentURL).toContain('dashboard');
    });

    When('I click add to cart button for the product {string}', async function (productName) {
            const productLocator = this.page.locator(`//b[text()='${productName}']`);
            const productCard = this.page.locator('//div[contains(@class, "card")]').filter({
                has: productLocator,
            });
            await productCard.locator('button:has-text("Add To Cart")').click();
    });
    
    Then('Product should display in the my cart list {string}', async function (productName) {
       const productLocator = this.page.locator(`h3:has-text('${productName}')`);
       await productLocator.waitFor();
       const isVisible = await productLocator.isVisible();
       await expect(isVisible).toBeTruthy();
    })