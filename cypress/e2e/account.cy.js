import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import { ENDPOINTS } from '../support/constants';

describe('Account Page', () => {
  let creds;

  beforeEach(() => {
    cy.readFile('cypress/fixtures/credential.json').then((data) => {
      creds = data;
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      LoginPage.isLoggedIn(creds.valid.username);
      cy.url().should('include', ENDPOINTS.SERVERLESS);

      AccountPage.visit();
      cy.url().should('include', ENDPOINTS.ACCOUNT);
    });
  });

  it('should display Account UI', () => {
    AccountPage.checkUI();
  });

  it('should update profile information', () => {
    AccountPage.updateProfile(creds.valid.updateUsername);

    cy.readFile('cypress/fixtures/credential.json').then((data) => {
      const oldUsername = data.valid.username;
      const newUsername = data.valid.updateUsername;

      data.valid.username = newUsername;
      data.valid.updateUsername = oldUsername;

      cy.writeFile('cypress/fixtures/credential.json', data);
    });
  });

  it('should change password', () => {
    AccountPage.changePassword(creds.valid.password, creds.valid.newPassword);

    cy.readFile('cypress/fixtures/credential.json').then((data) => {
      const oldPassword = data.valid.password;
      const newPassword = data.valid.newPassword;

      // Swap values
      data.valid.password = newPassword;
      data.valid.newPassword = oldPassword;

      cy.writeFile('cypress/fixtures/credential.json', data);
    });
  });

  it('should not change password with wrong password', () => {
    AccountPage.changeWithWrongPassword('wrongpassword', 'newWrongpassword');
  });

  it('should not change password with duplicate password', () => {
    AccountPage.changeWithDuplicatePassword(creds.valid.password, creds.valid.password);
  });
});
