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


    /*TO BE COMPLETED - getter function to retreive all the internal orders*/
    async getAllInternalOrders() {
        /* let rows;
         const sqlInstruction = "SELECT * FROM InternalOrder;";
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
        await this.#dbManager.genericSqlGet("SELECT * FROM InternalOrder;")
            .then((value) => rows = value)
            .catch((error) => { throw new Error(Exceptions.message500); });

        /*TO BE COMPLETED - (it's missing something about the generation of the dictionary)*/
        rows.forEach((r) => {
            await this.#dbManager.genericSqlGet(`SELECT * FROM SKUPerInternalOrder WHERE id = ${r.id};`)
                .then(value => r.products =
                    /*generation of the dictionary */
                    value)
                .catch(error => { throw new Error(Exceptions.message500) });
        });

        return rows;

    }

    /*TO BE COMPLETED - getter function to retreive all the issued internal orders*/
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
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager' && user.type !== 'customer')
            throw new Error(Exceptions.message401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM InternalOrder WHERE state = 'ISSUED';")
            .then((value) => rows = value)
            .catch((error) => { throw new Error(Exceptions.message500); });

        /*TO BE COMPLETED - (it's missing something about the generation of the dictionary)*/
        rows.forEach((r) => {
            await this.#dbManager.genericSqlGet(`SELECT * FROM SKUPerInternalOrder WHERE id = ${r.id};`)
                .then(value => r.products =
                    /*generation of the dictionary */
                    value)
                .catch(error => { throw new Error(Exceptions.message500) });
        });

        return rows;

    }

    /*TO BE COMPLETED - getter function to retreive all the accepted internal orders*/
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
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager' && user.type !== 'delivery employee')
            throw new Error(Exceptions.message401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM InternalOrder WHERE state = 'ACCEPTED';")
            .then((value) => rows = value)
            .catch((error) => { throw new Error(Exceptions.message500); });

        /*TO BE COMPLETED - (it's missing something about the generation of the dictionary)*/
        rows.forEach((r) => {
            await this.#dbManager.genericSqlGet(`SELECT * FROM SKUPerInternalOrder WHERE id = ${r.id};`)
                .then(value => r.products =
                    /*generation of the dictionary */
                    value)
                .catch(error => { throw new Error(Exceptions.message500) });
        });

        return rows;
    }

    /*TO BE COMPLETED - getter function to retreive a single internal order, given its ID*/
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
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager' && user.type !== 'delivery employee')
            throw new Error(Exceptions.message401);

        /*check if the id is valid*/
        if (!id || isNaN(id))
            throw new Error(Exceptions.message422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM InternalOrder WHERE ID= ${id};`)
            .then((value) => row = value[0])
            .catch((error) => { throw new Error(Exceptions.message500); });

        /*check if the internal order exists*/
        if (!row)
            throw new Error(Exceptions.message404)

        /*TO BE COMPLETED - (it's missing something about the generation of the dictionary)*/
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKUPerInternalOrder WHERE id = ${id};`)
            .then(value => row.products =
                /*generation of the dictionary */
                value)
            .catch(error => { throw new Error(Exceptions.message500) });

        return row;

    }

    /*TO BE CHECKED - creation of a new internal order*/
    async createInternalOrder(body) {

        /*check if the user is authorized */
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager' && user.type !== 'customer')
            throw new Error(Exceptions.message401);

        const issueDate = body["issueDate"];
        const products = body["products"];
        const customerId = body["customerId"]

        /*check if the body is valid */
        if (!issueDate || !products || !customerId || isNaN(customerId))
            throw new Error(Exceptions.message422);

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
            .catch(error => { throw new Error(Exceptions.message503) });


        const sqlInstruction = `INSERT INTO InternalOrder (ID, issueDate, state, customerId) 
        VALUES (${id + 1}, "${issueDate}", "ISSUED", ${customerId});`;
        try {
            await this.#dbManager.genericSqlRun(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message503);
        }

        /*TO BE CHECKED*/
        products.forEach((elem) => {
            const sqlInsert = `INSERT INTO SKUPerInternalOrder (id, SKUId, description, price, qty) VALUES (${id}, ${elem.SKUId}, ${elem.description}, ${elem.price}, ${elem.qty});`;
            try {
                const internalOrder = await this.#dbManager.genericSqlRun(sqlInsert);
            } catch (error) {
                new Error(Exceptions.message503);
            }
        })

    }

    /*TO BE CHECKED - function to edit the state of an internal order, given its ID*/
    async editInternalOrder(id, body) {

        /*check if the user is authorized */
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager' && user.type !== 'customer' && user.type !== 'delivery employee')
            throw new Error(Exceptions.message401);

        /*check if the id is valid*/
        if (!id || isNaN(id))
            throw new Error(Exceptions.message422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM InternalOrder WHERE ID= ${id};`)
            .then((value) => row = value[0])
            .catch((error) => { throw new Error(Exceptions.message503); });

        /*check if the internal order exists*/
        if (!row)
            throw new Error(Exceptions.message404)

        const newState = body["newState"];

        /*check if the body is valid */
        if (!newState)
            throw new Error(Exceptions.message422);

        if (newState === "COMPLETED") {
            const products = body["products"];

            if (!products)
                throw new Error(Exceptions.message422);

            /*TO BE CHECKED*/
            products.forEach((elem) => {
                const sqlInsert = `INSERT INTO SKUItemsPerInternalOrder (id, SKUID, RFID) VALUES (${id}, ${elem.SKUId}, ${elem.rfid});`;
                try {
                    const internalOrder = await this.#dbManager.genericSqlRun(sqlInsert);
                } catch (error) {
                    new Error(Exceptions.message503);
                }
            })

        }
        else {
            const sqlInstruction = `UPDATE InternalOrder SET state= "${newState}" WHERE ID= ${id}`;
            try {
                await this.#dbManager.genericSqlRun(sqlInstruction);
            } catch (error) {
                new Error(Exceptions.message503);
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
            (`DELETE FROM InternalOrder WHERE ID= ${id};`)
            .catch((error) => { throw new Error(Exceptions.message503) });
    }

}

module.exports = InternalOrderController;