import LoginPage from '../e2e/pages/LoginPage';
import credential from '../fixtures/credential.json';

Cypress.Commands.add('loginViaUi', (userKey = 'valid') => {
  const { email, password } = credential[userKey];

  cy.session(userKey, () => {
    LoginPage.visit();
    LoginPage.login(email, password);
    cy.url().should('include', '/serverless');
  });
});


Cypress.Commands.add('loginAndSaveToken', (creds) => {
  cy.log('Custom command creds:', JSON.stringify(creds));
  cy.log('creds.valid:', JSON.stringify(creds && creds.valid));
  cy.log('creds.valid.email:', creds && creds.valid && creds.valid.email);
  cy.log('creds.valid.password:', creds && creds.valid && creds.valid.password);
  LoginPage.visit();
  cy.wait(2000);
  LoginPage.fillEmail(creds.valid.email);
  LoginPage.fillPassword(creds.valid.password);
  LoginPage.clickSignIn();
  cy.wait(2000);
  cy.window().then((win) => {
    const token = win.localStorage.getItem('nebulablock_newlook_token');
    if (token) {
      Cypress.env('access_token', token);
      cy.writeFile('cypress/fixtures/token.json', { token });
    }
  });
});