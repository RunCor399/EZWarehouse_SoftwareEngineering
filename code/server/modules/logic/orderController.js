'use strict'

class OrderController {
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();
        console.log("orderController started");
    }

    /*NEW */
    getAllRestockOrders() {
        const sqlInstruction = "SELECT * FROM RestockOrder;";
        try {
            const rows = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*NEW*/
    getIssuedRestockOrders() {
        const sqlInstruction = "SELECT * FROM RestockOrder WHERE state = 'ISSUED';";
        try {
            const rows = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*NEW */
    getRestockOrder(id) {
        const sqlInstruction = `SELECT * FROM RestockOrder WHERE ID="${id};`;
        try {
            const restockOrder = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return restockOrder;
    }

    getRestockOrderToBeReturned(id) {
        return undefined;
    }

    /*NEW - products are missing in the table! Can the state be initialized? */
    createRestockOrder(body) {

        const issueDate = body["issueDate"];
        const products = body["products"];
        const supplierId = body["supplierId"]

        if (issueDate === undefined || products === undefined || supplierId === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = "INSERT INTO RestockOrder (ID, supplierID, issueDate) VALUES (?, ?, ?);";
        try {
            const restockOrder = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return restockOrder;
    }

    /*NEW */
    editRestockOrder(id, body) {

        const newState = body["newState"];

        if (newState === undefined)
            throw new Error(Exceptions.message422);


        const sqlInstruction = `UPDATE RestockOrder SET state = ${newState} WHERE ID= ${id};`;
        try {
            const restockOrder = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return restockOrder;
    }

    addSkuItemsToRestockOrder(id, body) {

        const skuItems = body["skuItems"];

        if (skuItems === undefined)
            throw new Error(Exceptions.message422);

        return undefined;
    }

    /*Transport Note is missing in the DB */
    addTransportNote(id, body) {

        const transportNote = body["transportNote"];
        if (transportNote === undefined)
            throw new Error(Exceptions.message422);
        return undefined;
    }

    /*NEW */
    deleteRestockOrder(id) {
        const sqlInstruction = `DELETE FROM RestockOrder WHERE ID= ${id};`;
        try {
            const restockOrder = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return restockOrder;
    }

    /*NEW */
    getAllReturnOrders() {
        const sqlInstruction = "SELECT * FROM ReturnOrder;";
        try {
            const rows = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*NEW */
    getReturnOrder(id) {
        const sqlInstruction = `SELECT * FROM ReturnOrder WHERE ID= ${id};`;
        try {
            const returnOrder = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return returnOrder;
    }

    /*NEW - products are missing in the table, while managerID and supplierID are missing in the function */
    createReturnOrder(body) {

        const returnDate = body["returnDate"];
        const products = body["products"];
        const restockOrderId = body["restockOrderId"];

        if (returnDate === undefined || products === undefined || restockOrderId === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = "INSERT INTO ReturnOrder (ID, returnDate, restockOrderId) VALUES (?, ?, ?);";
        try {
            const returnOrder = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return returnOrder;
    }

    /*NEW */
    deleteReturnOrder(id) {
        const sqlInstruction = `DELETE FROM ReturnOrder WHERE ID= ${id};`;
        try {
            const returnOrder = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return returnOrder;
    }

    /*NEW */
    getAllInternalOrders() {
        const sqlInstruction = "SELECT * FROM InternalOrder;";
        try {
            const rows = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*NEW */
    getIssuedInternalOrders() {
        const sqlInstruction = "SELECT * FROM InternalOrder WHERE state = 'ISSUED';";
        try {
            const rows = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*NEW */
    getAcceptedInternalOrders() {
        const sqlInstruction = "SELECT * FROM InternalOrder WHERE state = 'ACCEPTED';";
        try {
            const rows = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*NEW */
    getInternalOrder(id) {
        const sqlInstruction = `SELECT * FROM InternalOrder WHERE ID= ${id};`;
        try {
            const internalOrder = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return internalOrder;
    }

    /*NEW - products and issueDate are missing in the table */
    createInternalOrder(body) {

        const issueDate = body["issueDate"];
        const products = body["products"];
        const customerId = body["customerId"]

        if (issueDate === undefined || products === undefined || customerId === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = "INSERT INTO InternalOrder (ID, customerId) VALUES (?, ?);";
        try {
            const internalOrder = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return internalOrder;
    }

    /*NEW */
    editInternalOrder(id, body) {

        const newState = body["newState"];

        if (newState === undefined)
            throw new Error(Exceptions.message422);

        if (newState === "COMPLETED") {
            const products = body["products"];

            if (products === undefined)
                throw new Error(Exceptions.message422);

            //query
            return internalOrder;
        }
        else {
            const sqlInstruction = `UPDATE InternalOrder SET state=  ${newState} WHERE ID= ${id}`;
            try {
                const internalOrder = dbManager.genericSqlGet(sqlInstruction);
            } catch (error) {
                console.log("error");
            }
            return internalOrder;
        }

    }


    /*NEW */
    deleteInternalOrder(id) {
        const sqlInstruction = `DELETE FROM InternalOrder WHERE ID= ${id};`;
        try {
            const internalOrder = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return internalOrder;
    }



}

module.exports = OrderController;