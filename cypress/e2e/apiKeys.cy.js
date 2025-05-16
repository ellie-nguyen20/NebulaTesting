import ApiKeysPage from './pages/ApiKeysPage';
import LoginPage from './pages/LoginPage';
import { ENDPOINTS } from '../support/constants';

describe('API Keys Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      cy.url().should('include', ENDPOINTS.SERVERLESS);
    });
    ApiKeysPage.visit();
    cy.url().should('include', ENDPOINTS.API_KEYS);
  });

  it('should display API Keys UI', () => {
    ApiKeysPage.checkUI();
  });

  it('should regenerate API key', () => {
    ApiKeysPage.createApiKey();
  });

  it('should copy API key', () => {
    ApiKeysPage.copyApiKey();
  });
  
}); 