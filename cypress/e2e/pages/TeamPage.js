import { scrollToCheckVisibility } from '../../support/helpers';
import TeamDetailPage from './TeamDetailPage';

class TeamPage {
  visit() {
    cy.get('.el-menu-item').contains('Team').click({ force: true });
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
    cy.get('[data-cy=create-team-button]').click();
  }

  clickRefresh() {
    cy.get('[data-cy=refresh-button]').click();
  }

  // This action navigates to the team detail page
  clickManage(teamName = 'my team') {
    cy.contains('tr', teamName).within(() => {
      cy.get('[data-cy=manage-button]').click();
    });
    return TeamDetailPage;
  }

  clickDelete(teamName = 'my team') {
    cy.contains('tr', teamName).within(() => {
      cy.get('[data-cy=delete-button]').click();
    });
  }

  checkTeamTableData(teamName = 'my team', role = 'Owner', members = '3') {
    cy.contains('tr', teamName).within(() => {
      cy.get('[data-cy=team-role]').should('contain', role);
      cy.get('[data-cy=team-members]').should('contain', members);
      cy.get('[data-cy=manage-button]').should('exist');
      cy.get('[data-cy=delete-button]').should('exist');
    });
  }
}

export default new TeamPage(); 