// Page Object for the API Keys page

class ApiKeysPage {
  visit() {
    cy.get('.el-menu-item').contains('API Keys').click({ force: true });
  }

  checkUI() {
    cy.contains('API Keys').should('be.visible');
    cy.contains('Generate New API Key').should('be.visible');
    cy.contains('Refresh').should('be.visible');
  }

  getApiKey() {
    return cy.get('div').contains('sk-').invoke('text');
  }

  clickCopy(name) {
    cy.contains('tr',name).find('.icon-copy').eq(1).click({ force: true });
    cy.contains(name).should('be.visible');
  }

  clickRegenerate() {
    cy.contains('Regenerate').click({ force: true });
  }
  createApiKey(keyname) {
    this.clickRegenerate();
    cy.get('input[placeholder="API Key Name"]').type(keyname);
    cy.contains('Ok').click({ force: true });
    cy.contains('API key updated successfully').should('be.visible');
  }

  copyApiKey(name) {
    this.clickCopy(name);
    cy.wait(1000);
    cy.contains('Copied').should('be.visible', { timeout: 10000 });
  }
}

export default new ApiKeysPage(); 