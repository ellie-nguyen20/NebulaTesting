import TeamPage from '../pages/TeamPage';
import TeamDetailPage from '../pages/TeamDetailPage';
import LoginPage from '../pages/LoginPage';
import { ENDPOINTS } from '../../support/constants';
import '../../support/commands';

describe('Team Management', () => {
  const teamName = 'Test Team'
  context('when user is Owner, he can create, delete team', () => {
    beforeEach(() => {
      cy.fixture('credential').then((creds) => {
        LoginPage.visit();
        LoginPage.login(creds.valid.email, creds.valid.password);
        LoginPage.isLoggedIn(creds.valid.username);
        cy.url().should('include', ENDPOINTS.SERVERLESS);
      });
      TeamPage.visit();
      cy.url().should('include', ENDPOINTS.TEAM);
    });

    it.skip('should create new team successfully', () => {
      TeamPage.clickCreateTeam();
      TeamPage.fillTeamName(teamName);
      TeamPage.fillTeamDescription('Test Description');
      TeamPage.confirmCreate();
      cy.contains('Team created successfully').should('be.visible');
    });

    it.skip('should delete team successfully', () => {
      TeamPage.clickDelete(teamName);
      TeamPage.confirmDelete();
      cy.contains('Team deleted successfully').should('be.visible');
    });

  });

  context('when user is Owner, he can invite member, cancel pending invitation, remove member, transfer ownership', () => {
    let teamId;

    beforeEach(() => {
      cy.fixture('credential').then((creds) => {
        LoginPage.visit();
        LoginPage.login(creds.valid.email, creds.valid.password);
        LoginPage.isLoggedIn(creds.valid.username);
        cy.url().should('include', ENDPOINTS.SERVERLESS);
      });
      TeamPage.visit();
      cy.url().should('include', ENDPOINTS.TEAM);

      cy.fixture('users').then((users) => {
        cy.loginByApi(users.Ellie.email, users.Ellie.password);
      });
    });

    it.skip('should invite user to team successfully', () => {
      cy.createTeam(teamName, 'Test Description');
      TeamPage.clickRefresh();
      TeamPage.clickManage(teamName);
      TeamDetailPage.clickInviteMember();
      TeamDetailPage.fillInviteEmail('test@gmail.com');
      cy.wait(1000);
      TeamDetailPage.confirmInvite();
      cy.contains('Team member invited successfully').should('be.visible');
    });

    it.skip('should cancel pending invitation successfully', () => {
      TeamPage.clickManage(teamName);
      TeamDetailPage.clickCancelPendingButton();
      TeamDetailPage.clickConfirmCancel();
      cy.contains('canceled').should('be.visible');
      TeamDetailPage.clickDeleteTeam();
      TeamDetailPage.clickConfirmDelete();
    });

    it.skip('should remove member from the team successfully', () => {
      cy.createTeam(teamName, 'Test Description').then((team) => {
        teamId = team.id;
        cy.fixture('users').then((users) => {
          cy.inviteAndAcceptMember(teamId, users.Ellie, users.Member1);
        });
        TeamPage.clickRefresh();
        TeamPage.clickManage(teamName);
        TeamDetailPage.clickRemoveMember();
      });
    });

    it('should transfer ownership of the team successfully', () => {
      cy.createTeam(teamName, 'Test Description').then((team) => {
        teamId = team.id;
        cy.fixture('users').then((users) => {
          cy.inviteAndAcceptMember(teamId, users.Ellie, users.Member1);
        });
        TeamPage.clickRefresh();
        TeamPage.clickManage(teamName);
        cy.wait(1000);
        TeamDetailPage.clickTransferOwnership();
        cy.wait(1000);
        TeamDetailPage.clickDropdownChoice('thivunguyen1506+member1@gmail.com');
        cy.wait(1000);
        TeamDetailPage.clickConfirmTransferOwnership();
        cy.wait(1000);
        cy.contains('tr', 'You')
          .within(() => {
            cy.contains('div', 'Admin').should('be.visible');
        });
          
    });
    })

    it.skip('should remove member from the team successfully', () => {})
  }); 

  // context('when user is Owner, he can edit roles and permissions of all team members', () => {
  //   beforeEach(() => {
  //     cy.fixture('credential').then((creds) => {
  //       LoginPage.visit();
  //       LoginPage.login(creds.valid.email, creds.valid.password);
  //       LoginPage.isLoggedIn(creds.valid.username);
  //       cy.url().should('include', ENDPOINTS.SERVERLESS);
  //     });
  //   }); 

  //   it('should edit roles successfully', () => {
  //     TeamPage.clickManage(teamName);
  //     TeamDetailPage.clickEditRolesAndPermissions();
  //     TeamDetailPage.fillEditRolesAndPermissions('test@test.com');
  //     TeamDetailPage.confirmEditRolesAndPermissions();
  //     cy.contains('Team member roles and permissions updated successfully').should('be.visible');
  //   });

  //   it('should edit permissions successfully', () => {
  //     TeamPage.clickManage(teamName);
  //     TeamDetailPage.clickEditRolesAndPermissions();
  //     TeamDetailPage.fillEditRolesAndPermissions('test@test.com');
  //     TeamDetailPage.confirmEditRolesAndPermissions();
  //     cy.contains('Team member roles and permissions updated successfully').should('be.visible');
  //   });

  // });


//   context('when user is Admin', () => {
//     beforeEach(() => {
//       cy.fixture('credential').then((creds) => {
//         LoginPage.visit();
//         LoginPage.login(creds.valid.email, creds.valid.password);
//         LoginPage.isLoggedIn(creds.valid.username);
//         cy.url().should('include', ENDPOINTS.SERVERLESS);
//       });
//     });

//     it('should delete team successfully', () => {
//       TeamPage.clickDelete('Test Team');
//       TeamPage.confirmDelete();
//       cy.contains('Team deleted successfully').should('be.visible');
//     });

//     it('should invite user to team successfully', () => { 
//       TeamPage.clickManage('Test Team');
//       TeamDetailPage.clickInviteMember();
//       TeamDetailPage.fillInviteEmail('test@test.com');
//       cy.wait(1000);
//       TeamDetailPage.confirmInvite();
//       cy.contains('Team member invited successfully').should('be.visible');
//     });

//     it('should Edit roles and permissions of the team member successfully', () => {
//       TeamPage.clickManage('Test Team');
//       TeamDetailPage.clickEditRolesAndPermissions();
//       TeamDetailPage.fillEditRolesAndPermissions('test@test.com');
//       TeamDetailPage.confirmEditRolesAndPermissions();
//       cy.contains('Team member roles and permissions updated successfully').should('be.visible');
//     });
    
// });
})   
