'use strict'


class RestockOrderController {
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();
        console.log("restockOrderController started");
    }

  


    /*getter function to retreive all the restock orders*/
    getAllRestockOrders() {
        const sqlInstruction = "SELECT * FROM RestockOrder;";
        try {
            const rows = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*getter function to retreive all the issued restock orders*/
    getIssuedRestockOrders() {
        const sqlInstruction = "SELECT * FROM RestockOrder WHERE state = 'ISSUED';";
        try {
            const rows = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*getter function to retreive a single restock order, given its ID*/
    getRestockOrder(id) {
        const sqlInstruction = `SELECT * FROM RestockOrder WHERE ID="${id};`;
        try {
            const restockOrder = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return restockOrder;
    }

    /*TODO */
    getRestockOrderToBeReturned(id) {
        return undefined;
    }

    /*TO BE COMPLETED*/
    createRestockOrder(body) {

        const sqlGetCount = 'SELECT COUNT(*) FROM RestockOrder'

        try {
            const id = this.#dbManager.genericSqlGet(sqlGetCount);
        } catch (error) {
            console.log("error");
        }

        const issueDate = body["issueDate"];
        const products = body["products"];
        const supplierId = body["supplierId"]

        if (issueDate === undefined || products === undefined || supplierId === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `INSERT INTO RestockOrder (ID, supplierID, issueDate) VALUES (${id + 1}, ${supplierId}, ${issueDate});`;
        try {
            const restockOrder = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }

        /*products to be added into ItemsPerOrder*/

        return restockOrder;
    }

    /*function to edit a state of a restock order, given its ID*/
    editRestockOrder(id, body) {

        const newState = body["newState"];

        if (newState === undefined)
            throw new Error(Exceptions.message422);


        const sqlInstruction = `UPDATE RestockOrder SET state = ${newState} WHERE ID= ${id};`;
        try {
            const restockOrder = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
    
    }

    /*TODO */
    addSkuItemsToRestockOrder(id, body) {

        const skuItems = body["skuItems"];

        if (skuItems === undefined)
            throw new Error(Exceptions.message422);

        /*join between ItemsPerOrder and RestockOrder*/
        /*loop to save insert each new item into ItemsPerOrder */
        return undefined;
    }

    /*Transport Note is missing in the DB */
    addTransportNote(id, body) {

        const transportNote = body["transportNote"];
        if (transportNote === undefined)
            throw new Error(Exceptions.message422);
        return undefined;
    }

    /*delete function to remove a restock order from the table, given its ID*/
    deleteRestockOrder(id) {
        const sqlInstruction = `DELETE FROM RestockOrder WHERE ID= ${id};`;
        try {
            const restockOrder = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return restockOrder;
    }
}

module.exports = RestockOrderController;