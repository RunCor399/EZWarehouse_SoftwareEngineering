'use strict'

const axios = require('axios');

class TestResultAPICalls {
    #baseURL;

    constructor(){
        this.#baseURL = "http://localhost:3001";
    }

    //GET
    async getTestResults(rfid){
        return axios({
            method: 'get',
            url: this.#baseURL + "/api/skuitems/"+rfid+"/testResults",
        });
    } 

    async getTestResultById(rfid, id){
        return axios({
            method: 'get',
            url: this.#baseURL + "/api/skuitems/"+rfid+"/testResults/" + id ,
        });
    }

    //POST
    async addTestResult(rfid, idTestDescriptor, Date, Result){
        return axios({
            method: 'post',
            url: this.#baseURL + "/api/skuitems/testResult" ,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                rfid : rfid, 
                idTestDescriptor : idTestDescriptor,
                Date : Date,
                Result : Result
            }
        });
    }


    //PUT
    async editTestDescriptor(rfid, id, newIdTestDescriptor, newDate, newResult){
        return axios({
            method: 'put',
            url: this.#baseURL + "/api/skuitems/"+rfid+"/testResults/" + id ,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                newIdTestDescriptor : newIdTestDescriptor,
                newDate : newDate, 
                newResult : newResult
            }
        });
    }


    //DELETE
    async deleteTestResult(rfid, id){
        return axios({
            method: 'delete',
            url: this.#baseURL + "/api/skuitems/"+rfid+"/testResults/" + id,
        });
    }
}

module.exports = TestResultAPICalls;