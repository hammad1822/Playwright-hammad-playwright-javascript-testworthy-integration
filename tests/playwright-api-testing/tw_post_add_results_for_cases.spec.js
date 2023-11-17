// @ts-check
const { test, expect } = require('@playwright/test');

// Map Test Case Results
test('Map Test Case Staus', async ({ request }) => {
    const baseURL = "http://10plabs.com/api/tests/add_results_for_cases/12404";

    const response = await request.post(baseURL, {ignoreHTTPSErrors: true,
    headers: {
        'X-USER-EMAIL': 'qa.admin@yopmail.com',
        'X-TMA-KEY':'qfst2zqwZX24iQVmKMNj',
        'X-PROJECT-KEY': 'tevW0gOrOed7ERbz0Gwg',
        'Content-Type': 'application/json',
        'Cookie': '.TCookie=CfDJ8NvEpa8b6O9HsycfRueM_XN7KrcB9GtGGLyBLHSAk15qxrqKxR46INmer4dsD4uFAQJ1_WtaADl3gJWZSGztUvbgke4TzIHTkpsahiZwC-R3KvQ8HQurhSaaDE2GLMOed8grpRaITLKG64wzQNUaOqTx9XpX_81P-_wDXK3bFQtPdS48faW2-QtYk9OHpOgi_tUiwNxvHVfFLaN2EFpcjzQC6OfrVwIMRd9d1lC5vQkR8JHB_fGLz2tbqVux-YzTLzBJ88w-LJ4esgUae1uQ4pwakj1VyEVYpYYxHLA05BSdJxcCoTz_gGC-adkDVh0A5DXSMHQmAgp9_9nND-IR15XeA-j8dB__GwVg4rmi2c3GlACkByH1kaGYeYK2TAJcIH0nxs4JnihVsOblYgTqVRg5cxrYaLMHToqz28Arp-xIkWak0dtiEa2TMRQRhndwEA',
    },
    data: {
        "Results": [
            {
            "case_id": 407483,
            "status_id": 2,
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
});