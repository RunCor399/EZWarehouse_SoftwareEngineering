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
            throw new Exceptions(401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM SKUItem")
            .then(value => rows = value)
            .catch(error => { throw new Exceptions(500) });
        return rows;
    }


    /**getter function to retreive an array of SKUItems, given the ID of the SKU list related to it*/
    async getSkuItems(id) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "customer"))
        throw new Exceptions(401);

        if (this.#controller.areUndefined(id) || this.#controller.areNotNumbers(id))
            throw new Exceptions(422);

        let sku;
        await this.#controller.getSkuController().getSku(id)
            .then(value => sku = value)
            .catch((error) => { throw error });
        if (!sku) throw new Exceptions(404)

        let rows;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItem WHERE SKUId= ${id};`)
            .then(value => rows = value)
            .catch(error => { throw error });
        if (!rows)
            throw new Exceptions(404)
        
        //`SELECT * FROM SKUItem WHERE SKUId= ?;`, id

        return rows;
    }

    /**getter function to retreive a single SKUItem, given its RFID */
    async getSkuItem(rfid) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        if (this.#controller.checkRFID(rfid))
            throw new Exceptions(422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItem WHERE RFID= "${rfid}";`)
            .then(value => row = value[0])
            .catch(error => { throw new Exceptions(500) });

        //`SELECT * FROM SKUItem WHERE RFID= ?;`, rfid
        
        if (!row)
        throw new Exceptions(404)
        return row;
    }

    /**creation of an SKUItem*/
    async createSkuItem(body) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "clerk"))
            throw new Exceptions(401);

        const RFID = body["RFID"];
        const SKUId = body["SKUId"];
        const dateOfStock = body["DateOfStock"];

        if (this.#controller.checkRFID(RFID)
            || this.#controller.areUndefined(SKUId, dateOfStock)
            || this.#controller.areNotNumbers(SKUId))
            throw new Exceptions(422);

        console.log("prova3")

        let sku;
        await this.#controller.getSkuController().getSku(SKUId)
            .then(value => sku = value)
            .catch((error) => { throw error });
        if (!sku) throw new Exceptions(404)


        const sqlInstruction = `INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock)
        VALUES ("${RFID}", ${SKUId}, 0, "${dateOfStock}");`;

       // const sqlInstruction = `INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) VALUES (?,?,?,?);`,RFID, SKUId, 0, dateOfStock;

        await this.#dbManager.genericSqlRun(sqlInstruction)
            .catch((error) => {
                throw new Exceptions(503);
            });

    }

    /**function to edit an SKUItem*/
    async editSkuItem(oldRFID, body) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        const newRFID = body["newRFID"];
        const newAvailable = body["newAvailable"];
        const newDateOfStock = body["newDateOfStock"];


        if (this.#controller.checkRFID(oldRFID) || this.#controller.checkRFID(newRFID)
            || this.#controller.areUndefined(newAvailable, newDateOfStock))
            throw new Exceptions(422);

        let skuitem;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItem WHERE RFID= "${oldRFID}";`)
            .then(value => skuitem = value[0])
            .catch(error => { throw error });
        if ( !skuitem)
            throw new Exceptions(404)
        
        //`SELECT * FROM SKUItem WHERE RFID= ?;`, oldRFID

        console.log(body)

        const sqlUpdate = `UPDATE SKUItem SET RFID= "${newRFID}", Available= ${newAvailable} ,
         DateOfStock= "${newDateOfStock}" WHERE RFID= "${oldRFID}";`;
        try {
            await this.#dbManager.genericSqlRun(sqlUpdate);
        } catch (error) {
            throw new Exceptions(503);
        }
    }

    /**delete function to remove an SKUItem from the table, given its ID */
    async deleteSkuItem(rfid) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        if (this.#controller.checkRFID(rfid))
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun
            (`DELETE FROM SKUItem WHERE RFID= "${rfid}";`)
            .catch((error) => { throw error });
    }
}

module.exports = SkuItemController;