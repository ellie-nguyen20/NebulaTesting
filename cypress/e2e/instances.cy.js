import InstancesPage from './pages/InstancesPage';
import LoginPage from './pages/LoginPage';
import DeployInstancePage from './pages/DeployInstancePage';

// E2E tests for the Instances page, including Deploy Instance flow

describe('Instances Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.fillEmail(creds.valid.email);
      LoginPage.fillPassword(creds.valid.password);
      LoginPage.clickSignIn();
      cy.wait(2000); // Wait for login and dashboard to load
    });
  });

  it('should show empty state when there are no instances', () => {
    InstancesPage.visit();
    InstancesPage.checkEmptyState();
  });

  it('should show instance table when there are deployed instances', () => {
    InstancesPage.visit();
    InstancesPage.checkInstanceTable();
  });

  it('should show deploy instance page and all required fields after clicking Deploy', () => {
    InstancesPage.visit();
    InstancesPage.clickDeploy();
    DeployInstancePage.checkDeployPageUI();
  });

  it('should show out-of-stock status for all hardware', () => {
    InstancesPage.visit();
    InstancesPage.clickDeploy();
    DeployInstancePage.checkAllHardwareOutOfStock();
  });

  it('should show SSH key warning if no SSH key is present', () => {
    InstancesPage.visit();
    InstancesPage.clickDeploy();
    DeployInstancePage.checkSSHKeyWarning();
  });
}); 