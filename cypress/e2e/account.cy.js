import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';

describe('Account Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.fillEmail(creds.valid.email);
      LoginPage.fillPassword(creds.valid.password);
      LoginPage.clickSignIn();
      cy.wait(2000);
    });
    AccountPage.visit();
    cy.wait(1000);
  });

  it('should display Account UI', () => {
    AccountPage.checkUI();
  });

  it('should open Edit Profile modal', () => {
    AccountPage.clickEditProfile();
    AccountPage.checkEditProfileModal();
  });

  it('should open Change Password modal', () => {
    AccountPage.clickChangePassword();
    AccountPage.checkChangePasswordModal();
  });
}); 