'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const InternalOrdersAPICalls = require('./APICalls/InternalOrdersAPICalls');

const baseURL = "http://localhost:3001";

const utilityCalls = new UtilityCalls();
const internalOrdersAPICalls = new InternalOrdersAPICalls();

describe('internal order test suite', async () => {
    describe('Standard Internal Order getters', async () => {
        it('get all internal orders', async () => {
            const response = await internalOrdersAPICalls.getInternalOrdersTest();

            response.status.should.equal(200);
        });

        it('get issued internal orders', async () => {
            const response = await internalOrdersAPICalls.getIssuedInternalOrdersTest();

            response.status.should.equal(200);
        });

        it('get accepted internal orders', async () => {
            const response = await internalOrdersAPICalls.getAcceptedInternalOrdersTest();

            response.status.should.equal(200);
        });

        it('get internal order by id', async () => {
            const response = await internalOrdersAPICalls.getInternalOrderByIdTest(1);

            response.status.should.equal(200);
        });
    });
});

describe('POST Request test to Internal Orders', async () => {

});

describe('PUT Request test to Internal Orders', async() => {

});

describe('DELETE Request test to Internal Orders', async() => {
    
})