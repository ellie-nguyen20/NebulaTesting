// Page Object for the Contact page

class ContactPage {
  visit() {
    cy.visit('https://www.nebulablock.com/home');
    cy.get('.el-menu-item').contains('Contact').click({ force: true });
  }

  checkUI() {
    cy.contains('Contact').should('be.visible');
    cy.contains('Subject').should('be.visible');
    cy.contains('Description').should('be.visible');
    cy.contains('Attachment').should('be.visible');
    cy.contains('Submit').should('be.visible');
  }

  fillSubject(subject) {
    cy.get('input[placeholder="Main subject about your issue"]').clear({ force: true }).type(subject, { force: true });
  }

  fillDescription(desc) {
    cy.get('textarea').first().clear({ force: true }).type(desc, { force: true });
  }

  submit() {
    cy.contains('Submit').click({ force: true });
    cy.wait(2000);
  }

  checkSuccessNotification() {
    cy.contains('Your request has been successfully sent.').should('be.visible');
  }
}

export default new ContactPage(); 