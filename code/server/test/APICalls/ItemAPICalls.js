'use strict'

const axios = require('axios');

class ItemAPICalls {
    #baseURL;

    constructor() {
        this.#baseURL = "http://localhost:3001";
    }

    //GET
    async getItemsTest() {
        return axios({
            method: 'get',
            url: this.#baseURL + '/api/items/'
        });
    }

    async getItemByIdTest(id) {
        return axios({
            method: 'get',
            url: this.#baseURL + '/api/items/' + id
        });
    }

    //POST
    async addItemTest(id, description, price, SKUId, supplierId) {
        return axios({
            method: 'post',
            url: this.#baseURL + '/api/item',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                id: id,
                description: description,
                price: price,
                SKUId: SKUId,
                supplierId: supplierId
            }
        });
    }

    //PUT
    async editItemTest(id, newDescription, newPrice) {
        return axios({
            method: 'put',
            url: this.#baseURL + '/api/item' + id,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                newDescription: newDescription,
                newPrice: newPrice
            }
        });
    }

    //DELETE
    async deleteItemTest(id) {
        return axios({
            method: 'delete',
            url: this.#baseURL + id
        });
    }
}

module.exports = ItemAPICalls;