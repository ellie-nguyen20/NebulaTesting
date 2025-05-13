// Page Object for the Billing page

class BillingPage {
  visit() {
    cy.visit('https://www.nebulablock.com/home');
    cy.get('.el-menu-item').contains('Billing').click({ force: true });
  }

  checkUI() {
    cy.contains('Available Credits').should('be.visible');
    cy.contains('Add Credits').should('be.visible');
    cy.contains('Configure Auto-Pay').should('be.visible');
    cy.contains('Add Payment Method').should('be.visible');
    cy.contains('Add Promotion Code').should('be.visible');
    cy.contains('Transactions').should('be.visible');
    cy.contains('Usages').should('be.visible');
  }

  clickAddCredits() {
    cy.contains('Add Credits').click({ force: true });
  }

  selectCreditAmount(amount) {
    cy.contains(`$${amount}`).click({ force: true });
  }

  payWithCard() {
    cy.contains('Pay with Card').click({ force: true });
  }

  payWithCrypto() {
    cy.contains('Pay with Crypto').click({ force: true });
  }

  configureAutoPay() {
    cy.contains('Configure Auto-Pay').click({ force: true });
  }

  saveAutoPaySettings() {
    cy.contains('Save Autopay Settings').click({ force: true });
  }

  addPaymentMethod() {
    cy.contains('Add Payment Method').click({ force: true });
  }

  addPromotionCode() {
    cy.contains('Add Promotion Code').click({ force: true });
  }

  redeemCode() {
    cy.contains('Redeem').click({ force: true });
  }

  refreshTransactions() {
    cy.contains('Transactions').parent().contains('Refresh').click({ force: true });
  }

  downloadInvoice() {
    cy.contains('Download PDF').first().click({ force: true });
  }

  filterUsages(type) {
    cy.contains(type).click({ force: true });
  }
}

export default new BillingPage(); 