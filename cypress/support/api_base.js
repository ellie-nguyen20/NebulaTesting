export function getLLMStatistics(timeFrame = '1d') {
  return cy.fixture('token').then(({ token }) => {
    return cy.request({
      method: 'GET',
      url: `https://api.nebulablock.com/api/v1/serverless/llm-statistics?time_frame=${timeFrame}`,
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => response.body);
  });
}

before(() => {
  cy.loginAndSaveToken();
});

cy.fixture('token').then(({ token }) => {
  cy.request({
    url: 'https://api.nebulablock.com/api/v1/serverless/llm-statistics?time_frame=1d',
    headers: { Authorization: `Bearer ${token}` }
  });
}); 