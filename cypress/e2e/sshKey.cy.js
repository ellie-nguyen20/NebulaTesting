import SSHKeyPage from './pages/SSHKeyPage';
import LoginPage from './pages/LoginPage';

const TEST_KEY = 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCtestkey1234567890';
const HIDE_KEY = 'ssh-rsa A...234567890'

describe('SSH Public Key Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.fillEmail(creds.valid.email);
      LoginPage.fillPassword(creds.valid.password);
      LoginPage.clickSignIn();
      cy.wait(2000);
    });
    SSHKeyPage.visit();
    cy.wait(2000);
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