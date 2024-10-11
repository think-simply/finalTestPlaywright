const { expect, test } = require('@playwright/test');
import { BasePage } from "../pages/basePage"
import {
    hambugerButton,
    productBox,
    addToCartButton1,
    addToCartButton2,
    afterAddToCart,
    cartIcon,
    cartQty,
    priceTag,
    lohiOption,
    sortIcon,
    filterDropdownProduct
} from "../selectors/inventorySelector";

class InventoryPage extends BasePage {
    constructor(page) {
        super(page);
    }
    // verify hambugar item exist in Inventory page
    async validateInventoryPageExist() {
        await expect(this.page.locator(hambugerButton)).toBeVisible();

    }

    //check there are 6 items in page
    async checkItemQuality() {

        await this.page.waitForSelector(productBox);

        // Đếm số lượng sản phẩm
        const productCount = await this.page.locator(productBox).count();

        // Kiểm tra xem có đúng 6 sản phẩm không
        expect(productCount).toBe(6);

    }

    //Check Add product to cart
    async addFirstProductToCart() {
        await this.page.locator(addToCartButton1).click();

    }
    async addSecondProductToCart() {
        await this.page.locator(addToCartButton2).click();

    }
    //verify add to cart successfully
    async verifyAddProductToCart() {
        await expect(this.page.getByText(afterAddToCart)).toBeVisible();

    }
    // go to cartPage
    async goToCartPage() {
        await this.page.locator(cartIcon).click();

    }
    //verify quality of item in cart
    async itemNumberInCart() {
        const cartItemCount = await this.page.locator(cartQty).innerText();
        expect(parseInt(cartItemCount)).toBe(2);
    }


    // Filter products from low price to high price
    async filterPriceLowToHigh() {
        // Get all product prices
        const getprices = async () => await this.page.$$eval(priceTag, elements =>
            elements.map(el => parseFloat(el.innerText.replace('$', '')))
        );
        // Get initial product prices
        const initialPrices = await getprices();

        // Click on the sort dropdown (adjust the selector as needed)
        await this.page.click(sortIcon);

        // Select the "low to high" option
        await this.page.selectOption(filterDropdownProduct,lohiOption);

        // Get the sorted product prices
        const sortedPrices = await getprices();

        // Check if the prices are in ascending order
        for (let i = 1; i < sortedPrices.length; i++) {
            expect(sortedPrices[i]).toBeGreaterThanOrEqual(sortedPrices[i - 1]);
        }
        // Additional assertion to ensure sorting actually changed something
        expect(sortedPrices[0]).toBeLessThanOrEqual(sortedPrices[sortedPrices.length - 1]);
    }
}
export { InventoryPage }
