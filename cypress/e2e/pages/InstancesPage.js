const SELECTOR_ACTIVE_CHECKBOX = 'label.el-checkbox';
const SELECTOR_DEPLOY_BUTTON = 'div.refresh.refresh-active.text-center.pointer';
const SELECTOR_INSTANCE_TABLE = '.el-table__body';
const SELECTOR_REFRESH_BUTTON = 'div.refresh';

class InstancesPage {
  // Navigate to the Instances page
  visit() {
    cy.get('.el-menu-item').contains('Instances').click({force:true});
  }

  // Check UI when there are no instances

  checkUI() {
    cy.contains('Start Using GPU Instances').should('be.visible');
    cy.contains('Launch your first GPU instance for ML, training, or rendering tasks.').should('be.visible');
    cy.contains('Continue').should('be.visible');
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