'use strict'

const axios = require('axios');

class RestockOrdersAPICalls {
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


    async addRestockOrderTest(){
        return axios({
            method: 'post',
            url: this.#baseURL + "/api/restockOrder",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                issueDate : "2022/08/11 08:08",
                products: [],
                supplierId : 1
            }
        });
    }
}

module.exports = RestockOrdersAPICalls;