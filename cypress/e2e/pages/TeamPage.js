import { scrollToCheckVisibility } from '../../support/helpers';

class TeamPage {
  visit() {
    cy.get('.el-menu-item').contains('Team').click({ force: true });
  }

  checkUI() {
    scrollToCheckVisibility('Team');
    cy.contains('Create Team').should('be.visible');
    cy.contains('Refresh').should('be.visible');
    cy.contains('Team Name').should('be.visible');
    cy.contains('Your Role').should('be.visible');
    cy.contains('Members').should('be.visible');
    cy.contains('Created At').should('be.visible');
    cy.contains('Actions').should('be.visible');
  }

  clickCreateTeam() {
    cy.contains('button', 'Create Team').click();
  }

  clickRefresh() {
    cy.contains('button', 'Refresh').click();
  }

  clickManage(teamName = 'my team') {
    cy.contains('tr', teamName).within(() => {
      cy.contains('button', 'Manage').click();
    });
  }

  clickDelete(teamName = 'my team') {
    cy.contains('tr', teamName).within(() => {
      cy.contains('button', 'Delete').click();
    });
  }

  checkTeamTableData(teamName = 'my team', role = 'Owner', members = '3') {
    cy.contains('tr', teamName).within(() => {
      cy.contains(teamName).should('exist');
      cy.contains(role).should('exist');
      cy.contains(members).should('exist');
      cy.contains('Manage').should('exist');
      cy.contains('Delete').should('exist');
    });
  }
}

export default new TeamPage(); 