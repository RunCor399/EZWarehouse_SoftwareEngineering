'use strict'

class SkuController{
    constructor() {
        this.controller = controller;
        this.dbManager = controller.getDBManager();
        
        console.log("skuController started");
    }
    
    getAllSku(){
        return undefined;
    }

    getSku(id){
        return undefined;
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
        return undefined;
    }

    getAllSkuItems(){
        return undefined;
    }

    getSkuItems(id){
        return undefined;
    }

    getSkuItem(rfid){
        return undefined;
    }

    createSkuItem(RFID, SKUId, dateOfStock){
        return undefined;
    }

    editSkuItem(oldRFID, newRFID, newSKUId, newDateOfStock){
        return undefined;
    }

    deleteSkuItem(rfid){
        return undefined;
    }
}

module.exports = SkuController;