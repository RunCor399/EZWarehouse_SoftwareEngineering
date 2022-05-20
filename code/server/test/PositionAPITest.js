'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const PositionAPICalls = require('./APICalls/PositionAPICalls');
const DBManager = require('../modules/database/databaseManager');

const baseURL = "http://localhost:3001";

const dbmanager = new DBManager()
const utilityCalls = new UtilityCalls();
const positionAPICalls = new PositionAPICalls();

describe('position test suite', async () => {

    before(async () => {
        await dbmanager.deleteAllData();
    })
    after(async () => {
        await dbmanager.deleteAllData();
    })

    it('get positions', async () => { //it indicates a TEST CASE
        const response = await positionAPICalls.getPositions()

        response.status.should.equal(200);
        assert.equal(response.data.length, 0, "response.data" + response.data);
    });

    it('create position', async () => { //it indicates a TEST CASE
        const response = await positionAPICalls.addPosition("800234543412", "8002",
        "3454", "3412", 1000, 1000)

        response.status.should.equal(201);
        assert.equal(response.data.length, 0, "response.data" + response.data);
    });

    it('modify position', async () => { //it indicates a TEST CASE

        
        const response = await positionAPICalls.modifyPosition("800234543412", "8002",
        "3454", "3412", 2000, 2000, 100, 100)

        response.status.should.equal(200);
        assert.equal(response.data.length, 0, "response.data" + response.data);
    });

    it('modify positionID', async () => { //it indicates a TEST CASE
        const response = await positionAPICalls.changePositionID("800234543412", "800234543413")

        response.status.should.equal(200);
        assert.equal(response.data.length, 0, "response.data" + response.data);
    });

    it('get positions', async () => { //it indicates a TEST CASE
        const response = await positionAPICalls.getPositions()

        response.status.should.equal(200);
        assert.equal(response.data.length, 1, "response.data" + response.data);
    });
    
    it('delete position', async () => { //it indicates a TEST CASE
        const response = await positionAPICalls.deletePosition("800234543413")

        response.status.should.equal(204);
        assert.equal(response.data.length, 0, "response.data" + response.data);
    });


})