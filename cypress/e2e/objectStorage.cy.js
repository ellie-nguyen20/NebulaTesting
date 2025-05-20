import ObjectStoragePage from './pages/ObjectStoragePage';
import LoginPage from './pages/LoginPage';
import { ENDPOINTS } from '../support/constants';

describe('Object Storage Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      LoginPage.isLoggedIn(creds.valid.username);
      cy.url().should('include', ENDPOINTS.SERVERLESS);
    });
    ObjectStoragePage.visit();
    cy.url().should('include', ENDPOINTS.OBJECT_STORAGE);
  });

  it('should display Object Storage UI', () => {
    ObjectStoragePage.checkUI();
  });

  it('should create new bucket', () => {
    ObjectStoragePage.createBucket();
  });

  it('should upload file to bucket', () => {
    ObjectStoragePage.uploadFile();
  });

  it('should delete bucket', () => {
    ObjectStoragePage.deleteBucket();
  });
}); 