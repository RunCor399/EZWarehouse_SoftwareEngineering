'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const ItemAPICalls = require('./APICalls/ItemAPICalls');
const DBManager = require('../modules/database/databaseManager');

const baseURL = "http://localhost:3001";

const utilityCalls = new UtilityCalls();
const itemAPICalls = new ItemAPICalls();
const dbmanager = new DBManager();

describe('Items test suite', async () => {

    beforeEach(async () => {
        await dbmanager.deleteAllData();
    });
    afterEach(async () => {
        await dbmanager.deleteAllData();
    });

    describe('POST Request test to Items', async () => {
        describe('Add a new Item tests', async () => {
            let response;
            it('Successfully add a new Item', async () => {
                response = await itemAPICalls.addItemTest(1, "first_item", 9.99, 1, 1);
                response.status.should.equal(201);

                response = await itemAPICalls.getItemByIdTest(1);
                response.data.id.should.equal(1);
            });

            it('Negative SKUId', async () => {
                response = await itemAPICalls.addItemTest(1, "first_item", 9.99, -1, 1);
                response.status.should.equal(422);
            });

            it('Improper price', async () => {
                response = await itemAPICalls.addItemTest(1, "first_item", "price", 1, 1);
                response.status.should.equal(422);
            });
        });
    });

    describe('Standard Item getters', async () => {
        it('get all items', async () => {
            let response = await itemAPICalls.getItemsTest();

            response.status.should.equal(200);
        });

        it('get item by id', async () => {
            let response = await itemAPICalls.getItemByIdTest(1);

            response.status.should.equal(200);
        });
    });

    describe('PUT Request test to Items', async () => {
        describe('Edit an existing Item tests', async () => {
            it('Successfully edit an Item', async () => {
                let response;
                response = await itemAPICalls.editItemTest(1, "newDesc", 10.5);
                response.status.should.equal(201);

                response = await itemAPICalls.getItemByIdTest(1);
                response.data.newDescription.should.equal("newDesc");
                response.data.newPrice.should.equal(10.5);
            });

            it('Edit non-existing Item', async () => {
                let response;
                response = await itemAPICalls.editItemTest(-1, "some_text", 50.00);
                response.status.should.equal(404);
            });

            it('Edit Item with improper price', async () => {
                let response;
                response = await itemAPICalls.editItemTest(-1, "some_text", "price");
                response.status.should.equal(422);
            });
        });
    });

    describe('DELETE Request test to Items', async () => {
        describe('Delete an Item tests', async () => {
            let response;
            it('Successfully delete an Item', async () => {
                response = await itemAPICalls.deleteItemTest(1);
                response.status.should.equal(204);
            });

            it('Wrong Item id', async () => {
                response = await itemAPICalls.deleteItemTest('id');
                response.status.should.equal(422);
            });
        });
    });

});