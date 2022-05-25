'use strict';

const { expect } = require('chai');
const Controller = require('../modules/logic/controller');

const controller = new Controller();
const testDescriptorController = controller.getTestDescriptorController();
const dbManager = controller.getDBManager();

beforeEach(async () => {
    await dbManager.deleteAllData().then(async () => {
        //await dbManager.insertTestDescriptorTestData();
    })
});

afterEach(async () => {
    await dbManager.deleteAllData();
});

describe("TestDescriptorController Tests", () => {
    describe("getAllTestDescriptors method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });

    describe("getTestDescriptor method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });
    
    describe("createTestDescriptor method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });
    
    describe("editTestDescriptor method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });
    
    describe("deleteTestDescriptor method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });
});