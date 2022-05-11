'use strict';

const axios = require('axios');
const baseURL = "http://localhost:3001";

const UtilityCalls = require('./APICalls/UtilityCalls');
const SkuAPICalls = require('./APICalls/SkuAPICalls');

const utilityCalls = new UtilityCalls();
const skuAPICalls = new SkuAPICalls();



test("login as manager", async () => {
    const response = await utilityCalls.login("manager1@ezwh.com", "testpassword");
    
    expect(response.data.username).toMatch("manager1@ezwh.com");    
    });

    
test("add sku", async () => {
    const response = await skuAPICalls.addNewSKUItemTestaddSKUTest();
    //console.log(response.status);
    expect(response).not.toBeNull();    
    });


//MOVE INSIDE SKUItem.test.js
/*

test("test add skuItem", async () => {
    const response = await addNewSKUItemTest();
    console.log(response.status)
    expect(response).not.toBeNull();    
    });*/
    








