'use strict'

const axios = require('axios');

class RestockOrdersAPICalls {
    #baseURL;

    constructor(){
        this.#baseURL = "http://localhost:3001";
    }

    //GET
    async getRestockOrders(){
        return axios({
            method: 'get',
            url: this.#baseURL + "/api/restockOrders/",
        });
    } 


    async getIssuedRestockOrders(){
        return axios({
            method: 'get',
            url: this.#baseURL + "/api/restockOrdersIssued/",
        });
    } 

    async getRestockOrderById(id){
        return axios({
            method: 'get',
            url: this.#baseURL + "/api/restockOrders/" + id,
        });
    } 


    async getReturnItemsByRestockOrder(id){
        return axios({
            method: 'get',
            url: this.#baseURL + "/api/restockOrders/" + id + "/returnItems",
        });
    }

    //POST
    async addRestockOrderTest(issueDate, products, supplierId){
        return axios({
            method: 'post',
            url: this.#baseURL + "/api/restockOrder",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                issueDate : issueDate,
                products: products,
                supplierId : supplierId
            }
        });
    }


    //PUT
    async editRestockOrderState(id, newState){
        return axios({
            method: 'put',
            url: this.#baseURL + "/api/restockOrder/" + id,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                newState : newState
            }
        });
    }


    async addSKUItemsToRestockOrder(id, skuItems){
        return axios({
            method: 'put',
            url: this.#baseURL + "/api/restockOrder/" + id + "/skuItems",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                skuItems : skuItems
            }
        });
    }


    async addTransportNote(id, transportNote){
        return axios({
            method: 'put',
            url: this.#baseURL + "/api/restockOrder/" + id + "/transportNote",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                transportNote : transportNote
            }
        });
    }


    //DELETE
    async deleteRestockOrder(id){
        return axios({
            method: 'delete',
            url: this.#baseURL + "/api/restockOrder/" + id,
        });
    }
}

module.exports = RestockOrdersAPICalls;