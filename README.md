# Automated Test Execution with TestWorthy Integration

## Overview
This repository contains automation scripts for executing tests using Playwright-JavaScript and updating the TestWorthy test run folder. The test case titles in the scripts should match the titles in the TestWorthy test run folder.
Follow the steps below to configure and run the scripts successfully.

## Prerequisites

* Playwright wiht JavaScript
* TestWorthy account with access to the desired project
* TestWorthy API key (You can obtain this from your TestWorthy account settings)

## Configuration

* Clone the repository to your local machine:
git clone <repository_url>
cd <repository_directory>

* Edit a configuration file named <TestWorthy-JS-Integration/constants.js> and fill in the following details: 
    * baseAPIURL = www.testworthy.com
    * user_email = your_email@example.com
    * project_key = your_project_key
    * run_title: = "Regression Cycle"  # Update this after creating a test run folder.
    * tma_key = TestWorthy API key
    * suite_id = Project Suite Id

### Obtaining Suite ID

* Open the TestWorthy project in your browser.
* Navigate to the desired Suite.
* Obtain the suite ID from the URL. It should look like .../Project/OverView/<suite_id>.


### Additional Notes

Ensure that the TestWorthy API is accessible from your network. For any issues or questions, please contact support@testworthy.com