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

describe('item test suite', async () => {
    /*insert test cases*/
});