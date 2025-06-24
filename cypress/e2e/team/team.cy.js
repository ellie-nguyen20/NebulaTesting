import TeamPage from '../pages/TeamPage';
import LoginPage from '../pages/LoginPage';
import { ENDPOINTS } from '../../support/constants';

describe('Team Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      LoginPage.isLoggedIn(creds.valid.username);
      cy.url().should('include', ENDPOINTS.SERVERLESS);
    });
    TeamPage.visit();
    cy.url().should('include', ENDPOINTS.TEAM);
  });

  it('should display Team UI', () => {
    TeamPage.checkUI();
  });

  it('should display team table data', () => {
    TeamPage.checkTeamTableData();
  });

  it('should click Create Team button', () => {
    TeamPage.clickCreateTeam();
    // Add assertion for modal or navigation if needed
  });

  it('should click Refresh button', () => {
    TeamPage.clickRefresh();
    // Add assertion for refresh effect if needed
  });

  it('should click Manage button', () => {
    TeamPage.clickManage();
    // Add assertion for manage modal or navigation if needed
  });

  it('should click Delete button', () => {
    TeamPage.clickDelete();
    // Add assertion for delete confirmation if needed
  });

  it('should create a new team successfully')
}); 