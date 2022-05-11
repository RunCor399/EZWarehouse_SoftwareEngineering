'use strict';
const axios = require('axios');
const baseURL = "http://localhost:3001";




const url = baseURL + "/api/skuitem";

test("login as manager", async () => {
    const response = await loginAsManagerTest();
    //console.log(response.data.username);
    expect(response.data.username).toMatch("manager1@ezwh.com");    
    });

/*test("add sku", async () => {
    const response = await addSKUTest();
    //console.log(response.status);
    expect(response).not.toBeNull();    
    });*/

test("test add skuItem", async () => {
    const response = await addNewSKUItemTest();
    console.log(response.status)
    expect(response).not.toBeNull();    
    });
    

async function loginAsManagerTest(){
    return axios({
        method: 'post',
        url: baseURL + "/api/managerSessions/",
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            username:"manager1@ezwh.com",
            password:"testpassword"
        }
    });
}  

async function addNewSKUItemTest(){
    return axios({
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            RFID:"12345678901234567890123456789015", 
            SKUId: "1",
            DateOfStock: "2021/11/29"
        }
    });
}

async function addSKUTest(){
    return axios({
        method: 'post',
        url: baseURL + "/api/sku",
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            description : "a new sku",
            weight : 100,
            volume : 50,
            notes : "first SKU",
            price : 10.99,
            availableQuantity : 50
        }
    });
}

