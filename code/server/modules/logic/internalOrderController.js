'use strict'

class InternalOrderController {
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();
        console.log("internalOrderController started");
    }


    /*getter function to retreive all the internal orders*/
    async getAllInternalOrders() {
        const sqlInstruction = "SELECT * FROM InternalOrder;";
        try {
            const rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*getter function to retreive all the issued internal orders*/
    async getIssuedInternalOrders() {
        const sqlInstruction = "SELECT * FROM InternalOrder WHERE state = 'ISSUED';";
        try {
            const rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*getter function to retreive all the accepted internal orders*/
    async getAcceptedInternalOrders() {
        const sqlInstruction = "SELECT * FROM InternalOrder WHERE state = 'ACCEPTED';";
        try {
            const rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*getter function to retreive a single internal order, given its ID*/
    async getInternalOrder(id) {
        const sqlInstruction = `SELECT * FROM InternalOrder WHERE ID= ${id};`;
        try {
            const internalOrder = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return internalOrder;
    }

    /*TODO - products and issueDate are missing in the table */
    async createInternalOrder(body) {

        const sqlGetCount = 'SELECT COUNT(*) FROM InternalOrder'

        try {
            const id = await this.#dbManager.genericSqlGet(sqlGetCount);
        } catch (error) {
            console.log("error");
        }

        const issueDate = body["issueDate"];
        const products = body["products"];
        const customerId = body["customerId"]

        if (!issueDate || !products || !customerId)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `INSERT INTO InternalOrder (ID, issueDate, state, customerId) VALUES (${id + 1}, ${issueDate}, "ISSUED", ${customerId});`;
        try {
            const internalOrder = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }

        /*join between SKUItemsInInternalOrder and InternalOrder */

        return internalOrder;
    }

    /*TODO*/
    async editInternalOrder(id, body) {

        const newState = body["newState"];

        if (!newState)
            throw new Error(Exceptions.message422);

        if (newState === "COMPLETED") {
            const products = body["products"];

            if (!products)
                throw new Error(Exceptions.message422);

            //query
            /*join between SKUItemsInInternalOrder and InternalOrder */
            return internalOrder;
        }
        else {
            const sqlInstruction = `UPDATE InternalOrder SET state=  ${newState} WHERE ID= ${id}`;
            try {
                const internalOrder = await this.#dbManager.genericSqlGet(sqlInstruction);
            } catch (error) {
                console.log("error");
            }
            return internalOrder;
        }

    }


    /*delete function to remove an internal order from the table, given its ID */
    async deleteInternalOrder(id) {
        const sqlInstruction = `DELETE FROM InternalOrder WHERE ID= ${id};`;
        try {
            const internalOrder = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return internalOrder;
    }

}

module.exports = InternalOrderController;