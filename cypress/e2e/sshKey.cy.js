import SSHKeyPage from './pages/SSHKeyPage';
import LoginPage from './pages/LoginPage';
import { ENDPOINTS } from '../support/constants';

const TEST_KEY = 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCtestkey1234567890';
const HIDE_KEY = 'ssh-rsa A...234567890'

describe('SSH Key Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      cy.url().should('include', ENDPOINTS.SERVERLESS);
    });
    SSHKeyPage.visit();
    cy.url().should('include', ENDPOINTS.SSH_KEY);
  });

  it('should display SSH Key UI', () => {
    SSHKeyPage.checkUI();
  });

  it('should add new SSH key', () => {
    SSHKeyPage.addSSHKey();
  });

  it('should edit SSH key', () => {
    SSHKeyPage.editSSHKey();
  });

  it('should delete SSH key', () => {
    SSHKeyPage.deleteSSHKey();
  });

  it('should import SSH key', () => {
    SSHKeyPage.importSSHKey();
  });

  it('should export SSH key', () => {
    SSHKeyPage.exportSSHKey();
  });

  it('should display table UI', () => {
    SSHKeyPage.checkTableUI();
  });

  it('should open create modal and display UI', () => {
    SSHKeyPage.openCreateModal();
    SSHKeyPage.checkCreateModalUI();
  });

  it('should create a new SSH key', () => {
    SSHKeyPage.createKey('test-key', TEST_KEY);
    SSHKeyPage.checkKeyInTable('test-key');
  });

  it('should not allow creating duplicate SSH key', () => {
    SSHKeyPage.createKey('test-key-duplicate', TEST_KEY);
    SSHKeyPage.checkDuplicateKeyError();
  });

  it('should view SSH key details', () => {
    SSHKeyPage.checkKeyInTable('test-key');
    SSHKeyPage.viewKey('test-key');
    SSHKeyPage.checkViewModal(HIDE_KEY);
  });

  it('should copy SSH key in table', () => {
    SSHKeyPage.checkKeyInTable('test-key');
    SSHKeyPage.copyKeyInTable('test-key');
  });

  it('should copy SSH key in modal', () => {
    SSHKeyPage.checkKeyInTable('test-key');
    SSHKeyPage.viewKey('test-key');
    SSHKeyPage.copyKeyInModal();
  });

  it('should delete SSH key', () => {
    SSHKeyPage.viewKey('test-key');
    SSHKeyPage.deleteKeyInModal();
    SSHKeyPage.checkKeyNotInTable('test-key');
  });
}); 