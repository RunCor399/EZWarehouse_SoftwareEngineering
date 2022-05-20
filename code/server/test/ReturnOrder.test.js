'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const ReturnOrdersAPICalls = require('./APICalls/ReturnOrdersAPICalls');
const DBManager = require('../modules/database/databaseManager');

const baseURL = "http://localhost:3001";

//const utilityCalls = new UtilityCalls();
const databaseManager = new DBManager();
const returnOrdersAPICalls = new ReturnOrdersAPICalls();

describe('Return Orders Tests', async () => {
    
})