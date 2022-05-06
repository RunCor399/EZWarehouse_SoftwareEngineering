'use strict'

class SkuController {
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();

        console.log("skuController started");
    }

    getAllSku() {
        const sqlInstruction = "SELECT * FROM SKU";
        try {
            const rows = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*MODIFIED*/
    getSku(id) {
        const sqlInstruction = "SELECT *  FROM SKU WHERE ID=" + id;
        try {
            const sku = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return sku;
    }

    /*availableQuantity is missing in the SKU table */
    createSku(body) {

        const description = body["description"];
        const weight = body["weight"];
        const volume = body["volume"];
        const notes = body["notes"];
        const price = body["price"];
        const availableQuantity = body["availableQuantity"];

        if (description === undefined || weight === undefined || volume === undefined || notes === undefined
            || price === undefined || availableQuantity === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = "INSERT INTO SKU (ID, weight, volume, price, notes, description) VALUES (?, ?, ?, ?, ?, ?);";
        try {
            const sku = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return sku;    /*item returned just to test the function*/
    }

    /*availableQuantity is missing in the SKU table */
    editSku(id, body) {

        const newDescription = body["newDescription"];
        const newWeight = body["newWeight"];
        const newVolume = body["newVolume"];
        const newNotes = body["newNotes"];
        const newPrice = body["newPrice"];
        const newAvailableQuantity = req.body["newAvailableQuantity"];

        if (newDescription === undefined || newWeight === undefined || newVolume === undefined ||
            newNotes === undefined || newPrice === undefined || newAvailableQuantity === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = "UPDATE SKU SET weight=" + newWeight + " AND volume=" + newVolume + " AND price=" + newPrice + " AND notes=" + newNotes + " AND description=" + newDescription + " WHERE ID=" + id;
        try {
            const item = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return item;
    }

    /*NEW */
    setPosition(id, body) {

        const position = body["position"];

        if (position === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = "UPDATE SKUStorage SET positionID=" + position + " WHERE SKUID=" + id;
        try {
            const position = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return position;
    }

    /*MODIFIED */
    deleteSku(id) {
        const sqlInstruction = "DELETE FROM SKU WHERE ID=" + id;
        try {
            const sku = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return sku; /*sku returned to test it*/
    }




    /*MODIFED*/
    getAllSkuItems() {
        const sqlInstruction = "SELECT * FROM SKUItem";
        try {
            const rows = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    getSkuItems(id) {
        return undefined;
    }

    /*MODIFIED */
    getSkuItem(rfid) {
        const sqlInstruction = "SELECT *  FROM SKUItem WHERE ID=" + rfid;
        try {
            const skuItem = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return skuItem;
    }

    /*MODIFIED - how is the position updated? It's in the StockInfo table but here is missing*/
    createSkuItem(body) {

        const RFID = body["RFID"];
        const SKUId = body["SKUId"];
        const dateOfStock = body["DateOfStock"];

        if (RFID === undefined || SKUId === undefined || dateOfStock === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = "INSERT INTO SKUItem (ID) VALUES (?);";
        try {
            const skuItem = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return skuItem;    /*item returned just to test the function*/
    }

    editSkuItem(oldRFID, body) {

        const newRFID = body["newRFID"];
        const newSKUId = body["newSKUId"];
        const newDateOfStock = body["newDateOfStock"];


        if (newRFID === undefined || newSKUId === undefined || newDateOfStock === undefined)
            throw new Error(Exceptions.message422);


        return undefined;
    }

    /*MODIFIED */
    deleteSkuItem(rfid) {
        const sqlInstruction = "DELETE FROM SKU WHERE ID=" + id;
        try {
            const skuItem = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return skuItem; /*skuItem returned to test it*/
    }
}

module.exports = SkuController;