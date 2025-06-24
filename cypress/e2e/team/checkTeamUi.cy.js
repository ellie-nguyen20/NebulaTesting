import TeamPage from '../pages/TeamPage';
import LoginPage from '../pages/LoginPage';
import { ENDPOINTS } from '../../support/constants';

describe('Team UI', () => {
    context('when user has no teams', () => {
        beforeEach(() => {
            cy.fixture('credential').then((creds) => {
            LoginPage.visit();
            LoginPage.login(creds.valid.email, creds.valid.password);
            LoginPage.isLoggedIn(creds.valid.username);
            cy.url().should('include', ENDPOINTS.SERVERLESS);
            });

            cy.intercept('GET', 'api/v1/teams?limit=10&offset=1', {
                statusCode: 200,
                body: {"data":[],"message":"Teams retrieved successfully","status":"success"}
            }).as('getTeams');

            TeamPage.visit();
            cy.wait('@getTeams');
            cy.url().should('include', ENDPOINTS.TEAM);
        });

        it('should display empty state UI', () => {
            TeamPage.checkEmptyStateUI();
        });
    });

    context('when user has 20 teams (mocked)', () => {
        beforeEach(() => {
            // Step 1: Automatically generate mock data for 20 teams
            // Use Array.from to create an array with 20 elements
            const mockTeamData = Array.from({ length: 20 }, (_, i) => ({
                id: 31 + i, // Start ID from 31 and increment
                name: `Mock Team ${i + 1}`,
                description: `This is a description for team ${i + 1}`,
                role: 0,
                permissions: [],
                members: Math.floor(Math.random() * 15) + 1, // Random member count from 1-15
                created_at: Math.floor(Date.now() / 1000) - (i * 10000), // Different creation timestamps
                owner: {
                    id: 422,
                    name: "Member 5",
                    tier: "ENGINEER_TIER_1"
                }
            }));

            // Step 2: Build the complete mock response object
            const mockResponse = {
                data: mockTeamData,
                message: "Teams retrieved successfully",
                status: "success"
            };

            // Step 3: Log in and set up the API intercept
            cy.fixture('credential').then((creds) => {
                LoginPage.visit();
                LoginPage.login(creds.valid.email, creds.valid.password);
                LoginPage.isLoggedIn(creds.valid.username);
                cy.url().should('include', ENDPOINTS.SERVERLESS);
            });

            // Intercept the GET teams API and return the generated mock data
            // NOTE: Using '*' at the end of the URL to match any query params (limit, offset, etc.)
            cy.intercept('GET', 'api/v1/teams?*', {
                statusCode: 200,
                body: mockResponse
            }).as('get20Teams');

            // Navigate to the Team page
            TeamPage.visit();
            cy.wait('@get20Teams'); // Wait for the mocked API to be called
            cy.url().should('include', ENDPOINTS.TEAM);
        });

        it('should display the team list table with 20 teams', () => {
            // Check the team list UI is visible
            TeamPage.checkTeamListUI();

            // Assert that there are exactly 20 rows in the table body
            cy.get('[data-cy=team-table] tbody tr').should('have.length', 20);

            // Check if the first and last mock teams are visible
            cy.contains('Mock Team 1').should('be.visible');
            cy.contains('Mock Team 20').should('be.visible');
        });
    });
});