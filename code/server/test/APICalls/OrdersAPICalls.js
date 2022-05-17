'use strict'

const axios = require('axios');

class OrderAPICalls {
    #baseURL;

    constructor(){
        this.#baseURL = "http://localhost:3001";
    }

    async getRestockOrdersTest(){
        return axios({
            method: 'get',
            url: this.#baseURL + "/api/restockOrders/",
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } 
}

module.exports = OrderAPICalls;