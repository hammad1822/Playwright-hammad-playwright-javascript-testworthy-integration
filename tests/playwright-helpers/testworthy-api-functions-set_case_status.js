//import { defineConfig } from '@playwright/test';
//import { test, expect } from '@playwright/test';

class testWorthyAPIs{

  constructor() {
    // You can initialize any properties here
  }
  // run_id, user_email, tma_key, project_key
  async add_results_for_cases(run_id, user_email, tma_key, project_key, case_id, testStatus) {
    if (testStatus === 'PASSED') {
      testStatus = 1;
        console.log('Test Status = ' + testStatus);
    } else {
          testStatus = 5
          console.log('Test Status = ' + testStatus);
    }
    const apiUrl = 'https://10plabs.com/api/tests/add_results_for_cases/'+run_id; // take suit_id as input from user
    // const apiUrl = 'http://10plabs.com/api/tests/add_results_for_cases/12404';
    //url: https://{hostname}/api/tests/add_results_for_cases/{run_id}

    // Set the NODE_TLS_REJECT_UNAUTHORIZED environment variable to 0
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      const requestData = {"Results": [
                            {
                            "case_id": case_id,
                            "status_id": testStatus,
                            "Comment": "test from postman",
                            "AssignedToId": null,
                            "Defects": "2306"
                            }
                            ]
                          }
      const requestOptions = {
          method: 'POST',
          headers: {
              // 'X-USER-EMAIL': 'qa.admin@yopmail.com', // take input from user
              // 'X-TMA-KEY':'qfst2zqwZX24iQVmKMNj', // take input from user
              // 'X-PROJECT-KEY': 'tevW0gOrOed7ERbz0Gwg', // take input from user
              'X-USER-EMAIL': user_email, // take input from user
              'X-TMA-KEY': tma_key, // take input from user
              'X-PROJECT-KEY': project_key, // take input from user
              'Content-Type': 'application/json',
              // For Cookies - Make a login call and fetch cookie from the responcse 
              'Cookie': '.TCookie=CfDJ8NvEpa8b6O9HsycfRueM_XN7KrcB9GtGGLyBLHSAk15qxrqKxR46INmer4dsD4uFAQJ1_WtaADl3gJWZSGztUvbgke4TzIHTkpsahiZwC-R3KvQ8HQurhSaaDE2GLMOed8grpRaITLKG64wzQNUaOqTx9XpX_81P-_wDXK3bFQtPdS48faW2-QtYk9OHpOgi_tUiwNxvHVfFLaN2EFpcjzQC6OfrVwIMRd9d1lC5vQkR8JHB_fGLz2tbqVux-YzTLzBJ88w-LJ4esgUae1uQ4pwakj1VyEVYpYYxHLA05BSdJxcCoTz_gGC-adkDVh0A5DXSMHQmAgp9_9nND-IR15XeA-j8dB__GwVg4rmi2c3GlACkByH1kaGYeYK2TAJcIH0nxs4JnihVsOblYgTqVRg5cxrYaLMHToqz28Arp-xIkWak0dtiEa2TMRQRhndwEA',
  
          },
          body: JSON.stringify(requestData),
      };
  
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        // Check for a non-successful response (e.g., 404, 500)
        throw new Error(`API request failed with status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Process and use the API response data as needed
      console.log('API Response Data:', data);
  
      return data; // You can return the data for further use
    } catch (error) {
      console.error('API Request Error:', error);
      throw error; // Re-throw the error for handling at a higher level, if needed
    }
  }
}
  
// module.exports = { add_results_for_cases };
module.exports = { testWorthyAPIs };
  