// Page Object for the Account page

class AccountPage {
  visit() {
    cy.visit('https://www.nebulablock.com/home');
    cy.get('.el-menu-item').contains('Account').click({ force: true });
  }

  checkUI() {
    cy.contains('Account').should('be.visible');
    cy.contains('Edit Profile').should('be.visible');
    cy.contains('Change Password').should('be.visible');
    cy.contains('Personal Information').should('be.visible');
    cy.contains('Engineer Tier 1').should('be.visible');
  }

  clickEditProfile() {
    cy.contains('Edit Profile').click({ force: true });
  }

  checkEditProfileModal() {
    // Check modal or fields in modal (adjust selectors if UI is different)
    cy.contains('Edit Profile').should('be.visible');
  }

  clickChangePassword() {
    cy.contains('Change Password').click({ force: true });
  }

  checkChangePasswordModal() {
    // Check modal or fields in modal (adjust selectors if UI is different) 
    cy.contains('Change Password').should('be.visible');
  }
}

export default new AccountPage(); 