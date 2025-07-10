// cypress/support/e2e.js

import './commands';
import 'cypress-iframe';


// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('loginAs', (role = 'owner') => {
  let user;
  if (role === 'owner') {
    user = {
      email: 'owner@example.com',
      password: 'password123',
    };
  } else if (role === 'member') {
    user = {
      email: 'member@example.com',
      password: 'password123',
    };
  } else {
      // Default or throw error
      user = {
        email: 'guest@example.com',
        password: 'password123'
      }
  }

  cy.request({
    method: 'POST',
    url: '/api/auth/login', // <-- **UPDATE THIS to your login endpoint**
    body: user,
  }).then((resp) => {
    // Assuming the API returns a token that you need to store
    window.localStorage.setItem('auth_token', resp.body.token);
  });
});
