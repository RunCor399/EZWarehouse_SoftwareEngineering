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

test("get skus", async () => {
    const response = await skuAPICalls.getSKUsTest();
    console.log(response.data[2]);

    expect(response.status).toBe(200);
});

test("add sku", async () => {
    let responseGet, responseAdd;
    let skuCountBefore, skuCountAfter;

    //Check number of SKU's before add
    responseGet = await skuAPICalls.getSKUsTest();
    skuCountBefore = responseGet.data.length;

    responseAdd = await skuAPICalls.addSKUTest();

    //Check number of SKU's after add
    responseGet = await skuAPICalls.getSKUsTest();
    skuCountAfter = responseGet.data.length;

    expect(skuCountAfter).toBe(skuCountBefore + 1);  

});

/*test("modify sku", async () => {
    //let response = await utilityCalls.login("manager1@ezwh.com", "testpassword");
    
    const id = 1;
    const description = "new description";
    const weight = 20;
    const volume = 30;
    const notes = "modified SKU";
    const price = 5;
    const newAvailableQuantity = 20
    response = await skuAPICalls.modifySKUTest(id, description, weight, volume, notes, price, newAvailableQuantity);

    expect(response.data[id-1].id = id);
    expect(response.data[id-1].description = description);
    expect(response.data[id-1].newAvailableQuantity = newAvailableQuantity);
});*/







//MOVE INSIDE SKUItem.test.js
/*

test("test add skuItem", async () => {
    const response = await addNewSKUItemTest();
    console.log(response.status)
    expect(response).not.toBeNull();    
    });*/
    








