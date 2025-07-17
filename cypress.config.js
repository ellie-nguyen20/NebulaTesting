const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

const env = fs.existsSync('./cypress.env.json')
  ? require('./cypress.env.json')
  : {};

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
    setupNodeEvents(on, config) {
      on('task', {
        deleteFile(filePath) {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
          }
          return false;
        },

        deleteAllFiles(folderPath) {
          if (fs.existsSync(folderPath)) {
            fs.readdirSync(folderPath).forEach((file) => {
              const curPath = path.join(folderPath, file);
              if (fs.lstatSync(curPath).isFile()) {
                fs.unlinkSync(curPath);
              }
            });
            return true;
          }
          return false;
        },
        countMp4Files(folderPath) {
          if (!fs.existsSync(folderPath)) return 0;
          return fs.readdirSync(folderPath).filter(f => f.endsWith('.mp4')).length;
        },
        getMp4Files(folderPath) {
          if (!fs.existsSync(folderPath)) return [];
          return fs.readdirSync(folderPath).filter(f => f.endsWith('.mp4'));
        }
      });
    },
  }
}); 