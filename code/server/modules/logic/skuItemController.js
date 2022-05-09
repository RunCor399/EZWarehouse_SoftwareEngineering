'use strict'

class SkuItemController {
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();

        console.log("skuItemController started");
    }

    /*getter function to retreive all the SKUItems*/
    async getAllSkuItems() {
        const sqlInstruction = "SELECT * FROM SKUItem";
        try {
            const rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return rows.map((row) => row);
    }


    /*getter function to retreive an array of SKUItems, given the ID of the SKU list related to it*/
    async getSkuItems(id) {
        const sqlInstruction = `SELECT * FROM SKUItem WHERE SKUId= ${id};`;
        try {
            const rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return rows.map((row) => row);
    }

    /*getter function to retreive a single SKUItem, given its RFID */
    async getSkuItem(rfid) {
        const sqlInstruction = `SELECT * FROM SKUItem WHERE RFID= ${rfid};`;
        try {
            const skuItem = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return skuItem;
    }

    /*creation of an SKUItem*/
    async createSkuItem(body) {

        const RFID = body["RFID"];
        const SKUId = body["SKUId"];
        const dateOfStock = body["DateOfStock"];

        if (!RFID || !SKUId || !dateOfStock)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) VALUES (${RFID}, ${SKUId}, 0, ${dateOfStock});`;
        try {
            const skuItem = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return skuItem;
    }

    /*function to edit an SKUItem*/
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
            new Error(Exceptions.message500);
        }
    }

    /*delete function to remove an SKUItem from the table, given its ID */
    async deleteSkuItem(rfid) {
        const sqlInstruction = `DELETE FROM SKUItem WHERE ID= ${rfid};`;
        try {
            const skuItem = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return skuItem; /*skuItem returned to test it*/
    }
}

module.exports = SkuItemController;