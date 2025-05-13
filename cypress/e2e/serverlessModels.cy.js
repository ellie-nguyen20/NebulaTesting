import ServerlessModelsPage from './pages/ServerlessModelsPage';
import LoginPage from './pages/LoginPage';

describe('Serverless Models Page', () => {
  const models = [
    'DeepSeek-V3-0324',
    'DeepSeek-R1-Distill-Llama-70B',
    'DeepSeek-R1-Distill-Qwen-32B',
    'Llama3.3-70B',
    'Qwen-QwQ-32B',
    'Qwen2.5-Coder-32B',
    'Bring your own model',
    'SD-XL 1.0-base',
    'FLUX.1 [schnell]',
    'FLUX.1 [Fill-dev]',
    'UAE-Large-V1',
    'BGE-large-en-v1.5',
    'M2-BERT-Retrieval-32k',
    'Qwen2.5-VL-7B-Instruct',
  ];

  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.fillEmail(creds.valid.email);
      LoginPage.fillPassword(creds.valid.password);
      LoginPage.clickSignIn();
      cy.wait(2000);
    });
    ServerlessModelsPage.visit();
  });

  it('should display all models', () => {
    ServerlessModelsPage.checkAllModelsVisible(models);
  });

  models.forEach((model) => {
    it(`should allow clicking model: ${model}`, () => {
      ServerlessModelsPage.clickModel(model);
    });
  });
}); 