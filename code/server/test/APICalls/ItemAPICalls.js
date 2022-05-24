'use strict'

const axios = require('axios');

class ItemAPICalls {
    #baseURL;

    constructor() {
        this.#baseURL = "http://localhost:3001";
    }

    //GET
    async getItemsTest() {
        const url = this.#baseURL + "/api/items/";
        let response;

        await axios.get(url)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }

    async getItemByIdTest(id) {
        const url = this.#baseURL + "/api/items/" + id;
        let response;

        await axios.get(url)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }

    //POST
    async addItemTest(id, description, price, SKUId, supplierId) {
        const url = this.#baseURL + "/api/item";
        const body = {
            id: id,
            description: description,
            price: price,
            SKUId: SKUId,
            supplierId: supplierId
        }
        const headers = { headers: { 'Content-Type': 'application/json' } };
        let response;

        await axios.post(url, body, headers)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }

    //PUT
    async editItemTest(id, newDescription, newPrice) {
        const url = this.#baseURL + "/api/item/" + id;
        const body = {
            newDescription: newDescription,
            newPrice: newPrice
        };
        const headers = { headers: { 'Content-Type': 'application/json' } };
        let response;

        await axios.put(url, body, headers)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }

    //DELETE
    async deleteItemTest(id) {
        const url = this.#baseURL + "/api/items/" + id;
        let response;

        await axios.delete(url)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }
}

module.exports = ItemAPICalls;