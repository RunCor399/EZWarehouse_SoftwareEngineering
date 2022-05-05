'use strict'
class ItemController{
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();
        console.log("itemController started");
    }

    
    getAllItems() {
        const sqlInstruction = "SELECT * FROM ITEM";
        try {
            const rows =   this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    getItem(id) {
        const sqlInstruction = "SELECT *  FROM ITEM WHERE id=" + id;
        try {
            const item =  this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return item;
    }

    createItem(description, price, SKUid, supplierId){
        return undefined;
    }

    editItem(id, newDescription, newPrice){
        return undefined;
    }

    deleteItem(id){
        return undefined;
    }
    
}

module.exports = ItemController;