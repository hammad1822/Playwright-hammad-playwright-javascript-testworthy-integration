// @ts-check
const { test, expect } = require('@playwright/test');


test('Mark Test Status', async ({ request }) => {
    const response = await request.post("https://10plabs.com/api/tests/add_results_for_cases/12404", {
        // headers: {
        //     'X-USER-EMAIL': 'migrationv2@yopmail.com', // Set your authorization header
        //     'X-TMA-KEY':'qfst2zqwZX24iQVmKMNj',
        //     'X-PROJECT-KEY': 'tevW0gOrOed7ERbz0Gwg',
        //     'Content-Type': 'application/json' // Set your content type
        //   },

        data: {
            
                "Results": [
                {
                "case_id": 407483,
                "status_id": 1,
                "Comment": "test from postman",
                "AssignedToId": null,
                "Defects": "2306"
                }
                ]
                
        }
    });
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    // const responseBody = await response.json()
    // expect(responseBody.booking).toHaveProperty("firstname", "Jim");
    // expect(responseBody.booking).toHaveProperty("lastname", "Brown");
    // expect(responseBody.booking).toHaveProperty("totalprice", 111);
    // expect(responseBody.booking).toHaveProperty("depositpaid", true);
});