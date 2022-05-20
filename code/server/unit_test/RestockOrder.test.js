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

describe('RestockOrderController Tests', () => {
    describe('createRestockOrder method testing', () => {
        test("Successfully add new Restock Order to Database", async () => {
            let result;
            let oldCount;
            let newCount; 
            const body = {
                 issueDate : "2023/01/01",
                 products: [],
                 supplierId : 5
             }
        
             result = await orderController.getAllRestockOrders();
             oldCount = result.length;
        
             await orderController.createRestockOrder(body);
        
             result = await orderController.getAllRestockOrders();
             newCount = result.length;
    
        
             expect(newCount).to.be.equal(oldCount+1);
        });
    
        test("Insertion of a RestockOrder with malformed date", async () => {
            let result;
            let oldCount;
            let newCount; 
            const body = {
                 issueDate : "123/456/7",
                 products: [],
                 supplierId : 5
             }
        
             result = await orderController.getAllRestockOrders();
             oldCount = result.length;
        
             await orderController.createRestockOrder(body).catch(() => {});
        
             result = await orderController.getAllRestockOrders();
             newCount = result.length;
    
        
             expect(newCount).to.be.equal(oldCount);
        });
    
    
        test("Insertion of a RestockOrder with invalid supplierId", async () => {
            let result;
            let oldCount;
            let newCount; 
            const body = {
                 issueDate : "123/456/7",
                 products: [],
                 supplierId : -1
             }
        
             result = await orderController.getAllRestockOrders();
             oldCount = result.length;
        
             await orderController.createRestockOrder(body).catch(() => {});
        
             result = await orderController.getAllRestockOrders();
             newCount = result.length;
    
        
             expect(newCount).to.be.equal(oldCount);
        });
    });
    
    describe('editRestockOrder method testing', () => {
        test('Successfully edit a Restock Order', async () => {
            let result;
            const body = {newState : "DELIVERED"};
            let newState;

            await orderController.editRestockOrder(1, body);

            result = await orderController.getRestockOrder(1);
            newState = result['state'];

            expect(newState).to.be.equal("DELIVERED");
        });

        test('Edit a Restock Order with an invalid state', async () => {
            let result;
            const body = {newState : "INVALID_STATE"};
            let oldState, newState;

            result = await orderController.getRestockOrder(1);
            oldState = result['state'];

            await orderController.editRestockOrder(1, body).catch(() => {});

            result = await orderController.getRestockOrder(1);
            newState = result['state'];

            expect(newState).to.be.equal(oldState);
        });

        test('Edit a non-existing Restock Order', async () => {
            let result;
            const body = {newState : "DELIVERED"};


            result = await orderController.editRestockOrder(-1, body).catch(() => {});
            expect(result).to.be.undefined;
        });
    });

    describe('deleteRestockOrder method testing', () => {
        test('Successfully delete a Restock Order', async () => {
            let result;

            await orderController.deleteRestockOrder(1);

            result = await orderController.getRestockOrder(1).catch(() => {});
            expect(result).to.be.undefined;

        });

        test('Delete a non-existing Restock Order', async () => {
            let result, oldCount, newCount;

            oldCount = (await orderController.getAllRestockOrders()).length;

            await orderController.deleteRestockOrder(-1).catch(() => {});

            newCount = (await orderController.getAllRestockOrders()).length;

            expect(oldCount).to.be.equal(newCount);
        });
    });
    
})



/*test("", async () => {
    
});*/





