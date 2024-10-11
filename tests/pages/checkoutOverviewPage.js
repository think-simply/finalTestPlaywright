const { expect, test } = require('@playwright/test');
import { BasePage } from "../pages/basePage"
import {
   firstName,
   lastName,
   postCode,
   continueButton
} from "../selectors/checkoutSelector";

import {
    inputData
} from "../object_repository/data"

class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);
    }
    async caculateTotalPriceNotax() {
      // Calculate the total price
    const { subtotal, totalWithTax, roundedTotal } = await this.page.evaluate(() => {
        const priceElements = document.querySelectorAll('.inventory_item_price');
        const subtotal = Array.from(priceElements).reduce((sum, el) => {
          return sum + parseFloat(el.textContent.replace('$', ''));
        }, 0);
  
        const taxRate = 0.08; // 8% tax
        const tax = subtotal * taxRate;
        const totalWithTax = subtotal + tax;
        const roundedTotal = Math.round(totalWithTax*100)/100;
  
        return { subtotal, totalWithTax, roundedTotal };
      });
  
      // Get the displayed total from the page
      const displayedTotal = await this.page.$eval('.summary_total_label', el => 
        parseFloat(el.textContent.replace('Total: $', ''))
      );
      // Assertions
      expect(displayedTotal).toBe(roundedTotal);
      expect(displayedTotal).toBeGreaterThanOrEqual(subtotal);
      expect(displayedTotal).toBeLessThanOrEqual(totalWithTax + 0.5); // Allow for rounding up
      expect(displayedTotal).toBeGreaterThanOrEqual(totalWithTax - 0.5); 
    }
    async enterCheckoutInfo() {
        await this.page.locator(firstName).fill(inputData);
        await this.page.locator(lastName).fill(inputData);
        await this.page.locator(postCode).fill(inputData);
        await this.page.locator(continueButton).click(inputData);
    }

}
export { CheckoutPage }
