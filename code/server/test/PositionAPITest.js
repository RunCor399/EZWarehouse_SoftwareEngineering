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
        const response = await positionAPICalls.addPosition(positionID,
        aisleID, row, col, maxWeight, maxVolume)

        response.status.should.equal(200);
        assert.equal(response.data.length, 0, "response.data" + response.data);
    });

    it('modify position', async () => { //it indicates a TEST CASE
        const response = await positionAPICalls.modifyPosition(positionID, newAisleID,
            newRow, newCOl, newMaxWeight, newMaxVolume, newOccupiedWeight, newOccupiedVolume)

        response.status.should.equal(200);
        assert.equal(response.data.length, 0, "response.data" + response.data);
    });

    it('modify positionID', async () => { //it indicates a TEST CASE
        const response = await positionAPICalls.changePositionID(positionID, newPositionID)

        response.status.should.equal(200);
        assert.equal(response.data.length, 0, "response.data" + response.data);
    });
    
    it('delete position', async () => { //it indicates a TEST CASE
        const response = await positionAPICalls.deletePosition(positionID)

        response.status.should.equal(200);
        assert.equal(response.data.length, 0, "response.data" + response.data);
    });


})