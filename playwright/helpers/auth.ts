import { Page, request } from '@playwright/test';

export async function loginByApi(page: Page, username: string, password: string) {
  const requestContext = await request.newContext();
  const response = await requestContext.post('https://dev-portal-api.nebulablock.com/api/v1/login', {
    form: {
      username,
      password,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json, text/plain, */*'
    }
  });
  const body = await response.json();
  const token = body.data.jwtToken;

  await page.addInitScript(token => {
    window.localStorage.setItem('nebulablock_newlook_token', token);
  }, token);
}