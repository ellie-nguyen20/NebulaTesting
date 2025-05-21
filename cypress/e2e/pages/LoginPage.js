// cypress/e2e/pages/LoginPage.js

class LoginPage {
  visit() {
    cy.visit('/home');
  }

  closeOverlayIfVisible() {
    cy.get('body').then(($body) => {
      if ($body.find('button.el-dialog__headerbtn').length) {
        cy.get('button.el-dialog__headerbtn').click({ force: true });
        cy.wait(500); 
      }
    });
  }

  checkUI() {
    cy.contains('SIGN IN').should('exist');
    cy.get('input[placeholder="Your email address"]', { timeout: 10000 }).should('exist');
    cy.get('input[placeholder="Your password"]', { timeout: 10000 }).should('exist');    
    cy.contains('Remember me').should('exist');
    cy.contains('SIGN UP').should('exist');
    cy.contains('Forgot password?').should('exist');
  }

  fillEmail(email) {
    this.closeOverlayIfVisible();
    cy.get('input[placeholder="Your email address"]', { timeout: 10000 })
      .clear({ force: true })
      .type(email, { force: true });
  }

  fillPassword(password) {
    this.closeOverlayIfVisible();
    cy.get('input[type="password"]', { timeout: 10000 })
      .first()
      .clear({ force: true })
      .type(password, { force: true });
  }

  clickSignIn() {
    this.closeOverlayIfVisible();
    cy.get('button.el-button--primary').first().click();
  }

  login(email, password) {
    this.visit();
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickSignIn();
  }

  logout() {
    cy.contains('Account').click({ force: true });
    cy.contains('Logout').click({ force: true });
  }

  isLoggedIn(username) {
    cy.contains(username).should('be.visible', { timeout: 10000 });
  }

  isLoginError() {
    cy.contains('The user is not registered yet, please sign up.').should('be.visible');
  }
}

export default new LoginPage();
