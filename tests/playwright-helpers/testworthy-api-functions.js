import { defineConfig } from '@playwright/test';
//import { test, expect } from '@playwright/test';

async function get_runs_api() {
    const apiUrl = 'https://10plabs.com/api/tests/get_runs/6425/'; // Replace with your API endpoint // take url as input from user

    // Set the NODE_TLS_REJECT_UNAUTHORIZED environment variable to 0
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const requestOptions = {
        method: 'GET',
        headers: {
            'X-USER-EMAIL': 'qa.admin@yopmail.com', // take input from user
            'X-TMA-KEY':'qfst2zqwZX24iQVmKMNj', // take input from user
            'X-PROJECT-KEY': 'tevW0gOrOed7ERbz0Gwg', // take input from user
            'Content-Type': 'application/json',
            // For Cookies - Make a login call and fetch cookie from the responcse 
            'Cookie': '.TCookie=CfDJ8NvEpa8b6O9HsycfRueM_XN7KrcB9GtGGLyBLHSAk15qxrqKxR46INmer4dsD4uFAQJ1_WtaADl3gJWZSGztUvbgke4TzIHTkpsahiZwC-R3KvQ8HQurhSaaDE2GLMOed8grpRaITLKG64wzQNUaOqTx9XpX_81P-_wDXK3bFQtPdS48faW2-QtYk9OHpOgi_tUiwNxvHVfFLaN2EFpcjzQC6OfrVwIMRd9d1lC5vQkR8JHB_fGLz2tbqVux-YzTLzBJ88w-LJ4esgUae1uQ4pwakj1VyEVYpYYxHLA05BSdJxcCoTz_gGC-adkDVh0A5DXSMHQmAgp9_9nND-IR15XeA-j8dB__GwVg4rmi2c3GlACkByH1kaGYeYK2TAJcIH0nxs4JnihVsOblYgTqVRg5cxrYaLMHToqz28Arp-xIkWak0dtiEa2TMRQRhndwEA',
 
        },
        //body: JSON.stringify(requestData),
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
  
  module.exports = { get_runs_api };
  