// Page Object for the Instances page

const SELECTOR_ACTIVE_CHECKBOX = 'label.el-checkbox';
const SELECTOR_DEPLOY_BUTTON = 'div.refresh.refresh-active.text-center.pointer';
const SELECTOR_INSTANCE_TABLE = '.el-table__body';
const SELECTOR_REFRESH_BUTTON = 'div.refresh';

class InstancesPage {
  // Navigate to the Instances page
  visit() {
    cy.visit('https://www.nebulablock.com/home');
    cy.get('.el-menu-item').contains('Instances').click({force:true});
  }

  // Check UI when there are no instances
  checkEmptyState() {
    cy.contains('Instances').should('be.visible');
    cy.contains('Start harnessing the power of GPUs now!').should('be.visible');
    cy.contains('Deploy').should('be.visible');
    cy.get(SELECTOR_ACTIVE_CHECKBOX).contains('Active').should('exist');
    cy.get(SELECTOR_REFRESH_BUTTON).contains('Refresh').should('be.visible');
  }

  // Check the instance table is present and has at least one row
  checkInstanceTable() {
    cy.get(SELECTOR_INSTANCE_TABLE).should('exist');
    cy.get(SELECTOR_INSTANCE_TABLE + ' tr').should('have.length.greaterThan', 0);
    // Add more checks for columns, status, etc. if needed
  }

  // Click the Deploy button
  clickDeploy() {
    cy.get(SELECTOR_DEPLOY_BUTTON).click();
  }
}

export default new InstancesPage(); 