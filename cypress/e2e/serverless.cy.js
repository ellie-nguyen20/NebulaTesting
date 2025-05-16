import ServerlessPage from './pages/ServerlessPage';
import LoginPage from './pages/LoginPage';
import { ENDPOINTS } from '../support/constants';

describe('Serverless Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      cy.url().should('include', ENDPOINTS.SERVERLESS);
    });
    ServerlessPage.visit();
    cy.url().should('include', ENDPOINTS.SERVERLESS);
  });

  it('should display Serverless UI', () => {
    ServerlessPage.checkUI();
  });

  it('should create new function', () => {
    ServerlessPage.createFunction();
  });

  it('should deploy function', () => {
    ServerlessPage.deployFunction();
  });

  it('should delete function', () => {
    ServerlessPage.deleteFunction();
  });
}); 