import LoginPage from './pages/LoginPage';

describe('NebulaBlock Login', () => {
  let credentials;

  before(() => {
    cy.fixture('credentials').then((data) => {
      credentials = data;
    });
  });

  beforeEach(() => {
    LoginPage.visit();
  });

  it('Valid Login', () => {
    LoginPage.fillEmail(credentials.valid.email);
    LoginPage.fillPassword(credentials.valid.password);
    LoginPage.clickSignIn();
    LoginPage.isLoggedIn();
    cy.screenshot('login-success', { capture: 'fullPage' });
    LoginPage.logout();
    cy.screenshot('after-logout', { capture: 'fullPage' });
  });

  it('Invalid Login', () => {
    LoginPage.fillEmail(credentials.invalid.email);
    LoginPage.fillPassword(credentials.invalid.password);
    LoginPage.clickSignIn();
    LoginPage.isLoginError();
    cy.screenshot('login-failed', { capture: 'fullPage' });
  });
}); 