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

        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager')
            throw new Error(Exceptions.message401);
        let rows;

        await this.#dbManager.genericSqlGet("SELECT * FROM SKUItem")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;
    }


    /**getter function to retreive an array of SKUItems, given the ID of the SKU list related to it*/
    async getSkuItems(id) {
     
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager' && user.type !== 'customer')
            throw new Error(Exceptions.message401);

        if (!id || isNaN(id))
            throw new Error(Exceptions.message422);


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

        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager')
            throw new Error(Exceptions.message401);

        if (!rfid || isNaN(Number(rfid)) || rfid.length !== 32)
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

        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager' && user.type !== 'clerk')
            throw new Error(Exceptions.message401);

        const RFID = body["RFID"];
        const SKUId = body["SKUId"];
        const dateOfStock = body["DateOfStock"];

        if (!RFID || isNaN(Number(rfid))|| RFID.length !== 32 || !SKUId || isNaN(SKUId) || !dateOfStock)
            throw new Error(Exceptions.message422);

        let num;
        await this.#dbManager.genericSqlGet(`SELECT COUNT(*) FROM SKUItem WHERE SKUId= ${id};`)
            .then(value => num = value[0]["COUNT(*)"])
            .catch(error => { throw new Error(Exceptions.message500) });
        if (num === 0)
            throw new Error(Exceptions.message404);

        const sqlInstruction = `INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock)
        VALUES ("${RFID}", ${SKUId}, 0, ${dateOfStock});`;
        try {
            await this.#dbManager.genericSqlRun(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message503);
        }
    }

    /**function to edit an SKUItem*/
    async editSkuItem(oldRFID, body) {

        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager')
            throw new Error(Exceptions.message401);

        const newRFID = body["newRFID"];
        const newAvailable = body["newAvailable"];
        const newDateOfStock = body["newDateOfStock"];


        if (!oldRFID || isNaN(Number(oldRFID)) || oldRFID.length !== 32
            || !newRFID || isNaN(Number(newRFID)) || newRFID.length !== 32
            || !newAvailable || !newDateOfStock)
            throw new Error(Exceptions.message422);

        let num;
        await this.#dbManager.genericSqlGet(`SELECT COUNT(*) FROM SKUItem WHERE RFID= ${oldRFID};`)
            .then(value => num = value[0]["COUNT(*)"])
            .catch(error => { throw new Error(Exceptions.message503) });
        if (num === 0)
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
        
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager')
            throw new Error(Exceptions.message401);

        if (!rfid || isNaN(Number(rfid)) || rfid.length !== 12)
            throw new Error(Exceptions.message422);

        await this.#dbManager.genericSqlRun
            (`DELETE FROM SKUItem WHERE ID= ${rfid};`)
            .catch((error) => { throw new Error(Exceptions.message503) });
    }
}

module.exports = SkuItemController;