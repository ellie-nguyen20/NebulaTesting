import BillingPage from './pages/BillingPage';
import LoginPage from './pages/LoginPage';
import { ENDPOINTS } from '../support/constants';

describe('Billing Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      LoginPage.isLoggedIn(creds.valid.username);
      cy.url().should('include', ENDPOINTS.SERVERLESS);
    });
    BillingPage.visit();
    cy.url().should('include', ENDPOINTS.BILLING);
  });
    
  it('should display Billing UI', () => {
    BillingPage.checkUI();
  });

  it('should open Add Credits and select amount', () => {
    BillingPage.clickAddCredits();
  });

  it('should open and interact with payment methods', () => {
    BillingPage.payWithCard();
    BillingPage.payWithCrypto();
  });

  it('should configure and save Auto-pay', () => {
    BillingPage.configureAutoPay();
    BillingPage.saveAutoPaySettings();
  });

  it.only('should open Add Payment Method', () => {
    BillingPage.addPaymentMethod();
  });

  it('should add and redeem Promotion Code', () => {
    BillingPage.addPromotionCode();
    BillingPage.redeemCode();
  });

  it('should refresh transactions and download invoice', () => {
    BillingPage.refreshTransactions();
    BillingPage.downloadInvoice();
  });

  it('should filter usages', () => {
    BillingPage.filterUsages('All');
    BillingPage.filterUsages('Compute');
    BillingPage.filterUsages('Serverless');
  });
});
