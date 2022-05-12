'use strict'

const Exceptions = require('../../routers/exceptions');
const Controller = require('./controller')

class InternalOrderController {
    /** @type {Controller} */
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = this.#controller.getDBManager();
        console.log("internalOrderController started");
    }


    /**getter function to retreive all the internal orders*/
    async getAllInternalOrders() {
        /* let rows;
         const sqlInstruction = "SELECT * FROM InternalOrder;";
         try {
             rows = await this.#dbManager.genericSqlGet(sqlInstruction);
         } catch (error) {
             throw new Exceptions(500);
         }
         return rows;*/

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM InternalOrder;")
            .then((value) => rows = value)
            .catch((error) => { throw  error });

        return rows;

    }

    /**getter function to retreive all the issued internal orders*/
    async getIssuedInternalOrders() {
        /*let rows;
        const sqlInstruction = "SELECT * FROM InternalOrder WHERE state = 'ISSUED';";
        try {
            rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return rows;*/

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager", "customer"))
            throw new Exceptions(401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM InternalOrder WHERE state = 'ISSUED';")
            .then((value) => rows = value)
            .catch((error) => { throw error });

        return rows;

    }

    /**getter function to retreive all the accepted internal orders*/
    async getAcceptedInternalOrders() {
        /*let rows;
        const sqlInstruction = "SELECT * FROM InternalOrder WHERE state = 'ACCEPTED';";
        try {
            rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return rows;*/

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager", "deliveryEmployee"))
            throw new Exceptions(401);
        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM InternalOrder WHERE state = 'ACCEPTED';")
            .then((value) => rows = value)
            .catch((error) => { throw error });

        return rows;
    }

    /**getter function to retreive a single internal order, given its ID*/
    async getInternalOrder(id) {
        /*let row;
        const sqlInstruction = `SELECT * FROM InternalOrder WHERE ID= ${id};`;
        try {
            row = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return row;*/

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager", "deliveryEmployee"))
            throw new Exceptions(401);

        /*check if the id is valid*/
        if (!id || isNaN(id))
            throw new Exceptions(422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM InternalOrder WHERE ID= ${id};`)
            .then((value) => row = value[0])
            .catch((error) => { throw error });

        /*check if the internal order exists*/
        if (!row)
            throw new Exceptions(404);

        return row;

    }

    /**TODO - products and issueDate are missing in the table */
    async createInternalOrder(body) {

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager", "customer"))
            throw new Exceptions(401);

        const issueDate = body["issueDate"];
        const products = body["products"];
        const customerId = body["customerId"]

        /*check if the body is valid */
        if (!issueDate || !products || !customerId || isNaN(customerId))
            throw new Exceptions(422);

        /*let id;
                const sqlGetCount = 'SELECT COUNT(*) FROM InternalOrder'
        
                try {
                    id = (await this.#dbManager.genericSqlGet(sqlGetCount))[0]["COUNT(*)"];;
                } catch (error) {
                    new Error(Exceptions.message500);
                } */

        let id;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM InternalOrder')
            .then(value => id = value[0]["COUNT(*)"])
            .catch(error => { throw new error});


        const sqlInstruction = `INSERT INTO InternalOrder (ID, issueDate, state, customerId) 
        VALUES (${id + 1}, "${issueDate}", "ISSUED", ${customerId});`;
        try {
            await this.#dbManager.genericSqlRun(sqlInstruction);
        } catch (error) {
            new Exceptions(503);
        }

        /*TO BE CHECKED*/
        products.forEach(async (elem) => {
            const sqlInsert = `INSERT INTO SKUPerInternalOrder (orderID, SKUID, RFID) VALUES (${id}, ${elem.SKUId}, ${elem.rfid});`;
            try {
                await this.#dbManager.genericSqlGet(sqlInsert);
            } catch (error) {
                throw error;
            }
        })

    }

    /**TO CHECK*/
    async editInternalOrder(id, body) {

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager", "customer", "deliveryEmployee"))
            throw new Exceptions(401);

        /*check if the id is valid*/
        if (!id || isNaN(id))
            throw new Exceptions(422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM InternalOrder WHERE ID= ${id};`)
            .then((value) => row = value[0])
            .catch((error) => { throw error });

        /*check if the internal order exists*/
        if (!row)
            throw new Exceptions(404)

        const newState = body["newState"];

        /*check if the body is valid */
        if (!newState)
            throw new Exceptions(422);

        if (newState === "COMPLETED") {
            const products = body["products"];

            if (!products)
                throw new Exceptions(422);

            products.forEach(async (elem) => {
                const sqlInsert = `INSERT INTO SKUPerInternalOrder (orderID, SKUID, RFID) VALUES (${id}, ${elem.SKUId}, ${elem.rfid});`;
                try {
                    const internalOrder = await this.#dbManager.genericSqlGet(sqlInsert);
                } catch (error) {
                    throw error;
                }
            })
            return internalOrder;
        }
        else {
            const sqlInstruction = `UPDATE InternalOrder SET state= "${newState}" WHERE ID= ${id}`;
            try {
                await this.#dbManager.genericSqlRun(sqlInstruction);
            } catch (error) {
                throw error;
            }
        }

    }


    /**delete function to remove an internal order from the table, given its ID */
    async deleteInternalOrder(id) {
        /* const sqlInstruction = `DELETE FROM InternalOrder WHERE ID= ${id};`;
        try {
            await this.#dbManager.genericSqlRun(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        } */

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        /*check if the id is valid*/
        if (!id || isNaN(id))
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun
            (`DELETE FROM InternalOrder WHERE ID= ${id};`)
            .catch((error) => { throw error });
    }

}

module.exports = InternalOrderController;