const userData = require('../../constants.js');
const { expect } = require('@playwright/test');
exports.purchaseItem = class purchaseItem {
    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        // Locators
        this.page = page;
        this.selectFirstItem = page.locator('.card > a');
        this.clickAddToCartBtn = page.getByRole('link', { name: 'Add to cart' });
        this.clickCartMenu = page.getByRole('link', { name: 'Cart', exact: true });
        this.totalAmount = page.locator('#totalp');
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
}
