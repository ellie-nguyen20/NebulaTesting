class TeamDetailPage {
  // Check UI elements for a user with 'Owner' role
  checkOwnerUI() {
    cy.get('[data-cy=invite-member-button]').should('be.visible');
    cy.get('[data-cy=team-settings-tab]').should('be.visible');
    cy.get('[data-cy=disband-team-button]').should('be.visible');
  }

  // Check UI elements for a user with 'Member' role
  checkMemberUI() {
    cy.get('[data-cy=invite-member-button]').should('not.exist');
    cy.get('[data-cy=team-settings-tab]').should('not.exist');
    cy.get('[data-cy=leave-team-button]').should('be.visible');
  }

  // Action methods
  clickInviteMember() {
    cy.get('[data-cy=invite-member-button]').click();
  }

  clickLeaveTeam() {
    cy.get('[data-cy=leave-team-button]').click();
  }
}

export default new TeamDetailPage(); 