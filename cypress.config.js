const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    fixturesFolder: 'cypress/fixtures',
    baseUrl: 'https://www.nebulablock.com',
    supportFile: false,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true
    }
  }
}); 