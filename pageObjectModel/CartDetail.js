const { expect } = require("@playwright/test");

class CartDetail {


    constructor(page) {
        this.page = page;
        this.allCartItems = page.locator(`//div[@class='cart']/ul/li`);
        this.checkOutbtn = page.locator(`//button[text()='Checkout']`);

    }

    async verifyProductIsDisplayed(productName) {
        let productFound = false;
        await this.allCartItems.first().waitFor({ state: 'visible' });
        const allProducts = await this.allCartItems.all();
        for (const product of allProducts) {
            const productText = await product.textContent();
            if (productText.includes(productName)) {
                productFound =true;
               break;
            }

        }
        expect(productFound).toBeTruthy();
    }

    async checkoutProduct() {

        await this.checkOutbtn.click();
        await this.page.waitForLoadState('load');

    }

}

module.exports = { CartDetail };