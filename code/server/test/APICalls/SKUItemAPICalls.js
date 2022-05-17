'use strict';
const axios = require('axios');


class SKUItemAPICalls {
    #baseURL;

    constructor(){
        this.#baseURL = "http://localhost:3001";
    }

    async addSKUItemTest(){
        return axios({
            method: 'post',
            url:  this.#baseURL + "/api/skuitem",
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

    
}

module.exports = SKUItemAPICalls;