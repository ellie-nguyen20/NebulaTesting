import { scrollToCheckVisibility } from '../../support/helpers';
import TeamDetailPage from './TeamDetailPage';

class TeamPage {
  visit() {
    cy.get('.el-menu-item').contains('Team').click({ force: true });
  }

  manageButtonVisible() {
    cy.contains('div', 'Manage').should('be.visible');
  }
  deleteButtonVisible() {
    cy.contains('div', 'Delete').should('be.visible');
  }
  viewButtonVisible() {
    cy.contains('div', 'View').should('be.visible');
  }
 

  // Use this when you expect the user to have no teams
  checkEmptyStateUI() {
    cy.contains("Team Management").should('be.visible');
    cy.contains("You don't have any teams").should('be.visible');
    cy.contains("Create a team to invite and manage members.").should('be.visible');
    cy.contains("Create Team").should('be.visible');
    cy.get('[data-cy=team-table]').should('not.exist');
  }

  // Use this when you expect a list of teams to be present
  checkTeamListUI() {
    scrollToCheckVisibility('Team');
    cy.contains("Create Team").should('be.visible');
    cy.contains('Refresh').should('be.visible');
    cy.contains('Team Name').should('be.visible');
    cy.contains('Your Role').should('be.visible');
    cy.contains('Members').should('be.visible');
    cy.contains('Created At').should('be.visible');
    cy.contains('Actions').should('be.visible');
  }

  clickCreateTeam() {
    cy.contains('Create Team').click({ force: true });
    cy.wait(2000);
    cy.get('input[placeholder="Team Name"]', { timeout: 10000 }).should('be.visible');
  }

  clickRefresh() {
    cy.contains('Refresh').click();
  }

  fillTeamName(name) {
    cy.get('input[placeholder="Team Name"]').clear({ force: true }).type(name, { force: true });
  }

  fillTeamDescription(description) {
    cy.get('textarea[placeholder="Team Description"]').clear({ force: true }).type(description, { force: true });
  }

  confirmCreate() {
    cy.contains('div.button', 'Create Team').click({ force: true });
  }
  // This action navigates to the team detail page
  clickManage(teamName) {
    cy.contains('tr', teamName).within(() => {
      cy.contains('div', 'Manage').click();
    });
    return TeamDetailPage;
  }

  clickDelete(teamName ) {
    cy.contains('tr', teamName).within(() => {
      cy.contains('div', 'Delete').click();
    });
  }
  confirmDelete() {
    cy.contains('div.button', 'Delete Team').click({ force: true });
  }
}

export default new TeamPage(); 