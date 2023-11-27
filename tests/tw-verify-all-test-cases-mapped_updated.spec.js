import { test, expect, request } from '@playwright/test';
const { signUp } = require('./playwright-helpers/signup-helpers.js');
const { purchaseItem } = require('./playwright-helpers/purshase-item-helpers.js');
const { testWorthyAPIs } = require('./playwright-helpers/testworthy-api-functions-set_case_status.js');

test.describe('Demo - TestWorthy Integration with Playwright/JavaScript', () => {
    
    let page;
    let testStatus = 'FAILED'; // Initialize the test status as 'FAILED'
    const testWorthyAPIs_Obj = new testWorthyAPIs();
    let case_id;
    const case_id_1 = 407483;
    const case_id_2 = 407484;
    const case_id_3 = 407485;
    const case_id_4 = 407486;
    const case_id_5 = 407487;

    const randomUsername = Math.random().toString(36).substring(2,7);
    console.log(randomUsername);
    const randomPassword = Math.random().toString(36).substring(2,7);
    console.log(randomPassword);

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        const userSignUp = new signUp(page);
        await userSignUp.gotoSite();
    });

    test.afterEach(async () => {
        // ---- Call "add_results_for_cases" API function ---- //
        await testWorthyAPIs_Obj.add_results_for_cases(case_id, testStatus);            
    });

    test('Case -1: Verify use can sign up a new account', async () => {
        try {
            const userSignUp = new signUp(page);
            await userSignUp.signUpNewUser(randomUsername, randomPassword);
            await userSignUp.login(randomUsername,randomPassword);
            await expect(page.locator('#nameofuser')).toHaveText('Welcome ' + randomUsername);

            const welcomeName = await userSignUp.welcomeText.textContent();
            console.log('Welcome Name = ' + welcomeName);
            await expect(userSignUp.welcomeText).toHaveText(welcomeName);
        
            // If a failure condition is met, update the test status to 'FAILED'
            if (await welcomeName != 'Welcome ' + randomUsername) {
                console.log('welcomeName =' + welcomeName);
                testStatus = 'FAILED';
                case_id = case_id_1;
                console.log('Case ID 1 = '+case_id);
            }
            else{
                console.log('welcomeName =' + welcomeName);
                testStatus = 'PASSED';
                case_id = case_id_1;
                console.log('Case ID 1 = '+case_id);
            }
        } catch (error) {
            // Handle test failure (e.g., an unhandled exception) and update the status
            //testStatus = 'FAILED';
            console.error('Test Error:', error);
        } finally {
            console.log('Test Status = ' + testStatus);
        }
    });

    test('Case -2: Verify user can add single item to the cart', async () => {
        try {
            const userPurchaseItem = new purchaseItem(page);
            await userPurchaseItem.addFirstProductToCart();
            await userPurchaseItem.gotoCart();
            let totalAmountText = await userPurchaseItem.totalAmount.textContent();
            console.log('Single Item Amount = ' + totalAmountText);
            await expect(userPurchaseItem.totalAmount).toHaveText(totalAmountText); 
                try {
                    totalAmountText = totalAmountText + 1;        //Uncomment this to fail this test case
                    await expect(userPurchaseItem.totalAmount).toHaveText(totalAmountText);
                    console.log('Second Try - Total Amount is = ' + totalAmountText);
                    testStatus = 'PASSED';
                    case_id = case_id_2;
                    console.log('Case ID 2 = ' + case_id);
                  } catch (error) {
                    console.error('Total Amount is not as expected. Received:', totalAmountText, 'Error:', error);
                    testStatus = 'FAILED';
                    case_id = case_id_2;
                    console.log('Case ID 2 = ' + case_id);
                  }
        } catch (error) {
            // Handle test failure (e.g., an unhandled exception) and update the status
            //testStatus = 'FAILED';
            console.error('Test Error:', error);
        } finally {
            console.log('Test Status = ' + testStatus);
        }
    });

    test('Case -3: Verify user can add Multiple items to the cart', async () => {
        try {
            const userPurchaseItem = new purchaseItem(page);
            await userPurchaseItem.addMultipleProductsToCart();
            await userPurchaseItem.gotoCart();
            const totalAmountText = await userPurchaseItem.totalAmount.textContent();
            console.log('Total Amount of Multiple Items = ' + totalAmountText);
            await expect(userPurchaseItem.totalAmount).toHaveText(totalAmountText);
                try {
                    //totalAmountText = totalAmountText + 1;        //Uncomment this to fail this test case
                    await expect(userPurchaseItem.totalAmount).toHaveText(totalAmountText);
                    console.log('Second Try - Total Amount is = ' + totalAmountText);
                    testStatus = 'PASSED';
                    case_id = case_id_3;
                    console.log('Case ID 3 = ' + case_id);
                  } catch (error) {
                    console.error('Total Amount is not as expected. Received:', totalAmountText, 'Error:', error);
                    testStatus = 'FAILED';
                    case_id = case_id_3;
                    console.log('Case ID 3 = ' + case_id);
                  }
        } catch (error) {
            // Handle test failure (e.g., an unhandled exception) and update the status
            //testStatus = 'FAILED';
            console.error('Test Error:', error);
        } finally {
            console.log('Test Status = ' + testStatus);
        }
    });

    test('Case -4: Verify user can delete products from the cart', async () => {
        try {
            const userPurchaseItem = new purchaseItem(page);
            await userPurchaseItem.addMultipleProductsToCart();   
            await userPurchaseItem.gotoCart();
            const totalAmountBeforeDelete = await userPurchaseItem.totalAmount.textContent();
            console.log('Total Amount Before Delete = ' + totalAmountBeforeDelete);
            await expect(userPurchaseItem.totalAmount).toHaveText(totalAmountBeforeDelete);
            await userPurchaseItem.deleteProductFromtheCart();
            await userPurchaseItem.goToHomePage.click();
            await userPurchaseItem.gotoCart();
            const totalAmountTextAfterDelete = await userPurchaseItem.totalAmount.textContent();
            console.log('Total Amount After Delete = ' + totalAmountTextAfterDelete);
            await expect(userPurchaseItem.totalAmount).toHaveText(totalAmountTextAfterDelete);


            if (totalAmountBeforeDelete === totalAmountTextAfterDelete) {
                console.log('Amounts are matched and test is Failed.');
                testStatus = 'FAILED';
                case_id = case_id_4;
                console.log('Case ID 4 = '+case_id);
            }
            else{
                testStatus = 'PASSED';
                case_id = case_id_4;
                console.log('Case ID 4 = '+case_id);
            }
        } catch (error) {
            // Handle test failure (e.g., an unhandled exception) and update the status
            //testStatus = 'FAILED';
            console.error('Test Error:', error);
        } finally {
            console.log('Test Status = ' + testStatus);
        }
    });

    test('Case -5: Verify user can successfully purchase products', async () => {
        try {
            const userPurchaseItem = new purchaseItem(page);
            await userPurchaseItem.addMultipleProductsToCart();   
            await userPurchaseItem.gotoCart();
            const totalAmountText = await userPurchaseItem.totalAmount.textContent();
            console.log('Total Amount of Items Purchased = ' + totalAmountText);
            await expect(userPurchaseItem.totalAmount).toHaveText(totalAmountText);
            await userPurchaseItem.placeOrder();
            await expect(userPurchaseItem.placeOrderFormSuccessfullyPurchasedPopup).toHaveText('Thank you for your purchase!');
            
            const thankyouText = await userPurchaseItem.placeOrderFormSuccessfullyPurchasedPopup.textContent();
            console.log('Text on order confirmation pop-up = ' + thankyouText);
            await expect(userPurchaseItem.placeOrderFormSuccessfullyPurchasedPopup).toHaveText(thankyouText);


            if (await thankyouText != 'Thank you for your purchase!') {
                console.log('Amounts are matched and test is Failed.');
                testStatus = 'FAILED';
                case_id = case_id_5;
                console.log('Case ID 5 = '+case_id);
            }
            else{
                testStatus = 'PASSED';
                case_id = case_id_5;
                console.log('Case ID 5 = '+case_id);
            }
        } catch (error) {
            // Handle test failure (e.g., an unhandled exception) and update the status
            //testStatus = 'FAILED';
            console.error('Test Error:', error);
        } finally {
            console.log('Test Status = ' + testStatus);
        }
    });
    
    // test('Map Test Case Staus - Linear API Call', async ({ request }) => {

    // // -----------------------------------------------------------------------------------------------------------//
    // // ---- Linear API call - not a separate function ---- //
    // // -----------------------------------------------------------------------------------------------------------//

    //     // const baseURL = "http://10plabs.com/api/tests/add_results_for_cases/12404";

    //     // if (testStatus === 'PASSED') {
    //     //         testStatus = 1;
    //     //           console.log('Test Status = ' + testStatus);
    //     // } else {
    //     //         testStatus = 5
    //     //         console.log('Test Status = ' + testStatus);
    //     // }
    
    //     // const response = await request.post(baseURL, {ignoreHTTPSErrors: true,
    //     // headers: {
    //     //     'X-USER-EMAIL': 'qa.admin@yopmail.com',
    //     //     'X-TMA-KEY':'qfst2zqwZX24iQVmKMNj',
    //     //     'X-PROJECT-KEY': 'tevW0gOrOed7ERbz0Gwg',
    //     //     'Content-Type': 'application/json',
    //     //     'Cookie': '.TCookie=CfDJ8NvEpa8b6O9HsycfRueM_XN7KrcB9GtGGLyBLHSAk15qxrqKxR46INmer4dsD4uFAQJ1_WtaADl3gJWZSGztUvbgke4TzIHTkpsahiZwC-R3KvQ8HQurhSaaDE2GLMOed8grpRaITLKG64wzQNUaOqTx9XpX_81P-_wDXK3bFQtPdS48faW2-QtYk9OHpOgi_tUiwNxvHVfFLaN2EFpcjzQC6OfrVwIMRd9d1lC5vQkR8JHB_fGLz2tbqVux-YzTLzBJ88w-LJ4esgUae1uQ4pwakj1VyEVYpYYxHLA05BSdJxcCoTz_gGC-adkDVh0A5DXSMHQmAgp9_9nND-IR15XeA-j8dB__GwVg4rmi2c3GlACkByH1kaGYeYK2TAJcIH0nxs4JnihVsOblYgTqVRg5cxrYaLMHToqz28Arp-xIkWak0dtiEa2TMRQRhndwEA',
    //     // },
    //     // data: {
    //     //     "Results": [
    //     //         {
    //     //         "case_id": 407483,
    //     //         "status_id": testStatus,
    //     //         "Comment": "test from postman",
    //     //         "AssignedToId": null,
    //     //         "Defects": "2306"
    //     //         }
    //     //         ]
    //     // }
    //     // });
    //     // console.log(await response.json());
    //     // expect(response.ok()).toBeTruthy();
    //     // expect(response.status()).toBe(200);
        
    // });
});