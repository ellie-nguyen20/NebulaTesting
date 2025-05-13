# NebulaBlock Cypress E2E Tests

## Project Overview

This project provides a comprehensive end-to-end (E2E) test suite for the Nebula Block web platform using [Cypress](https://www.cypress.io/). The goal is to ensure the reliability, stability, and quality of all major user flows and features, including authentication, object storage, serverless models, SSH key management, billing, account management, contact, referral, and more.

- **Technology:** Cypress (JavaScript), Mochawesome HTML reporting
- **Scope:** Covers UI, functional, and regression testing for all main pages and critical business logic
- **Structure:** Uses the Page Object Model (POM) pattern for maintainability and scalability
- **Reporting:** Generates beautiful HTML reports for each test run

---

## Folder structure

- `cypress/e2e/pages/`: Contains Page Object Models (POM)
- `cypress/e2e/login.cy.js`: Main login test
- `cypress/fixtures/users.json`: Sample user data
- `cypress.env.json`: Stores real credentials
- `.gitignore`: Excludes node_modules and cypress.env.json

## Install and run tests

1. **Install all dependencies:**
   ```bash
   npm install
   npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
   ```
   > Mochawesome and related packages are used for generating HTML test reports.

2. **Run tests:**
   ```bash
   npx cypress run
   ```

3. **View HTML report:**
   - The report will be generated in the `cypress/reports` folder.
   - Open the `.html` file in this folder to view the test results in a user-friendly format.

4. **Merge multiple reports (if needed):**
   ```bash
   npx mochawesome-merge cypress/reports/*.json > cypress/reports/merged-report.json
   npx marge cypress/reports/merged-report.json -f report -o cypress/reports
   ```

## Security
- Do not commit the `cypress.env.json` file containing sensitive information to git.

## CI/CD
- Github Actions pipeline is configured to automatically run tests (see `.github/workflows/cypress.yml`).

## Reporter configuration in `cypress.config.js`
```js
module.exports = defineConfig({
  e2e: {
    // ...
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true
    }
  }
});
```

## Test folder
- All test files are located in `cypress/e2e/`
- Page Object Models are in `cypress/e2e/pages/`

## Additional information
- Make sure you have the correct test account configured in `cypress/fixtures/credential.json`
- You can run a specific test file with:
  ```bash
  npx cypress run --spec cypress/e2e/yourfile.cy.js
  ``` 