// Page Object for the API Keys page

class ApiKeysPage {
  visit() {
    cy.get('.el-menu-item').contains('API Keys').click({ force: true });
  }

  checkUI() {
    cy.contains('API Keys').should('be.visible');
    cy.get('div').contains('sk-').should('exist');
    cy.get('.icon-copy').should('be.visible');
    cy.get('span.el-dropdown-link:has(svg)').first().trigger('mouseover', { force: true });
    cy.wait(300);
    this.clickRegenerate();
    cy.contains('Are you sure you want to regenerate your API key? This will invalidate your current API key and you will need to update any applications that use it.').should('be.visible');
    cy.contains('Dismiss').should('be.visible');
    cy.contains('REGENERATE API KEY').should('be.visible');
  }

  getApiKey() {
    return cy.get('div').contains('sk-').invoke('text');
  }

  clickCopy() {
    cy.get('.icon-copy').first().click({ force: true });
  }

  clickRegenerate() {
    cy.contains('Regenerate API Key').click({ force: true });
  }
  createApiKey() {
    cy.get('span.el-dropdown-link:has(svg)').first().trigger('mouseover', { force: true });
    cy.wait(300);
    this.clickRegenerate();
    cy.contains('Create API Key successfully').should('be.visible');
  }
  copyApiKey() {
    this.clickCopy();
    cy.contains('Copied').should('be.visible');
  }
}

export default new ApiKeysPage(); 