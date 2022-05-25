'use strict';

const { expect, assert } = require('chai');
const Controller = require('../modules/logic/controller');
const TestResultController = require('../modules/logic/testResultController');

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
    describe("getTestResults method testing", () => {
        test("", () => {
        });

        test("", () => {

        });

        test("", () => {

        });
    });

    describe("getTestResult method testing", () => {
        test("", () => {

        });

        test("", () => {

        });

        test("", () => {

        });
    });

    describe("createTestResult method testing", () => {
        let response;
        test("Successful use of createTestResult", async () => {


            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(error => console.log(error))

            response = await testResultController.getTestResult("12345678901234567890123456789015", 1)

            assert.equal(response.Result, true);


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