class DashboardPage {

    constructor(page) {

        this.page = page;
        this.allProducts = page.locator(`//div[@class='card']`);
        this.cart = page.locator(`//button[@routerlink='/dashboard/cart']`);
        this.addToCarts = page.locator(`//button[contains(text(), 'Add To Cart')]`);
        this.ordernavigation= page.locator(`//button[@routerlink='/dashboard/myorders']`);

    }

    async addToCart(productName) {

        await this.allProducts.first().waitFor({ state: 'visible' });
        const allProductstore = await this.allProducts.all();

        for (const product of allProductstore) {
            const productText = await product.textContent();

            if (await productText.includes(productName)) {
                const addTocartButton = await product.locator(`//button[contains(text(), 'Add To Cart')]`);
                await addTocartButton.click();
                await this.page.waitForLoadState('networkidle');
                break;
            }
        }

    }

    async navigateToCart() {

        await this.cart.click();
        await this.page.waitForLoadState('networkidle');
    }

    async navigateToOrderPage(){

        await this.ordernavigation.click();
        await this.page.waitForLoadState('load');
    }
}

module.exports = { DashboardPage };