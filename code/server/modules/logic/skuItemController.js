'use strict'
const Exceptions = require('../../routers/exceptions');
const Controller = require('./controller')

class SkuItemController {
    /** @type {Controller} */
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = this.#controller.getDBManager();

        console.log("skuItemController started");
    }

    /**getter function to retreive all the SKUItems*/
    async getAllSkuItems() {
        /*let rows;
        const sqlInstruction = "SELECT * FROM SKUItem";
        try {
            rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return rows;*/

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM SKUItem")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;
    }


    /**getter function to retreive an array of SKUItems, given the ID of the SKU list related to it*/
    async getSkuItems(id) {
        /*let row;
        const sqlInstruction = `SELECT * FROM SKUItem WHERE SKUId= ${id};`;
        try {
            row = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return row;*/

        let rows;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItem WHERE SKUId= ${id};`)
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;
    }

    /**getter function to retreive a single SKUItem, given its RFID */
    async getSkuItem(rfid) {
        /*let row;
        const sqlInstruction = `SELECT * FROM SKUItem WHERE RFID= "${rfid}";`;
        try {
            row = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return row;*/

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItem WHERE RFID= "${rfid}";`)
            .then(value => row = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });
        return row;
    }

    /**creation of an SKUItem*/
    async createSkuItem(body) {

        const RFID = body["RFID"];
        const SKUId = body["SKUId"];
        const dateOfStock = body["DateOfStock"];

        if (!RFID || !SKUId || !dateOfStock)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock)
        VALUES ("${RFID}", ${SKUId}, 0, ${dateOfStock});`;
        try {
            const skuItem = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
    }

    /**function to edit an SKUItem*/
    async editSkuItem(oldRFID, body) {

        const newRFID = body["newRFID"];
        const newAvailable = body["newAvailable"];
        const newDateOfStock = body["newDateOfStock"];


        if (!newRFID || !newSKUId || !newDateOfStock)
            throw new Error(Exceptions.message422);

        const sqlUpdate = `UPDATE SKUItem SET RFID= "${newRFID}" AND Available= ${newAvailable} 
        AND DateOfStock= ${newDateOfStock} WHERE RFID= "${oldRFID}";`;
        try {
            const skuItem = await this.#dbManager.genericSqlGet(sqlUpdate);
        } catch (error) {
            new Error(Exceptions.message500);
        }
    }

    /**delete function to remove an SKUItem from the table, given its ID */
    async deleteSkuItem(rfid) {
       /* const sqlInstruction = `DELETE FROM SKUItem WHERE ID= ${rfid};`;
        try {
            const skuItem = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return skuItem; //skuItem returned to test it*/

        await this.#dbManager.genericSqlRun
            (`DELETE FROM SKUItem WHERE ID= ${rfid};`)
            .catch((error) => { throw new Error(Exceptions.message500) });
    }
}

module.exports = SkuItemController;