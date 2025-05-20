import InstancesPage from './pages/InstancesPage';
import LoginPage from './pages/LoginPage';
import DeployInstancePage from './pages/DeployInstancePage';
import { ENDPOINTS } from '../support/constants';

describe('Instances Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      LoginPage.isLoggedIn(creds.valid.username);
      cy.url().should('include', ENDPOINTS.SERVERLESS);
    });
    InstancesPage.visit();
    cy.url().should('include', ENDPOINTS.INSTANCES);
  });

  it('should display Instances UI', () => {
    InstancesPage.checkUI();
  });

  it('should create new instance', () => {
    InstancesPage.createInstance();
  });

  it('should manage instance', () => {
    InstancesPage.manageInstance();
  });

  it('should show empty state when there are no instances', () => {
    InstancesPage.checkEmptyState();
  });

  it('should show instance table when there are deployed instances', () => {
    InstancesPage.checkInstanceTable();
  });

  it('should show deploy instance page and all required fields after clicking Deploy', () => {
    InstancesPage.clickDeploy();
    DeployInstancePage.checkDeployPageUI();
  });

  it('should show out-of-stock status for all hardware', () => {
    InstancesPage.clickDeploy();
    DeployInstancePage.checkAllHardwareOutOfStock();
  });

  it('should show SSH key warning if no SSH key is present', () => {
    InstancesPage.clickDeploy();
    DeployInstancePage.checkSSHKeyWarning();
  });

  it('should start instance', () => {
    InstancesPage.startInstance();
  });

  it('should stop instance', () => {
    InstancesPage.stopInstance();
  });

  it('should delete instance', () => {
    InstancesPage.deleteInstance();
  });
}); 