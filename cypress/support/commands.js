import credential from '../fixtures/credential.json';

const creds = credential.valid;
Cypress.Commands.add('loginAndSaveToken', (creds) => {
  cy.log('Custom command creds:', JSON.stringify(creds));
  cy.log('creds.valid:', JSON.stringify(creds && creds.valid));
  cy.log('creds.valid.email:', creds && creds.valid && creds.valid.email);
  cy.log('creds.valid.password:', creds && creds.valid && creds.valid.password);
  cy.visit('https://www.nebulablock.com/home');
  cy.get('input[type="text"]').type(creds.valid.email);
  cy.get('input[type="password"]').type(creds.valid.password);
  cy.get('button.el-button--primary').click();
  cy.wait(2000);
  cy.window().then((win) => {
    const token = win.localStorage.getItem('nebulablock_newlook_token');
    if (token) {
      Cypress.env('access_token', token);
      cy.writeFile('cypress/fixtures/token.json', { token });
    }
  });
});


loginAndSaveToken(creds);
