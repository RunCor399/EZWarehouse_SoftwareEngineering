'use strict'
class ItemController{
    constructor(controller) {
        this.controller = controller;
        this.dbManager = controller.getDBManager();
        console.log("itemController started");
    }

    
    getAllItems() {
        const sqlInstruction = "SELECT * FROM ITEM";
        try {
            const rows =   dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    getItem(id) {
        const sqlInstruction = "SELECT *  FROM ITEM WHERE id=" + id;
        try {
            const item =  dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return item;
    }

    createItem(description, price, SKUid, supplierId){
        const sqlInstruction = "INSERT INTO ITEM (description, price, SKUid, supplierId) VALUES (?, ?, ?, ?);";
        try {
            const item =  dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return item;    /*item returned just to test the function*/
    }

    editItem(id, newDescription, newPrice){
        const sqlInstruction = "UPDATE ITEM SET description=" + newDescription + " AND price=" + newPrice + " WHERE SKUid=" + id;
        try {
            const item =  dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return item;
    }

    deleteItem(id){
        const sqlInstruction = "DELETE FROM ITEM WHERE id=" + id;
        try {
            const item =  dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return item;
    }
    
}

module.exports = ItemController;