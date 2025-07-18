import AddPaymentMethod from '../components/AddPaymentmethod';
import { scrollToCheckVisibility } from '../../support/helpers';

class DashboardPage {
  get past7DaysButton() {
    return cy.get('label.el-segmented__item').contains('Past 7 days');
  }

  get past24HoursButton() {
    return cy.get('label.el-segmented__item').contains('Past 24 hours');
  }

  visit() {
    cy.get('.el-menu-item').contains('Home').click({ force: true });
  }

  checkUI() {
    cy.get('body').then($body => {
      if ($body.find('button.el-dialog__headerbtn').length) {
        cy.get('button.el-dialog__headerbtn').click({ force: true });
        cy.wait(500);
      }
    });
    scrollToCheckVisibility('Home');
    scrollToCheckVisibility('Inference Usage');
    scrollToCheckVisibility('Instances Usage');
  }

  checkTimeFilterButton() {
    this.checkDefaultTimeFilter();
    this.checkToggleTimeFilter();
  }

  checkDefaultTimeFilter() {
    cy.contains('Inference Usage')
      .parent()
      .find('.el-segmented')
      .find('.el-segmented__item')
      .should('have.length', 2)
      .as('label');
  
    cy.get('@label')
      .eq(0)
      .should('have.class', 'is-selected')
      .find('.el-segmented__item-label')
      .should('have.text', 'Past 7 days');

    cy.get('@label')
      .eq(1)
      .should('not.have.class', 'is-selected')
      .find('.el-segmented__item-label')
      .should('have.text', 'Past 24 hours');
  }

  checkToggleTimeFilter() {
    this.past24HoursButton.click()
    cy.contains('Inference Usage')
    .parent()
    .find('.el-segmented')
    .find('.el-segmented__item')
    .should('have.length', 2)
    .as('label');

    cy.get('@label')
      .eq(0)
      .should('not.have.class', 'is-selected')

    cy.get('@label')
      .eq(1)
      .should('have.class', 'is-selected');

    this.past7DaysButton.click()
    cy.get('@label')
      .eq(0)
      .should('have.class', 'is-selected')

    cy.get('@label')
      .eq(1)
      .should('not.have.class', 'is-selected');
  }



  choosePast7Days() {
    this.past7DaysButton.click().should('have.class', 'is-selected');
  }

  choosePast24Hours() {
    this.past24HoursButton.click().should('have.class', 'is-selected');
  }

  checkTimeFilterOption() {
    //Will add some test for this
    cy.contains('Last 7 days').should('be.visible');
    cy.contains('Last 24 hours').should('be.visible');
  }

  checkTablesHaveData() {
    cy.get('.el-table__body').each(($table) => {
      cy.wrap($table).find('tr').should('have.length.greaterThan', 0);
    });
  }

  checkResourceSummary() {
    scrollToCheckVisibility('Resource');
    scrollToCheckVisibility('Monitor your GPU, vCPU, ');
    scrollToCheckVisibility(' Memory and storage usage.');
    scrollToCheckVisibility('GPU Amount');
    scrollToCheckVisibility('VCPU');
    scrollToCheckVisibility('Memory');
    scrollToCheckVisibility('Storage');
  }

  checkUsageStats() {
    scrollToCheckVisibility('Usage');
    scrollToCheckVisibility('Current spend rate');
    scrollToCheckVisibility('$0/hr');
    scrollToCheckVisibility('Keep an eye on your daily spend ');
    scrollToCheckVisibility('with real-time insights');
    cy.get('#chart-Resource').scrollIntoView().should('be.visible');
  }

  checkUserInfo() {
    cy.get('.name-width').should('exist');
    cy.contains('$').should('exist');
    cy.get('.el-dropdown-link').click({ force: true });
    cy.contains('Account').should('exist');
    cy.contains('Logout').should('exist');
  }

  checkSidebarMenu() {
    const menus = [
      'Home', 'Instances', 'Object Storage', 'Serverless Models', 'SSH Public Key', 'API Keys', 'Billing',
      'Account','Team', 'Contact', 'Referral'
    ];
    menus.forEach(menu => {
      cy.get('.el-menu-item').should('contain', menu);
    });
    cy.get('.el-menu-item.is-active').should('contain', 'Home');
  }

  checkDashboardLinks() {
    const links = [
      { text: 'Deploy', expectedUrl: '/instance?type=deploy' },
      { text: 'My instance', expectedUrl: '/instance' },
      { text: 'Billing', expectedUrl: '/billing' },
      { text: 'Create SSH Key', expectedUrl: '/sshkey' },
      { text: 'Pricing', expectedUrl: '/pricing' },
      { text: 'Referral', expectedUrl: '/referral' },
      { text: '$', expectedUrl: '/billing'},
      // { text: 'Deposit', expectedUrl: '/home' }, add test for open modal Available Credits later
    ];

    links.forEach(link => {
      if (link.text === 'Upgrade') {
        cy.contains(link.text).should('exist').click();
        AddPaymentMethod.checkUIModal();
      } else {
        cy.contains(link.text).should('exist').click();
        cy.url({ timeout: 10000 }).should('include', link.expectedUrl);
        cy.visit('/home');
      }
    });
  }
  checkDocsLink() {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });
    cy.contains('Docs').should('exist').click();
    cy.get('@windowOpen').should('be.calledWith', 'https://docs.nebulablock.com/');
  }

  checkSwitchLanguageButtons() {
    // Check the existence of EN and FR buttons
    cy.contains('EN').should('be.visible');
    cy.contains('FR').should('be.visible');

    // Check initial state (assume default is EN, menu Home should be in English)
    cy.contains('Home').should('be.visible');
    cy.contains('Account').should('be.visible');

    // Click FR and check menu switches to French
    cy.contains('FR').click();
    cy.contains('Accueil').should('be.visible'); // Home -> Accueil
    cy.contains('Compte').should('be.visible'); // Account -> Compte

    // Click back to EN and check menu switches back to English
    cy.contains('EN').click();
    cy.contains('Home').should('be.visible');
    cy.contains('Account').should('be.visible');
  }
}

export default new DashboardPage();