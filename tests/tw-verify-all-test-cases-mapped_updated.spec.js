import { test, expect, request } from '@playwright/test';
const { signUp } = require('./playwright-helpers/signup-helpers.js');
const { purchaseItem } = require('./playwright-helpers/purshase-item-helpers.js');
const { testWorthyAPIs } = require('./TestWorthy-JS-Integration/testworthy-api-functions-set_case_status.js');

test.describe('Demo - TestWorthy Integration with Playwright/JavaScript', () => {
    
    let page;
    // Initialize the test status as 'FAILED'. Mandatory to have this as PlayWright doesn't have it's own Test Status variable
    let testStatus = 'FAILED'; 
    // Object of Testworthy API Class
    const testWorthyAPIs_Obj = new testWorthyAPIs();

    //--- This is for randome username and password generation, you can use your own mechanism for this ---/
    const randomUsername = Math.random().toString(36).substring(2,7);
    console.log(randomUsername);
    const randomPassword = Math.random().toString(36).substring(2,7);
    console.log(randomPassword);

    test.beforeAll(async ({ browser }) => {
        //--- API - Get Test Cases IDs ---//
        //*** Call this method here in beforeAll to get all the Test Cases IDs and Titles present in the Test Run on TestWorthy before start the execution of automated Test Cases. It will help in matching and assigning Test Case IDs to the relevant Automated Test Case ***/
        await testWorthyAPIs_Obj.get_case_id_api();
        //--- API - GET Runs via Suite ID ---//
        //*** This API will fetch all the test runs using a specific suite id ***/
        await testWorthyAPIs_Obj.get_run_from_suit_id();
        
        page = await browser.newPage();
        const userSignUp = new signUp(page);
        await userSignUp.gotoSite();
    });

    test.afterEach(async () => {
        // ---- Call "add_results_for_cases" API function ---- //
        //*** Call this method in afterEach, so it will map the Automated Case status to the relevant test case in the TestWorthy. It has an argument "testStatus" globally initialized ***//
        await testWorthyAPIs_Obj.add_results_for_cases(testStatus);            
    });

    test('Case - 1: Verify use can sign up a new account', async () => {
        //*** Mandatory to have variable "currentTestTitle" in every test case and in the value copy and paste the same test case title you are going to Automate from the Test Run on the TestWorthy***/
        const currentTestTitle = 'Verify use can sign up a new account';

        //*** Call this method in every Test Case. It will match and assign the relevant test title from the Test Run on the TestWorthy. It has the argument "currentTestTitle" daclared above***//
        await testWorthyAPIs_Obj.matchAndAssignCaseId(currentTestTitle);

        //*** Recommended to write Tests in Try Catch blocks so the it would be easy to assign the correct Test Status to the variable "testStatus" globally initialized and less chance to map the incorrect test statues on TestWorthy ***//
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
            }
            else{
                console.log('welcomeName =' + welcomeName);
                testStatus = 'PASSED';
            }
        } catch (error) {
            // Handle test failure (e.g., an unhandled exception) and update the status
            testStatus = 'FAILED';
            console.error('Test Error:', error);
        } finally {
            console.log('Test Status = ' + testStatus);
        }
    });

    test('Case - 2: Verify user can add single item to the cart', async () => {
        //*** Mandatory to have variable "currentTestTitle" in every test case and in the value copy and paste the same test case title you are going to Automate from the Test Run on the TestWorthy***/
        const currentTestTitle = 'Verify user can add single item to the cart';

        //*** Call this method in every Test Case. It will match and assign the relevant test title from the Test Run on the TestWorthy. It has the argument "currentTestTitle" daclared above***//
        await testWorthyAPIs_Obj.matchAndAssignCaseId(currentTestTitle);

        //*** Recommended to write Tests in Try Catch blocks so the it would be easy to assign the correct Test Status to the variable "testStatus" globally initialized and less chance to map the incorrect test statues on TestWorthy ***//
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
                  } catch (error) {
                    console.error('Total Amount is not as expected. Received:', totalAmountText, 'Error:', error);
                    testStatus = 'FAILED';
                  }
        } catch (error) {
            // Handle test failure (e.g., an unhandled exception) and update the status
            testStatus = 'FAILED';
            console.error('Test Error:', error);
        } finally {
            console.log('Test Status = ' + testStatus);
        }
    });

    test('Case - 3: Verify use can add multiple items to the cart', async () => {
        //*** Mandatory to have variable "currentTestTitle" in every test case and in the value copy and paste the same test case title you are going to Automate from the Test Run on the TestWorthy***/
        const currentTestTitle = 'Verify use can add multiple items to the cart';

        //*** Call this method in every Test Case. It will match and assign the relevant test title from the Test Run on the TestWorthy. It has the argument "currentTestTitle" daclared above***//
        await testWorthyAPIs_Obj.matchAndAssignCaseId(currentTestTitle);

        //*** Recommended to write Tests in Try Catch blocks so the it would be easy to assign the correct Test Status to the variable "testStatus" globally initialized and less chance to map the incorrect test statues on TestWorthy ***//
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
                  } catch (error) {
                    console.error('Total Amount is not as expected. Received:', totalAmountText, 'Error:', error);
                    testStatus = 'FAILED';
                  }
        } catch (error) {
            // Handle test failure (e.g., an unhandled exception) and update the status
            testStatus = 'FAILED';
            console.error('Test Error:', error);
        } finally {
            console.log('Test Status = ' + testStatus);
        }
    });

    test('Case - 4: Verify user can delete product from the cart', async () => {
        //*** Mandatory to have variable "currentTestTitle" in every test case and in the value copy and paste the same test case title you are going to Automate from the Test Run on the TestWorthy***/
        const currentTestTitle = 'Verify user can delete product from the cart';

        //*** Call this method in every Test Case. It will match and assign the relevant test title from the Test Run on the TestWorthy. It has the argument "currentTestTitle" daclared above***//
        await testWorthyAPIs_Obj.matchAndAssignCaseId(currentTestTitle);

        //*** Recommended to write Tests in Try Catch blocks so the it would be easy to assign the correct Test Status to the variable "testStatus" globally initialized and less chance to map the incorrect test statues on TestWorthy ***//
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
            }
            else{
                testStatus = 'PASSED';
            }
        } catch (error) {
            // Handle test failure (e.g., an unhandled exception) and update the status
            testStatus = 'FAILED';
            console.error('Test Error:', error);
        } finally {
            console.log('Test Status = ' + testStatus);
        }
    });

    test('Case - 5: Verify user can add multiple items to the cart and place order', async () => {
        //*** Mandatory to have variable "currentTestTitle" in every test case and in the value copy and paste the same test case title you are going to Automate from the Test Run on the TestWorthy***/
        const currentTestTitle = 'Verify user can add multiple items to the cart and place order';

        //*** Call this method in every Test Case. It will match and assign the relevant test title from the Test Run on the TestWorthy. It has the argument "currentTestTitle" daclared above***//
        await testWorthyAPIs_Obj.matchAndAssignCaseId(currentTestTitle);

        //*** Recommended to write Tests in Try Catch blocks so the it would be easy to assign the correct Test Status to the variable "testStatus" globally initialized and less chance to map the incorrect test statues on TestWorthy ***//
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
            }
            else{
                testStatus = 'PASSED';
            }
        } catch (error) {
            // Handle test failure (e.g., an unhandled exception) and update the status
            testStatus = 'FAILED';
            console.error('Test Error:', error);
        } finally {
            console.log('Test Status = ' + testStatus);
        }
    });
});