class LoginPage {
  visit() {
    cy.visit('https://www.nebulablock.com/home');
  }
  fillEmail(email) {
    cy.get('body').then($body => {
      if ($body.find('button.el-dialog__headerbtn').length) {
        this.closeOverlay();
      }
    });
    cy.get('input[type="text"]').first().clear({force: true}).type(email, {force: true});
  }
  fillPassword(password) {
    cy.get('body').then($body => {
      if ($body.find('button.el-dialog__headerbtn').length) {
        this.closeOverlay();
      }
    });
    cy.get('input[type="password"]').first().clear({force: true}).type(password, {force: true});
  }
  clickSignIn() {
    cy.get('body').then($body => {
      if ($body.find('button.el-dialog__headerbtn').length) {
        this.closeOverlay();
        cy.wait(500);
      }
    });
    cy.get('button.el-button--primary').first().click();
  }
  closeOverlay() {
    cy.get('button.el-dialog__headerbtn').click({force:true});
    cy.wait(500);
  }
  logout() {
    cy.contains('Account').click({force:true});
    cy.contains('Logout').click({force:true});
  }
  isLoggedIn() {
    cy.contains('vu nguyen').should('exist');
  }
  isLoginError() {
    cy.contains('SIGN IN').should('exist');
  }
}

export default new LoginPage();
