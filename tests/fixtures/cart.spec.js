const { expect,test } = require('@playwright/test');
import { PageFactory } from "../pages/pageFactory"

import {
    LOGINURL,
    USERNAME,
    PASSWORD,

} from "../object_repository/data"

test.describe('Shopping Cart Functionality', () => {


    //testcase 7: cart should display the correct number when user remove item
    test('7. should display the correct number of item when remove item from cart', async ({ page }) => {
        const pageFactory = new PageFactory(page);

        await pageFactory.InventoryPage().goto(LOGINURL);
        await pageFactory.LoginPage().login(USERNAME, PASSWORD);
        await pageFactory.InventoryPage().addFirstProductToCart();
        await pageFactory.InventoryPage().addSecondProductToCart();
        await pageFactory.InventoryPage().goToCartPage();
        await pageFactory.CartPage().removeFirstProductFromCart();
        await pageFactory.CartPage().itemNumberInCart();
        
        await page.pause();
    })

})