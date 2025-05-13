import ReferralPage from './pages/ReferralPage';
import LoginPage from './pages/LoginPage';

describe('Referral Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.fillEmail(creds.valid.email);
      LoginPage.fillPassword(creds.valid.password);
      LoginPage.clickSignIn();
      cy.wait(2000);
    });
    ReferralPage.visit();
    cy.wait(1000);
  });

  it('should display Referral UI', () => {
    ReferralPage.checkUI();
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