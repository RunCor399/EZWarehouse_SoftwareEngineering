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

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM RestockOrder;")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;
    }
    /*async getAllRestockOrders() {
    let rows;
    let i=0;
    await this.#dbManager.genericSqlGet("SELECT * FROM RestockOrder;")
        .then(value => rows = value)
        .catch(error => { throw new Error(Exceptions.message500) });
    for(i=0; i<rows.length; i++){
        rows[i].transportNote={deliveryDate:rows[i].shipmentDate};
        delete rows[i].shipmentDate;
        await this.#dbManager.genericSqlGet("SELECT ID as SKUId, description, price, qty FROM SKUPerRestockOrder JOIN SKU WHERE ID=orderID AND orderID="+rows[i].orderID+";")
            .then(value => rows[i].products=value)
            .catch(error => { throw new Error(Exceptions.message500) });
    }
    for(i=0; i<rows.length; i++){
        await this.#dbManager.genericSqlGet("SELECT SPR.SKUID as SKUId, SIPR.SKUItemID as rfid  FROM SKUPerRestockOrder SPR JOIN SKUItemPerRestockOrder SIPR WHERE SPR.orderID=SIPR.orderID AND SPR.orderID="+rows[i].orderID+";")
            .then(value => rows[i].skuItems=value)
            .catch(error => { throw new Error(Exceptions.message500) });
    }
    return rows;
}*/

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

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM RestockOrder WHERE state = 'ISSUED';")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;
    }
    /*
async getIssuedRestockOrders() {
    let rows;
    await this.#dbManager.genericSqlGet("SELECT * FROM RestockOrder WHERE state = 'ISSUED';")
        .then(value => rows = value)
        .catch(error => { throw new Error(Exceptions.message500) });
        for(i=0; i<rows.length; i++){
            rows[i].transportNote={deliveryDate:rows[i].shipmentDate};
            delete rows[i].shipmentDate;
            await this.#dbManager.genericSqlGet("SELECT ID as SKUId, description, price, qty FROM SKUPerRestockOrder JOIN SKU WHERE ID=orderID AND orderID="+rows.orderID+";")
                .then(value => rows[i].products=value)
                .catch(error => { throw new Error(Exceptions.message500) });
        }
        for(i=0; i<rows.length; i++){
            await this.#dbManager.genericSqlGet("SELECT SPR.SKUID as SKUId, SIPR.SKUItemID as rfid  FROM SKUPerRestockOrder SPR JOIN SKUItemPerRestockOrder SIPR WHERE SPR.orderID=SIPR.orderID AND SPR.orderID="+row.orderID+";")
                .then(value => rows[i].skuItems=value)
                .catch(error => { throw new Error(Exceptions.message500) });
        }
    return rows;
}
*/

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

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE ID="${id};`)
            .then(value => row = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });
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

        var jsonObj = {};
        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE ID="${id};`)
            .then(value => row = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });

        if (row.state === 'COMPLETEDRETURN') {
            let skuitems;
            await this.#dbManager.genericSqlGet(`SELECT RFID FROM SKUItemsPerRestockOrder WHERE orderID = ${id};`)
                .then(values => skuitems = values)
                .catch(error => { throw new Error(Exceptions.message500) });

            let skus;
            await this.#dbManager.genericSqlGet(`SELECT SKUID FROM SKUItemsPerRestockOrder WHERE orderID = ${id} AND RFID = ${skuitems};`)
                .then(values => skus = values)
                .catch(error => { throw new Error(Exceptions.message500) });

            skuitems.forEach(async (sk) => {

                let res;
                await this.#dbManager.genericSqlGet(`SELECT result FROM TestResult WHERE SKUItemID = ${sk.id};`)
                    .then((res) => {
                        if (res === false) {
                            jsonObj.push({ SKUId: skus, rfid: sk })
                        }
                    })
                    .catch(error => { throw new Error(Exceptions.message500) });
            })
        }

        return jsonObj;
    }

    /*TO BE COMPLETED - CHECK IF A TABLE BETWEEN SKUItemsPerRestockOrder AND SKUPerRestockOrder CAN BE DELETED*/
    async createRestockOrder(body) {

        const sqlGetCount = 'SELECT COUNT(*) FROM RestockOrder'

        try {
            const id = await this.#dbManager.genericSqlGet(sqlGetCount);
        } catch (error) {
            new Error(Exceptions.message500);
        }

        const issueDate = body["issueDate"];
        const products = body["products"];
        const supplierId = body["supplierId"]

        if (!issueDate || !products || !supplierId)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `INSERT INTO RestockOrder (ID, supplierID, issueDate) VALUES (${id + 1},
             ${supplierId}, ${issueDate});`;
        try {
            const restockOrder = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }

        /*loop of the products to be added into SKUPerRestockOrder:
        for (sku, skuitem) of products:
         INSERT INTO SKUPerRestockOrder (orderID, SKUID, RFID) VALUES (${id}, ${sku}, ${skuitem});
        */
        products.forEach(async (elem) => {
            const sqlInsert = `INSERT INTO SKUPerRestockOrder (orderID, SKUID, RFID) VALUES (${id}, ${elem.SKUId}, ${elem.rfid});`;
            try {
                await this.#dbManager.genericSqlRun(sqlInsert);
            } catch (error) {
                new Error(Exceptions.message500);
            }
        })
    }

    /**function to edit a state of a restock order, given its ID*/
    async editRestockOrder(id, body) {

        const newState = body["newState"];

        if (!newState)
            throw new Error(Exceptions.message422);


        const sqlInstruction = `UPDATE RestockOrder SET state = "${newState}" WHERE ID= ${id};`;
        try {
            await this.#dbManager.genericSqlRun(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }

    }

    /*TODO */
    async addSkuItemsToRestockOrder(id, body) {

        const skuItems = body["skuItems"];

        if (!skuItems)
            throw new Error(Exceptions.message422);

        /*loop of the products to be added into SKUPerRestockOrder:
        for (sku, skuitem) of products:
         INSERT INTO SKUPerRestockOrder (orderID, SKUID, RFID) VALUES (${id}, ${sku}, ${skuitem});

        */
        skuItems.forEach(async (elem) => {
            const sqlInsert = `INSERT INTO SKUPerRestockOrder (orderID, SKUID, RFID) VALUES (${id}, ${elem.SKUId}, ${elem.rfid});`;
            try {
                await this.#dbManager.genericSqlRun(sqlInsert);
            } catch (error) {
                new Error(Exceptions.message500);
            }
        })

    }

    /**Transport Note is missing in the DB */
    async addTransportNote(id, body) {

        const transportNote = body["transportNote"];
        if (!transportNote)
            throw new Error(Exceptions.message422);
        return undefined;
    }

    /**delete function to remove a restock order from the table, given its ID*/
    async deleteRestockOrder(id) {
        const sqlInstruction = `DELETE FROM RestockOrder WHERE ID= ${id};`;
        try {
            await this.#dbManager.genericSqlRun(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return restockOrder;
    }
}

module.exports = RestockOrderController;
