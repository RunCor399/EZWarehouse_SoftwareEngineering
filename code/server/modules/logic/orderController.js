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
        const sqlInstruction = "SELECT * FROM RestockOrder WHERE ID=" + id;
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
    createRestockOrder(issueDate, products, supplierId) {
        const sqlInstruction = "INSERT INTO RestockOrder (ID, supplierID, issueDate) VALUES (?, ?, ?);";
        try {
            const restockOrder = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return restockOrder;
    }

    /*NEW */
    editRestockOrder(id, newState) {
        const sqlInstruction = "UPDATE RestockOrder SET state=" + newState + " WHERE ID=" + id;
        try {
            const restockOrder = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return restockOrder;
    }

    addSkuItemsToRestockOrder(id, skuItems) {
        return undefined;
    }

    /*Transport Note is missing in the DB */
    addTransportNote(id, transportNote) {
        return undefined;
    }

    /*NEW */
    deleteRestockOrder(id) {
        const sqlInstruction = "DELETE FROM RestockOrder WHERE ID=" + id;
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
        const sqlInstruction = "SELECT * FROM ReturnOrder WHERE ID=" + id;
        try {
            const returnOrder = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return returnOrder;
    }

    /*NEW - products are missing in the table, while managerID and supplierID are missing in the function */
    createReturnOrder(returnDate, products, restockOrderId) {
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
        const sqlInstruction = "DELETE FROM ReturnOrder WHERE ID=" + id;
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
        const sqlInstruction = "SELECT * FROM InternalOrder WHERE ID=" + id;
        try {
            const internalOrder = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return internalOrder;
    }

    /*NEW - products and issueDate are missing in the table */
    createInternalOrder(issueDate, products, customerId) {
        const sqlInstruction = "INSERT INTO InternalOrder (ID, customerId) VALUES (?, ?);";
        try {
            const internalOrder = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return internalOrder;
    }

    /*NEW */
    editInternalOrder(id, newState) {
        const sqlInstruction = "UPDATE InternalOrder SET state=" + newState + " WHERE ID=" + id;
        try {
            const internalOrder = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return internalOrder;
    }

    /*products are missing in the table */
    editInternalOrder(id, newState, products) {
        return undefined;
    }

    /*NEW */
    deleteInternalOrder(id) {
        const sqlInstruction = "DELETE FROM InternalOrder WHERE ID=" + id;
        try {
            const internalOrder = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return internalOrder;
    }



}

module.exports = OrderController;