import ServerlessPage from '../pages/ServerlessModelsPage';
import LoginPage from '../pages/LoginPage';
import { ENDPOINTS } from '../../support/constants';

describe('Serverless Page - Multimodal, text, vision model', () => {
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

  context('Check chat with each model via Model Detail UI, time out 20s', () => {
    const models = [
      'Claude-Sonnet-4',
      'GPT-4o-mini',
      'Gemini-2.5-Pro-Preview-06-05',
      'Gemini-2.5-Pro-Preview-05-06',
      'Gemini-2.5-Flash-Preview-05-20',
      'Gemini-2.0-Flash',
      'DeepSeek-R1-0528 (free)',
      'DeepSeek-V3-0324 (free)',
      'DeepSeek-R1 (free)',
      'Llama3.3-70B',
      'Qwen-QwQ-32B',
      'Qwen2.5-VL-7B-Instruct',
    ];
  
  
  
    models.forEach(modelName => {
      it(`should chat with model: ${modelName}`, () => {
        ServerlessPage.clickModel(modelName);
        cy.get('textarea[placeholder="Enter message here"]', { timeout: 10000 }).type('Hi, I need help');
        ServerlessPage.clickSendButton();
        cy.contains('Hi, I need help').should('be.visible');
        cy.get('div.tools.show', { timeout: 20000 }).should('have.length', 1);
  
      });
    });
  });
});

  
