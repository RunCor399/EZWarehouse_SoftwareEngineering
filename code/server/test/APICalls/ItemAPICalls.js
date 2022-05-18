'use strict'

const axios = require('axios');

class ItemAPICalls {
    #baseURL;

    constructor(){
        this.#baseURL = "http://localhost:3001";
    }
}

module.exports = ItemAPICalls;