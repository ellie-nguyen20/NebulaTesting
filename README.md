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
   > Mochawesome and related packages are used to generate HTML test reports.

2. **Run tests:**
   - **Production environment:**
     ```bash
     npm run test:prod
     ```
   - **Staging environment:**
     ```bash
     npm run test:staging
     ```

3. **Open Cypress UI:**
   - **Production environment:**
     ```bash
     npm run cy:open:prod
     ```
   - **Staging environment:**
     ```bash
     npm run cy:open:staging
     ```

4. **View HTML report:**
   - **Production:** The report will be generated in the `cypress/reports/production/` folder.
   - **Staging:** The report will be generated in the `cypress/reports/staging/` folder.
   - Open the `.html` file in these folders to view the test results in a user-friendly format.

5. **Merge multiple reports (if needed):**
   - **Production:**
     ```bash
     npm run report:merge:prod
     ```
   - **Staging:**
     ```bash
     npm run report:merge:staging
     ```
   - This command will merge all JSON report files into a single HTML summary report in the corresponding folder.

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
      reportDir,
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
