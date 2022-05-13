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


    /*TO BE CHECKED - getter function to retreive all the return orders*/
    async getAllReturnOrders() {
        /*let rows;
        const sqlInstruction = "SELECT * FROM ReturnOrder;";
        try {
             rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return rows;*/

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM ReturnOrder;")
            .then(value => rows = value)
            .catch(error => { throw error });

        /*TO BE CHECKED*/
        rows.forEach(async (r) => {
            r.products = [];
            await this.#dbManager.genericSqlGet(`SELECT * FROM SKUPerReturnOrder WHERE id = ?;`, r.id)
                .then(value => r.products.forEach(value => {
                    r.products = [...r.products, value];
                }))
                .catch(error => { throw new Error(Exceptions.message500) });
        });

        return rows;
    }

    /*TO BE CHECKED - getter function to retreive a single return order, given its ID*/
    async getReturnOrder(id) {
        /*let row
        const sqlInstruction = `SELECT * FROM ReturnOrder WHERE ID= ${id};`;
        try {
            row = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return row;*/

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

        /*check if the id is valid*/
        if (!id || isNaN(id))
            throw new Exceptions(422)

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM ReturnOrder WHERE id=?;`, id)
            .then((value) => row = value[0])
            .catch((error) => { throw error });

        /*check if the internal order exists*/
        if (!row)
            throw new Exceptions(404);

        /*TO BE CHECKED*/
        row.products = [];
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKUPerReturnOrder WHERE id = ?;`, id)
            .then(value => row.products.forEach(value => {
                row.products = [...row.products, value];
            }))
            .catch(error => { throw new Error(Exceptions.message500) });

        return row;
    }

    /*TO BE CHECKED - function to create a return order*/
    async createReturnOrder(body) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

        const returnDate = body["returnDate"];
        const products = body["products"];
        const restockOrderId = body["restockOrderId"];

        /*check if the body is valid */
        if (!returnDate || !products || !restockOrderId || isNaN(restockOrderId))
            throw new Exceptions(422)

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE id=?;`, restockOrderId)
            .then((value) => row = value[0])
            .catch((error) => { throw error; });

        /*check if the restock order exists*/
        if (!row)
            throw new Exceptions(404);

        /* const sqlGetCount = 'SELECT COUNT(*) FROM ReturnOrder'

        try {
            const id = (await this.#dbManager.genericSqlGet(sqlGetCount))[0]["COUNT(*)"];
        } catch (error) {
            new Error(Exceptions.message500);
        } */

        let id;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM ReturnOrder')
            .then(value => id = value[0]["COUNT(*)"])
            .catch(error => { throw error });

        const params1 = [id+1, returnDate, restockOrderId];
        const sqlInstruction = `INSERT INTO ReturnOrder (id, returnDate, restockOrderId) 
                                VALUES (?,?,?);`;
        try {
            await this.#dbManager.genericSqlRun(sqlInstruction, params1);
        } catch (error) {
            throw error;
        }

        let params2;
        /*TO BE CHECKED*/
        products.forEach(async (elem) => {
            params2 = [id, elem.SKUId, elem.description, elem.price, elem.rfid]
            const sqlInsert = `INSERT INTO SKUPerReturnOrder (id, SKUId, description, price, RFID) VALUES (?,?,?,?,?);`;
            try {
                await this.#dbManager.genericSqlRun(sqlInsert, params2);
            } catch (error) {
                throw error;
            }
        })

    }

    /*COMPLETED - delete function to remove a return order from the table, given its ID*/
    async deleteReturnOrder(id) {
        /*  const sqlInstruction = `DELETE FROM ReturnOrder WHERE ID= ${id};`;
          try {
              const returnOrder = await this.#dbManager.genericSqlGet(sqlInstruction);
          } catch (error) {
              new Error(Exceptions.message500);
          }
          return returnOrder;*/

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

        /*check if the id is valid*/
        if (!id || isNaN(id))
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun(`DELETE FROM ReturnOrder WHERE ID=?;`, id)
            .catch((error) => { throw new error });
    }
}

module.exports = ReturnOrderController;