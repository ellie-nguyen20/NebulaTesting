// Page Object for the Contact page

import 'cypress-file-upload';

class ContactPage {
  visit() {
    cy.get('.el-menu-item').contains('Contact').click({ force: true });
  }

  checkUI() {
    cy.contains('Contact').should('be.visible');
    cy.contains('Our dedicated support team is here to help you with any questions or concerns related to the Nebula Block platform. We aim to provide timely and accurate responses, and your understanding is appreciated.').should('be.visible');
    cy.contains('Subject').should('be.visible');
    cy.contains('Description').should('be.visible');
    cy.contains('Attachment').should('be.visible');
    cy.contains('Submit').should('be.visible');
  }

  fillSubject(subject) {
    cy.get('input[placeholder="Main subject about your issue"]').clear({ force: true }).type(subject, { force: true });
  }

  fillDescription(desc) {
    cy.get('textarea').first().clear({ force: true }).type(desc, { force: true });
  }

  submit() {
    cy.contains('.button-default', 'Submit').click({ force: true });
  }

  checkSuccessNotification() {
    cy.contains('Your request has been successfully sent.', { timeout: 10000 }).should('be.visible');
  }

  checkTabs() {
    cy.contains('User Problems').should('be.visible');
    cy.contains('Startup Applications').should('be.visible');
    cy.contains('Academia Application').should('be.visible');
  }

  switchToTab(tabName) {
    cy.contains(tabName).click({ force: true });
  }

  uploadAttachment(filePath) {
    cy.get('input[type="file"]').attachFile(filePath);
  }


  submitFormOnTab(tabName, subject, description) {
    this.switchToTab(tabName);
    this.fillSubject(subject);
    this.fillDescription(description);
    this.submit();
    this.checkSuccessNotification();
  }

  checkUserProblemsTabUI() {
    cy.contains('Subject').should('be.visible');
    cy.contains('Description').should('be.visible');
    cy.contains('Attachment').should('be.visible');
    cy.contains('Upload your ScreenShot here').should('be.visible');
    cy.contains('Submit').should('be.visible');
  }

  checkStartupApplicationsTabUI() {
    cy.contains('Submit Your Startup Application').should('be.visible');
    cy.contains('Brief about what type of startups they support').should('be.visible');
    cy.contains('Startup Name').should('be.visible');
    cy.contains('Website (optional)').should('be.visible');
    cy.contains('Contact Email').should('be.visible');
    cy.contains('Pitch Deck').should('be.visible');
    cy.contains('Upload your Pitch Deck here').should('be.visible');
    cy.contains('Description').should('be.visible');
    cy.contains('Submit').should('be.visible');
  }

  checkAcademiaApplicationTabUI() {
    cy.contains('Submit Your Academic Proposal').should('be.visible');
    cy.contains('Description of supported academic initiatives').should('be.visible');
    cy.contains('Project Title').should('be.visible');
    cy.contains('Institution').should('be.visible');
    cy.contains('Contact Email').should('be.visible');
    cy.contains('Proposal Document').should('be.visible');
    cy.contains('Upload your Proposal Document here').should('be.visible');
    cy.contains('Description').should('be.visible');
    cy.contains('Submit').should('be.visible');
  }

  submitUserProblemsForm(subject, description, filePath) {
    this.switchToTab('User Problems');
    this.fillSubject(subject);
    this.fillDescription(description);
    if (filePath) {
      cy.get('input[type="file"]').attachFile(filePath);
    }
    this.submit();
    this.checkSuccessNotification();
  }

  submitStartupApplicationsForm(startupName, website, email, description, filePath) {
    this.switchToTab('Startup Applications');
    cy.get('input[placeholder="Your startup name"]').clear({ force: true }).type(startupName, { force: true });
    cy.get('input[placeholder="Your website"]').clear({ force: true }).type(website, { force: true });
    cy.get('input[placeholder="Your contact email"]').clear({ force: true }).type(email, { force: true });
    cy.get('textarea').first().clear({ force: true }).type(description, { force: true });
    if (filePath) {
      cy.get('input[type="file"]').attachFile(filePath);
    }
    this.submit();
    this.checkSuccessNotification();
  }

  submitAcademiaApplicationForm(projectTitle, institution, email, description, filePath) {
    this.switchToTab('Academia Application');
    cy.get('input[placeholder="Your project title"]').clear({ force: true }).type(projectTitle, { force: true });
    cy.get('input[placeholder="Your Institution"]').clear({ force: true }).type(institution, { force: true });
    cy.get('input[placeholder="Your contact email"]').clear({ force: true }).type(email, { force: true });
    cy.get('textarea').first().clear({ force: true }).type(description, { force: true });
    if (filePath) {
      cy.get('input[type="file"]').attachFile(filePath);
    }
    this.submit();
    this.checkSuccessNotification();
  }
}

export default new ContactPage(); 