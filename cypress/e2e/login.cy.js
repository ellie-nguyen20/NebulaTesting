import LoginPage from './pages/LoginPage';

describe('NebulaBlock Login', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('Valid Login', () => {
    cy.fixture('users').then((users) => {
      LoginPage.fillEmail(Cypress.env('valid_email'));
      LoginPage.fillPassword(Cypress.env('valid_password'));
      LoginPage.clickSignIn();
      LoginPage.isLoggedIn();
      cy.screenshot('login-success', { capture: 'fullPage' });
      LoginPage.logout();
      cy.screenshot('after-logout', { capture: 'fullPage' });
    });
  });

  it('Invalid Login', () => {
    LoginPage.fillEmail('invaliduser@example.com');
    LoginPage.fillPassword('wrongpassword');
    LoginPage.clickSignIn();
    LoginPage.isLoginError();
    cy.screenshot('login-failed', { capture: 'fullPage' });
  });
}); 