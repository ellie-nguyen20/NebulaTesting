// Page Object for the Deploy Instance page

const SELECTOR_DEPLOY_BUTTON = 'button,div'; // Use a more specific selector if needed
const SELECTOR_OUT_OF_STOCK = 'div:contains("Currently out of stock")';
const SELECTOR_SSH_KEY_WARNING = 'span:contains("Please add an SSH public key.")';

class DeployInstancePage {
 
  // Check all required UI fields on the Deploy Instance page
  checkDeployPageUI() {
    cy.contains('Location').should('be.visible');
    cy.contains('Hardware').should('be.visible');
    cy.contains('Image').should('be.visible');
    cy.contains('SSH Public Key').should('be.visible');
    cy.contains('Server Hostname').should('be.visible');
    cy.contains('Deploy').should('be.visible');
  }

  // Check that all hardware options are out of stock
  checkAllHardwareOutOfStock() {
    cy.get(SELECTOR_OUT_OF_STOCK).should('exist');
  }

  // Check for SSH key warning message
  checkSSHKeyWarning() {
    cy.get(SELECTOR_SSH_KEY_WARNING).should('be.visible');
  }

  // Optionally: implement deployInstance if hardware is available and SSH key exists
}

export default new DeployInstancePage(); 