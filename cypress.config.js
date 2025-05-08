const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    fixturesFolder: 'cypress/fixtures',
    baseUrl: 'https://www.nebulablock.com',
    supportFile: false
  }
}); 