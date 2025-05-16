class AccountPage {
  visit() {
    cy.get('.el-menu-item').contains('Account').click({ force: true });
  }

  checkUI() {
    cy.contains('Account').should('be.visible');
    cy.contains('Edit Profile').should('be.visible');
    cy.contains('Change Password').should('be.visible');
    cy.contains('Personal Information').should('be.visible');
    cy.contains('Engineer Tier').should('be.visible');
    cy.contains('Address').should('be.visible');
  }

  clickEditProfile() {
    cy.contains('Edit Profile').click({ force: true });
    cy.contains('Edit Personal Information').should('be.visible');
  }

  clickChangePassword() {
    cy.contains('Change Password').click({ force: true });
    cy.contains('Change Password').should('be.visible');
  }
  fillPassword(currentPassword, newPassword) {
    cy.contains('label', 'Old Password').parent().find('input').clear().type(currentPassword);
    cy.contains('label', 'New Password').parent().find('input').clear().type(newPassword);
    cy.contains('label', 'Confirm Password').parent().find('input').clear().type(newPassword);
    cy.contains('Save').click({ force: true });
  }

  updateUsername(username) {
    cy.contains('label', 'Name:').parent().find('input').clear().type(username);
    cy.contains('Save').click({ force: true });
  }

  updateProfile(name) {
    this.clickEditProfile();
    this.updateUsername(name);
    cy.contains('User info updated successfully').should('be.visible');
  }

  changePassword(currentPassword, newPassword) {
    this.clickChangePassword();
    this.fillPassword(currentPassword, newPassword);
    cy.contains('Password updated successfully.').should('be.visible');
  }

  changeWithWrongPassword(currentPassword, newPassword) {
    this.clickChangePassword();
    this.fillPassword(currentPassword, newPassword);
    cy.contains('Current password is incorrect.').should('be.visible');
  }
  changeWithDuplicatePassword(currentPassword, newPassword) {
    this.clickChangePassword();
    this.fillPassword(currentPassword, newPassword);
    cy.contains('Current and new passwords must be different.').should('be.visible');
  }
}

export default new AccountPage(); 