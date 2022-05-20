'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const SkuAPICalls = require('./APICalls/SkuAPICalls');
const DBManager = require('../modules/database/databaseManager');

const baseURL = "http://localhost:3001";

const dbmanager = new DBManager()
const utilityCalls = new UtilityCalls();
const skuAPICalls = new SkuAPICalls();


//(async () => await utilityCalls.dbreset())()

describe('sku test suite', async () => {

    before(async () => {
        await dbmanager.deleteAllData();
    })
    after(async () => {
        await dbmanager.deleteAllData();
    })


    it('get skus', async () => { //it indicates a TEST CASE
        const response = await skuAPICalls.getSKUsTest();

        response.status.should.equal(200);
        assert.equal(response.data.length, 0, "response.data"+response.data);
    });

    it('add sku', async () => {
        const response = await skuAPICalls.addSKUTest("descriptionTest", 10, 20, "noteTest", 10.99, 5);
        response.status.should.equal(201);
    })

    it('get a sku given an id', async () => {
        const response = await skuAPICalls.getSKUTest(1);

        //console.log("response", response);
        assert.equal(response.data.id, 1)
        assert.equal(response.data.description, "descriptionTest")
        assert.equal(response.data.weight, 10)
        assert.equal(response.data.volume, 20)
        assert.equal(response.data.notes, "noteTest")
        assert.equal(response.data.price, 10.99)
        assert.equal(response.data.availableQuantity, 5)
        });

    it('delete a sku given an id', async() => {
        const response = await skuAPICalls.deleteSKUTest(1);

        //console.log(response.status)

        response.status.should.equal(204);
    })

    it('get deleted sku', async () => {
        const response = await skuAPICalls.getSKUTest(1);

        //console.log(response.status)
        assert(response.status, 404, response.status);

        });
});