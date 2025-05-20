class AddPaymentMethod {
  constructor() {}

  checkUIModal() {
    // Check modal title
    cy.contains('Add Payment Method').should('be.visible');
    // Check close button
    cy.get('.modal-header .close').should('exist');
    // Check Stripe iframe for address
    cy.get('iframe[title="Secure address input frame"]', { timeout: 10000 }).should('exist');
    // Check Stripe iframe for payment
    cy.get('iframe[title="Secure payment input frame"]', { timeout: 20000 }).should('exist');
   // Check Add Card button
   cy.get('button').contains('Add Card').should('be.visible');
  }

  closeModal() {
    cy.get('.modal-header .close').click({ force: true });
  }

  clickAddCard() {
    cy.get('button').contains('Add Card').click();
  }

  checkSuccessMessage() {
    cy.contains('Card Added Successfully!').should('be.visible');
  }
}

export { AddPaymentMethod };
export default new AddPaymentMethod();
