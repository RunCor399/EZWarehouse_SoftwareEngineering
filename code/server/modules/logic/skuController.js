'use strict'

class SkuController{
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();
        
        console.log("skuController started");
    }
    
    getAllSku(){
        const sqlInstruction = "SELECT * FROM SKU";
        try {
            const rows =   dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    getSku(id){
        const sqlInstruction = "SELECT *  FROM SKU WHERE id=" + id;
        try {
            const sku =  dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return sku;
    }

    createSku(description, weight, volume, notes, price, availableQuantity){
        return undefined;
    }

    editSku(id, newDescription, newWeight, newVolume, newNotes, newPrice, newAvailableQuantity){
        return undefined;
    }

    setPosition(id, position){
        return undefined;
    }

    deleteSku(id){
        const sqlInstruction = "DELETE FROM SKU WHERE id=" + id;
        try {
            const sku =  dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return sku; /*sku returned to test it*/
    }

    getAllSkuItems(){
        const sqlInstruction = "SELECT * FROM SKUITEMS";
        try {
            const rows =   dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    getSkuItems(id){
        return undefined;
    }

    getSkuItem(rfid){
        const sqlInstruction = "SELECT *  FROM SKU WHERE rfid=" + rfid;
        try {
            const skuItem =  dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return skuItem;
    }

    createSkuItem(RFID, SKUId, dateOfStock){
        return undefined;
    }

    editSkuItem(oldRFID, newRFID, newSKUId, newDateOfStock){
        return undefined;
    }

    deleteSkuItem(rfid){
        const sqlInstruction = "DELETE FROM SKU WHERE id=" + id;
        try {
            const skuItem =  dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return skuItem; /*skuItem returned to test it*/
    }
}

module.exports = SkuController;