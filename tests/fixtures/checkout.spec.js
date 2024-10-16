const { expect, test } = require('@playwright/test');
import { PageFactory } from "../pages/pageFactory"

import {
    LOGINURL,
    USERNAME,
    PASSWORD,

} from "../object_repository/data"

test.describe('Checkout feature', () => {
    // testcase 9. should display the correct total price of added item when checking out

    test('9. should display the correct total price of added item when checking out', async ({ page }) => {
        const pageFactory = new PageFactory(page);

        await pageFactory.InventoryPage().goto(LOGINURL);
        await pageFactory.LoginPage().login(USERNAME, PASSWORD);
        await pageFactory.InventoryPage().addFirstProductToCart();
        await pageFactory.InventoryPage().addSecondProductToCart();
        await pageFactory.InventoryPage().goToCartPage();
        await pageFactory.CartPage().moveToCheckout();   
        await pageFactory.CheckoutPage().enterCheckoutInfo();
        
        await pageFactory.CheckoutPage().caculateTotalPriceNotax();

    });
});