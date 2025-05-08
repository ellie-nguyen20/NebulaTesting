# NebulaBlock Cypress E2E Tests

## Folder structure

- `cypress/e2e/pages/`: Contains Page Object Models (POM)
- `cypress/e2e/login.cy.js`: Main login test
- `cypress/fixtures/users.json`: Sample user data
- `cypress.env.json`: Stores real credentials
- `.gitignore`: Excludes node_modules and cypress.env.json

## Install and run tests

```bash
npm install
npx cypress open # or npx cypress run
```

## Security
- Do not commit the `cypress.env.json` file containing sensitive information to git.

## CI/CD
- Github Actions pipeline is configured to automatically run tests (see `.github/workflows/cypress.yml`). 