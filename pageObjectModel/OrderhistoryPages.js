const { expect } = require("@playwright/test");
class OrderhistoryPages {

    constructor(page) {


        this.page = page;
        this.tableOrder = page.locator(`//table[contains(@class,'table')]//tbody/tr/th`);
        this.viewButton = page.locator(`//table[contains(@class,'table')]//tbody/tr/td//button[text()='View']`);

    }

    async searchOrderAndSelect(orderId) {
        let productfound = false;
        await this.page.waitForSelector(`//table[contains(@class,'table')]`);

        const allTableId = await this.tableOrder.all();
        let i=0;
        for (const table of allTableId) {

            const parseString = await table.textContent();
            if (parseString.includes(orderId)) {
                await this.viewButton.nth(i).click();
                productfound = true;
                break;
            }
            i++;
        }
         expect(productfound).toBeTruthy();
        await this.page.waitForLoadState('load');
    }
}

module.exports = { OrderhistoryPages }