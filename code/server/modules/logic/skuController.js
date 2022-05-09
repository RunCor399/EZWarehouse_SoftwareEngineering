'use strict'

class SkuController {
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();

        console.log("skuController started");
    }

    /*getter function to retreive all the SKUs*/
    async getAllSku() {
        const sqlInstruction = "SELECT * FROM SKU";
        try {
            const rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*getter function to retreive a single SKU, given its ID*/
    async getSku(id) {
        const sqlInstruction = `SELECT *  FROM SKU WHERE ID= ${id};`;
        try {
            const sku = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return sku;
    }

    /*TO CHECK - availableQuantity is missing in the SKU table */
    async createSku(body) {

        const sqlGetCount = 'SELECT COUNT(*) FROM SKU'

        try {
            const id = await this.#dbManager.genericSqlGet(sqlGetCount);
        } catch (error) {
            console.log("error");
        }

        const description = body["description"];
        const weight = body["weight"];
        const volume = body["volume"];
        const notes = body["notes"];
        const price = body["price"];
        const availableQuantity = body["availableQuantity"];

        if (!description || !weight || !volume || !notes || !price || !availableQuantity)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `INSERT INTO SKU (ID, weight, volume, price, notes, description, availableQuantity) VALUES (${id + 1}, ${weight}, ${volume}, ${price}, ${notes}, ${description}, ${availableQuantity});`;
        try {
            const sku = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return sku;    /*item returned just to test the function*/
    }

    /*TO CHECK - availableQuantity is missing in the SKU table */
    async editSku(id, body) {

        const newDescription = body["newDescription"];
        const newWeight = body["newWeight"];
        const newVolume = body["newVolume"];
        const newNotes = body["newNotes"];
        const newPrice = body["newPrice"];
        const newAvailableQuantity = req.body["newAvailableQuantity"];

        if (!newDescription || !newWeight || !newVolume || !newNotes || !newPrice || !newAvailableQuantity)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `UPDATE SKU SET weight= ${newWeight} AND volume= ${newVolume} AND price= ${newPrice} 
        AND notes= ${newNotes} AND description= ${newDescription} AND availableQuantity= ${newAvailableQuantity} WHERE ID=${id};`;
        try {
            const item = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return item;
    }

    /*TO CHECK IF IT'S CORRECT*/
    async setPosition(id, body) {

        const position = body["position"];

        if (!position)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `UPDATE SKUStorage SET positionID= ${position} WHERE SKUID= ${id};`;
        try {
            const position = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }

        /*
        const sqlUpdate2 = `UPDATE Position SET occupiedWeight= ${Position.occupiedWeight + SKU.weight} AND occupiedVolume = ${Position.occupiedVolume + SKU.volume} WHERE SKU.ID= ${id} AND Position.ID= ${position}`;
        try {
            const update2 = this.#dbManager.genericSqlGet(sqlUpdate2);
        } catch (error) {
            console.log("error");
        }
         */

        return position;
    }

    /*delete function to remove an SKU from the table, given its ID */
    async deleteSku(id) {
        const sqlInstruction = `DELETE FROM SKU WHERE ID= ${id};`;
        try {
            const sku = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return sku; /*sku returned to test it*/
    }

    /*TO CHECK - getter function to retreive all the SKUItems*/
    async getAllSkuItems() {
        const sqlInstruction = "SELECT * FROM SKUItem";
        try {
            const rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*TO CHECK - getter function to retreive an array of SKUItems, given the ID of the SKU list related to it*/
    async getSkuItems(id) {
        const sqlInstruction = `SELECT * FROM SKUItem WHERE SKUId= ${id};`;
        try {
            const rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return rows.map((row) => row);
    }

    /*TO CHECK - getter function to retreive a single SKUItem, given its RFID */
    async getSkuItem(rfid) {
        const sqlInstruction = `SELECT * FROM SKUItem WHERE RFID= ${rfid};`;
        try {
            const skuItem = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return skuItem;
    }

    /*TO CHECK*/
    async createSkuItem(body) {

        /* useless?
        const sqlGetCount = 'SELECT COUNT(*) FROM SKUitems'

        try {
            const id = this.#dbManager.genericSqlGet(sqlGetCount);
        } catch (error) {
            console.log("error");
        }
        */

        const RFID = body["RFID"];
        const SKUId = body["SKUId"];
        const dateOfStock = body["DateOfStock"];

        if (!RFID || !SKUId || !dateOfStock)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) VALUES (${RFID}, ${SKUId}, 0, ${dateOfStock});`;
        try {
            const skuItem = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return skuItem;    /*item returned just to test the function*/
    }

    /*TODO */
    async editSkuItem(oldRFID, body) {

        const newRFID = body["newRFID"];
        const newAvailable = body["newAvailable"];
        const newDateOfStock = body["newDateOfStock"];


        if (!newRFID || !newSKUId || !newDateOfStock)
            throw new Error(Exceptions.message422);

        const sqlUpdate = `UPDATE SKUItem SET RFID= ${newRFID} AND Available= ${newAvailable} AND DateOfStock= ${newDateOfStock} WHERE RFID= ${oldRFID};`;
        try {
            const skuItem = await this.#dbManager.genericSqlGet(sqlUpdate);
        } catch (error) {
            console.log("error");
        }
    }

    /*delete function to remove an SKUItem from the table, given its ID */
    async deleteSkuItem(rfid) {
        const sqlInstruction = `DELETE FROM SKUItem WHERE ID= ${rfid};`;
        try {
            const skuItem = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return skuItem; /*skuItem returned to test it*/
    }
}

module.exports = SkuController;