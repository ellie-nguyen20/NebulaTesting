import ServerlessPage from '../pages/ServerlessModelsPage';
import LoginPage from '../pages/LoginPage';
import { ENDPOINTS } from '../../support/constants';

describe('Serverless Page - Video model', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      LoginPage.isLoggedIn(creds.valid.username);
      cy.url().should('include', ENDPOINTS.SERVERLESS);
    });
    ServerlessPage.visit();
    cy.url().should('include', ENDPOINTS.SERVERLESS);
    cy.task('deleteAllFiles', 'cypress/downloads');

  });

  context('Check chat with each video model via Model Detail UI, time out 120s', () => {
    const videoModels = [
      'Seedance-1-0-pro',
      'Seedance-1.0-lite-i2v',
      'Seedance-1.0-lite-t2v',
    ];
    afterEach(() => {
        cy.task('deleteAllFiles', 'cypress/downloads');
    });

    videoModels.forEach(modelName => {
      it(`should chat with video model: ${modelName}`, () => {
        ServerlessPage.clickModel(modelName);
        cy.get('textarea[placeholder="Enter message here"]', { timeout: 10000 }).type('A beautiful unicorn is flying in the sky');
        ServerlessPage.clickSendButton();
        ServerlessPage.checkVideoResult();
        // ServerlessPage.checkVideoPlay();
        // ServerlessPage.checkVideoDownload();
        
      });
    });
  });
});

  
