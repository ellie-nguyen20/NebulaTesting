class DashboardPage {
  visit() {
    cy.visit('https://www.nebulablock.com/home');
  }

  goToHomeTab() {
    cy.get('.menu-title').contains('Home').click({force:true});
  }

  checkMainSections() {
    cy.contains('Home').should('be.visible');
    cy.contains('Inference Usage').should('be.visible');
    cy.contains('Instances Usage').should('be.visible');
  }

  checkTablesHaveData() {
    cy.get('.el-table__body').each(($table) => {
      cy.wrap($table).find('tr').should('have.length.greaterThan', 0);
    });
  }

  checkSummaryNumbers() {
    cy.contains('Total Requests').should('exist');
    cy.contains('Total Tokens').should('exist');
    cy.contains('Total Steps').should('exist');
    cy.contains('$0/hr').should('exist');
  }

  checkUserInfo() {
    cy.get('.name-width').should('exist');
    cy.contains('$').should('exist');
    cy.get('.el-dropdown-link').click({force:true});
    cy.contains('Account').should('exist');
    cy.contains('Logout').should('exist');
  }

  checkSidebarMenu() {
    const menus = [
      'Home', 'Instances', 'Object Storage', 'Serverless Endpoints',
      'Dedicated Endpoints', 'SSH Public Key', 'API Keys', 'Billing',
      'Account', 'Contact', 'Referral'
    ];
    menus.forEach(menu => {
      cy.get('.el-menu-item').should('contain', menu);
    });
    cy.get('.el-menu-item.is-active').should('contain', 'Home');
  }

  checkDashboardLinks() {
    const links = [
      'Deploy', 'My instance', 'Billing', 'Create SSH Key',
      'Pricing', 'Docs', 'Referral', 'Upgrade'
    ];
    links.forEach(link => {
      cy.contains(link).should('exist');
    });
  }
}

export default new DashboardPage(); 