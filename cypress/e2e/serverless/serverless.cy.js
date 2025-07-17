import ServerlessPage from '../pages/ServerlessModelsPage';
import LoginPage from '../pages/LoginPage';
import { ENDPOINTS } from '../../support/constants';

describe('Serverless Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      LoginPage.isLoggedIn(creds.valid.username);
      cy.url().should('include', ENDPOINTS.SERVERLESS);
    });
    ServerlessPage.visit();
    cy.url().should('include', ENDPOINTS.SERVERLESS);
  });
  context('Check UI for Serverless Models Page', () => {

  it('should display Serverless Models UI', () => {
    ServerlessPage.checkUI();
  });

  it('should display Model Detail UI', () => {
    ServerlessPage.clickModel('Claude-Sonnet-4');
    ServerlessPage.checkModelDetailUI('Claude-Sonnet-4');
  });
});  
}); 