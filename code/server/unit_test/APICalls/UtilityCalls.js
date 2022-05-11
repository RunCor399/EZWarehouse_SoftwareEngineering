'use strict'

const axios = require('axios');

class UtilityCalls {
    #baseURL;

    constructor(){
        this.#baseURL = "http://localhost:3001";
    }

     async login(username, password){
        return axios({
            method: 'post',
            url: this.#baseURL + "/api/managerSessions/",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username:username,
                password:password
            }
        });
    }
}


module.exports = UtilityCalls;