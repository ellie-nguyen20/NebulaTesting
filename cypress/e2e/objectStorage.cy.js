import ObjectStoragePage from './pages/ObjectStoragePage';
import LoginPage from './pages/LoginPage';
import { ENDPOINTS } from '../support/constants';
import '../../cypress/support/commands';


describe('Object Storage Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      LoginPage.isLoggedIn(creds.valid.username);
      cy.url().should('include', ENDPOINTS.SERVERLESS);
    });
    ObjectStoragePage.visit();
    cy.url().should('include', ENDPOINTS.OBJECT_STORAGE);
  });

  context('Check UI when user have no object storage', () => {
    beforeEach(() => {
      mockObjectStorageList([], "No object storage found.");
      ObjectStoragePage.visit();
      cy.wait('@getObjectStorage');
    });

    it('should display empty state UI and detail creating object storage modal', () => {
      ObjectStoragePage.checkUI();
      cy.wait(1000);
      ObjectStoragePage.checkDetailCreatingObjectStorage();

    });
  });

  context('Check UI when user have 1 personal object storage, 1 team object storage', () => {
    beforeEach(() => {
    });

    it('should display personal object storage', () => {
      mockObjectStorageList([
        {
          object_storage_name: 'personal',
          charges: 0.0,
          active: true,
          status: 'Ready',
          type: 1,
          location: 'canada',
          team: null,
          user: {
            id: 371,
            name: 'Ellie Nguyen',
            email: 'thivunguyen1506@gmail.com'
          }
        }
      ]);
      ObjectStoragePage.visit();
      cy.wait('@getObjectStorage');
      ObjectStoragePage.checkObjectStorageTable('personal');
    });

    it('should display team object storage', () => {
      mockObjectStorageList([
        {
          object_storage_name: 'team',
          charges: 0.0,
          active: true,
          status: 'Ready',
          type: 1,
          location: 'canada',
          team: {
            id: 8,
            name: 'my team',
            role: 0,
            permission: []
          },
          user: {
            id: 374,
            name: 'Ellie Nguyen',
            email: 'thivunguyen1506@gmail.com'
          }
        }
      ]);
      ObjectStoragePage.visit();
      cy.wait('@getObjectStorage');
      ObjectStoragePage.checkObjectStorageTable('team');
    });
  });

  context('Check functionalities of object storage', () => {
    let teamId;
    const teamName = 'Test team apikey';
    const teamDesc = 'Test Description';

    before(() => {
      cy.fixture('credential').then((creds) => {
        cy.loginByApi(creds.valid.email, creds.valid.password);
      });
  
      cy.createTeam(teamName, teamDesc).then((team) => {
        teamId = team.id;
      });

      cy.createApiTeamKey('API Key for team', 'Test Description', teamId);
    });

    after(() => {
      cy.then(() => {
        if (teamId) {
          cy.deleteTeam(teamId);
        }
      });
    });

    it('should create personal object storage successfully', () => {
      cy.wait(2000);
      ObjectStoragePage.checkDetailCreatingObjectStorage();
      ObjectStoragePage.createObjectStorage('personal');
    });

    it('should create team object storage successfully', () => {

      cy.wait(2000);
      ObjectStoragePage.checkDetailCreatingObjectStorage();
      ObjectStoragePage.selectTeam(teamName);
      ObjectStoragePage.createObjectStorage('team');
    });

    it.skip('should create bucket successfully', () => {});
    it.skip('should delete bucket successfully', () => {});
    it.skip('should delete personal object storage successfully', () => {});
    it.skip('should delete team object storage successfully', () => {});

  });

  function mockObjectStorageList(data, message = "user object storage successfully retrieved") {
    cy.intercept(
      'GET',
      'https://dev-portal-api.nebulablock.com/api/v1/object-storage/?limit=10&page=1&space_status=Ready',
      {
        statusCode: 200,
        body: {
          data,
          meta: {
            total_count: data.length,
            page: 1,
            limit: 10,
            total_pages: data.length === 0 ? 0 : 1
          },
          message,
          status: 'success'
        },
      }
    ).as('getObjectStorage');
  }
});    