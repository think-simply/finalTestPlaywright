const { test } = require('@playwright/test');
import { PageFactory } from "../pages/pageFactory"

import {
    LOGINURL,
    USERNAME,
    PASSWORD,

} from "../object_repository/data"

test.describe('Inventory page', () => {
    //testcase4: should display 6 items in the inventory
    test('4. should display 6 items in the inventory', async ({ page }) => {
        const pageFactory = new PageFactory(page);

        await pageFactory.InventoryPage().goto(LOGINURL);
        await pageFactory.LoginPage().login(USERNAME, PASSWORD);
        await pageFactory.InventoryPage().checkItemQuality();
        await page.pause();
    });

    //testcase5: should be able to add item to cart
    test('should be able to add item to cart', async ({ page }) => {
        const pageFactory = new PageFactory(page);

        await pageFactory.InventoryPage().goto(LOGINURL);
        await pageFactory.LoginPage().login(USERNAME, PASSWORD);
        await pageFactory.InventoryPage().addFirstProductToCart();
        await pageFactory.InventoryPage().verifyAddProductToCart();
        await page.pause();
    });

    //testcase 6: cart should display the correct number of added item
    test('6. should be able to add item to cart', async ({ page }) => {
        const pageFactory = new PageFactory(page);

        await pageFactory.InventoryPage().goto(LOGINURL);
        await pageFactory.LoginPage().login(USERNAME, PASSWORD);
        await pageFactory.InventoryPage().addFirstProductToCart();
        await pageFactory.InventoryPage().addSecondProductToCart();
        await pageFactory.InventoryPage().goToCartPage();
        await pageFactory.InventoryPage().itemNumberInCart();


        await page.pause();
    });
    
    //testcase 8. should display the correct order of item when filter is set to "Price" (low to High)
    test('8. should display the correct order of item when filter is set to "Price" (low to High)', async ({ page }) => {
        const pageFactory = new PageFactory(page);

        await pageFactory.InventoryPage().goto(LOGINURL);
        await pageFactory.LoginPage().login(USERNAME, PASSWORD);
        await pageFactory.InventoryPage().filterPriceLowToHigh();

        await page.pause();
    });
})