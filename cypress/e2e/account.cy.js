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

  it('should update profile information', () => {
    AccountPage.updateProfile(creds.account.updateUsername);

    cy.readFile('cypress/fixtures/credential.json').then((data) => {
      const oldUsername = data.account.username;
      const newUsername = data.account.updateUsername;

      data.account.username = newUsername;
      data.account.updateUsername = oldUsername;

      cy.writeFile('cypress/fixtures/credential.json', data);
    });
  });

  it('should change password', () => {
    AccountPage.changePassword(creds.account.password, creds.account.newPassword);

    cy.readFile('cypress/fixtures/credential.json').then((data) => {
      const oldPassword = data.account.password;
      const newPassword = data.account.newPassword;

      // Swap values
      data.account.password = newPassword;
      data.account.newPassword = oldPassword;

      cy.writeFile('cypress/fixtures/credential.json', data);
    });
  });

  it('should not change password with wrong current password', () => {
    AccountPage.changeWithWrongPassword('wrongpassword', 'newWrongpassword');
  });

  it('should not change password with duplicate password', () => {
    AccountPage.changeWithDuplicatePassword(creds.account.password, creds.account.password);
  });
});
