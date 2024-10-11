import { BasePage } from "../pages/basePage"
const { expect } = require('@playwright/test');
import {
    usernameLocator,
    passwordLocator,
    loginButtonLocator,
} from "../selectors/loginSelector"

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }
    /**
     * @param {String} url 
     * @param {String} username 
     * @param {String} password 
     */
    async login(username, password) {
        await this.page.locator(usernameLocator).fill(username);
        await this.page.locator(passwordLocator).fill(password);
        await this.page.locator(loginButtonLocator).click();
    }

    /**
     * 
     * @param {string} message 
     */
    async validateMessage(message) {
        await expect(this.page.getByText(message)).toBeVisible();

    }

}

export { LoginPage };