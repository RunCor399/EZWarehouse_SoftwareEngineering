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

describe('SKUItemController Tests',  () => {
    describe('createSkuItem method testing', () => {
        test('', async () => {

            console.log(1)
        await skuController.createSku({
            description: "description",
            weight: 10,
            volume: 20,
            notes: "notes",
            price: 10.99,
            availableQuantity: 1
            }).catch(error => (console.log(error)))
            console.log(2)

        await skuItemController.createSkuItem(
            {
                RFID : "12345678901234567890123456789019",
                SKUId : 1,
                DateOfStock : "2022/01/01",
            }
        ).catch(error => (console.log(error)))

        console.log(3)
        const value = await skuItemController.getSkuItem('12345678901234567890123456789019').catch(error => (console.log(error)))
        console.log(value);
        assert.equal(value, undefined)

        console.log(4)
    })
    })
    
    describe('editSkuItem method testing', () => {
        test('', () => {

       skuItemController.editSkuItem("12345678901234567890123456789019",
        {
            RFID : "12345678901234567890123456789018",
            SKUId : 1,
            DateOfStock : 1,
        }
       )
    })
    })

    describe('deleteSkuItem method testing', () => {
        skuItemController.deleteSkuItem();
    });
});



/*test("", async () => {
    
});*/





