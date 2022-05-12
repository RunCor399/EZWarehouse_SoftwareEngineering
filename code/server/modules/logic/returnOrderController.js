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


    /*TO BE COMPLETED - getter function to retreive all the return orders*/
    async getAllReturnOrders() {
        /*let rows;
        const sqlInstruction = "SELECT * FROM ReturnOrder;";
        try {
             rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return rows;*/

        /*check if the user is authorized */
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager')
            throw new Error(Exceptions.message401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM ReturnOrder;")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });

        /*TO BE COMPLETED - (it's missing something about the generation of the dictionary)*/
        rows.forEach(async (r) => {
            await this.#dbManager.genericSqlGet(`SELECT * FROM SKUPerReturnOrder WHERE id = ${r.id};`)
                .then(value => r.products =
                    /*generation of the dictionary */
                    value)
                .catch(error => { throw new Error(Exceptions.message500) });
        });

        return rows;
    }

    /*TO BE COMPLETED - getter function to retreive a single return order, given its ID*/
    async getReturnOrder(id) {
        /*let row
        const sqlInstruction = `SELECT * FROM ReturnOrder WHERE ID= ${id};`;
        try {
            row = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return row;*/

        /*check if the user is authorized */
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager')
            throw new Error(Exceptions.message401);

        /*check if the id is valid*/
        if (!id || isNaN(id))
            throw new Error(Exceptions.message422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM ReturnOrder WHERE id= ${id};`)
            .then((value) => row = value[0])
            .catch((error) => { throw new Error(Exceptions.message500); });

        /*check if the internal order exists*/
        if (!row)
            throw new Error(Exceptions.message404)

        /*TO BE COMPLETED - (it's missing something about the generation of the dictionary)*/
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKUPerReturnOrder WHERE id = ${id};`)
            .then(value => row.products =
                /*generation of the dictionary */
                value)
            .catch(error => { throw new Error(Exceptions.message500) });

        return row;
    }

    /*TO BE CHECKED - function to create a return order*/
    async createReturnOrder(body) {

        /*check if the user is authorized */
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager')
            throw new Error(Exceptions.message401);

        const returnDate = body["returnDate"];
        const products = body["products"];
        const restockOrderId = body["restockOrderId"];

        /*check if the body is valid */
        if (!returnDate || !products || !restockOrderId || isNaN(restockOrderId))
            throw new Error(Exceptions.message422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE id= ${restockOrderId};`)
            .then((value) => row = value[0])
            .catch((error) => { throw new Error(Exceptions.message500); });

        /*check if the restock order exists*/
        if (!row)
            throw new Error(Exceptions.message404)

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

        const sqlInstruction = `INSERT INTO ReturnOrder (id, returnDate, restockOrderId) 
        VALUES (${id + 1}, ${returnDate}, ${restockOrderId});`;
        try {
            const returnOrder = await this.#dbManager.genericSqlRun(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }

        /*TO BE CHECKED*/
        products.forEach(async (elem) => {
            const sqlInsert = `INSERT INTO SKUPerReturnOrder (id, SKUId, description, price, RFID) VALUES (${id}, ${elem.SKUId}, ${elem.description}, ${elem.price}, ${elem.rfid});`;
            try {
                const returnOrder = await this.#dbManager.genericSqlRun(sqlInsert);
            } catch (error) {
                new Error(Exceptions.message500);
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

        /*check if the user is authorized */
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager')
            throw new Error(Exceptions.message401);

        /*check if the id is valid*/
        if (!id || isNaN(id))
            throw new Error(Exceptions.message422);

        await this.#dbManager.genericSqlRun
            (`DELETE FROM ReturnOrder WHERE id= ${id};`)
            .catch((error) => { throw new Error(Exceptions.message500) });
    }
}

module.exports = ReturnOrderController;