'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const RestockOrdersAPICalls = require('./APICalls/RestockOrdersAPICalls');

const baseURL = "http://localhost:3001";

const utilityCalls = new UtilityCalls();
const restockOrdersAPICalls = new RestockOrdersAPICalls();

//USE HOOKS TO HANDLE LOGIN BEFORE OPERATIONS

describe('test suite', async () => { //Describe is a test unit
    it('my login test', async () => { //it indicates a TEST CASE
        const response = await utilityCalls.login("manager1@ezwh.com", "testpassword");
        response.status.should.equal(200);
        //expect(response.status).to.equal(200);
    })
})