'use strict'

const axios = require('axios');

class InternalOrdersAPICalls {
    #baseURL;

    constructor(){
        this.#baseURL = "http://localhost:3001";
    }
}

module.exports = InternalOrdersAPICalls;