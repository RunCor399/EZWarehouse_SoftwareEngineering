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


    /*getter function to retreive all the items*/
    getAllItems() {
        const sqlInstruction = "SELECT * FROM Item";
        try {
            const rows = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*getter function to retreive a single item given its ID*/
    getItem(id) {
        
        const sqlInstruction = `SELECT *  FROM Item WHERE ID= ${id};`;
        try {
            const item = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return item;
    }

    /*TODO: JOIN BETWEEN Item AND SKU  - slightly modified*/
    createItem(body) {
        
        const sqlGetCount = 'SELECT COUNT(*) FROM Position'

        try {
            const id = this.#dbManager.genericSqlGet(sqlGetCount);
        } catch (error) {
            console.log("error");
        }

        const description = body["description"];
        const price = body["price"];
        const SKUid = body["SKUId"]
        const supplierId = body["supplierID"];

        if(description === undefined || price === undefined || SKUid === undefined || supplierId === undefined)
            throw new Error(Exceptions.message422);

        /*description and price are missing inside the Item table*/
        const sqlInsert1 = `INSERT INTO Item (ID, SKUID) VALUES (${id+1}, ${SKUid});`; 
        try {
            const insert1 = this.#dbManager.genericSqlGet(sqlInsert1);
        } catch (error) {
            console.log("error");
        }

        /*here there should be the join(?)*/

        const sqlInsert2 = `INSERT INTO ItemSoldPerSupplier (itemID, supplierID) VALUES (${id+1}, ${supplierId});`; 
        try {
            const insert2 = this.#dbManager.genericSqlGet(sqlInsert1);
        } catch (error) {
            console.log("error");
        }

    }

    /*function to edit the properties of a specific item, given its ID*/
    editItem(id, body) {

        const newDescription = body["newDescription"];
        const newPrice = body["newPrice"];

        /*description and price are missing inside the Item table*/
        if(newDescription === undefined || newPrice === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `UPDATE ITEM SET description= ${newDescription} AND price= ${newPrice} WHERE SKUid= ${id};`;
        try {
            const item = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return item;
    }

    /*delete function to remove an item from the table, given its ID*/
    deleteItem(id) {
        const sqlInstruction = `DELETE FROM Item WHERE ID= ${id};`;
        try {
            const item = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return item;
    }

}

module.exports = ItemController;