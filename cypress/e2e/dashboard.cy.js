import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';

describe('Dashboard UI', () => {
  beforeEach(() => {
    cy.fixture('credentials').then((creds) => {
      LoginPage.visit();
      LoginPage.fillEmail(creds.validUser.email);
      LoginPage.fillPassword(creds.validUser.password);
      LoginPage.clickSignIn();
      cy.wait(2000); // Đợi login và load dashboard
      DashboardPage.goToHomeTab();
    });
  });

  it('Kiểm tra các section chính', () => {
    DashboardPage.checkMainSections();
  });

  it('Kiểm tra các bảng có dữ liệu', () => {
    DashboardPage.checkTablesHaveData();
  });

  it('Kiểm tra các số liệu tổng', () => {
    DashboardPage.checkSummaryNumbers();
  });

  it('Kiểm tra tên user, số dư, menu user', () => {
    DashboardPage.checkUserInfo();
  });

  it('Kiểm tra sidebar và trạng thái active', () => {
    DashboardPage.checkSidebarMenu();
  });

  it('Kiểm tra các link/tab trên dashboard', () => {
    DashboardPage.checkDashboardLinks();
  });
}); 