import TeamPage from '../pages/TeamPage';
import LoginPage from '../pages/LoginPage';
import { ENDPOINTS } from '../../support/constants';

describe('Team Page', () => {
    context('when user has no teams', () => {
        beforeEach(() => {
            cy.fixture('credential').then((creds) => {
                LoginPage.visit();
                LoginPage.login(creds.valid.email, creds.valid.password);
                LoginPage.isLoggedIn(creds.valid.username);
                cy.url().should('include', ENDPOINTS.SERVERLESS);
            });

            mockTeamList([]);

            TeamPage.visit();
            cy.wait('@getTeam');
            cy.url().should('include', ENDPOINTS.TEAM);
        });

        it('should display empty state UI', () => {
            TeamPage.checkEmptyStateUI();
        });

        it('should click create team button', () => {
            TeamPage.clickCreateTeam();
        });
    });

    context('when user has 100 teams', () => {
        beforeEach(() => {
            const mockTeamData = Array.from({ length: 100 }, (_, i) => ({
                id: 31 + i,
                name: `Mock Team ${i + 1}`,
                description: `This is a description for team ${i + 1}`,
                role: Math.floor(Math.random() * 3),
                permissions: [],
                members: Math.floor(Math.random() * 500) + 1,
                created_at: Math.floor(Date.now() / 1000) - (i * 10000),
                owner: {
                    id: 422,
                    name: "Member 5",
                    tier: "ENGINEER_TIER_1"
                }
            }));

            cy.fixture('credential').then((creds) => {
                LoginPage.visit();
                LoginPage.login(creds.valid.email, creds.valid.password);
                LoginPage.isLoggedIn(creds.valid.username);
                cy.url().should('include', ENDPOINTS.SERVERLESS);
            });

            mockTeamList(mockTeamData);

            TeamPage.visit();
            cy.wait('@getTeam');
            cy.url().should('include', ENDPOINTS.TEAM);
        });

        it('should click create team button', () => {
            TeamPage.clickCreateTeam();
        });

        it('should click refresh button', () => {
            TeamPage.clickRefresh();
        });

        it('should display the team list table with 100 teams', () => {
            TeamPage.checkTeamListUI();
            cy.get('tbody tr').should('have.length', 100);
            cy.contains('Mock Team 1').should('be.visible');
            cy.contains('Mock Team 100').scrollIntoView().should('be.visible');
        });
    });

    function mockTeamList(teamList) {
        cy.intercept('GET', 'api/v1/teams?*', {
            statusCode: 200,
            body: {
                data: teamList,
                message: "Teams retrieved successfully",
                status: "success"
            }
        }).as('getTeam');
    }

    [
        {role: 0, name: 'Owner Team', roleText: 'Owner', showManage: true, showDelete: true, showView: false},
        {role: 1, name: 'Admin Team', roleText: 'Admin', showManage: true, showDelete: false, showView: false},
        {role: 2, name: 'Member Team', roleText: 'Member', showManage: false, showDelete: false, showView: true},
    ].forEach(({role, name, roleText, showManage, showDelete, showView}) => {
        context(`when user is ${roleText.toLowerCase()} of the team`, () => {
            beforeEach(() => {
                cy.fixture('credential').then((creds) => {
                    LoginPage.visit();
                    LoginPage.login(creds.valid.email, creds.valid.password);
                    LoginPage.isLoggedIn(creds.valid.username);
                    cy.url().should('include', ENDPOINTS.SERVERLESS);
                });
                const team = [{
                    id: Math.floor(Math.random() * 1000),
                    name,
                    description: `This is your team as ${name}`,
                    role,
                    permissions: [],
                    members: Math.floor(Math.random() * 20) + 1,
                    created_at: Math.floor(Date.now() / 1000),
                    owner: {
                        id: 999,
                        name: "Team Owner",
                        tier: "OWNER_TIER"
                    }
                }];
                mockTeamList(team);
                TeamPage.visit();
                cy.wait('@getTeam');
                cy.url().should('include', ENDPOINTS.TEAM);
            });

            it(`should display the team list table with 1 team and correct buttons for ${roleText}`, () => {
                TeamPage.checkTeamListUI();
                cy.get('tbody tr').should('have.length', 1);
                cy.contains(name).should('be.visible');
                cy.get('td .owner-style').should('have.text', roleText);
                if (showManage) TeamPage.manageButtonVisible();
                else cy.contains('div', 'Manage').should('not.exist');
                if (showDelete) TeamPage.deleteButtonVisible();
                else cy.contains('div', 'Delete').should('not.exist');
                if (showView) TeamPage.viewButtonVisible();
                else cy.contains('div', 'View').should('not.exist');
            });
        });
    });
});