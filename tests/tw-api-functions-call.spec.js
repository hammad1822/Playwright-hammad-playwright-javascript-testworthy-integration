import { test, expect } from '@playwright/test';
const { get_runs_api } = require('./playwright-helpers/testworthy-api-functions-get_runs.js');
const { add_results_for_cases } = require('./playwright-helpers/testworthy-api-functions-set_case_status.js');
//const { get_runs_api } = require('./api');

test.describe('TestWorthy Api Executions ', () => {
    
    // let page;
    // let response;

    const suit_id = 6425;
    const run_id = 12404;
    const user_email = 'qa.admin@yopmail.com';
    const tma_key = 'qfst2zqwZX24iQVmKMNj';
    const project_key = 'tevW0gOrOed7ERbz0Gwg';

    test('Testtttt', async () => {
        try {
            // Use fetchDataFromApi to make an API call
            //const apiData = await get_runs_api(suit_id, user_email, tma_key, project_key);
            await add_results_for_cases(run_id, user_email, tma_key, project_key);

            //run_id, user_email, tma_key, project_key
        
            // Perform your test actions based on the API data
            //console.log('API Data:', apiData);
        
            // Example test logic: Open a web page, interact with elements, and make assertions
            //await page.goto('https://example.com');
            // ...
        
          } catch (error) {
            console.error('Test Error:', error);
          } //finally {
            //console.log('HAPPY!')
          //}
    });
});