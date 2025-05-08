export function getLLMStatistics(timeFrame = '1d') {
  return cy.request({
    method: 'GET',
    url: `https://api.nebulablock.com/api/v1/serverless/llm-statistics?time_frame=${timeFrame}`,
  }).then((response) => response.body);
} 