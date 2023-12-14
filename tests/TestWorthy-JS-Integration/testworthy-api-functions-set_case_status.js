const apiData = require('./constants.js');
//This global array will store the Case Titles and Case IDs from "get_run_cases" API response
let testCaseDataArray = [];
// Global variable for assigning Test Case IDs to use in the tests
let case_id;
// Global variables to dynamically handle the run ids to use in a specific call
let run_id;
let run_title;

class testWorthyAPIs{ 

  constructor() {
    // You can initialize any properties here
  }

  //*** Function to get test runs from a specific suite id from TestWorthy ***//
  //**************************************************************************//
  async get_run_from_suit_id() {
    // Take suite_id as input from user in a constant file"
    const apiUrl =  apiData.tw_Creds.baseAPIURL+"get_runs/"
                    +apiData.tw_Creds.suite_id;

    // Set the NODE_TLS_REJECT_UNAUTHORIZED environment variable to 0
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      
      const requestOptions = {
          method: 'GET',
          headers: {
              // All header values are defined in constants.js
              'X-USER-EMAIL': apiData.tw_Creds.user_email,    
              'X-TMA-KEY': apiData.tw_Creds.tma_key,          
              'X-PROJECT-KEY': apiData.tw_Creds.project_key,
              'Content-Type': 'application/json',
              'Cookie': apiData.tw_Creds.cookies,
          },
      };
  
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        // Check for a non-successful response (e.g., 404, 500)
        throw new Error(`API request failed with status: ${response.status}`);
      }  
      const data = await response.json();

      if (data.runs && data.runs.length > 0) {
        const runs = data.runs;
  
        // Find a run with a specific name
        const targetRunName = apiData.tw_Creds.run_title;
        const targetRun = runs.find(run => run.name === targetRunName);
  
        if (targetRun) {
          console.log('Target Run Title is:', targetRun.name);
          console.log('Target Run ID is:', targetRun.id);
  
          // Store or use the values as needed
          run_id = targetRun.id;
          run_title = targetRun.name;
          console.log('Final Run ID:', run_id);
          console.log('Final Run Title:', run_title);
          // You can return the target run for further use
          return targetRun;
        } else {
          console.log(`No run found with the name: ${targetRunName}`);
          // Or handle the case where the target run is not found
          return null;
        }
      } else {
        console.log('No runs found in the response.');
        // Or handle the case where no runs are found
        return null;
      }
      // You can return the data for further use
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      // Re-throw the error for handling at a higher level, if needed
      throw error;
    } 
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
    const apiUrl = apiData.tw_Creds.baseAPIURL
                    +"add_results_for_cases/"+run_id;

    // Set the NODE_TLS_REJECT_UNAUTHORIZED environment variable to 0
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    console.log('Case ID in Map Status Function', case_id);

      //*** API Body ***//
      const requestData = {"Results": [
                            {
                            "case_id": case_id,
                            "status_id": testStatus,
                            "Comment": "test from postman",
                            }
                            ]
                          }
      //*** API Request ***//
      const requestOptions = {
          method: 'POST',
          //*** API Header ***//
          headers: {
              // All header values are defined in constants.js
              'X-USER-EMAIL': apiData.tw_Creds.user_email,   
              'X-TMA-KEY': apiData.tw_Creds.tma_key,         
              'X-PROJECT-KEY': apiData.tw_Creds.project_key, 
              'Content-Type': 'application/json',
              'Cookie': apiData.tw_Creds.cookies,            
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
      // You can return the data for further use
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      // Re-throw the error for handling at a higher level, if needed
      throw error;
    }
  }

  //*** Function to get case ids to map cases on TestWorthy ***//
  //***********************************************************//
  async get_case_id_api() {
    const apiUrl = apiData.tw_Creds.baseAPIURL+"get_run_cases/"
                    +run_id;

    // Set the NODE_TLS_REJECT_UNAUTHORIZED environment variable to 0
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      
      const requestOptions = {
          method: 'GET',
          headers: {
              // All header values are defined in constants.js
              'X-USER-EMAIL': apiData.tw_Creds.user_email,   
              'X-TMA-KEY': apiData.tw_Creds.tma_key,         
              'X-PROJECT-KEY': apiData.tw_Creds.project_key, 
              'Content-Type': 'application/json',
              'Cookie': apiData.tw_Creds.cookies,             
          },
      };
  
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        // Check for a non-successful response (e.g., 404, 500)
        throw new Error(`API request failed with status: ${response.status}`);
      }  
      const data = await response.json();
      //To print the nested response data
      //console.log(JSON.stringify(data, null, 2));
      
      //--- Fetching the Case IDs and Case Titles fron "get_run_cases" API response and push into the array "testCaseDataArray" ---//
      const tests = data.tests;
        for (const test of tests) {
            const caseId = test.case.id;
            const caseTitle = test.case.title;
            //Storing all the test case ids and tiles into the array
            testCaseDataArray.push({ caseId, caseTitle });
        }
        //Print array data
        console.log('Array Data', testCaseDataArray);
      // You can return the data for further use
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      // Re-throw the error for handling at a higher level, if needed
      throw error;
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