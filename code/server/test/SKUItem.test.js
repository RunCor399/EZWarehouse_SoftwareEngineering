'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const SKUItemAPICalls = require('./APICalls/SKUItemAPICalls');

const baseURL = "http://localhost:3001";

const utilityCalls = new UtilityCalls();
const skuitemAPICalls = new SKUItemAPICalls();

describe('skuitem test suite', async () => {
    it('get skuitems', async () => { //it indicates a TEST CASE
        const response = await skuitemAPICalls.getSKUItems()

        response.status.should.equal(200);
        assert.equal(response.data.length, 0, "response.data"+response.data);
    });

    it('get skuitems by skuid', async () => { //it indicates a TEST CASE
        const response = await skuitemAPICalls.getSKUItemsBySKUId(id)//skuid da aggiungere

        response.status.should.equal(200);
        assert.equal(response.data.length, 0, "response.data"+response.data);
    });

    it('get skuitem by rfid', async () => { //it indicates a TEST CASE
        const response = await skuitemAPICalls.getSKUItemByRFID(rfid)//rfid da aggiungere

        response.status.should.equal(200);
        assert.equal(response.data.length, 0, "response.data"+response.data);
    });

    it('add skuitem', async () => { //it indicates a TEST CASE
        const response = await skuitemAPICalls.addSKUItem(rfid, skuid, dateOfStock);

        response.status.should.equal(201);
        assert.equal(response.data.length, 0, "response.data"+response.data);
    });

    it('modify skuitem', async () => { //it indicates a TEST CASE
        const response = await skuitemAPICalls.modifySKUItemRFID(RFID, newRFID, newAvailable, newDateOfStock)

        response.status.should.equal(200);
        assert.equal(response.data.length, 0, "response.data"+response.data);
    });

    it('delete skuitem', async () => { //it indicates a TEST CASE
        const response = await skuitemAPICalls.deleteSKUItem(RFID)

        response.status.should.equal(204);
        assert.equal(response.data.length, 0, "response.data"+response.data);
    });




})