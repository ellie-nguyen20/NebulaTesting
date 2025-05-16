import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import { ENDPOINTS } from '../support/constants';

describe('Contact Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      cy.url().should('include', ENDPOINTS.SERVERLESS);
    });
    ContactPage.visit();
    cy.url().should('include', ENDPOINTS.CONTACT);
  });

  it('should display Contact UI', () => {
    ContactPage.checkUI();
  });

  it('should submit contact form', () => {
    ContactPage.submitForm();
  });
}); 