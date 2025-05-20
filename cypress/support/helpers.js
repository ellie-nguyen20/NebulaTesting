// helpers.js
export const scrollToCheckVisibility = (selector) => {
    cy.contains(selector).scrollIntoView().should('be.visible', { timeout: 10000 });
  };
  