// @ts-check
const { test, expect } = require('@playwright/test');


var token


test('should be able to update the booking details', async ({ request }) => {

    // Create a Token which will be used in PUT request

    const response = await request.post('/auth', {
    data: {
    "username": "admin",
    "password": "password123"
    }
    });
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    token = responseBody.token;
    console.log("New Token is: " + token);

    //GET call before update record
    const beforeUpdateResponse = await request.get('/booking/1');
    console.log(await beforeUpdateResponse.json());
    expect(beforeUpdateResponse.ok()).toBeTruthy();
    expect(beforeUpdateResponse.status()).toBe(200);


    // PUT
    const updateRequest = await request.put('/booking/1', {
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cookie': `token=${token}`,
    },
    data: {
    "firstname": "Hammad",
    "lastname": "Mahmood",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
    "checkin": "2023-06-01",
    "checkout": "2023-06-15"
    },
    "additionalneeds": "Breakfast"
    }
    });
    console.log(await updateRequest.json());
    expect(updateRequest.ok()).toBeTruthy();
    expect(updateRequest.status()).toBe(200);
    const updatedResponseBody = await updateRequest.json()
    expect(updatedResponseBody).toHaveProperty("firstname", "Hammad");
    expect(updatedResponseBody).toHaveProperty("lastname", "Mahmood");
    expect(updatedResponseBody).toHaveProperty("totalprice", 111);
    expect(updatedResponseBody).toHaveProperty("depositpaid", true);

    //GET call after update record
    const afterUpdateResponse = await request.get('/booking/1');
    console.log(await afterUpdateResponse.json());
    expect(afterUpdateResponse.ok()).toBeTruthy();
    expect(afterUpdateResponse.status()).toBe(200);
});