// Page Object for the Serverless Models page
import { scrollToCheckVisibility } from '../../support/helpers';

class ServerlessModelsPage {
  visit() {
    cy.get('.el-menu-item').contains('Serverless Models').click({ force: true });
  }

  getModelDiv(modelName) {
    return cy.contains('div', modelName);
  }

  clickModel(modelName) {
    this.getModelDiv(modelName).scrollIntoView().click({ force: true });
  }

  checkModelVisible(modelName) {
    this.getModelDiv(modelName).scrollIntoView().should('be.visible');
  }

  checkModelDescription(modelName, description) {
    this.getModelDiv(modelName)
      .parent()
      .should('contain.text', description);
  }

  checkAllModelsVisible(modelList) {
    modelList.forEach((model) => {
      this.checkModelVisible(model);
    });
  }
  checkUI() {
    // Check main model groups
    cy.contains('multimodal Models').should('be.visible');
    cy.contains('Text Models').should('be.visible');
    cy.contains('Image Models').should('be.visible');
    scrollToCheckVisibility('Embedding Models');
    scrollToCheckVisibility('Vision Models');
    scrollToCheckVisibility('Video Models');

    // Check all models displayed on the page
    const allModels = [
      // Multimodal Models
      'Claude-Sonnet-4',
      'GPT-4o-mini',
      'Gemini-2.5-Pro-Preview-06-05',
      'Gemini-2.5-Pro-Preview-05-06',
      'Gemini-2.5-Flash-Preview-05-20',
      'Gemini-2.0-Flash',
      // Text Models
      'DeepSeek-R1-0528 (free)',
      'DeepSeek-V3-0324 (free)',
      'DeepSeek-R1 (free)',
      'Llama3.3-70B',
      'Qwen-QwQ-32B',
      'Bring your own model',
      // Image Models
      'Bytedance-Seedream-3.0',
      'SD-XL 1.0-base',
      'FLUX.1 [schnell]',
      // Embedding Models
      'UAE-Large-V1',
      'BGE-large-en-v1.5',
      // Vision Models
      'Qwen2.5-VL-7B-Instruct',
      // Video Models
      'SeeDance',
    ];
    this.checkAllModelsVisible(allModels);
  }

  clickModelDropdown(modelName) {
    cy.get('.el-tooltip__trigger').contains(modelName).click({ force: true });
  }

  clickSystemPrompt() {
    cy.get('.el-tooltip__trigger').contains('Default').click({ force: true });
  }

  checkModelDetailUI(modelName) {
    // Back button
    cy.contains('Back').should('be.visible');

    // Tabs/Sections
    cy.contains('Serverless').should('be.visible');
    cy.contains('Chat').should('be.visible');
    cy.contains('API').should('be.visible');

    // Model info
    cy.contains('$15 / M tokens').should('be.visible');
    cy.contains('Claude-Sonnet-4').should('be.visible');

    // Chat input area
    cy.contains("What's on your mind?").should('be.visible');

    // Model type sections
    this.clickModelDropdown(modelName);
    cy.contains('MULTIMODAL').should('be.visible');
    cy.contains('TEXT').should('be.visible');
    scrollToCheckVisibility('li', 'IMAGE');
    scrollToCheckVisibility('li', 'EMBEDDING');
    scrollToCheckVisibility('li', 'VISION');
    scrollToCheckVisibility('li', 'VIDEO');

    // List of models in each type
    const allModels = [
      // MULTIMODAL
      'Claude-Sonnet-4',
      'GPT-4o-mini',
      'Gemini-2.5-Pro-Preview-06-05',
      'Gemini-2.5-Pro-Preview-05-06',
      'Gemini-2.5-Flash-Preview-05-20',
      'Gemini-2.0-Flash',
      // TEXT
      'DeepSeek-R1-0528 (free)',
      'DeepSeek-V3-0324 (free)',
      'DeepSeek-R1 (free)',
      'Llama3.3-70B',
      'Qwen-QwQ-32B',
      // IMAGE
      'Bytedance-Seedream-3.0',
      'SD-XL 1.0-base',
      'FLUX.1 [schnell]',
      // EMBEDDING
      'UAE-Large-V1',
      'BGE-large-en-v1.5',
      // VISION
      'Qwen2.5-VL-7B-Instruct',
      // VIDEO
      'SeeDance',
      'SeeDance',
      'SeeDance',
    ];
    allModels.forEach(model => {
      scrollToCheckVisibility(model);
    });

    // System Prompt
    this.clickSystemPrompt();
    cy.contains('System Prompt').should('be.visible');
    cy.contains('Default').should('be.visible');
    cy.contains('Create new prompt').should('be.visible');



    // Switch to API tab
    cy.contains('.el-segmented__item-label', 'API').click({ force: true });
    // Check default (Python) tab is active
    cy.contains('.el-tabs__item', 'Python').should('have.class', 'is-active');
    // Switch to cURL tab and check active
    cy.contains('.el-tabs__item', 'cURL').click({ force: true });
    cy.contains('.el-tabs__item', 'cURL').should('have.class', 'is-active');
    // Switch to JavaScript tab and check active
    cy.contains('.el-tabs__item', 'JavaScript').click({ force: true });
    cy.contains('.el-tabs__item', 'JavaScript').should('have.class', 'is-active');
    // Switch back to Python tab and check active
    cy.contains('.el-tabs__item', 'Python').click({ force: true });
    cy.contains('.el-tabs__item', 'Python').should('have.class', 'is-active');


  }
}

export default new ServerlessModelsPage(); 