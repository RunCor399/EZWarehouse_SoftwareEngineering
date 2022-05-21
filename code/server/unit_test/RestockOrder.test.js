'use strict';




const { expect } = require('chai');
const Controller = require('../modules/logic/controller');

const controller = new Controller();
const restockOrderController = controller.getRestockOrderController();
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
        
             result = await restockOrderController.getAllRestockOrders();
             oldCount = result.length;
        
             await restockOrderController.createRestockOrder(body);
        
             result = await restockOrderController.getAllRestockOrders();
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
        
             result = await restockOrderController.getAllRestockOrders();
             oldCount = result.length;
        
             await restockOrderController.createRestockOrder(body).catch(() => {});
        
             result = await restockOrderController.getAllRestockOrders();
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
        
             result = await restockOrderController.getAllRestockOrders();
             oldCount = result.length;
        
             await restockOrderController.createRestockOrder(body).catch(() => {});
        
             result = await restockOrderController.getAllRestockOrders();
             newCount = result.length;
    
        
             expect(newCount).to.be.equal(oldCount);
        });
    });
    
    describe('editRestockOrder method testing', () => {
        test('Successfully edit a Restock Order', async () => {
            let result;
            const body = {newState : "DELIVERED"};
            let newState;

            await restockOrderController.editRestockOrder(1, body);

            result = await restockOrderController.getRestockOrder(1);
            newState = result['state'];

            expect(newState).to.be.equal("DELIVERED");
        });

        test('Edit a Restock Order with an invalid state', async () => {
            let result;
            const body = {newState : "INVALID_STATE"};
            let oldState, newState;

            result = await restockOrderController.getRestockOrder(1);
            oldState = result['state'];

            await restockOrderController.editRestockOrder(1, body).catch(() => {});

            result = await restockOrderController.getRestockOrder(1);
            newState = result['state'];

            expect(newState).to.be.equal(oldState);
        });

        test('Edit a non-existing Restock Order', async () => {
            let result;
            const body = {newState : "DELIVERED"};


            result = await restockOrderController.editRestockOrder(-1, body).catch(() => {});
            expect(result).to.be.undefined;
        });
    });

    describe('deleteRestockOrder method testing', () => {
        test('Successfully delete a Restock Order', async () => {
            let result;

            await restockOrderController.deleteRestockOrder(1);

            result = await restockOrderController.getRestockOrder(1).catch(() => {});
            expect(result).to.be.undefined;

        });

        test('Delete a non-existing Restock Order', async () => {
            let result, oldCount, newCount;

            oldCount = (await restockOrderController.getAllRestockOrders()).length;

            await restockOrderController.deleteRestockOrder(-1).catch(() => {});

            newCount = (await restockOrderController.getAllRestockOrders()).length;

            expect(oldCount).to.be.equal(newCount);
        });
    });
    
})



/*test("", async () => {
    
});*/





