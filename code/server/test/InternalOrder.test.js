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

describe('internal order test suite', async () => {
    /*insert test cases*/
});