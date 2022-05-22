'use strict';

const { expect } = require('chai');
const Controller = require('../modules/logic/controller');

const controller = new Controller();
const internalOrderController = controller.getInternalOrderController();
const dbManager = controller.getDBManager();

beforeEach(async () => {
    await dbManager.deleteAllData().then(async () => {
        await dbManager.insertInternalOrderTestData();
    })
});

afterEach(async () => {
    await dbManager.deleteAllData().then(async () => {
        await dbManager.insertInternalOrderTestData();
    })
});

describe('InternalOrderController Tests', () => {
    describe('createInternalOrder method testing', () => {
        test("Successfully add a new Internal Order to Database", async () => {

        });

        test("Insertion of an Internal Order with malformed date", async () => {

        });

        test("Insertion of an Internal Order with invalid customerId", async () => {

        });
    });

    describe('editInternalOrder method testing', () => {
        test("Successfully edit an Internal Order", async () => {

        });

        test("Edit an Internal Order with an invalid state", async () => {

        });

        test("Edit a non-existing Internal Order", async () => {

        });
    });

    describe('deleteInternalOrder method testing', () => {
        test("Successfully delete an Internal Order", async () => {

        });

        test("Delete a non-existing Internal Order", async () => {

        });
    });
});