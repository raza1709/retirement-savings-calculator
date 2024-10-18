const logger = require('../utils/logger');
const PageWrapper = require('../utils/PageWrapper');

class RetirementCalculatorPage {
    constructor(page, locators) {
        this.pageWrapper = new PageWrapper(page);
        this.locators = locators;
        logger.info('RetirementCalculatorPage initialized.');
    }

    async navigate(url) {
        logger.info(`Navigating to ${url}`);
        await this.pageWrapper.page.goto(url);
        logger.info(`Successfully navigated to ${url}`);
    }

    async fillForm(data) {
        try {
            logger.info('Starting to fill out the retirement calculator form.');
            await this.pageWrapper.inputText(this.locators.currentAgeInput, data.currentAge.toString());
            await this.pageWrapper.inputText(this.locators.retirementAgeInput, data.retirementAge.toString());
            await this.pageWrapper.inputText(this.locators.currentIncomeInput, data.currentIncome.toString());
            await this.pageWrapper.inputText(this.locators.spouseIncomeInput, data.spouseIncome.toString());
            await this.pageWrapper.inputText(this.locators.totalSavingsInput, data.totalSavings.toString());
            await this.pageWrapper.inputText(this.locators.annualSavingsInput, data.annualSavings.toString());
            await this.pageWrapper.inputText(this.locators.savingsIncreaseRateInput, data.savingsIncreaseRate.toString());

            await this.pageWrapper.checkElement(this.locators.yesSocialBenefits);
            await this.pageWrapper.checkElement(this.locators.marriedOption);
            await this.pageWrapper.inputText(this.locators.socialSecurityOverrideInput, data.socialSecurityOverride.toString());

            logger.info('Form filled successfully.');
        } catch (error) {
            logger.error('Error filling the form: ' + error.message);
        }
    }

    async calculate() {
        logger.info('Starting calculation of retirement results.');
        await this.pageWrapper.clickElement(this.locators.calculateButton);
        logger.info('Calculation button clicked.');
    }

    async getResult() {
        await this.pageWrapper.waitForSelector(this.locators.result);
        const result = await this.pageWrapper.getText(this.locators.result);
        logger.info('Calculation result retrieved: ' + result);
        return result;
    }

    async getErrorMessage() {
        await this.pageWrapper.waitForSelector(this.locators.errorMessage);
        const errorMessage = await this.pageWrapper.getText(this.locators.errorMessage);
        logger.error('Error message retrieved: ' + errorMessage);
        return errorMessage;
    }

    async getIncompleteFormError() {
        await this.pageWrapper.waitForSelector(this.locators.incompleteFormError);
        const incompleteError = await this.pageWrapper.getText(this.locators.incompleteFormError);
        logger.warn('Incomplete form error retrieved: ' + incompleteError);
        return incompleteError;
    }

    async clearForm() {
        logger.info('Clearing the form inputs.');
        await this.pageWrapper.inputText(this.locators.currentAgeInput, '');
        await this.pageWrapper.inputText(this.locators.retirementAgeInput, '');
        await this.pageWrapper.inputText(this.locators.currentIncomeInput, '');
        await this.pageWrapper.inputText(this.locators.spouseIncomeInput, '');
        await this.pageWrapper.inputText(this.locators.totalSavingsInput, '');
        await this.pageWrapper.inputText(this.locators.annualSavingsInput, '');
        await this.pageWrapper.inputText(this.locators.savingsIncreaseRateInput, '');
        await this.pageWrapper.uncheckElement(this.locators.yesSocialBenefits);
        await this.pageWrapper.uncheckElement(this.locators.marriedOption);
        await this.pageWrapper.inputText(this.locators.socialSecurityOverrideInput, '');
        logger.info('Form inputs cleared successfully.');
    }
}

module.exports = RetirementCalculatorPage;
