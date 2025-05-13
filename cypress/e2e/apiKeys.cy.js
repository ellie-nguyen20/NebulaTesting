import APIKeysPage from './pages/APIKeysPage';
import LoginPage from './pages/LoginPage';

describe('API Keys Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.fillEmail(creds.valid.email);
      LoginPage.fillPassword(creds.valid.password);
      LoginPage.clickSignIn();
      cy.wait(2000);
    });
    APIKeysPage.visit();
    cy.wait(1000);
  });

  it('should display API Keys UI', () => {
    APIKeysPage.checkUI();
  });

  it('should copy API key', () => {
    APIKeysPage.clickCopy();
  });

  it('should regenerate API key', () => {
    APIKeysPage.getApiKey().then((oldKey) => {
      APIKeysPage.clickRegenerate();
      cy.wait(2000);
      APIKeysPage.checkApiKeyChanged(oldKey);
    });
  });
}); 