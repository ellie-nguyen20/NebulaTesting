// Page Object for the Serverless Models page

class ServerlessModelsPage {
  visit() {
    cy.visit('https://www.nebulablock.com/home');
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
}

export default new ServerlessModelsPage(); 