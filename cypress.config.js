const { defineConfig } = require('cypress');
const env = require('./cypress.env.json');
const reportDir =
  process.env.ENV === 'staging'
    ? 'cypress/reports/staging'
    : 'cypress/reports/production';

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    fixturesFolder: 'cypress/fixtures',
    baseUrl:
      process.env.ENV === 'staging'
        ? env.baseUrlStaging
        : env.baseUrlProduction,
    supportFile: false,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir,
      overwrite: false,
      html: true,
      json: true
    },
    // testIsolation: false,
  }
}); 