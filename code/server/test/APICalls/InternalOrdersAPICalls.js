'use strict'

const axios = require('axios');

class InternalOrdersAPICalls {
    #baseURL;

    constructor() {
        this.#baseURL = "http://localhost:3001";
    }

    //GET
    async getInternalOrdersTest() {
        return axios({
            method: 'get',
            url: this.#baseURL + '/api/internalOrders/',
        });
    }

    async getIssuedInternalOrdersTest() {
        return axios({
            method: 'get',
            url: this.#baseURL + '/api/internalOrdersIssued/',
        });
    }

    async getAcceptedInternalOrdersTest() {
        return axios({
            method: 'get',
            url: this.#baseURL + '/api/internalOrdersAccepted/',
        });
    }

    async getInternalOrderByIdTest(id) {
        return axios({
            method: 'get',
            url: this.#baseURL + '/api/internalOrders/' + id,
        });
    }

    //POST
    async addInternalOrderTest(issueDate, products, customerId) {
        return axios({
            method: 'post',
            url: this.#baseURL + '/api/internalOrders',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                issueDate: issueDate,
                products: products,
                customerId: customerId
            }
        });

    }

    //PUT
    /*it's missing the check on the state*/
    async editInternalOrderTest(id, newState) {
        return axios({
            method: 'put',
            url: this.#baseURL + '/api/internalOrders/' + id,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                newState: newState
            }
        });
    }

    //DELETE
    async deleteInternalOrderTest(id) {
        return axios({
            method: 'delete',
            url: this.#baseURL + '/api/internalOrders/' + id
        });
    }

}

module.exports = InternalOrdersAPICalls;