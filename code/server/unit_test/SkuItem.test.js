'use strict';




const { expect } = require('chai');
const Controller = require('../modules/logic/controller');

const controller = new Controller();
const skuItemController = controller.getSkuItemController();
const dbManager = controller.getDBManager();


before(async () => {
    //console.log("executed before rest")
    await dbManager.deleteAllData();
  });

afterEach(async () => {
    //console.log("executed after rest");
    await dbManager.deleteAllData();
});

describe('SKUItemCOntroller Tests', () => {
    describe('createSkuItem method testing', () => {
        
    });
    
    describe('editSkuItem method testing', () => {
       
    });

    describe('deleteSkuItem method testing', () => {
        
    });
});



/*test("", async () => {
    
});*/





