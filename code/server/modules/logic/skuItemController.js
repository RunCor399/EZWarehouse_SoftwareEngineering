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

    /** getter function to retreive all the SKUItems.
     * Privileges needed: manager
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error).
    */
    async getAllSkuItems() {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        let skuitems = await this.#dbManager.genericSqlGet("SELECT * FROM SKUItem")
            .catch(error => { throw error });
        return skuitems;
    }


    /**getter function to retreive an array of SKUItems, given the ID of the SKU list related to it.
     * Privileges needed: manager, customer
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no SKU associated to id)
     * @throws 422 Unprocessable Entity (validation of id failed)
     * @throws 500 Internal Server Error (generic error).
    */
    async getSkuItems(id) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "customer"))
            throw new Exceptions(401);

        if (this.#controller.areUndefined(id) 
        || this.#controller.areNotNumbers(id)
        || !this.#controller.areAllPositive(id))
            throw new Exceptions(422);

        //check if sku exists
        await this.#controller.getSkuController().getSku(id)
            .catch((error) => { throw error });

        let skuitems = await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItem WHERE SKUId= ?;`, id)
            .catch(error => { throw error });
        if (!skuitems)
            throw new Exceptions(404)


        return skuitems;
    }

    /**getter function to retreive a single SKUItem, given its RFID.
     * Privileges needed: manager
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no SKU Item associated to rfid)
     * @throws 422 Unprocessable Entity (validation of rfid failed)
     * @throws 500 Internal Server Error (generic error).
     */
    async getSkuItem(rfid) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        if (this.#controller.checkRFID(rfid))
            throw new Exceptions(422);

        let row = await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItem WHERE RFID= ?;`, rfid)
            .catch(error => { throw error });
        if (!(row[0]))
            throw new Exceptions(404)

        return row[0];
    }

    /**creation of an SKUItem.
     * Privileges needed: manager
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no SKU associated to SKUId)
     * @throws 422 Unprocessable Entity (validation of request body failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async createSkuItem(body) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "clerk"))
            throw new Exceptions(401);

        const RFID = body["RFID"];
        const SKUId = body["SKUId"];
        const dateOfStock = body["DateOfStock"];

        if (this.#controller.checkRFID(RFID)
            || this.#controller.areUndefined(SKUId, dateOfStock)
            || this.#controller.areNotNumbers(SKUId)
            || !this.#controller.areAllPositive(SKUId))
            throw new Exceptions(422);

        //check if sku exists
        await this.#controller.getSkuController().getSku(SKUId)
            .catch((error) => { if (error.getCode() === 500) throw new Exceptions(503); else throw error });

        const sqlInstruction = `INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) VALUES (?,?,?,?);`;

        await this.#dbManager.genericSqlRun(sqlInstruction, RFID, SKUId, 0, dateOfStock)
            .catch((error) => { throw new Exceptions(503) });

    }

    /**function to edit an SKUItem.
     * Privileges needed: manager
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no SKU Item associated to rfid)
     * @throws 422 Unprocessable Entity (validation of request body or of rfid failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async editSkuItem(oldRFID, body) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        const newRFID = body["newRFID"];
        const newAvailable = body["newAvailable"];
        const newDateOfStock = body["newDateOfStock"];

        if (this.#controller.checkRFID(oldRFID)
            || this.#controller.checkRFID(newRFID)
            || this.#controller.areUndefined(newAvailable, newDateOfStock))
            throw new Exceptions(422);

        //check if skuitem exists
        await this.getSkuItem(oldRFID)
            .catch(error => { if (error.getCode() === 500) throw new Exceptions(503); else throw error });

        const sqlUpdate = `UPDATE SKUItem SET RFID= ?, Available= ?,DateOfStock= ? WHERE RFID= ?;`;

        await this.#dbManager.genericSqlRun(sqlUpdate, newRFID, newAvailable, newDateOfStock, oldRFID)
            .catch(error => { throw new Exceptions(503); });
    }

    /** delete function to remove an SKUItem from the table, given its ID.
     * Privileges needed: manager
     * @param rfid the rfid of skuitem to be deleted
     * @throws401 Unauthorized (not logged in or wrong permissions)
     * @throws 422 Unprocessable Entity (validation of rfid failed)
     * @throws 503 Service Unavailable (generic error).
     */
    async deleteSkuItem(rfid) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        if (this.#controller.checkRFID(rfid))
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun(`DELETE FROM SKUItem WHERE RFID= ?;`, rfid)
            .catch((error) => { throw new Exceptions(503) });

    }
}

module.exports = SkuItemController;