'use strict';

const { expect } = require('chai');
const Controller = require('../modules/logic/controller');

const controller = new Controller();
const testResultController = controller.getTestResultController();
const dbManager = controller.getDBManager();

beforeEach(async () => {
    await dbManager.deleteAllData().then(async () => {
        //await dbManager.insertTestResultTestData();
    })
});

afterEach(async () => {
    await dbManager.deleteAllData();
});

describe("TestResultController Tests", () => {
    describe("getTestResult method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });
    
    describe("createTestResult method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });
    
    describe("editTestResult method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });
    
    describe("deleteTestResult method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });
});