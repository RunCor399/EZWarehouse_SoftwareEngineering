'use strict'

class TestDescriptorController {
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();

        console.log("testDescriptorController started");
    }

    /*getter function to retreive all test descriptors*/
    async getAllTestDescriptors() {
        const sqlInstruction = "SELECT * FROM TestDescriptor;";
        try {
            const rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*getter function to retreive a single test descriptor given its ID*/
    async getTestDesciptor(id) {
        const sqlInstruction = `SELECT * FROM TestDescriptor WHERE ID= ${id};`;
        try {
            const testDescriptor = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return testDescriptor;
    }

    /*creation of a new test descriptor*/
    async createTestDescriptor(body) {

        const sqlGetCount = 'SELECT COUNT(*) FROM TestDescriptor;'

        try {
            const id = await this.#dbManager.genericSqlGet(sqlGetCount);
        } catch (error) {
            console.log("error");
        }

        const name = body["name"];
        const procedureDescription = body["procedureDescription"];
        const idSKU = body["idSKU"];

        if (!name || !procedureDescription || !idSKU )
            throw new Error(Exceptions.message422);

        const sqlInsert1 = `INSERT INTO TestDescriptor (ID, name, description, passRate) VALUES (${id + 1}, ${name}, ${procedureDescription}, 0);`;
        try {
            const insert1 = await this.#dbManager.genericSqlGet(sqlInsert1);
        } catch (error) {
            console.log("error");
        }

        const sqlInsert2 = `INSERT INTO TestDescriptorOwnership(testDescID, SKUID) VALUES (${id + 1}, ${idSKU});`;
        try {
            const insert2 = await this.#dbManager.genericSqlGet(sqlInsert2);
        } catch (error) {
            console.log("error");
        }

    }

    /*function to edit a test descriptor, given its ID*/
    async editTestDesciptor(id, body) {

        const newName = body["newName"];
        const newProcedureDescription = body["newProcedureDescription"];
        const newIdSKU = body["newIdSKU"];

        if (!newName || !newProcedureDescription  || !newIdSKU )
            throw new Error(Exceptions.message422);

        const sqlUpdate1 = `UPDATE TestDescriptor SET name= ${newName}
        AND description= ${newProcedureDescription} WHERE ID= ${id};`;

        try {
            const update1 = await this.#dbManager.genericSqlGet(sqlUpdate1);
        } catch (error) {
            console.log("error");
        }

        const sqlUpdate2 = `UPDATE TestDescriptorOwnership SET SKUID= ${newIdSKU} WHERE testDescID= ${id};`;

        try {
            const update2 = await this.#dbManager.genericSqlGet(sqlUpdate2);
        } catch (error) {
            console.log("error");
        }
    }

    /*delete function to remove a test descriptor from the table, given its ID*/
    async deleteTestDescriptor(id) {
        const sqlInstruction = `DELETE FROM TestDescriptor WHERE ID= ${id};`
        try {
            const testDescriptor = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return testDescriptor;
    }
}

module.exports = TestDescriptorController;