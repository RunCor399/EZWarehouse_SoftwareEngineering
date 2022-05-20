'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const InternalOrdersAPICalls = require('./APICalls/InternalOrdersAPICalls');
const DBManager = require('../modules/database/databaseManager');

const baseURL = "http://localhost:3001";

//const utilityCalls = new UtilityCalls();
const databaseManager = new DBManager();
const internalOrdersAPICalls = new InternalOrdersAPICalls();

describe('Internal Orders test suite', async () => {

    /*beforeEach(async () => {
        await databaseManager.deleteAllData().then(async () => {
            //insert internal order data
        });
      });

    after(async () => {
        await databaseManager.deleteAllData();
    })*/

    before(async () => {
        await dbmanager.deleteAllData();
    })
    after(async () => {
        await dbmanager.deleteAllData();
    })

    describe('POST Request test to Internal Orders', async () => {
        describe('Add a new Internal Order tests', async () => {
            let response;
            it('Successfully add a new Internal Order', async () => {
                response = await internalOrdersAPICalls.addInternalOrderTest("2022/02/02 10:10", [], 2);
                response.status.should.equal(201);

                /*No data has been added before this add, therefore the id is 1*/
                response = await internalOrdersAPICalls.getInternalOrderByIdTest(1);
                response.data.id.should.equal(1);
            });

            it('Negative customerId', async () => {
                response = await internalOrdersAPICalls.addInternalOrderTest("2022/02/04 13:00", [], -5);
                response.status.should.equal(422);
            });

            it('Malformed date', async () => {
                response = await internalOrdersAPICalls.addInternalOrderTest("05/02/2022 10:10", [], 10);
                response.status.should.equal(422);
            });

        });
    });

    describe('GET Request tests to Internal Orders', async () => {
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

});