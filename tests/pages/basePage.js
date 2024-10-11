class BasePage {
    constructor(page) {
        this.page = page;
    }

    /**
     * This method is used to navigate to the specified URL
     * @param {string} url 
     */
    async goto(url) {
        await this.page.goto(url);
    }

    /**
     * This method is used to close the page
     */
    async close() {
        await this.page.close();
    }
   
}

export { BasePage };