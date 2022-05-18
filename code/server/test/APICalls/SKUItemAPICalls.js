'use strict';
const axios = require('axios');


class SKUItemAPICalls {
    #baseURL;

    constructor() {
        this.#baseURL = "http://localhost:3001";
    }

    async getSKUItems() {
        let response;
        axios.get(this.#baseURL + '/api/skuitems')
            .then(value => response = value)
            .catch(error => response = error.response)
        return response;
    }

    async getSKUItemsBySKUId(SKUId) {
        let response;
        axios.get(this.#baseURL + '/api/skuitems/sku/' + SKUId)
            .then(value => response = value)
            .catch(error => response = error.response)
        return response;
    }

    async getSKUItemByRFID(RFID) {
        let response;
        axios.get(this.#baseURL + '/api/skuitems' + RFID)
            .then(value => response = value)
            .catch(error => response = error.response)
        return response;
    }

    async addSKUItem(RFID, SKUId, DateOfStock) {
        let response;
        axios.post(this.#baseURL + '/api/skuitem',
            {
                RFID: RFID,
                SKUId: SKUId,
                DateOfStock: DateOfStock,
            })
            .then(value => response = value)
            .catch(error => response = error.response)
        return response;
    }

    async modifySKUItemRFID(RFID, newRFID, newAvailable, newDateOfStock) {
        let response;
        axios.put(this.#baseURL + '/api/skuitems/' + RFID,
            {
                newRFID: newRFID,
                newAvailable: newAvailable,
                newDateOfStock: newDateOfStock
            })
            .then(value => response = value)
            .catch(error => response = error.response)
        return response;
    }

    async deleteSKUItem(RFID) {
        let response;
        axios.delete(this.#baseURL + '/api/skuitems/' + RFID)
            .then(value => response = value)
            .catch(error => response = error.response)
        return response;
    }


}

module.exports = SKUItemAPICalls;