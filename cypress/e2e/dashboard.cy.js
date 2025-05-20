import { ENDPOINTS } from '../support/constants';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import { getLLMStatistics } from '../support/api_base';

describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      LoginPage.isLoggedIn(creds.valid.username);
      cy.url().should('include', ENDPOINTS.SERVERLESS);
    });
    DashboardPage.visit();
    cy.url().should('include', ENDPOINTS.DASHBOARD);
  });
  //Done

  it('Check sidebar and active state', () => {
    DashboardPage.checkSidebarMenu();
  });

  it('Check user name, balance, and user menu', () => {
    DashboardPage.checkUserInfo();
  });

  it('Check time filter button', () => {
    DashboardPage.checkTimeFilterButton();
  });
  
  it('should display Dashboard UI', () => {
    DashboardPage.checkUI();
  });

  it('Check tables have data', () => {
    DashboardPage.checkTablesHaveData();
  });

  it('Check dashboard links/tabs', () => {
    DashboardPage.checkDashboardLinks();
  });

  it('Check docs link', () => {
    DashboardPage.checkDocsLink();
  });

  it('should display resource summary', () => {
    DashboardPage.checkResourceSummary();
  });

  it('should display usage statistics', () => {
    DashboardPage.checkUsageStats();
  });
  
  // Add test for this later
  // it('LLM/VLM/Embedding API Requests chart displays correct total requests and model table from API', () => {
  //   getLLMStatistics().then((apiData) => {
  //     cy.log('API models:', JSON.stringify(apiData.models.map(m => m.model)));
  //     // Check total requests
  //     cy.get('span.font-18.color-border-80').contains('Total Requests:').should('contain', apiData.total_requests);
  //     // Wait for model table to render
  //     cy.get('.el-table__body').should('exist');
  //     cy.get('.el-table__body').its('length').then(len => cy.log('Table count:', len));
  //     // Log model list on UI
  //     cy.get('.el-table__body').first().find('tr td:first-child .cell').each(($el) => {
  //       cy.log('UI model:', $el.text());
  //     });
  //     // Check each model in the table
  //     apiData.models.forEach((model) => {
  //       cy.get('.el-table__body').first().within(() => {
  //         cy.contains('tr', model.model).within(() => {
  //           cy.get('td').last().should('contain', model.total_requests);
  //         });
  //       });
  //     });
  //   });
  // });

  // it('should update dashboard data when switching between Past 7 days and Past 24 hours', () => {
  //   // Ensure we are on Home
  //   DashboardPage.visit();
  //   cy.contains('Inference Usage').should('be.visible');

  //   // Check data when on Past 7 days
  //   cy.contains('Past 7 days').parent('label').find('input[type="radio"]').should('be.checked');
  //   cy.contains('LLM/VLM/Embedding API Requests').should('be.visible');
  //   cy.get('.el-table__body').first().within(() => {
  //     cy.get('tr').should('have.length.greaterThan', 0);
  //   });
  //   cy.contains('Total Requests:').should('not.contain', '0');

  //   // Switch to Past 24 hours
  //   cy.contains('Past 24 hours').parent('label').click();
  //   cy.contains('Past 24 hours').parent('label').find('input[type="radio"]').should('be.checked');

  //   // Check data is updated to No Data
  //   cy.contains('LLM/VLM/Embedding API Requests').should('be.visible');
  //   cy.get('.el-table__body').first().within(() => {
  //     cy.contains('No Data').should('exist');
  //   });
  //   cy.contains('Total Requests: 0').should('exist');

  //   // Switch back to Past 7 days and check data again
  //   cy.contains('Past 7 days').parent('label').click();
  //   cy.contains('Past 7 days').parent('label').find('input[type="radio"]').should('be.checked');
  //   cy.get('.el-table__body').first().within(() => {
  //     cy.get('tr').should('have.length.greaterThan', 0);
  //   });
  //   cy.contains('Total Requests:').should('not.contain', '0');
  // });
});
