import { defineConfig } from '@playwright/test';

exports.signUp = class signUp {
    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.page = page;
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });
        this.signUpUsername = page.getByLabel('Username:');
        this.signUpPassword = page.getByLabel('Password:');
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
        });
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.loginUsername = page.locator('#loginusername');
        this.loginPassword = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.welcomeText = page.locator('#nameofuser');
    }

    async gotoSite() {
        await this.page.goto('/');
    }

    async signUpNewUser(username,password){
        await this.signUpLink.click();
        await this.signUpUsername.click();
        await this.signUpUsername.fill(username);
        await this.signUpPassword.click();
        await this.signUpPassword.fill(password);
        await this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
        });    
        await this.signUpButton.click();
    }

    async login(username,password){
        await this.loginLink.click();
        await this.loginUsername.fill(username);
        await this.loginPassword.fill(password);
        await this.loginButton.click();
        await this.welcomeText.waitFor(30000);
    }
}
