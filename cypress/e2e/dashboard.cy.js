import '../support/commands';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import { getLLMStatistics } from '../support/api_base';

describe('Dashboard UI', () => {
  before(() => {
    cy.fixture('credential').then((creds) => {
      cy.log('Before hook creds:', JSON.stringify(creds));
      cy.loginAndSaveToken(creds);
    });
  });

  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      cy.log('Loaded creds:', JSON.stringify(creds));
      cy.log('creds.valid:', JSON.stringify(creds && creds.valid));
      cy.log('creds.valid.email:', creds && creds.valid && creds.valid.email);
      cy.log('creds.valid.password:', creds && creds.valid && creds.valid.password);
      LoginPage.visit();
      LoginPage.fillEmail(creds.valid.email);
      LoginPage.fillPassword(creds.valid.password);
      LoginPage.clickSignIn();
      cy.wait(2000); // Wait for login and dashboard to load
      DashboardPage.goToHomeTab();
    });
  });

  it('Check main sections', () => {
    DashboardPage.checkMainSections();
  });

  it('Check tables have data', () => {
    DashboardPage.checkTablesHaveData();
  });

  it('Check summary numbers', () => {
    DashboardPage.checkSummaryNumbers();
  });

  it('Check user name, balance, and user menu', () => {
    DashboardPage.checkUserInfo();
  });

  it('Check sidebar and active state', () => {
    DashboardPage.checkSidebarMenu();
  });

  it('Check dashboard links/tabs', () => {
    DashboardPage.checkDashboardLinks();
  });

  it('LLM/VLM/Embedding API Requests chart displays correct total requests and model table from API', () => {
    getLLMStatistics().then((apiData) => {
      cy.log('API models:', JSON.stringify(apiData.models.map(m => m.model)));
      // Check total requests
      cy.get('span.font-18.color-border-80').contains('Total Requests:').should('contain', apiData.total_requests);
      // Wait for model table to render
      cy.get('.el-table__body').should('exist');
      cy.get('.el-table__body').its('length').then(len => cy.log('Table count:', len));
      // Log model list on UI
      cy.get('.el-table__body').first().find('tr td:first-child .cell').each(($el) => {
        cy.log('UI model:', $el.text());
      });
      // Check each model in the table
      apiData.models.forEach((model) => {
        cy.get('.el-table__body').first().within(() => {
          cy.contains('tr', model.model).within(() => {
            cy.get('td').last().should('contain', model.total_requests);
          });
        });
      });
    });
  });
}); 