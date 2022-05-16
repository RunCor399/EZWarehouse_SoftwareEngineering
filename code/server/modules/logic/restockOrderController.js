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
        /*let rows;
        const sqlInstruction = "SELECT * FROM RestockOrder;";
        try {
            rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return rows;*/

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager", "clerk", "qualityEmployee"))
            throw new Exceptions(401)

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM RestockOrder;")
            .then(value => rows = value)
            .catch(error => { throw error });

        for (let i = 0; i < rows.length; i++) {
            if (rows[i].state !== 'DELIVERY' || rows[i].state !== 'ISSUED') {
                await this.getProductsPerOrder(rows[i].id)
                    .then(value => rows[i].products = value)
                    .catch(error => { throw error });

                await this.getSKUItemsPerOrder(rows[i].id)
                    .then(value => rows[i].skuItems = value)
                    .catch(error => { throw error });

            }
            if (rows[i].state !== 'ISSUED') {
                await this.getTransportNote(rows[i].id)
                    .then(value => rows[i].skuItems = value)
                    .catch(error => { throw error });
            }
        }


        /*TO BE CHECKED*/
        /*rows.forEach(async (r) => {
            r.products = [];
            r.skuItems = [];
            if (r.state !== 'DELIVERY' || r.state !== 'ISSUED') {

                await this.#dbManager.genericSqlGet(`SELECT * FROM SKUPerRestockOrder WHERE id = ${r.id};`)
                    .then(value => r.products.forEach(value => {
                        r.products = [...r.products, value];
                    }))
                    .catch(error => { throw new Error(Exceptions.message500) });

                await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItemsPerRestockOrder WHERE id = ${r.id};`)
                    .then(value => r.skuItems.forEach(value => {
                        r.skuItems = [...r.skuItems, value];
                    }))
                    .catch(error => { throw new Error(Exceptions.message500) });
            }

            if (r.state !== 'ISSUED') {
                let ship;
                await this.#dbManager.genericSqlGet(`SELECT shipmentDate FROM RestockOrder WHERE ID="${id};`)
                    .then(value => ship = JSON.stringify(value[0]))
                    .catch(error => { throw new Error(Exceptions.message503) });
                r.transportNote = ship;
            }
        })*/

        return rows;
    }

    async getProductsForOrders(id) {
        let products;
        await this.#dbManager.genericSqlGet(`SELECT SKUId, description, price, qty FROM SKUPerRestockOrder WHERE id = ?;`, id)
            .then(value => products = value)
            .catch(error => { throw error });
        return products;
    }

    async getTransportNote(id) {
        let transportNote;

        await this.#dbManager.genericSqlGet(`SELECT shipmentDate FROM RestockOrder WHERE id = ?;`, rows[i].id)
            .then(value => transportNote = value)
            .catch(error => { throw error });

        return transportNote;
    }

    async getSKUItemsForOrders(id) {
        let skuItems;
        await this.#dbManager.genericSqlGet(`SELECT SKUId, RFID FROM SKUItemsPerRestockOrder WHERE id = ?;`, rows[i].id)
            .then(value => skuItems = value)
            .catch(error => { throw error });
        return skuItems;
    }

    async getFailedTests(rfid) {
        let tests;
        await this.#dbManager.genericSqlGet(`SELECT Result FROM TestResult WHERE RFID = ?;`, rfid)
            .then((res) => {
                if (res === false) {
                    tests = [...tests, { "SKUId": rows[i].SKUId, "rfid": rows[i].RFID }]
                }
            })
            .catch(error => { throw error });

        return tests;
    }

    /**TO BE CHECKED - getter function to retreive all the issued restock orders
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error).
    */
     async getIssuedRestockOrders() {
        /*let rows;
        const sqlInstruction = "SELECT * FROM RestockOrder WHERE state = 'ISSUED';";
        try {
            rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return rows;*/

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager", "supplier"))
            throw new Exceptions(401)

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM RestockOrder WHERE state = 'ISSUED';")
            .then(value => rows = value)
            .catch(error => { throw error });

        for (let i = 0; i < rows.length; i++) {
            await this.getProductsPerOrder(rows[i].id)
                .then(value => rows[i].products = value)
                .catch(error => { throw error });

            await this.getSKUItemsPerOrder(rows[i].id)
                .then(value => rows[i].skuItems = value)
                .catch(error => { throw error });

        }


        /*TO BE CHECKED*/
        /*rows.forEach(async (r) => {
            r.products = [];
            r.skuItems = [];
            await this.#dbManager.genericSqlGet(`SELECT * FROM SKUPerRestockOrder WHERE id = ${r.id};`)
                .then(value => r.products.forEach(value => {
                    r.products = [...r.products, value];
                }))
                .catch(error => { throw new Error(Exceptions.message500) });
 
            await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItemsPerRestockOrder WHERE id = ${r.id};`)
                .then(value => r.skuItems.forEach(value => {
                    r.skuItems = [...r.skuItems, value];
                }))
                .catch(error => { throw new Error(Exceptions.message500) });
        });*/

        return rows;
    }

    /**TO BE CHECKED - getter function to retreive a single restock order, given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no restock order associated to id)
     * @throws 422 Unprocessable Entity (validation of id failed)
     * @throws 500 Internal Server Error (generic error).
    */
     async getRestockOrder(id) {
        /*let rows
        const sqlInstruction = `SELECT * FROM RestockOrder WHERE ID="${id};`;
        try {
            rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return restockOrder;*/

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

        /*check if the id is valid*/
        if (!id || isNaN(id))
            throw new Exceptions(422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE id="${id};`)
            .then(value => row = value[0])
            .catch(error => { throw error });

        /*check if the restock order exists*/
        if (!row)
            throw new Exceptions(404)

        if (row.state !== 'DELIVERY' || row.state !== 'ISSUED') {
            await this.getProductsPerOrder(row.id)
                .then(value => row.products = value)
                .catch(error => { throw error });

            await this.getSKUItemsPerOrder(row.id)
                .then(value => row.skuItems = value)
                .catch(error => { throw error });

        }
        if (row.state !== 'ISSUED') {
            await this.getTransportNote(row.id)
                .then(value => row.skuItems = value)
                .catch(error => { throw error });
        }

        /*TO BE CHECKED*/
        /*let ship;
        await this.#dbManager.genericSqlGet(`SELECT shipmentDate FROM RestockOrder WHERE id="${id};`)
            .then(value => ship = JSON.stringify(value[0]))
            .catch(error => { throw new Error(Exceptions.message503) });
        row.transportNote = ship;
 
        
        row.products = [];
        row.skuItems = [];
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKUPerRestockOrder WHERE id = ${row.id};`)
            .then(value => row.products.forEach(value => {
                row.products = [...row.products, value];
            }))
            .catch(error => { throw new Error(Exceptions.message500) });
 
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItemsPerRestockOrder WHERE id = ${row.id};`)
            .then(value => row.skuItems.forEach(value => {
                row.skuItems = [...row.skuItems, value];
            }))
            .catch(error => { throw new Error(Exceptions.message500) });
        */
        return row;
    }

    /**TO BE CHECKED - function to retreive the sku items to be returned of a restock order
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no restock order associated to id)
     * @throws 422 Unprocessable Entity (validation of id failed or restock order state != COMPLETEDRETURN)
     * @throws 500 Internal Server Error (generic error).
    */
     async getRestockOrderToBeReturned(id) {

        /* - get Restock Order with id
           - check if the state is COMPLETEDRETURN
           - get each SKUItem from SKUItemsPerRestockOrder: SKUITEMID = (SELECT SKUItemID FROM SKUItemsPerRestockOrder WHERE orderID = ${id});
           - get result of an SKUItem from TestResult: 
           result = (SELECT result FROM TestResult WHERE SKUItemID = ${SKUITEMID});
           - if result of SKUItemID is false, create a JSON object with SKUID and RFID from SKUItem
*/
        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE id="${id};`)
            .then(value => row = value[0])
            .catch(error => { throw error });

        /*check if the restock order exists*/
        if (!row)
            throw new Exceptions(404)

        /*check if the id is valid*/
        if (!id || isNaN(id))
            throw new Exceptions(422);

        /*check if the state of the restock order is COMPLETEDRETURN */
        if (row.state !== 'COMPLETEDRETURN')
            throw new Exceptions(422)


        let skuItems;
        await this.getSKUItemsPerOrder(row.id)
            .then(value => skuItems = value)
            .catch(error => { throw error });

        for (let j = 0; j < skuItems.length; j++) {
            await this.getFailedTests(skuItems[j].RFID)
                .then(value => row.skuItems = value)
                .catch(error => { throw error });

        }
        return row.skuItems;

        /*TO BE CHECKED */
        /*let skuitems;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItemsPerRestockOrder WHERE id = ${id};`)
            .then(values => skuitems = values)
            .catch(error => { throw error });
 
        let skus;
        await this.#dbManager.genericSqlGet(`SELECT SKUId FROM SKUPerRestockOrder WHERE id = ${id}`)
            .then(values => skus = values)
            .catch(error => { throw error });
 
        skuitems.forEach(async (sk) => {
            let res;
            await this.#dbManager.genericSqlGet(`SELECT Result FROM TestResult WHERE RFID = ${sk.RFID};`)
                .then((res) => {
                    if (res === false) {
                        itemsArray = [...itemsArray, { "SKUId": sk.SKUID, "rfid": sk.RFID }]
                    }
                })
                .catch(error => { throw error });
        })
 
        return itemsArray;
        */
    }

    /**TO BE CHECKED - creation of a restock order
     * @throws  401 Unauthorized (not logged in or wrong permissions), 422 Unprocessable Entity (validation of request body failed), 503 Service Unavailable (generic error).
    */
    async createRestockOrder(body) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager", "supplier"))
            throw new Exceptions(401)

        const issueDate = body["issueDate"];
        const products = body["products"];
        const supplierId = body["supplierId"]

        /*check if the body is valid*/
        if (this.#controller.areUndefined(issueDate, products, supplierId), isNaN(Number(supplierId)))
            throw new Exceptions(422);

        let id;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM RestockOrder')
            .then(value => id = value[0]["COUNT(*)"])
            .catch(error => { throw error });

        const sqlInstruction = `INSERT INTO RestockOrder ( id, issueDate, state, shipmentDate, supplierId) 
        VALUES (?, ?, "ISSUED", '', ?);`;

        await this.#dbManager.genericSqlRun(sqlInstruction, issueDate, supplierId)
            .catch(error => { throw error });

        /*TO BE CHECKED*/
        products.forEach(async (elem) => {
            const sqlInsert = `INSERT INTO SKUPerRestockOrder (id, SKUid, description, price, qty) VALUES (?,?,?,?,?);`;

            await this.#dbManager.genericSqlRun(sqlInsert, id + 1, elem.SKUId, elem.description, elem.price, elem.qty)
                .catch(error => {
                    throw error;
                })

        })
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

        const newState = body["newState"];

        /*check if the body is valid*/
        if (!newState)
            throw new Exceptions(422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE id=?;`, id)
            .then(value => row = value[0])
            .catch(error => { throw error });

        /*check if the restock order exists*/
        if (!row)
            throw new Exceptions(404);

        await this.#dbManager.genericSqlRun(`UPDATE RestockOrder SET state = ? WHERE id=?;`, newState, id)
            .catch(error => { throw error; });

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
            .catch(error => { throw error });

        /*check if the restock order exists*/
        if (!row)
            throw new Exceptions(404);

        /*check if the state of the restock order is DELIVERED*/
        if (row.state !== 'DELIVERED')
            throw new Exceptions(422)

        /*TO BE CHECKED - loop of the products to be added into SKUItemsPerRestockOrder*/
        skuItems.forEach(async (elem) => {
            await this.#dbManager.genericSqlRun(`INSERT INTO SKUItemsPerRestockOrder (id, SKUID, RFID) VALUES (?,?,?);`,
                id, elem.SKUId, elem.rfi)
                .catch(error => { throw error });
        })
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
        if (!id || isNaN(Number(id)))
            throw new Exceptions(422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE id=?;`, id)
            .then(value => row = value[0])
            .catch(error => { throw error });

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
            .catch(error => { throw error })
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
        if (!id || isNaN(Number(id)))
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun(`DELETE FROM RestockOrder WHERE ID=?;`, id)
            .catch((error) => { throw new Exceptions(503) });

    }
}

module.exports = RestockOrderController;