import ServerlessPage from '../pages/ServerlessModelsPage';
import LoginPage from '../pages/LoginPage';
import { ENDPOINTS } from '../../support/constants';

describe('Serverless Page - Image model', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      LoginPage.isLoggedIn(creds.valid.username);
      cy.url().should('include', ENDPOINTS.SERVERLESS);
    });
    ServerlessPage.visit();
    cy.url().should('include', ENDPOINTS.SERVERLESS);
  });

  context('Check chat with each image model via Model Detail UI, time for limitation 60s', () => {
    const imageModels = [
      'Bytedance-Seedream-3.0',
      'SD-XL 1.0-base',
      'FLUX.1 [schnell]',
    ];
    afterEach(() => {
      cy.wait(60000);
    });

    imageModels.forEach(modelName => {
      it(`should chat with image model: ${modelName}`, () => {
        ServerlessPage.clickModel(modelName);
        cy.get('textarea[placeholder="Enter message here"]', { timeout: 10000 }).type('A beautiful cat');
        ServerlessPage.clickSendButton();
        ServerlessPage.checkImageResult();
        ServerlessPage.checkBase64ImageResult();
      });
    });
  });

});

  
