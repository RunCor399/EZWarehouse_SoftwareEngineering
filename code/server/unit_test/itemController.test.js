'use strict';




const { expect, assert } = require('chai');
const Controller = require('../modules/logic/controller');
const TestDescriptorController = require('../modules/logic/testDescriptorController');

const controller = new Controller();
const itemController = controller.getItemController();
const dbManager = controller.getDBManager();


beforeEach(async () => {
    await dbManager.deleteAllData().then(async () => {
        await dbManager.insertSkuTestData();
    })
});
afterEach(async () => {
    await dbManager.deleteAllData().then(async () => {
        //await dbManager.insertSkuTestData();
    })
});

describe('itemController Tests', () => {

    describe('getAllItems method test', () => {
        test('successful use of getAllItems', async () => {
            const result = await itemController.getAllItems();
            assert.equal(result.length, 0);
        })
    })

    describe('getItem method test', () => {
        test('successful use of getItem', async () => {
            const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( ?, ?, ?, ?, ?, ?);`;
    
            await dbManager.genericSqlRun(sqlInstruction, 100, 50, 10.99, "notes", "first sku", 50)
                .catch(() => { throw error });
                await dbManager.genericSqlRun(sqlInstruction, 100, 50, 10.99, "notes", "first sku", 50)
                .catch(() => { throw error });

            await itemController.createItem(
                {
                    id: 1,
                    description: "description",
                    price: 10.99,
                    SKUId: 1,
                    supplierId: 1,
                }
            )
            await itemController.createItem(
                {
                    id: 2,
                    description: "description",
                    price: 10.99,
                    SKUId: 2,
                    supplierId: 1,
                }
            )

            const result = await itemController.getItem(2);
            assert.equal(result.id, 2)
        })
    })

    describe('createItem method test', () => {
        test('successful use of createItem', async () => {

            const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
        VALUES ( ?, ?, ?, ?, ?, ?);`;

            await dbManager.genericSqlRun(sqlInstruction, 100, 50, 10.99, "notes", "first sku", 50)
                .catch(() => { throw error });

            await itemController.createItem(
                {
                    id: 1,
                    description: "description",
                    price: 10.99,
                    SKUId: 1,
                    supplierId: 1,
                }
            )

            const result = await itemController.getItem(1);
            assert.equal(result.id, 1)


        })
    })

    describe('editItem method test', () => {
        test('successful use of editItem', async () => {
            await itemController.editItem()
        })
    })

    describe('deleteItem method test', () => {
        test('successful use of deleteItem', async () => {
            await itemController.deleteItem()
            
        })
    })
})