'use strict';

const axios = require('axios');
const UtilityCalls = require('./APICalls/UtilityCalls');
const OrderAPICalls = require('./APICalls/OrdersAPICalls');

const baseURL = "http://localhost:3001";

const utilityCalls = new UtilityCalls();
const orderAPICalls = new OrderAPICalls();

//LOGIN AS MANAGER
test("login as manager", async () => {
    const response = await utilityCalls.login("manager1@ezwh.com", "testpassword");
    
    expect(response.data.username).toMatch("manager1@ezwh.com");    
    });

//GET ORDERS
test("get orders", async () => {
    const response = await orderAPICalls.getRestockOrdersTest();

    expect(response.status).toBe(200);
});





