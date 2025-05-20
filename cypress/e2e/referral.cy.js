import ReferralPage from './pages/ReferralPage';
import LoginPage from './pages/LoginPage';
import { ENDPOINTS } from '../support/constants';

describe('Referral Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      LoginPage.isLoggedIn(creds.valid.username);
      cy.url().should('include', ENDPOINTS.SERVERLESS);
    });
    ReferralPage.visit();
    cy.url().should('include', ENDPOINTS.REFERRAL);
  });

  it('should display Referral UI', () => {
    ReferralPage.checkUI();
  });

  it('should generate referral link', () => {
    ReferralPage.generateLink();
  });

  it('should check referral history', () => {
    ReferralPage.checkHistory();
  });

  it('should check referral rewards', () => {
    ReferralPage.checkRewards();
  });

  it('should copy referral link and code', () => {
    ReferralPage.copyLink();
    ReferralPage.copyCode();
  });

  it('should apply invalid referral code and show error', () => {
    ReferralPage.fillReferralCode('invalid-code');
    ReferralPage.applyReferralCode();
    ReferralPage.checkApplyError();
  });
}); 