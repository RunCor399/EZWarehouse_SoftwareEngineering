'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const SKUItemAPICalls = require('./APICalls/SKUItemAPICalls');
const DBManager = require('../modules/database/databaseManager');
const SkuAPICalls = require('./APICalls/SkuAPICalls');

const baseURL = "http://localhost:3001";

const utilityCalls = new UtilityCalls();
const skuitemAPICalls = new SKUItemAPICalls();
const skuAPICalls = new SkuAPICalls();
const dbmanager = new DBManager();


describe('skuitem test suite', async () => {

    before(async () => {
        await dbmanager.deleteAllData();
    })
    after(async () => {
        await dbmanager.deleteAllData();
    })

    describe('add and verify', async () => {

        it('add skuitem', async () => { //it indicates a TEST CASE

            const responseSKU1 = await skuAPICalls.addSKUTest("description1", 10, 20, "noteTest", 10.99, 5);
            const responseSKU2 = await skuAPICalls.addSKUTest("description2", 10, 20, "noteTest", 10.99, 5);
            const responseSKU3 = await skuAPICalls.addSKUTest("description3", 10, 20, "noteTest", 10.99, 5);

            const response1 = await skuitemAPICalls.addSKUItem("12345678901234567890123456789015", 1, "2021/11/20 12:30");
            const response2 = await skuitemAPICalls.addSKUItem("12345678901234567890123456789016", 1, "2021/11/21 12:30");
            const response3 = await skuitemAPICalls.addSKUItem("12345678901234567890123456789017", 2, "2021/11/22 12:30");
            const response4 = await skuitemAPICalls.addSKUItem("12345678901234567890123456789018", 3, "2021/11/23 12:30");


            response1.status.should.equal(201);
            response2.status.should.equal(201);
            response3.status.should.equal(201);
            response4.status.should.equal(201);
        });


        it('get skuitems', async () => { //it indicates a TEST CASE
            const response = await skuitemAPICalls.getSKUItems()

            response.status.should.equal(200);
            assert.equal(response.data.length, 4, "response.data" + response.data);
        });

        it('get skuitems by skuid', async () => { //it indicates a TEST CASE


            const response = await skuitemAPICalls.getSKUItemsBySKUId(1)//skuid da aggiungere

            response.status.should.equal(200);
            assert.equal(response.data.length, 2, "response.data" + response.data);
        });

        it('get skuitem by rfid', async () => { //it indicates a TEST CASE

            const response = await skuitemAPICalls.getSKUItemByRFID("12345678901234567890123456789015")//rfid da aggiungere

            response.status.should.equal(200);
            assert.equal(response.data.RFID, "12345678901234567890123456789015", "response.data" + response.data);
        });

    })

    describe('modify and verify', async () => {

        it('modify skuitem', async () => { //it indicates a TEST CASE

            const response = await skuitemAPICalls.modifySKUItemRFID("12345678901234567890123456789015",
                "12345678901234567890123456789019", 1, "2021/11/30 12:30")

            response.status.should.equal(200);
        });

        it('get skuitem by rfid', async () => { //it indicates a TEST CASE

            const response = await skuitemAPICalls.getSKUItemByRFID("12345678901234567890123456789019")//rfid da aggiungere

            response.status.should.equal(200);
            assert.equal(response.data.RFID, "12345678901234567890123456789019", "response.data" + response.data);
        });

    })

    describe('delete and verify', async () => {

        it('delete skuitem', async () => { //it indicates a TEST CASE


            const response1 = await skuitemAPICalls.deleteSKUItem("12345678901234567890123456789019")
            const response2 = await skuitemAPICalls.deleteSKUItem("12345678901234567890123456789016")
            const response3 = await skuitemAPICalls.deleteSKUItem("12345678901234567890123456789017")
            const response4 = await skuitemAPICalls.deleteSKUItem("12345678901234567890123456789018")

            response1.status.should.equal(204);
            response2.status.should.equal(204);
            response3.status.should.equal(204);
            response4.status.should.equal(204);
        });

        it('get skuitems', async () => { //it indicates a TEST CASE
            const response = await skuitemAPICalls.getSKUItems()

            response.status.should.equal(200);
            assert.equal(response.data.length, 0, "response.data" + response.data);
        });

    })



})