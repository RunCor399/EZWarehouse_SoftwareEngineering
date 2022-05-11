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

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Error(Exceptions.message401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM SKUItem")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;
    }


    /**getter function to retreive an array of SKUItems, given the ID of the SKU list related to it*/
    async getSkuItems(id) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "customer"))
            throw new Error(Exceptions.message401);

        if (this.#controller.areUndefined(id) || this.#controller.areNotNumbers(id))
            throw new Error(Exceptions.message422);

        let sku;
        await this.getSku(id)
            .then(value => sku = value)
            .catch(() => { throw new Error(Exceptions.message500) });
        if (!sku) throw new Error(Exceptions.message404)

        let rows;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItem WHERE SKUId= ${id};`)
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });

        if (!rows)
            throw new Error(Exceptions.message404)

        return rows;
    }

    /**getter function to retreive a single SKUItem, given its RFID */
    async getSkuItem(rfid) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Error(Exceptions.message401);

        if (this.#controller.checkRFID(rfid))
            throw new Error(Exceptions.message422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItem WHERE RFID= "${rfid}";`)
            .then(value => row = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });

        if (!row)
            throw new Error(Exceptions.message404)
        return row;
    }

    /**creation of an SKUItem*/
    async createSkuItem(body) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "clerk"))
            throw new Error(Exceptions.message401);

        const RFID = body["RFID"];
        const SKUId = body["SKUId"];
        const dateOfStock = body["DateOfStock"];

        if (this.#controller.checkRFID(RFID)
            || this.#controller.areUndefined(SKUI, dateOfStock)
            || this.#controller.areNotNumbers(SKUId))
            throw new Error(Exceptions.message422);

        let num;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKU WHERE id= ${SKUId};`)
            .then(value => num = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });

        if (num === undefined)
            throw new Error(Exceptions.message404);

        const sqlInstruction = `INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock)
        VALUES ("${RFID}", ${SKUId}, 0, ${dateOfStock});`;

        await this.#dbManager.genericSqlRun(sqlInstruction)
            .catch((error) => {
                throw new Error(Exceptions.message503);
            });


    }

    /**function to edit an SKUItem*/
    async editSkuItem(oldRFID, body) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Error(Exceptions.message401);

        const newRFID = body["newRFID"];
        const newAvailable = body["newAvailable"];
        const newDateOfStock = body["newDateOfStock"];


        if (this.#controller.checkRFID(oldRFID) || this.#controller.checkRFID(newRFID)
            || this.#controller.areUndefined(newAvailable, newDateOfStock))
            throw new Error(Exceptions.message422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT (*) FROM SKUItem WHERE RFID= ${oldRFID};`)
            .then(value => row = value[0])
            .catch(error => { throw new Error(Exceptions.message503) });
        if (num === undefined)
            throw new Error(Exceptions.message404);

        const sqlUpdate = `UPDATE SKUItem SET RFID= "${newRFID}" AND Available= ${newAvailable} 
        AND DateOfStock= ${newDateOfStock} WHERE RFID= "${oldRFID}";`;
        try {
            await this.#dbManager.genericSqlRun(sqlUpdate);
        } catch (error) {
            new Error(Exceptions.message503);
        }
    }

    /**delete function to remove an SKUItem from the table, given its ID */
    async deleteSkuItem(rfid) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Error(Exceptions.message401);

        if (this.#controller.checkRFID(rfid))
            throw new Error(Exceptions.message422);

        await this.#dbManager.genericSqlRun
            (`DELETE FROM SKUItem WHERE ID= ${rfid};`)
            .catch((error) => { throw new Error(Exceptions.message503) });
    }
}

module.exports = SkuItemController;