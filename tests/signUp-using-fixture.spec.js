import { test, expect } from './Fixtures/customFixtures.js';
//const { signUp } = require('./playwright-helpers/signup-helpers.js');


test.describe('Demo Sign Up Test', () => {
    
    let page;

    // const randomUsername = Math.random().toString(36).substring(2,7);
    // console.log(randomUsername);
    // const randomPassword = Math.random().toString(36).substring(2,7);
    // console.log(randomPassword);

    // test.beforeAll(async ({ browser }) => {
    //     page = await browser.newPage();
    //     const userSignUp = new signUp(page);
    //     await userSignUp.gotoSite();
    // });

    test('Verify user can sign up a new account', async ({ signUpFixture, page}) => {
        //const userSignUp = new signUp(page);
        await signUpFixture.gotoSite();
        await signUpFixture.signUpNewUser(randomUsername, randomPassword);
        await signUpFixture.login(randomUsername,randomPassword);
        await expect(signUpFixture.placeOrderFormSuccessfullyPurchasedPopup).toHaveText('Welcome ' + randomUsername);
    });
});