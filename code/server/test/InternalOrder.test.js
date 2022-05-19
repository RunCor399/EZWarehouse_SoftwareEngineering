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

describe('Internal Orders test suite', async () => {
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
    describe('Add a new Internal Order tests', async () => {
        it('Successfully add a new Internal Order', async () => {

        });

        /*add error test cases*/
    });
});

describe('PUT Request test to Internal Orders', async () => {
    describe('Edit an existing Internal Order tests', async () => {
        it('Successfully edit an Internal Order', async () => {

        });

        /*add error test cases*/
    });
});

describe('DELETE Request test to Internal Orders', async () => {
    describe('Delete an Internal Order tests', async () => {
        it('Successfully delete an Internal Order', async () => {

        });

        /*add error test cases*/
    });
})