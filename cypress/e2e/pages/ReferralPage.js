// Page Object for the Referral page

class ReferralPage {
  visit() {
    cy.get('.el-menu-item').contains('Referral').click({ force: true });
  }

  checkUI() {
    cy.contains('Referral').should('be.visible');
    cy.contains('Earn up to 4.00%: 3.00% from serverless and 1.00% from compute').should('be.visible');
    cy.contains('Copy the link').should('be.visible');
    cy.contains('https://dev-portal.nebulablock.com/register?referral').should('be.visible');
    cy.contains('or code').should('be.visible');
    cy.contains('Share the link or code with your friends').should('be.visible');
    cy.contains('Every penny the spend gets you closer to earning up to 4.00%!').should('be.visible');
    cy.contains('Learn More').should('be.visible');

    // Apply Referral code section
    cy.contains('Add referral code').should('be.visible');
    cy.contains('Apply a valid referral code to claim your extra welcome bonus!').should('be.visible');
    cy.get('input').should('be.visible');
    cy.contains('Apply the code').should('be.visible');

    // Referral history section
    cy.contains('Referral Count').should('be.visible');
    cy.contains('Users you referred').should('be.visible');

    // Referral Earning section
    cy.contains('Referral Earning ($)').should('be.visible');
    cy.contains('Up to 4.00% earnings from your referrals').should('be.visible');

    // Upgrade Threshold section
    cy.contains('Upgrade Threshold').should('be.visible');
    cy.contains('Next level commission 5.00% from serverless and 1.00% from compute!').should('be.visible');
    cy.contains('Remained').should('be.visible');
  }

  copyLink() {
    cy.contains('Copy the link').click({ force: true });
  }

  copyCode() {
    cy.get('.icon-copy').last().click({ force: true });
  }

  fillReferralCode(code) {
    cy.get('input[placeholder="Paste referral code here..."]', { timeout: 10000 }).clear({ force: true }).type(code, { force: true });
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