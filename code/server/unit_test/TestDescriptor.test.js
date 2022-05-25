'use strict';

const { expect } = require('chai');
const Controller = require('../modules/logic/controller');

const controller = new Controller();
const testDescriptorController = controller.getTestDescriptorController();
const dbManager = controller.getDBManager();

beforeEach(async () => {
    await dbManager.deleteAllData().then(async () => {
        await dbManager.insertTestDescriptorTestData();
    })
});

afterEach(async () => {
    await dbManager.deleteAllData();
});

describe("TestDescriptorController Tests", () => {
    /*describe("getAllTestDescriptors method testing", () => {
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
    });*/

    describe("createTestDescriptor method testing", () => {
        test("Successfully create a Test Descriptor", async () => {
            let result;
            let currId;
            const body = {
                name: "a_test_descriptor",
                procedureDescription: "procedureDescription99",
                idSKU: 1
            };
            currId = ((await testDescriptorController.getAllTestDescriptors()).length) + 1;

            await testDescriptorController.createTestDescriptor(body);

            result = await testDescriptorController.getTestDescriptor(currId).catch(() => {});

            expect(result).not.to.be.undefined;
        });

        test("Insertion of a test descriptor with a non-existing SKU", () => {

        });

        test("Insertion of a test descriptor with invalid body", () => {

        });
    });

    describe("editTestDescriptor method testing", () => {
        test("Successfully edit a Test Descriptor", () => {

        });

        test("Edit a Test Descriptor with invalid id", () => {

        });

        test("Edit a Test Descriptor with a non-exitent SKU", () => {

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