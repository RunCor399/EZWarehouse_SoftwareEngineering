'use strict';
const axios = require('axios');
const baseURL = "http://localhost:3001";




const url = baseURL + "/api/skuitem";


test("test sku", async () => {
    const response = await addNewSKUItemTest();
    expect(response).not.toBeNull();    
    });
    

    

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

