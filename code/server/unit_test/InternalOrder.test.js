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
            let result;
            let oldCount;
            let newCount;
            const body = {
                issueDate: "2022/07/07",
                state: "ISSUED",
                customerId: 3
            };

            result = await internalOrderController.getAllInternalOrders();
            oldCount = result.length;

            await internalOrderController.createInternalOrder(body);

            result = await internalOrderController.getAllInternalOrders();
            newCount = result.length;

            expect(newCount).to.be.equal(oldCount + 1);
        });

        test("Insertion of an Internal Order with malformed date", async () => {
            let result;
            let oldCount;
            let newCount;
            const body = {
                issueDate: "999/999/999",
                state: "ISSUED",
                customerId: 3
            };

            result = await internalOrderController.getAllInternalOrders();
            oldCount = result.length;

            await internalOrderController.createInternalOrder(body);

            result = await internalOrderController.getAllInternalOrders();
            newCount = result.length;

            expect(newCount).to.be.equal(oldCount);
        });

        test("Insertion of an Internal Order with invalid customerId", async () => {
            let result;
            let oldCount;
            let newCount;
            const body = {
                issueDate: "999/999/999",
                state: "ISSUED",
                customerId: -10
            };

            result = await internalOrderController.getAllInternalOrders();
            oldCount = result.length;

            await internalOrderController.createInternalOrder(body);

            result = await internalOrderController.getAllInternalOrders();
            newCount = result.length;

            expect(newCount).to.be.equal(oldCount);
        });
    });

    describe('editInternalOrder method testing', () => {
        test("Successfully edit an Internal Order", async () => {
            let result;
            const body = { newState: "ACCEPTED" };
            let newState;

            await internalOrderController.editInternalOrder(1, body);
            result = await internalOrderController.getInternalOrder(1);
            newState = result['state'];

            expect(newState).to.be.equal("ACCEPTED");
        });

        test("Edit an Internal Order with an invalid state", async () => {
            let result;
            const body = { newState: "INVALID_STATE" };
            let oldState, newState;

            result = await internalOrderController.getInternalOrder(1);
            oldState = result['state'];

            await internalOrderController.editInternalOrder(1, body).catch(() => { });
            result = await internalOrderController.getInternalOrder(1);
            newState = result['state'];

            expect(newState).to.be.equal(oldState);
        });

        test("Edit a non-existing Internal Order", async () => {
            let result;
            const body = { newState: "ISSUED" };

            result = await internalOrderController.editInternalOrder(-1, body).catch(() => { });
            expect(result).to.be.undefined;
        });
    });

    describe('deleteInternalOrder method testing', () => {
        test("Successfully delete an Internal Order", async () => {
            let result;
            await internalOrderController.deleteInternalOrder(1);

            result = await internalOrderController.getInternalOrder(1).catch(() => { });
            expect(result).to.be.undefined;
        });

        test("Delete a non-existing Internal Order", async () => {
            let result, oldCount, newCount;

            oldCount = (await internalOrderController.getAllInternalOrders()).length;

            await internalOrderController.deleteInternalOrder(-1).catch(() => { });

            newCount = (await internalOrderController.getAllInternalOrders()).length;

            expect(oldCount).to.be.equal(newCount);
        });
    });
});