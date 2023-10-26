import { test, expect } from '@playwright/test';
const { signUp } = require('./playwright-helpers/signup-helpers.js');
const { purchaseItem } = require('./playwright-helpers/purshase-item-helpers.js');

test.describe('Test Cases of Add to Cart Items. Remove Items and Purchase Items', () => {

    let page;

    const randomUsername = Math.random().toString(36).substring(2,7);
    console.log(randomUsername);
    const randomPassword = Math.random().toString(36).substring(2,7);
    console.log(randomPassword);

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        const userSignUp = new signUp(page);
        await userSignUp.gotoSite();
        await userSignUp.signUpNewUser(randomUsername, randomPassword);
        await userSignUp.login(randomUsername,randomPassword);
    });

    test('Verify user can add single item to the cart', async () => {
        const userPurchaseItem = new purchaseItem(page);
        await userPurchaseItem.addFirstProductToCart();
        await userPurchaseItem.gotoCart();
        const totalAmountText = await userPurchaseItem.totalAmount.textContent();
        console.log('Single Item Amount = ' + totalAmountText);
        await expect(userPurchaseItem.totalAmount).toHaveText(totalAmountText);
    });

    test('Verify use can add multiple items to the cart', async () => {
        const userPurchaseItem = new purchaseItem(page);
        await userPurchaseItem.addMultipleProductsToCart();
        await userPurchaseItem.gotoCart();
        const totalAmountText = await userPurchaseItem.totalAmount.textContent();
        console.log('Total Amount of Multiple Items = ' + totalAmountText);
        await expect(userPurchaseItem.totalAmount).toHaveText(totalAmountText);
    });

    test('Verify user can delete product from the cart', async () => {
        const userPurchaseItem = new purchaseItem(page);
        await userPurchaseItem.addMultipleProductsToCart();   
        await userPurchaseItem.gotoCart();
        const totalAmountText = await userPurchaseItem.totalAmount.textContent();
        console.log('Total Amount Before Delete = ' + totalAmountText);
        await expect(userPurchaseItem.totalAmount).toHaveText(totalAmountText);
        await userPurchaseItem.deleteProductFromtheCart();
        await userPurchaseItem.goToHomePage.click();
        await userPurchaseItem.gotoCart();
        const totalAmountTextAfterDelete = await userPurchaseItem.totalAmount.textContent();
        console.log('Total Amount After Delete = ' + totalAmountTextAfterDelete);
        await expect(userPurchaseItem.totalAmount).toHaveText(totalAmountTextAfterDelete);
    });

    test.only('Verify user can add multiple items to the cart and place order', async () => {
        const userPurchaseItem = new purchaseItem(page);
        await userPurchaseItem.addMultipleProductsToCart();   
        await userPurchaseItem.gotoCart();
        const totalAmountText = await userPurchaseItem.totalAmount.textContent();
        console.log('Total Amount of Items Purchased = ' + totalAmountText);
        await expect(userPurchaseItem.totalAmount).toHaveText(totalAmountText);
        await userPurchaseItem.placeOrder();
        await expect(userPurchaseItem.placeOrderFormSuccessfullyPurchasedPopup).toHaveText('Thank you for your purchase!');
    });
});