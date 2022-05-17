'use strict';
const axios = require('axios');


class SkuAPICalls {
    #baseURL;

    constructor(){
        this.#baseURL = "http://localhost:3001";
    }

    async getSKUsTest(){
        return axios({
            method: 'get',
            url: this.#baseURL + "/api/skus",
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }


    async getSKUTest(id){
        return axios({
            method: 'get',
            url: this.#baseURL + "/api/skus/" + id ,
            headers: {
                'Content-Type': 'application/json',
            }
        });
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

    async modifySKUTest(id, description, weight, volume, notes, price, newAvailableQuantity){
        return axios({
            method: 'put',
            url: this.#baseURL + "/api/sku/" + id,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                newDescription : description,
                newWeight : weight,
                newVolume : volume,
                newNotes : notes,
                newPrice : price,
                newAvailableQuantity : newAvailableQuantity
            }
        });
    }

    async modifySKUPosition(id){
        return axios({
            method: 'put',
            url: this.#baseURL + "/api/sku/" + id + "/position",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                position : position,
            }
        });
    }
}

module.exports = SkuAPICalls;