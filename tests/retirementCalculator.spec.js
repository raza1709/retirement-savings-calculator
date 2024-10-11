const { test, expect } = require('@playwright/test');
const RetirementCalculatorPage = require('../utils/RetirementCalculatorPage');

const locators = require('../locators/locators');
const testData = require('../data/testData.json');
const config = require('../config/config');

test.describe('Retirement Calculator Tests', () => {
    let retirementCalculatorPage;

    test.beforeEach(async ({ page }) => {
        retirementCalculatorPage = new RetirementCalculatorPage(page, locators);
        await retirementCalculatorPage.navigate(config.baseUrl);
    });

    test('Positive Test - Calculate Retirement', async () => {
        await retirementCalculatorPage.fillForm(testData);
        await retirementCalculatorPage.calculate();

        const resultText = await retirementCalculatorPage.getResult();
        console.log(resultText);
    });

    test('Negative Test - Invalid Retirement Age', async () => {
        const invalidData = { ...testData, retirementAge: '20' }; // Set invalid data
        await retirementCalculatorPage.fillForm(invalidData);
        await retirementCalculatorPage.calculate();

        const errorMessage = await retirementCalculatorPage.getErrorMessage();
        expect(errorMessage).toContain('Planned retirement age must be greater than current age');
    });

    test('Negative Test - Incomplete Data', async () => {
        const incompleteData = { ...testData, currentIncome: '', spouseIncome: '', totalSavings: '' };
        await retirementCalculatorPage.fillForm(incompleteData);
        await retirementCalculatorPage.calculate();

        const errorMessage = await retirementCalculatorPage.getIncompleteFormError();
        expect(errorMessage).toContain('Please fill out all required fields');
    });
});

