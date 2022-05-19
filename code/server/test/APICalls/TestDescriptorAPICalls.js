'use strict'

const axios = require('axios');

class TestDescriptorAPICalls {
    #baseURL;

    constructor(){
        this.#baseURL = "http://localhost:3001";
    }

    //GET
    async getTestDescriptors(){
        return axios({
            method: 'get',
            url: this.#baseURL + "/api/testDescriptors",
        });
    } 

    async getTestDescriptorById(id){
        return axios({
            method: 'get',
            url: this.#baseURL + "/api/testDescriptors/" + id ,
        });
    }

    //POST
    async addTestDescriptor(name, procedureDescription, idSKU){
        return axios({
            method: 'post',
            url: this.#baseURL + "/api/testDescriptor/" + id ,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                name: name,
                procedureDescription: procedureDescription,
                idSKU: idSKU
            }
        });
    }


    //PUT
    async editTestDescriptor(id, newName, newProcedureDescription, newIdSKU){
        return axios({
            method: 'put',
            url: this.#baseURL + "/api/testDescriptor/" + id,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                newName: newName,
                newProcedureDescription: newProcedureDescription, 
                newIdSKU: newIdSKU
            }
        });
    }


    //DELETE
    async deleteTestDescriptor(id){
        return axios({
            method: 'delete',
            url: this.#baseURL + "/api/testDescriptor/" + id,
        });
    }
}

module.exports = TestDescriptorAPICalls;