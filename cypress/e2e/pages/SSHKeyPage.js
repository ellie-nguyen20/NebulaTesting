// Page Object for the SSH Public Key page

class SSHKeyPage {
  visit() {
    cy.get('.el-menu-item').contains('SSH Public Key').click({ force: true });
  }

  openCreateModal() {
    cy.contains('Create').click({ force: true });
    cy.wait(2000);
    cy.get('input[placeholder="Name"]', { timeout: 10000 }).should('be.visible');
  }

  fillKeyName(name) {
    cy.get('input[placeholder="Name"]').clear({ force: true }).type(name, { force: true });
  }

  fillPublicKey(key) {
    cy.get('textarea[placeholder="SSH Public Key"]').clear({ force: true }).type(key, { force: true });
  }

  confirmCreate() {
    cy.contains('div.button.btn.border-radius-10', 'Confirm').click({ force: true });
  }

  checkDuplicateKeyError() {
    cy.contains('You already have an SSH key with the same public key content.').should('be.visible');
  }

  createKey(name, key) {
    this.openCreateModal();
    this.fillKeyName(name);
    this.fillPublicKey(key);
    this.confirmCreate();
  }

  checkKeyInTable(name) {
    cy.contains('tr', name).should('exist');
  }

  viewKey(name) {
    cy.contains('tr', name).within(() => {
      cy.contains('View').click({ force: true });
    });
  }

  checkViewModal(key) {
    cy.contains('SSH Public Key:').next().should('contain', key.substring(0, 10));
  }

  copyKeyInTable(name) {
    cy.contains('tr', name).within(() => {
      cy.get('.icon-copy').first().click({ force: true });
    });
  }

  copyKeyInModal() {
    cy.get('.icon-copy').first().click({ force: true });
  }

  deleteKeyInModal() {
    cy.contains('div', 'Delete').click({ force: true });
  }

  checkKeyNotInTable(name) {
    cy.contains('tr', name).should('not.exist');
  }

  checkCreateModalUI() {
    cy.contains('Key Name:').should('be.visible');
    cy.get('input[placeholder="Key Name"],input[placeholder="Name"]').should('be.visible');
    cy.contains('SSH Public Key:').should('be.visible');
    cy.get('textarea[placeholder="SSH Public Key"]').should('be.visible');
    cy.contains('div.button.btn.border-radius-10', 'Confirm').should('be.visible');
  }

  checkUI() {
    cy.contains('SSH Public Key').should('be.visible');
    cy.contains('Create').should('be.visible');
    cy.contains('Refresh').should('be.visible');
    cy.contains('Name').should('be.visible');
    cy.contains('Key Data').should('be.visible');
    cy.contains('Create Time').should('be.visible');
  }
}

export default new SSHKeyPage(); 