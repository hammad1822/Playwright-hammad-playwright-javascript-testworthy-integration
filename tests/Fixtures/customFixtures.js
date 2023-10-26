const base = require('@playwright/test');
const { purchaseProductsFixture } = require('../playwright-helpers/purshase-item-helpers.js');
const { SignUpFixture } = require('../playwright-helpers/signup-helpers.js');

const randomUsername = Math.random().toString(36).substring(2,7);
    console.log(randomUsername);
    const randomPassword = Math.random().toString(36).substring(2,7);
    console.log(randomPassword);

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
exports.test = base.test.extend({

    signUpFixture: async ({ page }, use) => {
        const signUpFixture = new SignUpFixture(page);
        await signUpFixture.gotoSite();
        await signUpFixture.signUpNewUser(randomUsername, randomPassword);
        await signUpFixture.login(randomUsername,randomPassword);
        //await use(new SettingsPage(page));
        await use(signUpFixture);
      },
    
    purchaseProductsFixture: async ({ page }, use) => {
    // Set up the fixture.
    const purchaseProductsFixtures = new purchaseProductsFixture(page);
    await purchaseProductsFixtures.gotoSite();
    await purchaseProductsFixtures.addToDo('item1');
    await purchaseProductsFixtures.addToDo('item2');

    // Use the fixture value in the test.
    await use(todoPage);

    // Clean up the fixture.
    await todoPage.removeAll();
  },

});
exports.expect = base.expect;