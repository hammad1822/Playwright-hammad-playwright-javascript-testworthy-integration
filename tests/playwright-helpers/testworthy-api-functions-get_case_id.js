import { defineConfig } from '@playwright/test';
//import { test, expect } from '@playwright/test';

class testWorthyCaseIds{

  constructor() {
    // You can initialize any properties here
  }
  
  async get_case_id_api() {
      const apiUrl = 'https://10plabs.com/api/tests/get_run_cases/12404'; // take suit_id as input from user"
      //const apiUrl = 'https://10plabs.com/api/tests/get_runs/6425/';

      // Set the NODE_TLS_REJECT_UNAUTHORIZED environment variable to 0
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        
        const requestOptions = {
            method: 'GET',
            headers: {
                'X-USER-EMAIL': 'qa.admin@yopmail.com', // take input from user
                'X-TMA-KEY':'qfst2zqwZX24iQVmKMNj', // take input from user
                'X-PROJECT-KEY': 'tevW0gOrOed7ERbz0Gwg', // take input from user
                
                // 'X-USER-EMAIL': user_email, // take input from user
                // 'X-TMA-KEY': tma_key, // take input from user
                // 'X-PROJECT-KEY': project_key, // take input from user

                'Content-Type': 'application/json',
                // For Cookies - Make a login call and fetch cookie from the responcse 
                'Cookie': '.TCookie=CfDJ8NvEpa8b6O9HsycfRueM_XPldcpm-g1iLwtYPNGlIiH1MQuHPgC55ZlRtnIsvb1KQiO7HTUCcT0AkGrfMETadhLMnTCi4PrmdpWX2bAU2e-RvbiZUfEZvHuKGrsDetY3zPu5IlJX__XZIIRAikNXbAtLQJOmQK2Oevo-qmbrSb1YJEXGWA5ytXp3oW1S5ZYkqBo3HDVndHrDnXQfN04i8OeBGfBKu-Hxj8JghuJRY8j_OBrTjaLj5NeHVMfYV7Lrup3NZkchF3xpI8eANWhF6l5Cv1EN92kIqCtFWQeoQn743OJwk3Onw4RNRlw910IpYVUG9CtmqY5_E5v-v0hVohRVlLTpcQwZEg2BvQiJBcbjwdWJh1n374Tdn0lu73JLOYdS-njY_DelUkKPtG5sgs36bbu94xDKY50uDhHgpUOWraa9BAW-TtnvXznJL_ok-g',
    
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
        console.log(JSON.stringify(data, null, 2))    //To print the nested response data
        return data; // You can return the data for further use
      } catch (error) {
        console.error('API Request Error:', error);
        throw error; // Re-throw the error for handling at a higher level, if needed
      }
  }
}    
  module.exports = { testWorthyCaseIds };