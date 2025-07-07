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
    cy.contains('Invite Member').click({ force: true });
  }

  fillInviteEmail(email) {
    cy.get('input[placeholder="Email Address"]').should('be.visible').clear({ force: true }).type(email, { force: true });
  }

  confirmInvite() {
    cy.contains('div', 'send invitation').scrollIntoView().should('be.visible', { timeout: 10000 }).click({ force: true });
  }

  clickCancelPendingButton() {
    cy.contains('Cancel').click({ force: true });
  }

  clickConfirmCancel() {
    cy.contains('Cancel Invitation').click({ force: true });
  }

  clickDeleteTeam() {
    cy.contains('div', 'Delete Team').scrollIntoView().should('be.visible', { timeout: 10000 }).click({ force: true });
  }

  clickConfirmDelete() {
    cy.get('.el-dialog__body').contains('Delete Team').click({ force: true });
  }

  clickTransferOwnership() {
    cy.contains('div','Transfer Ownership').scrollIntoView().click({ force: true });

  }

  clickDropdownChoice(choiceText) {
    cy.get('.el-select-dropdown__item', { timeout: 10000 })
      .contains(choiceText)
      .click({ force: true });
  }
  

  clickConfirmTransferOwnership() {
    cy.get('.el-dialog__body').contains('Transfer Ownership').click({ force: true });
  }

  clickRemoveMemberByEmail(email) {
    cy.contains('tr', email).contains('Remove').click({ force: true });
  }
}

export default new TeamDetailPage(); 