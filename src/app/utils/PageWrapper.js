const logger = require('./logger');

class PageWrapper {
    constructor(page) {
        this.page = page;
    }

    async inputText(selector, text) {
        logger.info(`Typing text "${text}" into element ${selector}`);
        await this.page.locator(selector).fill(text);
    }

    async clickElement(selector) {
        logger.info(`Clicking element ${selector}`);
        await this.page.locator(selector).click();
    }

    async getText(selector) {
        logger.info(`Getting text from element ${selector}`);
        return await this.page.locator(selector).textContent();
    }

    async printMessage(text) {
        logger.info(`Results: ${text}`);
    }

    async checkElement(selector) {
        logger.info(`Checking element ${selector}`);
        await this.page.locator(selector).check();
    }

    async uncheckElement(selector) {
        logger.info(`Unchecking element ${selector}`);
        await this.page.locator(selector).uncheck();
    }

    async waitForSelector(selector) {
        logger.info(`Waiting for element ${selector}`);
        await this.page.waitForSelector(selector);
    }
}

module.exports = PageWrapper;
