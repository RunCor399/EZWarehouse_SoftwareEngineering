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

    /*TO BE CHECKED - getter function to retreive all the restock orders*/
    async getAllRestockOrders() {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager", "clerk", "qualityEmployee"))
            throw new Exceptions(401)

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM RestockOrder;")
            .then(value => rows = value)
            .catch(error => { throw error });


        /*TO BE CHECKED*/
        rows.forEach(async (r) => {
            r.products = [];
            r.skuItems = [];
            if (r.state !== 'DELIVERY' || r.state !== 'ISSUED') {
                await this.#dbManager.genericSqlGet(`SELECT * FROM SKUPerRestockOrder WHERE id = ?;`, r.id)
                    .then(value => r.products.forEach(value => {
                        r.products = [...r.products, value];
                    }))
                    .catch(error => { throw error });

                await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItemsPerRestockOrder WHERE id = ?;`, r.id)
                    .then(value => r.skuItems.forEach(value => {
                        r.skuItems = [...r.skuItems, value];
                    }))
                    .catch(error => { throw error });
            }

            if (r.state !== 'ISSUED') {
                let ship;
                await this.#dbManager.genericSqlGet(`SELECT shipmentDate FROM RestockOrder WHERE ID=?;`, id)
                    .then(value => ship = JSON.stringify(value[0]))
                    .catch(error => { throw error });
                r.transportNote = ship;
            }
        })

        return rows;
    }

    /*TO BE CHECKED - getter function to retreive all the issued restock orders*/
    async getIssuedRestockOrders() {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager", "supplier"))
            throw new Exceptions(401)

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM RestockOrder WHERE state = 'ISSUED';")
            .then(value => rows = value)
            .catch(error => { throw error });

        /*TO BE CHECKED*/
        rows.forEach(async (r) => {
            r.products = [];
            r.skuItems = [];
            await this.#dbManager.genericSqlGet(`SELECT * FROM SKUPerRestockOrder WHERE id = ?;`, r.id)
                .then(value => r.products.forEach(value => {
                    r.products = [...r.products, value];
                }))
                .catch(error => { throw error });

            await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItemsPerRestockOrder WHERE id = ?;`, r.id)
                .then(value => r.skuItems.forEach(value => {
                    r.skuItems = [...r.skuItems, value];
                }))
                .catch(error => { throw error });
        });

        return rows;
    }

    /*TO BE CHECKED - getter function to retreive a single restock order, given its ID*/
    async getRestockOrder(id) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

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

        let ship;
        await this.#dbManager.genericSqlGet(`SELECT shipmentDate FROM RestockOrder WHERE id=?;`, id)
            .then(value => ship = JSON.stringify(value[0]))
            .catch(error => { throw error });
        row.transportNote = ship;

        /*TO BE CHECKED*/
        row.products = [];
        row.skuItems = [];
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKUPerRestockOrder WHERE id = ?;`, row.id)
            .then(value => row.products.forEach(value => {
                row.products = [...row.products, value];
            }))
            .catch(error => { throw error });

        await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItemsPerRestockOrder WHERE id = ?;`, row.id)
            .then(value => row.skuItems.forEach(value => {
                row.skuItems = [...row.skuItems, value];
            }))
            .catch(error => { throw error });

        return row;
    }

    /*TO BE CHECKED - function to retreive the sku items to be returned of a restock order*/
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

        let itemsArray = [];
        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE id=?;`, id)
            .then(value => row = value[0])
            .catch(error => { throw error });

        /*check if the restock order exists*/
        if (!row)
            throw new Exceptions(404)

        /*check if the id is valid*/
        if (!id || isNaN(Number(id)))
            throw new Exceptions(422);

        /*check if the state of the restock order is COMPLETEDRETURN */
        if (row.state !== 'COMPLETEDRETURN')
            throw new Exceptions(422)

        /*TO BE CHECKED */
        let skuitems;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItemsPerRestockOrder WHERE id = ?;`, id)
            .then(values => skuitems = values)
            .catch(error => { throw error });

        let skus;
        await this.#dbManager.genericSqlGet(`SELECT SKUId FROM SKUPerRestockOrder WHERE id = ?;`, id)
            .then(values => skus = values)
            .catch(error => { throw error });

        skuitems.forEach(async (sk) => {
            let res;
            await this.#dbManager.genericSqlGet(`SELECT Result FROM TestResult WHERE RFID = ?;`, sk.RFID)
                .then((res) => {
                    if (res === false) {
                        itemsArray = [...itemsArray, { "SKUId": sk.SKUID, "rfid": sk.RFID }]
                    }
                })
                .catch(error => { throw error });
        })

        return itemsArray;
    }

    /*TO BE CHECKED - creation of a restock order*/
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

        const params1 = [id, issueDate, supplierId];
        const sqlInstruction = `INSERT INTO RestockOrder ( id, issueDate, state, shipmentDate, supplierId) 
        VALUES (?, ?, "ISSUED", '', ?);`;

        await this.#dbManager.genericSqlRun(sqlInstruction, params1)
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

    /*COMPLETED - function to edit a state of a restock order, given its ID*/
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

    /*TO BE CHECKED - function to add a list of sku items to a restock order*/
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
            .catch (error => {throw error});
            })
        }

    

    /*TO BE CHECKED - function to add a transport note to a restock order, given its ID*/
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
            throw new Error(Exceptions.message422);

        const sqlInstruction = `UPDATE RestockOrder SET shipmentDate = ? WHERE id = ?;`;
            await this.#dbManager.genericSqlRun(sqlInstruction, transportNote, id)
            .catch (error => {throw error})
    }

    /*COMPLETED - delete function to remove a restock order from the table, given its ID*/
    async deleteRestockOrder(id) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

        /*check if the id is valid*/
        if (!id || isNaN(Number(id)))
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun(`DELETE FROM RestockOrder WHERE ID=?;`, id)
            .catch((error) => { throw error });

        /*
        const sqlInstruction = `DELETE FROM RestockOrder WHERE ID= ${id};`;
        try {
            const restockOrder = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return restockOrder;
        */
    }
}

module.exports = RestockOrderController;