const { test, expect } = require('@playwright/test');
const RetirementCalculatorPage = require('../page/RetirementCalculatorPage');
const logger = require('../utils/logger'); // Import the logger
const locators = require('../../../locators/locators');
const testData = require('../../../data/testData.json');
const config = require('../../../config/config');

test.describe('Retirement Calculator Tests', () => {
    let retirementCalculatorPage;

    test.beforeEach(async ({ page }) => {
        logger.info('Starting a new test case.');
        retirementCalculatorPage = new RetirementCalculatorPage(page, locators);
        await retirementCalculatorPage.navigate(config.baseUrl);
    });

    test('Positive Test - Calculate Retirement', async () => {
        logger.info('Running Positive Test - Calculate Retirement.');
        await retirementCalculatorPage.fillForm(testData);
        await retirementCalculatorPage.calculate();

        const resultText = await retirementCalculatorPage.getResult();
        logger.info(`Result: ${resultText}`);
        console.log(resultText);
    });

    test('Negative Test - Invalid Retirement Age', async () => {
        logger.info('Running Negative Test - Invalid Retirement Age.');
        const invalidData = { ...testData, retirementAge: '20' }; // Set invalid data
        await retirementCalculatorPage.fillForm(invalidData);
        await retirementCalculatorPage.calculate();

        const errorMessage = await retirementCalculatorPage.getErrorMessage();
        logger.error(`Expected error message: ${errorMessage}`);
        expect(errorMessage).toContain('Planned retirement age must be greater than current age');
    });

    test('Negative Test - Incomplete Data', async () => {
        logger.info('Running Negative Test - Incomplete Data.');
        const incompleteData = { ...testData, currentIncome: '', spouseIncome: '', totalSavings: '' };
        await retirementCalculatorPage.fillForm(incompleteData);
        await retirementCalculatorPage.calculate();

        const errorMessage = await retirementCalculatorPage.getIncompleteFormError();
        logger.error(`Expected error message: ${errorMessage}`);
        expect(errorMessage).toContain('Please fill out all required fields');
    });
});
