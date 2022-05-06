'use strict'

const Exceptions = require('../../routers/exceptions');

class ItemController {
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();
        console.log("itemController started");
    }


    /*MODIFIED */
    getAllItems() {
        const sqlInstruction = "SELECT * FROM Item";
        try {
            const rows = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*MODIFIED */
    getItem(id) {
        
        const sqlInstruction = "SELECT *  FROM Item WHERE ID=" + id;
        try {
            const item = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return item;
    }

    /*MODIFIED - the description is missing in the table! */
    createItem(body) {

        const description = body["description"];
        const price = body["price"];
        const SKUid = body["SKUId"]
        const supplierId = body["supplierID"];

        if(description === undefined || price === undefined || SKUid === undefined || supplierId === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = "INSERT INTO Item (ID, SKUid) VALUES (?, ?); INSERT INTO ItemSoldPerSupplier (itemID, supplierID) VALUES (?, ?);";
        try {
            const item = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return item;    /*item returned just to test the function*/
    }

    /*NOT MODIFIED - both the description and the price are missing in the Item table! */
    editItem(id, body) {

        const newDescription = body["newDescription"];
        const newPrice = body["newPrice"];

        if(newDescription === undefined || newPrice === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = "UPDATE ITEM SET description=" + newDescription + " AND price=" + newPrice + " WHERE SKUid=" + id;
        try {
            const item = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return item;
    }

    /*MODIFIED */
    deleteItem(id) {
        const sqlInstruction = "DELETE FROM Item WHERE ID=" + id;
        try {
            const item = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return item;
    }

}

module.exports = ItemController;