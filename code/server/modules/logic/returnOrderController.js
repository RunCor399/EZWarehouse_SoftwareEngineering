'use strict'
const Exceptions = require('../../routers/exceptions');
const Controller = require('./controller')

class ReturnOrderController {
    /** @type {Controller} */
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = this.#controller.getDBManager();
        console.log("returnOrderController started");
    }



    /**getter function to retreive all the return orders*/
    async getAllReturnOrders() {
        /*let rows;
        const sqlInstruction = "SELECT * FROM ReturnOrder;";
        try {
             rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return rows;*/

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM ReturnOrder;")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;
    }

    /**getter function to retreive a single return order, given its ID*/
    async getReturnOrder(id) {
        /*let row
        const sqlInstruction = `SELECT * FROM ReturnOrder WHERE ID= ${id};`;
        try {
            row = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return row;*/

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM ReturnOrder WHERE ID= ${id};`)
            .then(value => row = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });
        return row;
    }

    /**TO BE COMPLETED - products are missing in the table, while managerID and supplierID are missing in the function */
    async createReturnOrder(body) {

        const returnDate = body["returnDate"];
        const products = body["products"];
        const restockOrderId = body["restockOrderId"];

        if (!returnDate || !products || !restockOrderId)
            throw new Error(Exceptions.message422);

        /* const sqlGetCount = 'SELECT COUNT(*) FROM ReturnOrder'

        try {
            const id = (await this.#dbManager.genericSqlGet(sqlGetCount))[0]["COUNT(*)"];
        } catch (error) {
            new Error(Exceptions.message500);
        } */

        let id;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM ReturnOrder')
            .then(value => id = value[0]["COUNT(*)"])
            .catch(error => { throw new Error(Exceptions.message500) });

        const sqlInstruction = `INSERT INTO ReturnOrder (ID, returnDate, restockOrderId) 
        VALUES (${id + 1}, ${returnDate}, ${restockOrderId});`;
        try {
            const returnOrder = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }

        products.forEach((elem) => {
            const sqlInsert = `INSERT INTO SKUPerReturnOrder (orderID, SKUID, RFID) VALUES (${id}, ${elem.SKUId}, ${elem.rfid});`;
            try {
                const returnOrder = await this.#dbManager.genericSqlGet(sqlInsert);
            } catch (error) {
                new Error(Exceptions.message500);
            }
        })

        return returnOrder;
    }

    /**delete function to remove a return order from the table, given its ID*/
    async deleteReturnOrder(id) {
        /*  const sqlInstruction = `DELETE FROM ReturnOrder WHERE ID= ${id};`;
          try {
              const returnOrder = await this.#dbManager.genericSqlGet(sqlInstruction);
          } catch (error) {
              new Error(Exceptions.message500);
          }
          return returnOrder;*/

        await this.#dbManager.genericSqlRun
            (`DELETE FROM ReturnOrder WHERE ID= ${id};`)
            .catch((error) => { throw new Error(Exceptions.message500) });
    }
}

module.exports = ReturnOrderController;