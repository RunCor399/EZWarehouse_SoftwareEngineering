'use strict';

const { expect, assert } = require('chai');
const Controller = require('../modules/logic/controller');

const controller = new Controller();
const skuItemController = controller.getSkuItemController();
const skuController = controller.getSkuController();
const dbManager = controller.getDBManager();


beforeEach(async () => {
    //console.log("executed before rest")
    await dbManager.deleteAllData();
});

afterEach(async () => {
    //console.log("executed after rest");
    await dbManager.deleteAllData();
});

describe('SKUItemController Tests', () => {

    describe('createSkuItem method testing', () => {
        test('successful use of createSku and createSKUitem', async () => {

            await skuController.createSku(
                {
                    "description": "a new sku",
                    "weight": 100,
                    "volume": 50,
                    "notes": "second SKU",
                    "price": 10.99,
                    "availableQuantity": 50
                }
            ).catch(error => (console.log(error)))

            const rfid = '12345678901234567890123456789019';

            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: 1,
                    DateOfStock: "2022/01/01",
                }
            ).catch(error => (console.log(error)))

            const value = await skuItemController.getSkuItem(rfid)
                .catch(error => (console.log(error)))
            assert.equal(value.RFID, rfid)

        })

        test('attempt to create SkuItem with non-existent SKUId', async () => {
            let errorValue;
            const rfid = '12345678901234567890123456789019';

            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: 1,
                    DateOfStock: "2022/01/01",
                }
            ).catch(error => (errorValue = error));

            assert.equal(errorValue.code, 404);

        })

        test('attempt to create SkuItem with invalid rfid', async () => {
            let errorValue;
            const rfid = 'hello';

            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: 1,
                    DateOfStock: "2022/01/01",
                }
            ).catch(error => (errorValue = error));

            assert.equal(errorValue.code, 422);

        })

        test('attempt to create SkuItem with invalid SKUId', async () => {
            let errorValue;
            const rfid = '12345678901234567890123456789019';

            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: "hello",
                    DateOfStock: "2022/01/01",
                }
            ).catch(error => (errorValue = error));

            assert.equal(errorValue.code, 422);

        })

        test('attempt to create SkuItem with invalid date', async () => {
            let errorValue;
            const rfid = '12345678901234567890123456789019';

            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: 1,
                    DateOfStock: "2022/1001/01",
                }
            ).catch(error => (errorValue = error));

            assert.equal(errorValue.code, 422);

        })


    })

    describe('editSkuItem method testing', () => {
        test('successful use of createSkuItem and editSkuItem', async () => {


            await skuController.createSku(
                {
                    "description": "a new sku",
                    "weight": 100,
                    "volume": 50,
                    "notes": "second SKU",
                    "price": 10.99,
                    "availableQuantity": 50
                }
            ).catch(error => (console.log(error)))

            const rfid = '12345678901234567890123456789019';
            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: 1,
                    DateOfStock: "2022/01/01",
                }
            ).catch(error => (console.log(error)))

            await skuItemController.editSkuItem(rfid,
                {
                    newRFID: "12345678901234567890123456789018",
                    newAvailable: 1,
                    newDateOfStock: "2020/01/01",
                }
            ).catch(error => (console.log(error)))

            const value = await skuItemController.getSkuItem("12345678901234567890123456789018")
                .catch(error => (console.log("get:", error)))
            assert.equal(value.RFID, "12345678901234567890123456789018")
        })


        test('attempt to edit a non-existant SkuItem', async () => {
            let errorValue;
            const rfid = '12345678901234567890123456789019';
            await skuItemController.editSkuItem(rfid,
                {
                    newRFID: "12345678901234567890123456789018",
                    newAvailable: 1,
                    newDateOfStock: "2020/01/01",
                }
            ).catch(error => errorValue = error);

            assert.equal(errorValue.code, 404);

        })

        test('attempt to edit a SkuItem with an invalid rfid', async () => {
            let errorValue;
            const rfid = '12345678901234567890123456789019';
            await skuItemController.editSkuItem(rfid,
                {
                    newRFID: "hello",
                    newAvailable: 1,
                    newDateOfStock: "2020/01/01",
                }
            ).catch(error => errorValue = error);

            assert.equal(errorValue.code, 422);

        })


        test('attempt to edit a SkuItem with an invalid available value', async () => {
            let errorValue;
            const rfid = '12345678901234567890123456789019';
            await skuItemController.editSkuItem(rfid,
                {
                    newRFID: "12345678901234567890123456789018",
                    newAvailable: "hello",
                    newDateOfStock: "2020/01/01",
                }
            ).catch(error => errorValue = error);

            assert.equal(errorValue.code, 422);

        })

        test('attempt to edit a SkuItem with an invalid date', async () => {
            const rfid = '12345678901234567890123456789019';
            let errorValue;
            await skuItemController.editSkuItem(rfid,
                {
                    newRFID: "12345678901234567890123456789018",
                    newAvailable: 1,
                    newDateOfStock: "2020/2001/01",
                }
            ).catch(error => errorValue = error);

            assert.equal(errorValue.code, 422);
        })

    })

    describe('deleteSkuItem method testing', () => {
        test('successful use of createSkuItem and deleteSkuItem', async () => {
            await skuController.createSku(
                {
                    "description": "a new sku",
                    "weight": 100,
                    "volume": 50,
                    "notes": "second SKU",
                    "price": 10.99,
                    "availableQuantity": 50
                }
            ).catch(error => (console.log(error)))

            const rfid = '12345678901234567890123456789019';
            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: 1,
                    DateOfStock: "2022/01/01",
                }
            ).catch(error => (console.log(error)))


            await skuItemController.deleteSkuItem(rfid);

            const value = await skuItemController.getAllSkuItems()
                .catch(error => (console.log("get:", error)))
            assert.equal(value.length, 0)
        });

        test('attempt to delete a SkuItem with an invalid rfid', async () => {
            const rfid = 'hello';
            let errorValue;
            await skuItemController.deleteSkuItem(rfid)
                .catch(error => errorValue = error);
                        
            assert.equal(422, errorValue.code);
        })
    })
});





