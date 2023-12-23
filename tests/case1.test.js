// Import axios module for making HTTP requests
const axios = require('axios');

describe('Flight API Tests', () => {

  // Test 1: GET request should return status code 200
  test('GET request should return status code 200', async () => {
    
    // Send GET request to Flights API
    const response = await axios.get('https://flights-api.buraky.workers.dev/');
    
    // Verify status code of the response is 200
    expect(response.status).toBe(200);
  });

  // Test 2: GET request should return data in specified format  
  test('GET request should return data in specified format', async () => {
    
    // Send GET request to Flights API
    const response = await axios.get('https://flights-api.buraky.workers.dev/');
    
    // Verify the content type of the response is 'application/json'
    expect(response.headers['content-type']).toEqual('application/json');

    // Destructure the response data from the response object
    const responseData = response.data;

    // Verify the response data is an array
    expect(responseData).toHaveProperty('data');
    // Extract the first flight object from the data array
    expect(Array.isArray(responseData.data)).toBe(true);


    // Verify the first flight object has the required properties
    const firstFlight = responseData.data[0];
    expect(firstFlight).toHaveProperty('id');
    expect(firstFlight).toHaveProperty('from');
    expect(firstFlight).toHaveProperty('to');
    expect(firstFlight).toHaveProperty('date');
  });

  test('Response should contain Content-Type header with value application/json', async () => {
   
    // Send GET request to Flights API
    const response = await axios.get('https://flights-api.buraky.workers.dev/');
    
    expect(response.headers).toHaveProperty('content-type');
    expect(response.headers['content-type']).toEqual('application/json');
  });
});
