'use strict';
const axios = require('axios');


class SkuAPICalls {
    #baseURL;

    constructor() {
        this.#baseURL = "http://localhost:3001";
    }

    async getSKUsTest() {
        return axios({
            method: 'get',
            url: this.#baseURL + "/api/skus",
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }


    async getSKUTest(id) {
       
        let response;
        await axios.get( this.#baseURL + "/api/skus/" + id)
            .then( value => {response = value})
            .catch(function (error) {response = error.response;});
            return response;
    }

    async addSKUTest(description, weight, volume, notes, price, availableQuantity) {
        return axios({
            method: 'post',
            url: this.#baseURL + "/api/sku",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                description: description,
                weight: Number(weight),
                volume: Number(volume),
                notes: notes,
                price: Number(price),
                availableQuantity: Number(availableQuantity)
            }
        });
    }

    async modifySKUTest(id, description, weight, volume, notes, price, newAvailableQuantity) {
        return axios({
            method: 'put',
            url: this.#baseURL + "/api/sku/" + id,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                newDescription: description,
                newWeight: weight,
                newVolume: volume,
                newNotes: notes,
                newPrice: price,
                newAvailableQuantity: newAvailableQuantity
            }
        });
    }

    async modifySKUPosition(id) {
        return axios({
            method: 'put',
            url: this.#baseURL + "/api/sku/" + id + "/position",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                position: position,
            }
        });
    }

    async deleteSKUTest(id) {
   
        let response;
        await axios.delete(this.#baseURL + "/api/skus/" + id)
        .then( value => {response = value})
            .catch(error => {response = error.response;});
            return response;
}
}

module.exports = SkuAPICalls;