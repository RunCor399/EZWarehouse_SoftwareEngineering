'use strict'

const Exceptions = require('../../routers/exceptions');
const Controller = require('./controller')


class RestockOrderController {
    /** @type {Controller} */
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = this.#controller.getDBManager();
        console.log("restockOrderController started");
    }

    /**getter function to retreive all the restock orders*/
    async getAllRestockOrders() {
        /*let rows;
        const sqlInstruction = "SELECT * FROM RestockOrder;";
        try {
            rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return rows;*/

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM RestockOrder;")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;
    }

    /**getter function to retreive all the issued restock orders*/
    async getIssuedRestockOrders() {
        /*let rows;
        const sqlInstruction = "SELECT * FROM RestockOrder WHERE state = 'ISSUED';";
        try {
            rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return rows;*/

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM RestockOrder WHERE state = 'ISSUED';")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;
    }

    /**getter function to retreive a single restock order, given its ID*/
    async getRestockOrder(id) {
        /*let rows
        const sqlInstruction = `SELECT * FROM RestockOrder WHERE ID="${id};`;
        try {
            rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return restockOrder;*/

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE ID="${id};`)
            .then(value => row = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });
        return row;
    }

    /**TODO */
    async getRestockOrderToBeReturned(id) {
        return undefined;
    }

    /**TO BE COMPLETED*/
    async createRestockOrder(body) {

        const issueDate = body["issueDate"];
        const products = body["products"];
        const supplierId = body["supplierId"]

        if (!issueDate || !products || !supplierId)
            throw new Error(Exceptions.message422);

        /*   const sqlGetCount = 'SELECT COUNT(*) FROM RestockOrder'
  
          try {
              const id = await this.#dbManager.genericSqlGet(sqlGetCount);
          } catch (error) {
              new Error(Exceptions.message500);
          }*/

        let id;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM RestockOrder')
            .then(value => id = value[0]["COUNT(*)"])
            .catch(error => { throw new Error(Exceptions.message500) });


        const sqlInstruction = `INSERT INTO RestockOrder (ID, supplierID, issueDate) VALUES (${id + 1},
             ${supplierId}, ${issueDate});`;
        try {
            const restockOrder = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }

        /*products to be added into ItemsPerOrder*/

        return restockOrder;
    }

    /**function to edit a state of a restock order, given its ID*/
    async editRestockOrder(id, body) {

        const newState = body["newState"];

        if (!newState)
            throw new Error(Exceptions.message422);


        const sqlInstruction = `UPDATE RestockOrder SET state = "${newState}" WHERE ID= ${id};`;
        try {
            const restockOrder = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }

    }

    /**TODO */
    async addSkuItemsToRestockOrder(id, body) {

        const skuItems = body["skuItems"];

        if (!skuItems)
            throw new Error(Exceptions.message422);

        /*join between ItemsPerOrder and RestockOrder*/
        /*loop to save insert each new item into ItemsPerOrder */
        return undefined;
    }

    /**Transport Note is missing in the DB */
    async addTransportNote(id, body) {

        const transportNote = body["transportNote"];
        if (!transportNote)
            throw new Error(Exceptions.message422);
        return undefined;
    }

    /**delete function to remove a restock order from the table, given its ID*/
    async deleteRestockOrder(id) {
        /*const sqlInstruction = `DELETE FROM RestockOrder WHERE ID= ${id};`;
        try {
            const restockOrder = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return restockOrder;*/

        await this.#dbManager.genericSqlRun
            (`DELETE FROM RestockOrder WHERE ID= ${id};`)
            .catch((error) => { throw new Error(Exceptions.message500) });
    }
}

module.exports = RestockOrderController;