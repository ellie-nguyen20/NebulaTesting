import HomePage from './pages/HomePage';
import 'cypress-iframe';

describe('Home Page', () => {
  beforeEach(() => {
    HomePage.visit();
  });

  context('check UI', () => {
    it('should display Home Page UI', () => {
        HomePage.checkUI();
      });
    
      it('should display main menu', () => {
        HomePage.checkMenu();
      });
  })

  // context.skip('check chat bot function when user not login', () => {

  //   it('should chat with chat bot successfully', () => {
  //       HomePage.clickChatBot();
  //       cy.frameLoaded('iframe[src*="chat.nebulablock.com"]');
  //       cy.intercept('POST', 'https://chat.nebulablock.com/api/chat-messages').as('chatRequest');
  //       HomePage.sendchat('Hey, I need help');
  //       cy.wait('@chatRequest').its('response.statusCode').should('eq', 200);

  //   });
    
  // })

  // context.skip('check chat bot function when user logged in', () => {
  //   beforeEach(() => {
  //   cy.fixture('credential').then((creds) => {
  //     cy.loginByApi(creds.valid.username, creds.valid.password);
  //     });
  //   });
    
  // })
 
}); 