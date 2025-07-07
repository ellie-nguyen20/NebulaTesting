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

  it('Check sidebar and active state', () => {
    DashboardPage.checkSidebarMenu();
  });

  it('Check user information', () => {
    DashboardPage.checkUserInfo();
  });

  it('check switch language buttons', () => {
    DashboardPage.checkSwitchLanguageButtons();
  });

  it('Check dashboard links/tabs', () => {
    DashboardPage.checkDashboardLinks();
  });

  it('Check docs link', () => {
    DashboardPage.checkDocsLink();
  });

  it('Check time filter button', () => {
    DashboardPage.checkTimeFilterButton();
  });
  
  it('should display Dashboard UI', () => {
    DashboardPage.checkUI();
  });

  it('should display resource summary', () => {
    DashboardPage.checkResourceSummary();
  });

  it('should display usage statistics', () => {
    DashboardPage.checkUsageStats();
  });

  it.skip('LLM/VLM/Embedding API Requests and data table should be displayed correctly', () => {})

  it.skip('LLM/VLM/Embedding Token Generation and data table should be displayed correctly', () => {})

  it.skip('Image API Requests and data table should be displayed correctly', () => {})

  it.skip('Image Generation and data table should be displayed correctly', () => {})

});
