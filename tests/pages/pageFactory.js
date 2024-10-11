import { LoginPage } from "../pages/loginPage"
import { InventoryPage } from "../pages/inventoryPage"
import { CartPage } from "../pages/cartPage"
import {CheckoutPage} from "../pages/checkoutOverviewPage"
class PageFactory {
    constructor(page) {
        this.page = page;
    }
    LoginPage() {
        return new LoginPage(this.page);
    };
    InventoryPage() {
        return new InventoryPage(this.page);
    };
    CartPage() {
        return new CartPage(this.page);
    };
    CheckoutPage() {
        return new CheckoutPage(this.page);
    };
}

module.exports = { PageFactory };