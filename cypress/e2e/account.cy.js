import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import { ENDPOINTS } from '../support/constants';

describe('Account Page', () => {
  let creds;

  beforeEach(() => {
    cy.readFile('cypress/fixtures/credential.json').then((data) => {
      creds = data;
      LoginPage.visit();
      LoginPage.login(creds.account.email, creds.account.password);
      LoginPage.isLoggedIn(creds.account.username);
      cy.url().should('include', ENDPOINTS.SERVERLESS);

      AccountPage.visit();
      cy.url().should('include', ENDPOINTS.ACCOUNT);
    });
  });

  it('should display Account UI', () => {
    AccountPage.checkUI();
  });

  it('should update profile information successfully', () => {
    AccountPage.updateProfile(creds.account.updateUsername);
    AccountPage.updateProfile(creds.account.username);
  });

  it('should change password successfully', () => {
    AccountPage.changePassword(creds.account.password, creds.account.newPassword);
    AccountPage.changePassword(creds.account.newPassword, creds.account.password);
  });

  it('should not change password with wrong current password', () => {
    AccountPage.changeWithWrongPassword('wrongpassword', 'newWrongpassword');
  });

  it('should not change password with duplicate password', () => {
    AccountPage.changeWithDuplicatePassword(creds.account.password, creds.account.password);
  });
});
