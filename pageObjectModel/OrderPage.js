class OrderPage {


    constructor(page) {
        this.page = page;
        this.cardName = page.locator(`//div[@class='field'][div[contains(text(), 'Name')]]/input`);
        this.userCountry = page.locator(`//input[contains(@placeholder,'Country')]`);
        this.placeOrderbtn = page.locator(`//a[contains(text(),'Place Order')]`);
        this.orderid= page.locator(`//label[@class='ng-star-inserted']`);


    }

    async searchCountryAndSelect(types) {

        await this.userCountry.type(types);
        await this.page.waitForSelector(`//section[contains(@class, 'group')]//button`);
        const allCountry = await this.page.locator(`//section[contains(@class, 'group')]//button`).all();


        for (const country of allCountry) {
            const countryText = await country.textContent();
            if (countryText.includes(types)) {
                await country.click();
                break;
            }
        }
    }

    async placeOrder() {

        await this.placeOrderbtn.click();
        await this.page.waitForLoadState('networkidle');

    }

    async getPlaceOrderID(){
        const placeOrderId= await this.orderid.textContent();
        const cleanedOrderID = placeOrderId.replace(/\|/g, '').trim();
        return cleanedOrderID;
    }
}
module.exports = { OrderPage };