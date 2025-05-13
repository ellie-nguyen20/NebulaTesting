// Page Object for the Referral page

class ReferralPage {
  visit() {
    cy.visit('https://www.nebulablock.com/home');
    cy.get('.el-menu-item').contains('Referral').click({ force: true });
  }

  checkUI() {
    cy.contains('Referral').should('be.visible');
    cy.contains('Copy the link').should('be.visible');
    cy.contains('Share the link or code with your friends').should('be.visible');
    cy.contains('Add referral code').should('be.visible');
    cy.contains('Apply the code').should('be.visible');
    cy.contains('Referral Count').should('be.visible');
    cy.contains('Referral Earning').should('be.visible');
  }

  copyLink() {
    cy.contains('Copy the link').click({ force: true });
  }

  copyCode() {
    cy.get('.icon-copy').last().click({ force: true });
  }

  fillReferralCode(code) {
    cy.get('input').first().clear({ force: true }).type(code, { force: true });
  }

  applyReferralCode() {
    cy.contains('Apply the code').click({ force: true });
  }

  checkApplySuccess() {
    cy.contains('Success').should('be.visible');
  }

  checkApplyError() {
    cy.contains('Invalid Referral Code.').should('be.visible');
  }
}

export default new ReferralPage(); 