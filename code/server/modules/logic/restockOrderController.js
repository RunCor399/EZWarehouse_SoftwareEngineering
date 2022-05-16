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

    /** TO BE CHECKED - getter function to retreive all the restock orders
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error). 
    */
    async getAllRestockOrders() {
        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager", "clerk", "qualityEmployee"))
            throw new Exceptions(401)

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM RestockOrder;")
            .then(value => rows = value)
            .catch((error) => { throw new Exceptions(500) });

        for (let i = 0; i < rows.length; i++) {
            if (rows[i].state !== 'ISSUED' && rows[i].state !== 'DELIVERY') {
                await this.getProductsPerOrder(rows[i].id)
                    .then(value => rows[i].products = value)
                    .catch((error) => { throw new Exceptions(500) });

                await this.getSKUItemsPerOrder(rows[i].id)
                    .then(value => rows[i].skuItems = value)
                    .catch((error) => { throw new Exceptions(500) });

            }
            if (rows[i].state !== 'ISSUED') {
                await this.getTransportNote(rows[i].id)
                    .then(value => rows[i].skuItems = value)
                    .catch((error) => { throw new Exceptions(500) });
            }
        }

        return rows;
    }

    /** @throws 500 */
    async getProductsForOrders(id) {
        let products;
        await this.#dbManager.genericSqlGet(`SELECT SKUId, description, price, qty FROM SKUPerRestockOrder WHERE id = ?;`, id)
            .then(value => products = value)
            .catch((error) => { throw error });
        return products;
    }

    /** @throws 500 */
    async getTransportNote(id) {
        let transportNote;

        await this.#dbManager.genericSqlGet(`SELECT shipmentDate FROM RestockOrder WHERE id = ?;`, id)
            .then(value => transportNote = value[0])
            .catch((error) => { throw error });

        return transportNote;
    }

    /** @throws 500 */
    async getSKUItemsForOrders(id) {
        let skuItems;
        await this.#dbManager.genericSqlGet(`SELECT SKUId, RFID FROM SKUItemsPerRestockOrder WHERE id = ?;`, id)
            .then(value => skuItems = value)
            .catch((error) => { throw error });
        return skuItems;
    }

    /**TO BE CHECKED - getter function to retreive all the issued restock orders
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error).
    */
    async getIssuedRestockOrders() {


        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager", "supplier"))
            throw new Exceptions(401)

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM RestockOrder WHERE state = 'ISSUED';")
            .then(value => rows = value)
            .catch((error) => { throw error });

        for (let i = 0; i < rows.length; i++) {
            await this.getProductsForOrders(rows[i].id)
                .then(value => rows[i].products = value)
                .catch((error) => { throw error });

            await this.getSKUItemsForOrders(rows[i].id)
                .then(value => rows[i].skuItems = value)
                .catch((error) => { throw error });

        }

        return rows;
    }

    /**TO BE CHECKED - getter function to retreive a single restock order, given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no restock order associated to id)
     * @throws 422 Unprocessable Entity (validation of id failed)
     * @throws 500 Internal Server Error (generic error).
    */
    async getRestockOrder(id) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

        /*check if the id is valid*/
        if (!id || isNaN(Number(id))
            || !this.#controller.areAllPositive(id))
            throw new Exceptions(422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE id=?;`, id)
            .then(value => row = value[0])
            .catch((error) => { throw error });

        /*check if the restock order exists*/
        if (!row)
            throw new Exceptions(404)

        if (row.state !== 'DELIVERY' && row.state !== 'ISSUED') {
            await this.getProductsForOrders(row.id)
                .then(value => row.products = value)
                .catch((error) => { throw error });

            await this.getSKUItemsForOrder(row.id)
                .then(value => row.skuItems = value)
                .catch((error) => { throw error });

        }
        if (row.state !== 'ISSUED') {
            await this.getTransportNote(row.id)
                .then(value => row.skuItems = value)
                .catch((error) => { throw error });
        }


        return row;
    }

    /**TO BE CHECKED - function to retreive the sku items to be returned of a restock order
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no restock order associated to id)
     * @throws 422 Unprocessable Entity (validation of id failed or restock order state != COMPLETEDRETURN)
     * @throws 500 Internal Server Error (generic error).
    */
    async getRestockOrderToBeReturned(id) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE id=?;`, id)
            .then(value => row = value[0])
            .catch((error) => { throw error });

        /*check if the restock order exists*/
        if (!row)
            throw new Exceptions(404)

        /*check if the id is valid*/
        if (!id || isNaN(Number(id))
            || !this.#controller.areAllPositive(id))
            throw new Exceptions(422);

        /*check if the state of the restock order is COMPLETEDRETURN */
        if (row.state !== 'COMPLETEDRETURN')
            throw new Exceptions(422)

        let failedProducts;
        let failedProductsToReturn = []
        await this.#dbManager.genericSqlGet('SELECT Distinct RFID FROM TestResult WHERE Result = false')
            .then(value => failedProducts = value);

        for (let j = 0; j < skuItems.length; j++) {
            if (failedProducts.includes(skuItems[i].rfid))
                failedProductsToReturn = [...failedProductsToReturn, skuItems[i]];
            return failedProductsToReturn;

        }
    }

    /**TO BE CHECKED - creation of a restock order
     * @throws  401 Unauthorized (not logged in or wrong permissions)
     * @throws 422 Unprocessable Entity (validation of request body failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async createRestockOrder(body) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager", "supplier"))
            throw new Exceptions(401)

        const issueDate = body["issueDate"];
        const products = body["products"];
        const supplierId = body["supplierId"]

        /*check if the body is valid*/
        if (this.#controller.areUndefined(issueDate, products, supplierId)
            || isNaN(Number(supplierId))
            || !this.#controller.areAllPositive(supplierId))
            throw new Exceptions(422);

        let id;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM RestockOrder')
            .then(value => id = value[0]["COUNT(*)"])
            .catch((error) => { throw new Exceptions(503) });

        const sqlInstruction = `INSERT INTO RestockOrder ( id, issueDate, state, shipmentDate, supplierId) 
        VALUES (?, ?, "ISSUED", '', ?);`;

        await this.#dbManager.genericSqlRun(sqlInstruction, issueDate, supplierId)
            .catch((error) => { throw new Exceptions(503) });

        const sqlInsert = `INSERT INTO SKUPerRestockOrder (id, SKUid, description, price, qty) VALUES (?,?,?,?,?);`
        for (let i = 0; i < products.length; i++) {
            await this.#dbManager.genericSqlRun(sqlInsert, id + 1, products[i].SKUId, products[i].description, products[i].price, products[i].qty)
                .catch((error) => { throw new Exceptions(503) })
        }

    }

    /**COMPLETED - function to edit a state of a restock order, given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no restock order associated to id)
     * @throws 422 Unprocessable Entity (validation of request body or of id failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async editRestockOrder(id, body) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager", "clerk"))
            throw new Exceptions(401)

        const newState = body["newState"]

        /*check if the body is valid*/
        if (!newState || !this.#controller.checkStateRestockOrders(newState))
            throw new Exceptions(422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE id=?;`, id)
            .then(value => row = value[0])
            .catch((error) => { throw new Exceptions(503) });

        /*check if the restock order exists*/
        if (!row)
            throw new Exceptions(404);

        await this.#dbManager.genericSqlRun(`UPDATE RestockOrder SET state = ? WHERE id=?;`, newState, id)
            .catch((error) => { throw new Exceptions(503) });

    }

    /**TO BE CHECKED - function to add a list of sku items to a restock order 
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no restock order associated to id)
     * @throws 422 Unprocessable Entity (validation of request body or of id failed or order state != DELIVERED)
     * @throws 503 Service Unavailable (generic error).
    */
    async addSkuItemsToRestockOrder(id, body) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager", "clerk"))
            throw new Exceptions(401)

        const skuItems = body["skuItems"];

        /*check if the body is valid*/
        if (!skuItems)
            throw new Exceptions(422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE id=?;`, id)
            .then(value => row = value[0])
            .catch((error) => { throw new Exceptions(503) });

        /*check if the restock order exists*/
        if (!row)
            throw new Exceptions(404);

        /*check if the state of the restock order is DELIVERED*/
        if (row.state !== 'DELIVERED')
            throw new Exceptions(422)

        const sqlInsert = `INSERT INTO SKUItemsPerRestockOrder (id, SKUID, RFID) VALUES (?,?,?);`
        for (let i = 0; i < skuItems.length; i++) {
            await this.#dbManager.genericSqlRun(sqlInsert, id, skuItems[i].SKUId, skuItems[i].RFID)
                .catch((error) => { throw new Exceptions(503) })
        }

    }

    /**TO BE CHECKED - function to add a transport note to a restock order, given its ID
     *@throws  401 Unauthorized (not logged in or wrong permissions)
     @throws 404 Not Found (no restock order associated to id)
     @throws 422 Unprocessable Entity (validation of request body or of id failed or order state != DELIVERY or deliveryDate is before issueDate)
     @throws 503 Service Unavailable (generic error).
    */
    async addTransportNote(id, body) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager", "supplier"))
            throw new Exceptions(401)

        /*check if the body is valid */
        const transportNote = body["transportNote"];
        if (!transportNote)
            throw new Exceptions(422);

        /*check if the id is valid*/
        if (!id || isNaN(Number(id))
            || !this.#controller.areAllPositive(id))
            throw new Exceptions(422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE id=?;`, id)
            .then(value => row = value[0])
            .catch((error) => { throw new Exceptions(503) });

        /*check if the restock order exists*/
        if (!row)
            throw new Exceptions(404)

        /*check if the state of the restock order is DELIVERY*/
        if (row.state !== 'DELIVERY')
            throw new Exceptions(422)

        /*check if the deliveryDate is before the issueDate */
        if (transportNote.deliveryDate <= row.issueDate)
            throw new Exceptions(422);

        const sqlInstruction = `UPDATE RestockOrder SET shipmentDate = ? WHERE id = ?;`;
        await this.#dbManager.genericSqlRun(sqlInstruction, transportNote, id)
            .catch((error) => { throw new Exceptions(503) })
    }

    /** COMPLETED - delete function to remove a restock order from the table, given its ID
    * @throws 401 Unauthorized (not logged in or wrong permissions)
    * @throws 422 Unprocessable Entity (validation of id failed)
    * @throws 503 Service Unavailable (generic error).
    */
    async deleteRestockOrder(id) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

        /*check if the id is valid*/
        if (!id || isNaN(Number(id))
            || !this.#controller.areAllPositive(id))
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun(`DELETE FROM RestockOrder WHERE ID=?;`, id)
            .catch((error) => { throw new Exceptions(503) });

    }
}

module.exports = RestockOrderController;