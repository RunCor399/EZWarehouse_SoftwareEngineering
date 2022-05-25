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
        test("Successfully delete a Test Descriptor", async () => {
            let result;
            await testDescriptorController.deleteTestDescriptor(1);

            result = await testDescriptorController.getTestDescriptor(1).catch(() => { });
            expect(result).to.be.undefined;
        });
        
        test("Delete a non-existing Test Descriptor", async () => {
            let oldCount, newCount;

            oldCount = (await testDescriptorController.getAllTestDescriptors()).length;

            await testDescriptorController.deleteTestDescriptor(-1).catch(() => { });

            newCount = (await testDescriptorController.getAllTestDescriptors()).length;

            expect(oldCount).to.be.equal(newCount);
        });
        
    });
});