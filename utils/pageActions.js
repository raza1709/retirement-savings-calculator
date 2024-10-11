const logger = require('./logger');

async function inputText(page, selector, text) {
    logger.info(`Typing text "${text}" into element ${selector}`);
    await page.locator(selector).fill(text);
}

async function clickElement(page, selector) {
    logger.info(`Clicking element ${selector}`);
    await page.locator(selector).click();
}

async function getText(page, selector) {
    logger.info(`Getting text from element ${selector}`);
    return await page.locator(selector).textContent();
}

async function printMessage(text) {
    logger.info(`Results ${text}`);
}

module.exports = { inputText, clickElement, getText ,printMessage};
