'use strict';




const { expect } = require('chai');
const Controller = require('../modules/logic/controller');
const OrderController = require('../modules/logic/restockOrderController');

const controller = new Controller();
const orderController = controller.getRestockOrderController();
const dbManager = controller.getDBManager();


beforeEach(async () => {
    await dbManager.deleteAllData().then(async () => {
        await dbManager.insertRestockAndReturnOrderTestData();
    })
  });

describe('ReturnOrderController Tests', () => {
    describe('createReturnOrder method testing', () => {
        it('Successfully create a new Return Order', async () => {

        });

        it('Creation of a Return Order with an invalid Restock Order id', async () => {

        });

        it('Creation of a Return Order with an invalid date', async () => {

        });

        it('Creation of a Return Order with one or more non-existing products', async () => {

        });
    });



    describe('deleteReturnOrder method testing', () => {
        it('Successfully delete a Return Order', async () => {

        });

        it('Delete a non-existing Return Order', async () => {

        });
    });
});