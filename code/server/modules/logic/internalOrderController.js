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


    /*TO BE CHECKED - getter function to retreive all the internal orders*/
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
            .catch((error) => { throw error });

        let params;
        const query = `SELECT * FROM SKUPerInternalOrder WHERE id = ?;`;

        /*TO BE CHECKED*/
        rows.forEach(async (r) => {
            params = [r.id];
            r.products = [];
            await this.#dbManager.genericSqlGet(query, params)
                .then(value => r.products.forEach(value => {
                    r.products = [...r.products, value];
                }))
                .catch(error => { throw new Error(Exceptions.message500) });
        });

        return rows;

    }

    /*TO BE CHECKED - getter function to retreive all the issued internal orders*/
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

        let params;
        const query = `SELECT * FROM SKUPerInternalOrder WHERE id = ?;`;
        /*TO BE CHECKED*/
        rows.forEach(async (r) => {
            params = [r.id];
            r.products = [];
            await this.#dbManager.genericSqlGet(query, params)
                .then(value => r.products.forEach(value => {
                    r.products = [...r.products, value];
                }))
                .catch(error => { throw error });
        });

        return rows;

    }

    /*TO BE CHECKED - getter function to retreive all the accepted internal orders*/
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

        /*TO BE COMPLETED - (it's missing something about the generation of the dictionary)*/
        let params;
        const query = `SELECT * FROM SKUPerInternalOrder WHERE id = ?;`;
        rows.forEach(async (r) => {
            params = [r.id];
            await this.#dbManager.genericSqlGet(query, params)
                .then(value => r.products = value) /*generation of the dictionary */    
                .catch(error => { throw error });
        });

        return rows;
    }

    /*TO BE CHECKED - getter function to retreive a single internal order, given its ID*/
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
        const query1 = `SELECT * FROM InternalOrder WHERE ID = ?;`;
        const params1 = [id];

        await this.#dbManager.genericSqlGet(query1, params1)
            .then((value) => row = value[0])
            .catch((error) => { throw error });

        /*check if the internal order exists*/
        if (!row)
            throw new Exceptions(404);

            
        /*TO BE COMPLETED - (it's missing something about the generation of the dictionary)*/
        const query2 = `SELECT * FROM SKUPerInternalOrder WHERE id = ?;`;
        const params2 = [id];

        await this.#dbManager.genericSqlGet(query2, params2)
            .then(value => row.products =
                /*generation of the dictionary */
                value)
            .catch(error => { throw error });

        return row;

    }

    /*TO BE CHECKED - creation of a new internal order*/
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
            .catch(error => { throw  error });

        const params1 = [id+1, issueDate, customerId];
        const sqlInstruction = `INSERT INTO InternalOrder (ID, issueDate, state, customerId) 
                                VALUES (?, ?, "ISSUED", ?);`;
        try {
            await this.#dbManager.genericSqlRun(sqlInstruction, params1);
        } catch (error) {
            new Exceptions(503);
        }

        /*TO BE CHECKED*/
        let params2;
        products.forEach(async (elem) => {
            params2 = [id, elem.SKUId, elem.description, elem.price, elem.qty];
            const sqlInsert = `INSERT INTO SKUPerInternalOrder (id, SKUId, description, price, qty) VALUES (?, ?, ?, ?, ?);`;
            try {
                await this.#dbManager.genericSqlRun(sqlInsert, params2);
  
            } catch (error) {
                throw error;
            }
        })

    }

    /*TO BE CHECKED - function to edit the state of an internal order, given its ID*/
    async editInternalOrder(id, body) {

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager", "customer", "deliveryEmployee"))
            throw new Exceptions(401);

        /*check if the id is valid*/
        if (!id || isNaN(id))
            throw new Exceptions(422);

        let row;
        const params1 = [id];
        const query1 = `SELECT * FROM InternalOrder WHERE ID= ?;`;
        await this.#dbManager.genericSqlGet(query1, params1)
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

            /*TO BE CHECKED*/
            let params2;
            products.forEach(async (elem) => {
                params2 = [id, elem.SKUId, elem.rfid];
                const sqlInsert = `INSERT INTO SKUItemsPerInternalOrder (id, SKUID, RFID) VALUES (?, ?, ?);`;
                try {
                    await this.#dbManager.genericSqlRun(sqlInsert, params2);
                } catch (error) {
                    throw error;
                }
            })

        }
        else {
            let params3 = [newState, id];
            const sqlInstruction = `UPDATE InternalOrder SET state = ? WHERE ID = ?`;
            try {
                await this.#dbManager.genericSqlRun(sqlInstruction, params3);
            } catch (error) {
                throw error;
            }
        }

    }


    /*COMPLETED - delete function to remove an internal order from the table, given its ID */
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

        const query = `DELETE FROM InternalOrder WHERE ID = ?;`;
        const params = [id];
        await this.#dbManager.genericSqlRun(query, params)
            .catch((error) => { throw error });
    }

}

module.exports = InternalOrderController;