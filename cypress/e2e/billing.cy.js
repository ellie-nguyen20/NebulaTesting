import BillingPage from './pages/BillingPage';
import LoginPage from './pages/LoginPage';

describe('Billing Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.fillEmail(creds.valid.email);
      LoginPage.fillPassword(creds.valid.password);
      LoginPage.clickSignIn();
      cy.wait(2000);
    });
    BillingPage.visit();
    cy.wait(1000);
  });

  it('should display Billing UI', () => {
    BillingPage.checkUI();
  });

  it('should open add credits and select amount', () => {
    BillingPage.clickAddCredits();
    BillingPage.selectCreditAmount(10);
  });

  it('should open and interact with payment methods', () => {
    BillingPage.payWithCard();
    BillingPage.payWithCrypto();
  });

  it('should configure and save auto-pay', () => {
    BillingPage.configureAutoPay();
    BillingPage.saveAutoPaySettings();
  });

  it('should open add payment method', () => {
    BillingPage.addPaymentMethod();
  });

  it('should add and redeem promotion code', () => {
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