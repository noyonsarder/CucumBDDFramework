const { Given, When, Then } = require('@cucumber/cucumber');
const { ObjpageStore } = require('../pageObjectModel/ObjpageStore');
const playwright = require('@playwright/test');
const { expect } = require('@playwright/test')

Given('Login to ecommerce site with {string} and {string}', async function (userName, password) {

  const login = this.pomanager.getLoginPage();
  await login.navigateLoginPage();
  await login.validLogin(userName, password);
});

When('I click add to cart for the product {string}', async function (productName) {
  await expect(this.page.locator(`//p[text()='Automation Practice']`)).toHaveText('Automation Practice');
  this.dashBoard = this.pomanager.getDashBoardPage();
  await this.dashBoard.addToCart(productName);
  await this.dashBoard.navigateToCart();

});

When('I click on the checkout button with {string}', async function (productName) {

  const cart = this.pomanager.getCartDetail();
  await cart.verifyProductIsDisplayed(productName);
  await cart.checkoutProduct();

});

When('I fill the ship countrty for {string}', async function (countryName) {
   this.order = this.pomanager.getOrderPage();
  await this.order.searchCountryAndSelect(countryName);
  await this.order.placeOrder();
})

Then ('I verified the order number', async function(){
  expect(await this.page.locator(`//h1[contains(text(), 'Thankyou for the order')]`).textContent()).toContain(`Thankyou for the order`);

});