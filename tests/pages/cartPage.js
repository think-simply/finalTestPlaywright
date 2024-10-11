const { expect, test } = require('@playwright/test');
import { BasePage } from "../pages/basePage"
import {
    removeButton1,
    checkoutButton
} from "../selectors/cartSelector";
import {
    cartQty,
} from "../selectors/inventorySelector"

class CartPage extends BasePage {
    constructor(page) {
        super(page);
    }
    //remove product from cart
    async removeFirstProductFromCart() {
        await this.page.locator(removeButton1).click();
    }
    //verify quality of item in cart
    async itemNumberInCart() {
        const cartItemCount = await this.page.locator(cartQty).innerText();
        expect(parseInt(cartItemCount)).toBe(1);
    }
    //verify quality of item in cart
    async moveToCheckout() {
        await this.page.locator(checkoutButton).click();
    }

}
export { CartPage }
