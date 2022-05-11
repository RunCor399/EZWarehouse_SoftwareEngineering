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

    /**getter function to retreive all the restock orders*/
    async getAllRestockOrders() {
        /*let rows;
        const sqlInstruction = "SELECT * FROM RestockOrder;";
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
        if (user.type !== 'manager' && user.type !== 'clerk' && user.type !== 'quality employee')
            throw new Error(Exceptions.message401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM RestockOrder;")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        /*should you also put the SKUPerRestockOrder and the SKUItemsPerRestockOrder outputs?*/

        return rows;
    }

    /**getter function to retreive all the issued restock orders*/
    async getIssuedRestockOrders() {
        /*let rows;
        const sqlInstruction = "SELECT * FROM RestockOrder WHERE state = 'ISSUED';";
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
        if (user.type !== 'manager' && user.type !== 'supplier')
            throw new Error(Exceptions.message401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM RestockOrder WHERE state = 'ISSUED';")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;
    }

    /**getter function to retreive a single restock order, given its ID*/
    async getRestockOrder(id) {
        /*let rows
        const sqlInstruction = `SELECT * FROM RestockOrder WHERE ID="${id};`;
        try {
            rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return restockOrder;*/

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
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE ID="${id};`)
            .then(value => row = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });

        /*check if the restock order exists*/
        if (!row)
            throw new Error(Exceptions.message404)

        return row;
    }

    /*TO CHECK - it's most probably wrong, but it's still something*/
    async getRestockOrderToBeReturned(id) {

        /* - get Restock Order with id
           - check if the state is COMPLETEDRETURN
           - get each SKUItem from SKUItemsPerRestockOrder: SKUITEMID = (SELECT SKUItemID FROM SKUItemsPerRestockOrder WHERE orderID = ${id});
           - get result of an SKUItem from TestResult: 
           result = (SELECT result FROM TestResult WHERE SKUItemID = ${SKUITEMID});
           - if result of SKUItemID is false, create a JSON object with SKUID and RFID from SKUItem
*/
        /*check if the user is authorized */
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager')
            throw new Error(Exceptions.message401);

        var jsonObj = {};
        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE ID="${id};`)
            .then(value => row = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });

        /*check if the restock order exists*/
        if (!row)
            throw new Error(Exceptions.message404)

        /*check if the id is valid*/
        if (!id || isNaN(id))
            throw new Error(Exceptions.message422);

        /*check if the state of the restock order is COMPLETEDRETURN */
        if (row.state !== 'COMPLETEDRETURN')
            throw new Error(Exceptions.message422);

        /*TO BE CHECKED */
        let skuitems;
        await this.#dbManager.genericSqlGet(`SELECT RFID FROM SKUItemsPerRestockOrder WHERE id = ${id};`)
            .then(values => skuitems = values)
            .catch(error => { throw new Error(Exceptions.message500) });

        let skus;
        await this.#dbManager.genericSqlGet(`SELECT SKUId FROM SKUPerRestockOrder WHERE id = ${id}`)
            .then(values => skus = values)
            .catch(error => { throw new Error(Exceptions.message500) });

        skuitems.forEach((sk) => {
            let res;
            await this.#dbManager.genericSqlGet(`SELECT result FROM TestResult WHERE SKUItemID = ${sk.id};`)
                .then((res) => {
                    if (res === false) {
                        jsonObj.push({ SKUId: skus, rfid: sk })
                    }
                })
                .catch(error => { throw new Error(Exceptions.message500) });
        })

        return jsonObj;
    }

    /*TO BE COMPLETED */
    async createRestockOrder(body) {

        /*check if the user is authorized */
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager' && user.type !== 'supplier')
            throw new Error(Exceptions.message401);

        const sqlGetCount = 'SELECT COUNT(*) FROM RestockOrder'

        try {
            const id = await this.#dbManager.genericSqlGet(sqlGetCount);
        } catch (error) {
            new Error(Exceptions.message503);
        }

        const issueDate = body["issueDate"];
        const products = body["products"];
        const supplierId = body["supplierId"]

        /*check if the body is valid*/
        if (!issueDate || !products || !supplierId || isNaN(supplierId))
            throw new Error(Exceptions.message422);

        const sqlInstruction = `INSERT INTO RestockOrder (ID, supplierID, issueDate) VALUES (${id + 1},
             ${supplierId}, ${issueDate});`;
        try {
            const restockOrder = await this.#dbManager.genericSqlRun(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message503);
        }

        /*loop of the products to be added into SKUPerRestockOrder:
        for (sku, skuitem) of products:
         INSERT INTO SKUPerRestockOrder (orderID, SKUID, RFID) VALUES (${id}, ${sku}, ${skuitem});
        */
        products.forEach((elem) => {
            const sqlInsert = `INSERT INTO SKUPerRestockOrder (id, SKUId, qty) VALUES (${id}, ${elem.SKUId}, ${elem.qty});`;
            try {
                const restockOrder = await this.#dbManager.genericSqlRun(sqlInsert);
            } catch (error) {
                new Error(Exceptions.message503);
            }
        })
    }

    /**function to edit a state of a restock order, given its ID*/
    async editRestockOrder(id, body) {

        /*check if the user is authorized */
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager' && user.type !== 'clerk')
            throw new Error(Exceptions.message401);

        const newState = body["newState"];

        /*check if the body is valid*/
        if (!newState)
            throw new Error(Exceptions.message422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE ID="${id};`)
            .then(value => row = value[0])
            .catch(error => { throw new Error(Exceptions.message503) });

        /*check if the restock order exists*/
        if (!row)
            throw new Error(Exceptions.message404)

        const sqlInstruction = `UPDATE RestockOrder SET state = "${newState}" WHERE ID= ${id};`;
        try {
            const restockOrder = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message503);
        }

    }

    /*TO BE COMPLETED */
    async addSkuItemsToRestockOrder(id, body) {

        /*check if the user is authorized */
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager' && user.type !== 'clerk')
            throw new Error(Exceptions.message401);

        const skuItems = body["skuItems"];

        /*check if the body is valid*/
        if (!skuItems)
            throw new Error(Exceptions.message422);

        /*loop of the products to be added into SKUPerRestockOrder:
        for (sku, skuitem) of products:
         INSERT INTO SKUPerRestockOrder (orderID, SKUID, RFID) VALUES (${id}, ${sku}, ${skuitem});
        */

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE ID="${id};`)
            .then(value => row = value[0])
            .catch(error => { throw new Error(Exceptions.message503) });

        /*check if the restock order exists*/
        if (!row)
            throw new Error(Exceptions.message404)

        /*check if the state of the restock order is DELIVERED*/
        if (row.state !== 'DELIVERED')
            throw new Error(Exceptions.message422)

        /*TO BE COMPLETED (table changed) */
        skuItems.forEach((elem) => {
            const sqlInsert = `INSERT INTO SKUPerRestockOrder (orderID, SKUID, RFID) VALUES (${id}, ${elem.SKUId}, ${elem.rfid});`;
            try {
                const restockOrder = await this.#dbManager.genericSqlGet(sqlInsert);
            } catch (error) {
                new Error(Exceptions.message503);
            }
        })

    }

    /*TO BE COMPLETED*/
    async addTransportNote(id, body) {

        /*check if the user is authorized */
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager' && user.type !== 'supplier')
            throw new Error(Exceptions.message401);

        /*check if the body is valid */
        const transportNote = body["transportNote"];
        if (!transportNote)
            throw new Error(Exceptions.message422);

        /*check if the id is valid*/
        if (!id || isNaN(id))
            throw new Error(Exceptions.message422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE ID="${id};`)
            .then(value => row = value[0])
            .catch(error => { throw new Error(Exceptions.message503) });

        /*check if the restock order exists*/
        if (!row)
            throw new Error(Exceptions.message404)

        /*check if the state of the restock order is DELIVERY*/
        if (row.state !== 'DELIVERY')
            throw new Error(Exceptions.message422)

        /*add error: 422 Unprocessable Entity: deliveryDate is before issueDate (manipulated as strings?)*/
        /*in the table is a string, but the output must be a dictionary */

        return undefined;
    }

    /**delete function to remove a restock order from the table, given its ID*/
    async deleteRestockOrder(id) {

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
            (`DELETE FROM RestockOrder WHERE ID= ${id};`)
            .catch((error) => { throw new Error(Exceptions.message503) });

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