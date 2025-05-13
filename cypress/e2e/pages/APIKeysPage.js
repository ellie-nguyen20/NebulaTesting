// Page Object for the API Keys page

class APIKeysPage {
  visit() {
    cy.visit('https://www.nebulablock.com/home');
    cy.get('.el-menu-item').contains('API Keys').click({ force: true });
  }

  checkUI() {
    cy.contains('API Keys').should('be.visible');
    cy.contains('Regenerate API Key').should('be.visible');
    cy.get('div').contains('sk-P').should('exist'); // API key prefix
  }

  getApiKey() {
    // Get API key text (format: sk-P...)
    return cy.get('div').contains('sk-P').invoke('text');
  }

  clickCopy() {
    cy.get('.icon-copy').first().click({ force: true });
  }

  clickRegenerate() {
    cy.contains('Regenerate API Key').click({ force: true });
  }

  checkApiKeyChanged(oldKey) {
    cy.get('div').contains('sk-P').invoke('text').should('not.eq', oldKey);
  }
}

export default new APIKeysPage(); 