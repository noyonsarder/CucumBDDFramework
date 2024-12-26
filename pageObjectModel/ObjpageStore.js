const { DashboardPage } = require('./DashboardPage');
const { LoginPage } = require('./LoginPage');
const { CartDetail } = require('./CartDetail');
const { OrderPage } = require('./OrderPage');
const {OrderhistoryPages} =require('./OrderhistoryPages');
class ObjpageStore {

    constructor(page) {
        this.page = page;
        this.LoginPage = new LoginPage(this.page);
        this.DashboardPage = new DashboardPage(this.page);
        this.CartDetail = new CartDetail(this.page);
        this.OrderPage = new OrderPage(this.page);
        this.OrderhistoryPages= new OrderhistoryPages(this.page);
    }

    getLoginPage() {

        return this.LoginPage;
    }
    getDashBoardPage() {
        return this.DashboardPage;
    }
    getCartDetail() {
        return this.CartDetail;

    }
    getOrderPage() {
        return this.OrderPage;
    }

    getOrderHistoryPage(){

        return this.OrderhistoryPages;
    }
}

module.exports = { ObjpageStore };