import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import { ENDPOINTS } from '../support/constants';

describe('Contact Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      LoginPage.isLoggedIn(creds.valid.username);
      cy.url().should('include', ENDPOINTS.SERVERLESS);
    });
    ContactPage.visit();
    cy.url().should('include', ENDPOINTS.CONTACT);
  });

  context.skip('Check UI', () => {
    it('should display Contact UI', () => {
      ContactPage.checkUI();
    });

    it('should display all tabs', () => {
      ContactPage.checkTabs();
    });

    it('should display correct UI for User Problems tab', () => {
      ContactPage.switchToTab('User Problems');
      ContactPage.checkUserProblemsTabUI();
    });

    it('should display correct UI for Startup Applications tab', () => {
      ContactPage.switchToTab('Startup Applications');
      ContactPage.checkStartupApplicationsTabUI();
    });

    it('should display correct UI for Academia Application tab', () => {
      ContactPage.switchToTab('Academia Application');
      ContactPage.checkAcademiaApplicationTabUI();
    });


  });

  context('Check submit form functionality', () => {
    it('should upload file on User Problems tab', () => {
      ContactPage.submitUserProblemsForm(
        'Test subject for User Problems',
        'Test description for User Problems',
        'test.png'
      );
    });

    it.skip('should submit form on User Problems tab', () => {
      ContactPage.submitUserProblemsForm(
        'Test subject for User Problems',
        'Test description for User Problems',
        null
      );
    });

    it.skip('should submit form on Startup Applications tab', () => {
      ContactPage.submitStartupApplicationsForm(
        'Test Startup',
        'https://teststartup.com',
        'startup@email.com',
        'Test description for Startup Applications',
        null
      );
    });

    it.skip('should submit form on Academia Application tab', () => {
      ContactPage.submitAcademiaApplicationForm(
        'Test Project Title',
        'Test Institution',
        'academia@email.com',
        'Test description for Academia Application',
        null
      );
    });

 
  });
}); 