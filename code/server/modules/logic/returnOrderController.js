'use strict'

class ReturnOrderController {
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();
        console.log("returnOrderController started");
    }



    /*getter function to retreive all the return orders*/
    async getAllReturnOrders() {
        const sqlInstruction = "SELECT * FROM ReturnOrder;";
        try {
            const rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*getter function to retreive a single return order, given its ID*/
    async getReturnOrder(id) {
        const sqlInstruction = `SELECT * FROM ReturnOrder WHERE ID= ${id};`;
        try {
            const returnOrder = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return returnOrder;
    }

    /*TO BE COMPLETED - products are missing in the table, while managerID and supplierID are missing in the function */
   async createReturnOrder(body) {

        const sqlGetCount = 'SELECT COUNT(*) FROM ReturnOrder'

        try {
            const id = await this.#dbManager.genericSqlGet(sqlGetCount);
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
            const returnOrder = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }

        /*join between SKUItemsInReturnOrder and ReturnOrder */

        return returnOrder;
    }

    /*delete function to remove a return order from the table, given its ID*/
    async deleteReturnOrder(id) {
        const sqlInstruction = `DELETE FROM ReturnOrder WHERE ID= ${id};`;
        try {
            const returnOrder =await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return returnOrder;
    }
}

module.exports = ReturnOrderController;