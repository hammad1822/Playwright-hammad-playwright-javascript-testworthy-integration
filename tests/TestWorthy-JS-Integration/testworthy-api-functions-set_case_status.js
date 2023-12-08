//const apiData = require('../playwright-constants/constants.js');
const apiData = require('./constants.js');

let testCaseDataArray = [];      //This global array will store the Case Titles and Case IDs from "get_run_cases" API response
let case_id;    // Global variable for assigning Test Case IDs to use in the tests

class testWorthyAPIs{ 

  constructor() {
    // You can initialize any properties here
  }

  //*** Function to map test results on TestWorthy ***//
  //**************************************************//
  async add_results_for_cases(testStatus) {
    if (testStatus === 'PASSED') {
      testStatus = 1;
        console.log('Test Status = ' + testStatus);
    } else {
          testStatus = 5
          console.log('Test Status = ' + testStatus);
    }
    const apiUrl = 'https://10plabs.com/api/tests/add_results_for_cases/'+apiData.tw_Creds.run_id; // take suit_id as input from user

    // Set the NODE_TLS_REJECT_UNAUTHORIZED environment variable to 0
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    console.log('Case ID in Map Status Function', case_id);

      //*** API Body ***//
      const requestData = {"Results": [
                            {
                            "case_id": case_id,
                            "status_id": testStatus,
                            "Comment": "test from postman",
                            //"AssignedToId": null,
                            //"Defects": "2306" // To remove as it is optional
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
              //--- For Cookies - Make a login call and fetch cookie from the responcse ---//
              'Cookie': apiData.tw_Creds.cookies              // Input from ../playwright-constants/constants.js
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

  async get_case_id_api() {
    const apiUrl = 'https://10plabs.com/api/tests/get_run_cases/'+apiData.tw_Creds.run_id; // take suit_id as input from user"

    // Set the NODE_TLS_REJECT_UNAUTHORIZED environment variable to 0
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      
      const requestOptions = {
          method: 'GET',
          headers: {
              'X-USER-EMAIL': apiData.tw_Creds.user_email,    // Input from ../playwright-constants/constants.js
              'X-TMA-KEY': apiData.tw_Creds.tma_key,          // Input from ../playwright-constants/constants.js
              'X-PROJECT-KEY': apiData.tw_Creds.project_key,  // Input from ../playwright-constants/constants.js
              'Content-Type': 'application/json',
              //--- For Cookies - Make a login call and fetch cookie from the responcse  ---//
              'Cookie': apiData.tw_Creds.cookies              // Input from ../playwright-constants/constants.js
          },
      };
  
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        // Check for a non-successful response (e.g., 404, 500)
        throw new Error(`API request failed with status: ${response.status}`);
      }  
      const data = await response.json();
      //console.log(JSON.stringify(data, null, 2))    //To print the nested response data
      
      //--- Fetching the Case IDs and Case Titles fron "get_run_cases" API response and push into the array "testCaseDataArray" ---//
      const tests = data.tests;
        for (const test of tests) {
            const caseId = test.case.id;
            const caseTitle = test.case.title;
            //console.log('Case ID:', caseId);  //Print Case Ids, uncomment it if you want to print them
            //console.log('Case Title:', caseTitle); //Print Case Titles, uncomment it if you want to print them
            
            //Storing all the test case ids and tiles into the array
            testCaseDataArray.push({ caseId, caseTitle });
        }
        console.log('Array Data', testCaseDataArray); //Print array data

      return data; // You can return the data for further use
    } catch (error) {
      console.error('API Request Error:', error);
      throw error; // Re-throw the error for handling at a higher level, if needed
    } 
  }

  async matchAndAssignCaseId(currentTestTitle) {
    // Find the matching test in the array
    const matchingTest = testCaseDataArray.find(test => test.caseTitle === currentTestTitle);

    if (matchingTest) {
        // If a match is found, assign the corresponding caseId to the global variable
        case_id = matchingTest.caseId;
        console.log('Match found. Assigned caseId:', case_id);
    } else {
        console.error('No match found for the test title:', currentTestTitle);
        // You might want to handle this case accordingly (e.g., throw an error)
    }
    console.log('Case ID: ', case_id);
    console.log('Case Title: ', matchingTest.caseTitle);
  }
}
module.exports = { testWorthyAPIs };