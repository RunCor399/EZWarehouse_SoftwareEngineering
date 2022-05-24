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
        test('createSku and createSKUitem', async () => {

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
            console.log(value);
            assert.equal(value.RFID, rfid)

        })
    })

    describe('editSkuItem method testing', () => {
        test('create/modify', async () => {


            await skuController.createSku(
                {
                    "description": "a new sku",
                    "weight": 100,
                    "volume": 50,
                    "notes": "second SKU",
                    "price": 10.99,
                    "availableQuantity": 50
                }
            ).then(console.log("createdSKU")).catch(error => (console.log(error)))

            const rfid = '12345678901234567890123456789019';
            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: 1,
                    DateOfStock: "2022/01/01",
                }
            ).then(console.log("createdSkuItem")).catch(error => (console.log(error)))

            await skuItemController.editSkuItem(rfid,
                {
                    newRFID: "12345678901234567890123456789018",
                    newAvailable: 1,
                    newDateOfStock: "2020/01/01",
                }
            ).then(console.log("editedSKUitem")).catch(error => (console.log(error)))

            const value = await skuItemController.getSkuItem("12345678901234567890123456789018")
                .then(console.log("get"))
                .catch(error => (console.log("get:", error)))
            //console.log(value);
            assert.equal(value.RFID, "12345678901234567890123456789018")
        })
    })

    describe('deleteSkuItem method testing', () => {
        test('create/delete', async () => {
            await skuController.createSku(
                {
                    "description": "a new sku",
                    "weight": 100,
                    "volume": 50,
                    "notes": "second SKU",
                    "price": 10.99,
                    "availableQuantity": 50
                }
            ).then(console.log("createdSKU")).catch(error => (console.log(error)))

            const rfid = '12345678901234567890123456789019';
            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: 1,
                    DateOfStock: "2022/01/01",
                }
            ).then(console.log("createdSkuItem")).catch(error => (console.log(error)))


            await skuItemController.deleteSkuItem(rfid);

            const value = await skuItemController.getAllSkuItems()
                .then(console.log("get"))
                .catch(error => (console.log("get:", error)))
            assert.equal(value.length, 0)
        });
    })
});





