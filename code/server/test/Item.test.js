'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const ItemAPICalls = require('./APICalls/ItemAPICalls');

const baseURL = "http://localhost:3001";

const utilityCalls = new UtilityCalls();
const itemAPICalls = new ItemAPICalls();

describe('Items test suite', async () => {
    describe('Standard Item getters', async () => {
        it('get all items', async () => {
            const response = await itemAPICalls.getItemsTest();

            response.status.should.equal(200);
        });

        it('get item by id', async () => {
            const response = await itemAPICalls.getItemByIdTest(1);

            response.status.should.equal(200);
        });
    });
});

describe('POST Request test to Items', async () => {
    describe('Add a new Item tests', async () => {
        it('Successfully add a new Item', async () => {

        });

        /*add error test cases*/
    });
});

describe('PUT Request test to Items', async () => {
    describe('Edit an existing Item tests', async () => {
        it('Successfully edit an Item', async () => {

        });

        /*add error test cases*/
    });
});

describe('DELETE Request test to Items', async () => {
    describe('Delete an Item tests', async () => {
        it('Successfully delete an Item', async () => {

        });

        /*add error test cases*/
    });
})