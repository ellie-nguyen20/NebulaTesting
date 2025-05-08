# NebulaBlock Cypress E2E Tests

## Cấu trúc thư mục

- `cypress/e2e/pages/`: Chứa các Page Object Model (POM)
- `cypress/e2e/login.cy.js`: Test login chính
- `cypress/fixtures/users.json`: Dữ liệu user mẫu
- `cypress.env.json`: Lưu credentials thật (KHÔNG commit lên git)
- `.gitignore`: Loại trừ node_modules và cypress.env.json

## Cài đặt và chạy test

```bash
npm install
npx cypress open # hoặc npx cypress run
```

## Bảo mật
- Không commit file `cypress.env.json` chứa thông tin nhạy cảm lên git.

## CI/CD
- Đã cấu hình pipeline Github Actions để tự động chạy test (xem `.github/workflows/cypress.yml`). 