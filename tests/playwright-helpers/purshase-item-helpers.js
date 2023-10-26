const userData = require('../playwright-constants/constants.js');
const { expect } = require('@playwright/test');
const csvData = require('fs').readFileSync('D:/10P Trainings/Playwright-hammad/tests/playwright-csv-files/userData.csv', 'utf-8');
//add path to playwright folder
const rows = csvData.split('\n').slice(1); // Skip header row

exports.purchaseItem = class purchaseItem {
    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.page = page;
        this.selectFirstItem = page.locator('.card > a');
        this.clickAddToCartBtn = page.getByRole('link', { name: 'Add to cart' });
        this.clickCartMenu = page.getByRole('link', { name: 'Cart', exact: true });
        this.totalAmount = page.locator('#totalp');
        this.clickPlaceOrderBtn = page.getByRole('button', { name: 'Place Order' });
        this.placeOrderFormName = page.locator('#name');
        this.placeOrderFormCountry = page.getByLabel('Country:');
        this.placeOrderFormCity = page.getByLabel('City:');
        this.placeOrderFormCreditCard = page.getByLabel('Credit card:');
        this.placeOrderFormMonth = page.getByLabel('Month:');
        this.placeOrderFormYear = page.getByLabel('Year:');
        this.placeOrderFormPurchaseBtn = page.getByRole('button', { name: 'Purchase' });
        this.placeOrderFormSuccessfullyPurchasedPopup = page.getByText('Thank you for your purchase!');
        this.placeOrderPopupOkBtn = page.getByRole('button', { name: 'OK' });
        this.selectSecondItem = page.locator('div:nth-child(2) > .card > a');
        this.goToHomePage = page.getByRole('link', { name: 'Home (current)' });
        this.selectThirdItem = page.locator('div:nth-child(5) > .card > a');
        this.deleteItemFromCart = page.locator('//*[@id="tbodyid"]/tr[1]/td[4]/a');
        //use stable assertions
    }

    async addFirstProductToCart() {
        await this.selectFirstItem.first().click();
        await this.clickAddToCartBtn.click();
        await this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
        });
    }

    async gotoCart(){
        await this.clickCartMenu.click();
        await this.totalAmount.waitFor(30000); //use wait functions
    }

    async addMultipleProductsToCart(){
        await this.goToHomePage.click();
        await this.selectFirstItem.first().click();
        await this.clickAddToCartBtn.click();
        await this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
        });
        await this.goToHomePage.click();
        await this.selectSecondItem.click();
        await this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
          });
        await this.clickAddToCartBtn.click();
        await this.goToHomePage.click();
        await this.selectThirdItem.click()
        await this.clickAddToCartBtn.click();
        await this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
        }); 

    }

    async deleteProductFromtheCart(){
        await this.deleteItemFromCart.click();
    }

    //** Method for reading data from CSV file **//
    //-------------------------------------------//

    async placeOrder(){
        for (const row of rows)
        {
            const [fullname, country, city, creditcard, month, year] = row.split(',');
            await this.clickPlaceOrderBtn.click();
            await this.placeOrderFormName.fill('fullname', fullname);
            await this.placeOrderFormCountry.fill('country', country);
            await this.placeOrderFormCity.fill('city', city);
            await this.placeOrderFormCreditCard.fill('creditcard', creditcard);
            await this.placeOrderFormMonth.fill('monthe', month);
            await this.placeOrderFormYear.fill('year', year);
            await this.placeOrderFormPurchaseBtn.click();
            await this.placeOrderPopupOkBtn.click();
        }
    }

    //** Method for reading data from Constants file **//
    //-------------------------------------------------//

    // async placeOrder(){
    //     await this.clickPlaceOrderBtn.click();
    //     await this.placeOrderFormName.fill(userData.user.fullname);
    //     await this.placeOrderFormCountry.fill(userData.user.country);
    //     await this.placeOrderFormCity.fill(userData.user.city);
    //     await this.placeOrderFormCreditCard.fill(userData.user.creditcard);
    //     await this.placeOrderFormMonth.fill(userData.user.month);
    //     await this.placeOrderFormYear.fill(userData.user.year);
    //     await this.placeOrderFormPurchaseBtn.click();
    //     await this.placeOrderPopupOkBtn.click();
    // }
}
