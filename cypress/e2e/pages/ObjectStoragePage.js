// Page Object for the Object Storage page

class ObjectStoragePage {
  visit() {
    cy.visit('https://www.nebulablock.com/home');
    cy.get('.el-menu-item').contains('Object Storage').click({force:true});
  }

  openCreateModal() {
    cy.contains('Create').click({force:true});
  }

  fillLabel(label) {
    cy.get('input[type="text"]').last().clear({force:true}).type(label, {force:true});
  }

  selectStandard() {
    cy.contains('.cont', 'Standard').not('.is-disabled').click({force:true});
  }

  selectCanada() {
    cy.contains('.region-style', 'Canada').not('.is-disabled').click({force:true});
  }

  clickCreate() {
    cy.contains('div.create-btn', 'Create').click({force:true});
  }

  createObjectStorage(label) {
    this.openCreateModal();
    this.selectStandard();
    this.selectCanada();
    this.fillLabel(label);
    this.clickCreate();
  }

  viewObjectStorage(label) {
    cy.contains('tr', label).within(() => {
      cy.contains('View').click({force:true});
    });
  }

  regenerateKey() {
    cy.contains('regenerate key').click({force:true});
  }

  checkObjectStorageTable(label) {
    cy.contains('tr', label).should('exist');
    cy.contains('tr', label).within(() => {
      cy.contains('Canada').should('exist');
      cy.contains('Standard').should('exist');
      cy.contains('Ready').should('exist');
      cy.contains('View').should('exist');
      cy.contains('Delete').should('exist');
    });
  }

  checkCreateModal() {
    cy.contains('Standard').should('be.visible');
    cy.contains('Canada').should('be.visible');
    cy.get('input[type="text"]').last().should('be.visible');
    cy.contains('Create').should('be.visible');
  }

  checkViewModal(label) {
    cy.contains('Label:').next().should('contain', label);
    cy.contains('Location:').next().should('contain', 'Canada');
    cy.contains('Tier:').next().should('contain', 'Standard');
    cy.contains('S3 Credentials').should('be.visible');
    cy.contains('regenerate key').should('be.visible');
  }
}

export default new ObjectStoragePage(); 