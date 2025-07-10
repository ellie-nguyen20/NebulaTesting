import ApiKeysPage from './pages/ApiKeysPage';
import LoginPage from './pages/LoginPage';
import { ENDPOINTS } from '../support/constants';
import '../../cypress/support/commands';

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

  context('when user has own team, he can create, delete API key for team', () => {
    let teamId;
    const teamName = 'Test team apikey';
    const teamDesc = 'Test Description';
  
    beforeEach(() => {
      cy.fixture('credential').then((creds) => {
        cy.loginByApi(creds.valid.email, creds.valid.password);
      });
  
      cy.createTeam(teamName, teamDesc).then((team) => {
        teamId = team.id;
      });
  
      ApiKeysPage.visit();
      cy.url().should('include', ENDPOINTS.API_KEYS);
    });
  
    afterEach(() => {
      if (teamId) {
        cy.deleteTeam(teamId);
        cy.wait(1000);
      }
    });
  
    it('should create API key for team', () => {
      ApiKeysPage.clickCreateApiKey();
      ApiKeysPage.createNewApiKey('Test key', teamName);
    });
  
    it('should delete API key for team', () => {
      ApiKeysPage.clickCreateApiKey();
      ApiKeysPage.createNewApiKey('Test key', teamName);
      ApiKeysPage.deleteApikey('Test key');
    });
  });
  

 
}); 