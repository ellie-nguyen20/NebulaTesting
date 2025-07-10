import { scrollToCheckVisibility } from '../../support/helpers';
class HomePage {
  visit() {
    cy.visit('/');
  }

  checkUI() {
    cy.contains('Rent').should('be.visible');
    cy.contains('Compute Power').should('be.visible');
    cy.contains('On Demand').should('be.visible');
    cy.contains('Access high-performance GPUs and CPUs instantly').should('be.visible');
    cy.contains('Trusted by the Best').should('be.visible');
    cy.contains('Our Mission').should('be.visible');
    cy.contains('Empowering innovation').should('be.visible');
    scrollToCheckVisibility('Proud NVIDIA Partner Network (NPN) ');
    scrollToCheckVisibility('Our Service');
    // scrollToCheckVisibility('Serverless AI');
    // scrollToCheckVisibility('Compute');
    scrollToCheckVisibility("Canada's First Sovereign AI Cloud");
    scrollToCheckVisibility('How Nebula Block Works');
    scrollToCheckVisibility('Advantage');
    scrollToCheckVisibility('AI Pioneers Since 2020');
    scrollToCheckVisibility('Cost-Effective Solutions');
    scrollToCheckVisibility('Tailored Expertise for You');
    scrollToCheckVisibility('Start your AI journey');
    scrollToCheckVisibility('Get in touch');
    scrollToCheckVisibility('Services');
    scrollToCheckVisibility('Contact Us');
    scrollToCheckVisibility('GitHub');
    scrollToCheckVisibility('API');
    // scrollToCheckVisibility('Docs');
    scrollToCheckVisibility('Newsletter');
    scrollToCheckVisibility('Subscribe to our newsletter');
  }

  checkMenu() {
    const menus = [
      'Serverless AI', 'Compute', 'Pricing', 'Blog', 'Company', 'FAQs', 'Docs', 'EN', 'FR', 'Launch', 'Sign up', 'Log in'
    ];
    menus.forEach(menu => {
      cy.contains(menu)
        .scrollIntoView({ offset: { top: -100, left: 0 } })
        .should('exist')
    });
  }

  clickChatBot() {
    cy.contains('Search for GPU resources').click({ force: true });
    cy.contains('h4','Search for GPU resources').should('be.visible', { timeout: 10000 });
  }

  sendchat(message) {
    cy.iframe('iframe[src*="chat.nebulablock.com"]').find('textarea[placeholder="Ask our AI expert now"]',{ timeout: 10000 }).should('be.visible').type(message);
    cy.iframe('iframe[src*="chat.nebulablock.com"]').find('button.btn-primary.btn-medium.ml-3.w-8.px-0',{ timeout: 10000 }).should('be.visible').click({ force: true });
  }
}

export default new HomePage(); 