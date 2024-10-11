class RetirementCalculatorPage {
    constructor(page, locators) {
        this.page = page;
        this.locators = locators;
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async fillForm(data) {
        await this.page.fill(this.locators.currentAgeInput, data.currentAge.toString());
        await this.page.fill(this.locators.retirementAgeInput, data.retirementAge.toString());
        await this.page.fill(this.locators.currentIncomeInput, data.currentIncome.toString());
        await this.page.fill(this.locators.spouseIncomeInput, data.spouseIncome.toString());
        await this.page.fill(this.locators.totalSavingsInput, data.totalSavings.toString());
        await this.page.fill(this.locators.annualSavingsInput, data.annualSavings.toString());
        await this.page.fill(this.locators.savingsIncreaseRateInput, data.savingsIncreaseRate.toString());

        await this.page.check(this.locators.yesSocialBenefits);
        await this.page.check(this.locators.marriedOption);
        await this.page.fill(this.locators.socialSecurityOverrideInput, data.socialSecurityOverride.toString());
    }

    async calculate() {
        await this.page.click(this.locators.calculateButton);
    }

    async getResult() {
        return await this.page.textContent(this.locators.result);
    }

    async getErrorMessage() {
        return await this.page.textContent(this.locators.errorMessage);
    }

    async getIncompleteFormError() {
        return await this.page.textContent(this.locators.incompleteFormError);
    }
}

module.exports = RetirementCalculatorPage;
