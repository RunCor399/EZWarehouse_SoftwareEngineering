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


    /**TO BE CHECKED - getter function to retreive all the internal orders
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error).
    */
    async getAllInternalOrders() {

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        let rows = await this.#dbManager.genericSqlGet("SELECT * FROM InternalOrder;")
            .catch((error) => { throw error });


        for (let i = 0; i < rows.length; i++) {
            rows[i].products = await this.getProductsForInternalOrder(rows[i].id)
                .catch(error => { throw error })
        }

        return rows;

    }

    async getProductsForInternalOrder(id) {
        let products = await this.#dbManager.genericSqlGet(
            `SELECT SKUId, description, price, qty
            FROM SKUPerInternalOrder WHERE id = ?;`, id)
            .catch(error => { throw error });
        return products;
    }

    /**TO BE CHECKED - getter function to retreive all the issued internal orders
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error).
    */
    async getIssuedInternalOrders() {

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager", "customer"))
            throw new Exceptions(401);

        let rows = await this.#dbManager.genericSqlGet("SELECT * FROM InternalOrder WHERE state = 'ISSUED';")
            .catch((error) => { throw error });

        for (let i = 0; i < rows.length; i++) {
            rows[i].products = await this.getProductsForInternalOrder(rows[i].id)
                .catch(error => { throw error })
        }
        return rows;

    }

    /**TO BE CHECKED - getter function to retreive all the accepted internal orders
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error).
    */
    async getAcceptedInternalOrders() {

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager", "deliveryEmployee"))
            throw new Exceptions(401);
        let rows =  await this.#dbManager.genericSqlGet("SELECT * FROM InternalOrder WHERE state = 'ACCEPTED';")
            .catch((error) => { throw error });

        for (let i = 0; i < rows.length; i++) {
            rows[i].products = await this.getProductsForInternalOrder(rows[i].id)
                .catch(error => { throw error })
        }

        return rows;
    }

    /**TO BE CHECKED - getter function to retreive a single internal order, given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no internal order associated to id)
     * @throws 422 Unprocessable Entity (validation of id failed)
     * @throws 500 Internal Server Error (generic error).
    */
    async getInternalOrder(id) {

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager", "deliveryEmployee"))
            throw new Exceptions(401);

        /*check if the id is valid*/
        if (!id || isNaN(Number(id)) || !this.#controller.areAllPositive(id))
            throw new Exceptions(422);


        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM InternalOrder WHERE ID = ?;`, id)
            .then((value) => row = value[0])
            .catch((error) => { throw error });

        /*check if the internal order exists*/
        if (!row)
            throw new Exceptions(404);

            row.products = await this.getProductsForInternalOrder(row.id)
            .catch(error => { throw error })


        return row;

    }

    /**TO BE CHECKED - creation of a new internal order
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 422 Unprocessable Entity (validation of request body failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async createInternalOrder(body) {

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager", "customer"))
            throw new Exceptions(401);

        const issueDate = body["issueDate"];
        const products = body["products"];
        const customerId = body["customerId"]

        /*check if the body is valid */
        if (this.#controller.areUndefined(issueDate, products, customerId)
            || isNaN(Number(customerId))
            || !this.#controller.areAllPositive(customerId))
            throw new Exceptions(422);


        let id;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM InternalOrder')
            .then(value => id = value[0]["COUNT(*)"])
            .catch(error => { throw new Exceptions(503) });

        await this.#dbManager
            .genericSqlRun(`INSERT INTO InternalOrder (id, issueDate, state, customerId) VALUES (?, ?, "ISSUED", ?);`,
                id + 1, issueDate, customerId)
            .catch(error => { throw new Exceptions(503) })

        const sqlInsert = `INSERT INTO SKUPerInternalOrder (id, SKUId, description, price, qty) VALUES (?, ?, ?, ?, ?);`;
        for (let i = 0; i < products.length; i++) {
            await this.#dbManager.genericSqlRun(sqlInsert, id + 1, products[i].SKUId, products[i].description, products[i].price, products[i].qty)
                .catch(error => { throw new Exceptions(503) })
        }


    }

    /**TO BE CHECKED - function to edit the state of an internal order, given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no internal order associated to id)
     * @throws 422 Unprocessable Entity (validation of request body or of id failed)
     * @throws 503 Service Unavailable (generic error).
     */
    async editInternalOrder(id, body) {

        const newState = body["newState"];

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager", "customer", "deliveryEmployee"))
            throw new Exceptions(401);

        /*check if the id is valid*/
        if (this.#controller.areUndefined(id, newState)
            || isNaN(Number(id))
            || !this.#controller.areAllPositive(id))
            throw new Exceptions(422);

        if (!this.#controller.checkStateInternalOrders(newState))
            throw new Exceptions(422);

        /*check if the internal order exists*/
        await this.getInternalOrder(id)
            .catch(error => { throw error });

        if (newState === "COMPLETED") {

            const products = body["products"];
            if (!products)
                throw new Exceptions(422);

            const sqlInsert = `INSERT INTO SKUItemsPerInternalOrder (id, SKUID, RFID) VALUES (?, ?, ?);`;
            for (let i = 0; i < products.length; i++) {
                await this.#dbManager.genericSqlRun(sqlInsert, id, products[i].SKUId, products[i].RFID)
                    .catch(error => { throw new Exceptions(503) });
            }

        }
        else {
            const sqlInstruction = `UPDATE InternalOrder SET state = ? WHERE ID = ?`;

            await this.#dbManager.genericSqlRun(sqlInstruction, newState, id)
                .catch(error => { throw new Exceptions(503) })
        }
    }


    /**COMPLETED - delete function to remove an internal order from the table, given its ID 
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 422 Unprocessable Entity (validation of id failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async deleteInternalOrder(id) {

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        /*check if the id is valid*/
        if (!id
            || isNaN(Number(id))
            || !this.#controller.areAllPositive(id))
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun(`DELETE FROM InternalOrder WHERE ID = ?;`, id)
            .catch((error) => { throw new Exceptions(503) });
    }

}

module.exports = InternalOrderController;