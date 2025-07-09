import ApiKeysPage from './pages/ApiKeysPage';
import LoginPage from './pages/LoginPage';
import { ENDPOINTS } from '../support/constants';

describe('API Keys Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      LoginPage.isLoggedIn(creds.valid.username);
      cy.url().should('include', ENDPOINTS.SERVERLESS);
    });
    ApiKeysPage.visit();
    cy.url().should('include', ENDPOINTS.API_KEYS);
  });

  context('when user have 1 API personal key (default value)', () => {
    it('should display API Keys Default UI', () => {
      ApiKeysPage.checkUI();
    });
  
    it('should regenerate API key', () => {
      ApiKeysPage.createApiKey('Test API Key');
    });
  
    it('should copy API key', () => {
      ApiKeysPage.copyApiKey('Test API Key');
    });
  });

 
  
}); 