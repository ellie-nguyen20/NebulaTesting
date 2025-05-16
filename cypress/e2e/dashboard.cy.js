import { ENDPOINTS } from '../support/constants';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import { getLLMStatistics } from '../support/api_base';

describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      cy.url().should('include', ENDPOINTS.SERVERLESS);
    });
    DashboardPage.visit();
    cy.url().should('include', ENDPOINTS.DASHBOARD);
  });

  it('should display Dashboard UI', () => {
    DashboardPage.checkUI();
  });

  it('should display usage statistics', () => {
    DashboardPage.checkUsageStats();
  });

  it('should display recent activities', () => {
    DashboardPage.checkRecentActivities();
  });

  it('should display resource summary', () => {
    DashboardPage.checkResourceSummary();
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
