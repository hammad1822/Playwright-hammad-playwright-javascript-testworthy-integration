const apiData = require('./constants.js');

class testWorthyAPIs{

  constructor() {
    // You can initialize any properties here
  }

  //run_id, user_email, tma_key, project_key, case_id, testStatus   // Can be parameters for add_results_for_cases() function

  //*** Function to map test results on TestWorthy ***//
  //**************************************************//
  async add_results_for_cases(case_id, testStatus) {
    if (testStatus === 'PASSED') {
      testStatus = 1;
        console.log('Test Status = ' + testStatus);
    } else {
          testStatus = 5
          console.log('Test Status = ' + testStatus);
    }
    const apiUrl = 'https://10plabs.com/api/tests/add_results_for_cases/'+apiData.tw_Creds.run_id; // take suit_id as input from user
    
    // const apiUrl = 'http://10plabs.com/api/tests/add_results_for_cases/12404';
    //url: https://{hostname}/api/tests/add_results_for_cases/{run_id}

    // Set the NODE_TLS_REJECT_UNAUTHORIZED environment variable to 0
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

      //*** API Body ***//
      const requestData = {"Results": [
                            {
                            "case_id": case_id,
                            "status_id": testStatus,
                            "Comment": "test from postman",
                            "AssignedToId": null,
                            "Defects": "2306" // To remove as it is optional
                            }
                            ]
                          }
      //*** API Request ***//
      const requestOptions = {
          method: 'POST',
          //*** API Header ***//
          headers: {
              'X-USER-EMAIL': apiData.tw_Creds.user_email,    // Input from ../playwright-constants/constants.js
              'X-TMA-KEY': apiData.tw_Creds.tma_key,          // Input from ../playwright-constants/constants.js
              'X-PROJECT-KEY': apiData.tw_Creds.project_key,  // Input from ../playwright-constants/constants.js
              'Content-Type': 'application/json',
              // For Cookies - Make a login call and fetch cookie from the responcse
              'Cookie': apiData.tw_Creds.cookies              // Input from ../playwright-constants/constants.js
              // 'Cookie': '.TCookie=CfDJ8NvEpa8b6O9HsycfRueM_XPldcpm-g1iLwtYPNGlIiH1MQuHPgC55ZlRtnIsvb1KQiO7HTUCcT0AkGrfMETadhLMnTCi4PrmdpWX2bAU2e-RvbiZUfEZvHuKGrsDetY3zPu5IlJX__XZIIRAikNXbAtLQJOmQK2Oevo-qmbrSb1YJEXGWA5ytXp3oW1S5ZYkqBo3HDVndHrDnXQfN04i8OeBGfBKu-Hxj8JghuJRY8j_OBrTjaLj5NeHVMfYV7Lrup3NZkchF3xpI8eANWhF6l5Cv1EN92kIqCtFWQeoQn743OJwk3Onw4RNRlw910IpYVUG9CtmqY5_E5v-v0hVohRVlLTpcQwZEg2BvQiJBcbjwdWJh1n374Tdn0lu73JLOYdS-njY_DelUkKPtG5sgs36bbu94xDKY50uDhHgpUOWraa9BAW-TtnvXznJL_ok-g',
          },
          body: JSON.stringify(requestData),
      };
  
    try {
      //*** Send API Request and save response in 'responce' variable***//
      const response = await fetch(apiUrl, requestOptions);
      
      //*** Conditions ***//
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
module.exports = { testWorthyAPIs };
  