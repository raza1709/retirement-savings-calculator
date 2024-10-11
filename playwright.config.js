const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests', 
    timeout: 30000, 
    expect: {
        timeout: 5000,
    },
    reporter: 'html',
    use: {
        headless: false,
        screenshot: 'on',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' }, // Test in Chromium
        },       
    ],
});
