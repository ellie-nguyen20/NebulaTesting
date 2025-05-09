import ObjectStoragePage from './pages/ObjectStoragePage';
import LoginPage from './pages/LoginPage';

const label = 'friday-' + Date.now();

describe('Object Storage Page', () => {
  before(() => {
    cy.fixture('credentials').then((credentials) => {
      LoginPage.visit();
      LoginPage.fillEmail(credentials.valid.email);
      LoginPage.fillPassword(credentials.valid.password);
      LoginPage.clickSignIn();
      cy.wait(2000);
    });
  });

  beforeEach(() => {
    ObjectStoragePage.visit();
    cy.wait(1000);
  });

  it('should display all main UI components', () => {
    cy.contains('Create').should('be.visible');
    cy.contains('Active').should('be.visible');
    cy.contains('Refresh').should('be.visible');
    cy.contains('Name').should('be.visible');
    cy.contains('Location').should('be.visible');
    cy.contains('Charges').should('be.visible');
    cy.contains('Tier').should('be.visible');
    cy.contains('Status').should('be.visible');
    cy.contains('View').should('exist');
    cy.contains('Delete').should('exist');
    cy.contains('Total').should('be.visible');
  });

  it('should open create modal and display all UI elements', () => {
    ObjectStoragePage.openCreateModal();
    ObjectStoragePage.checkCreateModal();
  });

  it('should create a new object storage if Standard/Canada is in stock', () => {
    ObjectStoragePage.createObjectStorage(label);
    // Xác nhận object storage mới xuất hiện trong bảng
    ObjectStoragePage.checkObjectStorageTable(label);
    cy.contains('Object storage successfully created').should('exist');
  });

  it('should view details of the created object storage', () => {
    ObjectStoragePage.viewObjectStorage(label);
    ObjectStoragePage.checkViewModal(label);
    cy.contains('Storage Usage').should('be.visible');
    cy.contains('Bandwidth Usage').should('be.visible');
    cy.contains('Current Charges').should('be.visible');
    cy.contains('S3 Credentials').should('be.visible');
    cy.contains('Overview').should('be.visible');
    cy.contains('Buckets').should('be.visible');
  });

  it('should regenerate S3 key in view modal', () => {
    ObjectStoragePage.viewObjectStorage(label);
    ObjectStoragePage.regenerateKey();
    // Không thể xác thực key đổi do bị ẩn, nhưng xác nhận không lỗi và nút vẫn còn
    cy.contains('regenerate key').should('be.visible');
  });
}); 