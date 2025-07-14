class ObjectStoragePage {
  visit() {
    cy.get('.el-menu-item').contains('Object Storage').click({force:true});
  }

  openCreateModal() {
    cy.contains('Create').click({force:true});
  }

  fillLabel(label) {
    cy.get('input[placeholder="Please enter a label to create your object storage"]').clear({ force: true }).type(label, { force: true });
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

  checkUI() {
    cy.contains('Object Storage').should('be.visible');
    cy.contains('Start Using Object Storage Service').should('be.visible');
    cy.contains('Store, access, and scale effortlessly with Object Storage.').should('be.visible');
    cy.contains('Continue Creating Object Storage').should('be.visible');
  
 
  }

  checkDetailCreatingObjectStorage() {
    cy.get('div.pointer').contains('Continue Creating Object Storage').should('be.visible').click();
    cy.contains('Object Storage', { timeout: 10000 }).should('be.visible');
    cy.contains('Back', { timeout: 10000 }).should('be.visible');
    cy.contains('Ownership').should('be.visible');
    cy.contains('Personal').should('be.visible');
    cy.contains('Label').should('be.visible');
    cy.contains('Storage Type').should('be.visible');
    cy.contains('Standard').should('be.visible');
    cy.contains('Free').should('be.visible');
    cy.contains('Reliable and durable storage for businesses requiring high-capacity solutions.').should('be.visible');
    cy.contains('Performance').should('be.visible');
    cy.contains('$0.015/GB/month').should('be.visible');
    cy.contains('Low-latency storage designed for demanding workloads and frequent access.').should('be.visible');
    cy.contains('Accelerated').should('be.visible');
    cy.contains('$0.02/GB/month').should('be.visible');
    cy.contains('Ultra-fast storage for high-performance and write-intensive applications.').should('be.visible');
    cy.contains('Location').should('be.visible');
    cy.contains('Canada').should('be.visible');
    cy.contains('US').should('be.visible');
    cy.contains('Pricing details').should('be.visible');
    cy.contains('Data storage').should('be.visible');
    cy.contains('Outgoing traffic').should('be.visible');
    cy.contains('Incoming traffic').should('be.visible');
    cy.contains('After creating the object storage, you will be able to create buckets and manage your storage.').should('be.visible');
    cy.contains('Create').should('be.visible');
  }
  createObjectStorage(label) {
    this.fillLabel(label);
    cy.contains('Create').should('be.visible').click();
    cy.contains('Object storage successfully created').should('be.visible');
  }

  selectTeam(teamName) {
    cy.get('.el-select-dropdown__item', { timeout: 10000 })
      .contains(teamName)
      .click({ force: true });
    cy.wait(1000)
  }
}

export default new ObjectStoragePage(); 