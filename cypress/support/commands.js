import LoginPage from '../e2e/pages/LoginPage';
import credential from '../fixtures/credential.json';

Cypress.Commands.add('loginViaUi', (userKey = 'valid') => {
  const { email, password } = credential[userKey];

  cy.session(userKey, () => {
    LoginPage.visit();
    LoginPage.login(email, password);
    cy.url().should('include', '/serverless');
  });
});


Cypress.Commands.add('loginByApi', (username, password) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  cy.request({
    method: 'POST',
    url: 'https://dev-portal-api.nebulablock.com/api/v1/login',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json, text/plain, */*'
    },
    body: formData.toString()
  }).then((response) => {
    expect(response.status).to.eq(200);

    const token = response.body.data.jwtToken;
    cy.window().then((win) => {
      win.localStorage.setItem('nebulablock_newlook_token', token);
    });
  });
});

Cypress.Commands.add('createTeam', (name, description) => {
  return cy.window().then((win) => {
    const token = win.localStorage.getItem('nebulablock_newlook_token');
    return cy.request({
      method: 'POST',
      url: 'https://dev-portal-api.nebulablock.com/api/v1/teams',
      body: { name, description },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('success');
      return response.body.data;
    });
  });
});

Cypress.Commands.add('createApiTeamKey', (name, description, teamId) => {
  return cy.window().then((win) => {
    const token = win.localStorage.getItem('nebulablock_newlook_token');
    return cy.request({
      method: 'POST',
      url: `https://dev-portal-api.nebulablock.com/api/v1/keys`,
      body:{
        name: name,
        description: description,
        team_id: teamId
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('success');
      return response.body.data;
    });
  });
});


Cypress.Commands.add('deleteTeam', (teamId) => {
  return cy.window().then((win) => {
    const token = win.localStorage.getItem('nebulablock_newlook_token');
    return cy.request({
      method: 'DELETE',
      url: `https://dev-portal-api.nebulablock.com/api/v1/teams/${teamId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('success');
      cy.log('✅ Team deleted successfully');
    });
  });
});

Cypress.Commands.add('inviteMemberToTeam', (teamId, email) => {
  return cy.window().then((win) => {
    const token = win.localStorage.getItem('nebulablock_newlook_token');

    return cy.request({
      method: 'POST',
      url: `https://dev-portal-api.nebulablock.com/api/v1/teams/${teamId}/members`,
      body: { email },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      return response.body.data.token;
    });
  });
});

Cypress.Commands.add('acceptTeamInvitation', (inviteToken) => {
  cy.window().then((win) => {
    const token = win.localStorage.getItem('nebulablock_newlook_token');

    cy.request({
      method: 'POST',
      url: `https://dev-portal-api.nebulablock.com/api/v1/teams/invitations/${inviteToken}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('success');
      cy.log('✅ Accepted team invitation');
    });
  });
});

Cypress.Commands.add('inviteAndAcceptMember', (teamId, owner, member) => {
  // Step 1: Owner logs in and sends invitation
  cy.loginByApi(owner.email, owner.password).then(() => {
    cy.inviteMemberToTeam(teamId, member.email).then((inviteToken) => {
      // Step 2: Switch to member, login and accept invitation
      cy.clearCookies(); // ensure no lingering session
      cy.loginByApi(member.email, member.password).then(() => {
        cy.acceptTeamInvitation(inviteToken);
      });
    });
  });
});

