'use strict'

class OrderController {
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();
        console.log("orderController started");
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

    /*getter function to retreive all the return orders*/
    getAllReturnOrders() {
        const sqlInstruction = "SELECT * FROM ReturnOrder;";
        try {
            const rows = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*getter function to retreive a single return order, given its ID*/
    getReturnOrder(id) {
        const sqlInstruction = `SELECT * FROM ReturnOrder WHERE ID= ${id};`;
        try {
            const returnOrder = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return returnOrder;
    }

    /*TO BE COMPLETED - products are missing in the table, while managerID and supplierID are missing in the function */
    createReturnOrder(body) {

        const sqlGetCount = 'SELECT COUNT(*) FROM ReturnOrder'

        try {
            const id = this.#dbManager.genericSqlGet(sqlGetCount);
        } catch (error) {
            console.log("error");
        }

        const returnDate = body["returnDate"];
        const products = body["products"];
        const restockOrderId = body["restockOrderId"];

        if (returnDate === undefined || products === undefined || restockOrderId === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `INSERT INTO ReturnOrder (ID, returnDate, restockOrderId) VALUES (${id + 1}, ${returnDate}, ${restockOrderId});`;
        try {
            const returnOrder = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }

        /*join between SKUItemsInReturnOrder and ReturnOrder */

        return returnOrder;
    }

    /*delete function to remove a return order from the table, given its ID*/
    deleteReturnOrder(id) {
        const sqlInstruction = `DELETE FROM ReturnOrder WHERE ID= ${id};`;
        try {
            const returnOrder = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return returnOrder;
    }

    /*getter function to retreive all the internal orders*/
    getAllInternalOrders() {
        const sqlInstruction = "SELECT * FROM InternalOrder;";
        try {
            const rows = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*getter function to retreive all the issued internal orders*/
    getIssuedInternalOrders() {
        const sqlInstruction = "SELECT * FROM InternalOrder WHERE state = 'ISSUED';";
        try {
            const rows = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*getter function to retreive all the accepted internal orders*/
    getAcceptedInternalOrders() {
        const sqlInstruction = "SELECT * FROM InternalOrder WHERE state = 'ACCEPTED';";
        try {
            const rows = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*getter function to retreive a single internal order, given its ID*/
    getInternalOrder(id) {
        const sqlInstruction = `SELECT * FROM InternalOrder WHERE ID= ${id};`;
        try {
            const internalOrder = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return internalOrder;
    }

    /*TODO - products and issueDate are missing in the table */
    createInternalOrder(body) {

        const sqlGetCount = 'SELECT COUNT(*) FROM InternalOrder'

        try {
            const id = this.#dbManager.genericSqlGet(sqlGetCount);
        } catch (error) {
            console.log("error");
        }

        const issueDate = body["issueDate"];
        const products = body["products"];
        const customerId = body["customerId"]

        if (issueDate === undefined || products === undefined || customerId === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `INSERT INTO InternalOrder (ID, customerId) VALUES (${id + 1}, ${customerId});`;
        try {
            const internalOrder = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }

        /*join between SKUItemsInInternalOrder and InternalOrder */

        return internalOrder;
    }

    /*TODO*/
    editInternalOrder(id, body) {

        const newState = body["newState"];

        if (newState === undefined)
            throw new Error(Exceptions.message422);

        if (newState === "COMPLETED") {
            const products = body["products"];

            if (products === undefined)
                throw new Error(Exceptions.message422);

            //query
            /*join between SKUItemsInInternalOrder and InternalOrder */
            return internalOrder;
        }
        else {
            const sqlInstruction = `UPDATE InternalOrder SET state=  ${newState} WHERE ID= ${id}`;
            try {
                const internalOrder = this.#dbManager.genericSqlGet(sqlInstruction);
            } catch (error) {
                console.log("error");
            }
            return internalOrder;
        }

    }


    /*delete function to remove an internal order from the table, given its ID */
    deleteInternalOrder(id) {
        const sqlInstruction = `DELETE FROM InternalOrder WHERE ID= ${id};`;
        try {
            const internalOrder = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return internalOrder;
    }

}

module.exports = OrderController;