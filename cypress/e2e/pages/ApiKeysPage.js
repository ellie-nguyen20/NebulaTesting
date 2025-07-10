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

  clickDelete(name) {
    cy.contains('tr',name).contains('Delete').click({ force: true });
    
  }

  deleteApikey(name) {
    this.clickDelete(name);
    cy.contains('.button', 'Delete').click({ force: true });
    cy.contains('API key deleted successfully').should('be.visible');
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

  clickCreateApiKey() {
    cy.contains('Generate New API Key').click({ force: true });
  }

  createNewApiKey(keyname, teamname) {
    cy.get('input[placeholder="API Key Name"]').type(keyname);
    cy.get('.el-select-dropdown__item', { timeout: 10000 })
        .contains(teamname)
        .click({ force: true });
    cy.contains('Ok').click({ force: true });
    cy.contains('New API key generated successfully').should('be.visible');
  }
}

export default new ApiKeysPage(); 