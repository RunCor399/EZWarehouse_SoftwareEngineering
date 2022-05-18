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


describe('restock order test suite', async () => {
   /*  it('get restock orders', async () => { //it indicates a TEST CASE
        const response = await restockOrdersAPICalls.getRestockOrdersTest();

        console.log(response.body);
        response.status.should.equal(200);
        //expect(response.status).to.equal(200);
    });

    it('add restock order', async () => {
        const response = await restockOrdersAPICalls.addRestockOrderTest();

        console.log(response.body);
        response.status.should.equal(201);
    }) */
});