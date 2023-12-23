// @ts-check
const { test, expect } = require('@playwright/test');

test('Search Test 1', async ({ page }) => {

  //Testing the "From" and "To" inputs are not same.
  await page.goto('https://flights-app.pages.dev/');
  
  // Search for the origin city: Istanbul
  await page.fill('[id="headlessui-combobox-input-:Rq9lla:"]','Istanbul');
  await page.click('text=Istanbul');

  // Search for the destination city: Istanbul
  await page.fill('[id="headlessui-combobox-input-:Rqhlla:"]', 'Istanbul');
  await page.click('text=Istanbul');

  // @ts-ignore
  const fromValue = await page.$eval('[id="headlessui-combobox-input-:Rq9lla:"]', el => el.value);
  // @ts-ignore
  const toValue = await page.$eval('[id="headlessui-combobox-input-:Rqhlla:"]', el => el.value);
  expect(fromValue).not.toEqual(toValue); // Expect different values in "From" and "To" fields

});

test('Search Test 2', async ({ page }) => {

  //Testing "Istanbul" to "Los Angeles" flights.
  await page.goto('https://flights-app.pages.dev/');
  
  // Search for the origin city: Istanbul
  await page.fill('[id="headlessui-combobox-input-:Rq9lla:"]','Istanbul');
  await page.click('text=Istanbul');

  // Search for the destination city: Los Angeles
  await page.fill('[id="headlessui-combobox-input-:Rqhlla:"]', 'Los Angeles');
  await page.click('text=Los Angeles');

  await page.waitForSelector('.mb-10');
  const foundItemsText = await page.textContent('.mb-10');
  expect(foundItemsText).toEqual("Found 2 items")
});




test('List Test', async ({ page }) => {

  //Testing number of fligths and listed flights are equal.
  await page.goto('https://flights-app.pages.dev/');

  // Search for the origin city: Istanbul
  await page.fill('[id="headlessui-combobox-input-:Rq9lla:"]','Istanbul');
  await page.click('text=Istanbul');

  // Search for the destination city: Los Angeles
  await page.fill('[id="headlessui-combobox-input-:Rqhlla:"]', 'Los Angeles');
  await page.click('text=Los Angeles');

  await page.waitForSelector('.mb-10');
  const foundItemsText = await page.textContent('.mb-10');
  // @ts-ignore
  const foundItemCount = Number(foundItemsText.split(' ')[1]);
  
  await page.waitForSelector('.grid'); // Wait for flight items to load
  const flightItems = await page.$$('.overflow-hidden');
  const numberOfFlights = flightItems.length;
  expect(numberOfFlights).toEqual(foundItemCount);
});
