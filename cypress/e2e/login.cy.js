import LoginPage from './pages/LoginPage';
import { ENDPOINTS } from '../support/constants';

describe('Login Page', () => {
  beforeEach(() => {
    LoginPage.visit();
    cy.url().should('include', ENDPOINTS.LOGIN);
  });

  it('should display Login UI', () => {
    LoginPage.checkUI();
  });

  it('should login with valid credentials', () => {
    cy.fixture('credential').then((creds) => {
      LoginPage.login(creds.valid.email, creds.valid.password);
      LoginPage.isLoggedIn(creds.valid.username);
    });
  });

  it('should show error with invalid credentials', () => {
    cy.fixture('credential').then((creds) => {
      LoginPage.login(creds.invalid.email, creds.invalid.password);
      LoginPage.isLoginError();
    });
  });
}); 