'use strict';
const axios = require('axios');


class SkuAPICalls {
    #baseURL;

    constructor(){
        this.#baseURL = "http://localhost:3001";
    }

    async addSKUTest(){
        return axios({
            method: 'post',
            url: this.#baseURL + "/api/sku",
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

    
}

module.exports = SkuAPICalls;