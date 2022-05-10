'use strict'
const Exceptions = require('../../routers/exceptions');
const Controller = require('./controller')

class TestDescriptorController {
        /** @type {Controller} */

    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = this.#controller.getDBManager();

        console.log("testDescriptorController started");
    }

    /**getter function to retreive all test descriptors*/
    async getAllTestDescriptors() {
        /*let rows;
        const sqlInstruction = "SELECT * FROM TestDescriptor;";
        try {
            rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return rows;*/

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM TestDescriptor;")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;
    }

    /**getter function to retreive a single test descriptor given its ID*/
    async getTestDesciptor(id) {
       /*let row;
        const sqlInstruction = `SELECT * FROM TestDescriptor WHERE ID= ${id};`;
        try {
            row = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return row;*/

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM TestDescriptor WHERE ID= ${id};`)
            .then(value => row = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });
        return row;
    }

    /**creation of a new test descriptor*/
    async createTestDescriptor(body) {

        const name = body["name"];
        const procedureDescription = body["procedureDescription"];
        const idSKU = body["idSKU"];

        if (!name || !procedureDescription || !idSKU )
            throw new Error(Exceptions.message422);

        /* const sqlGetCount = 'SELECT COUNT(*) FROM TestDescriptor;'

        try {
            const id = await this.#dbManager.genericSqlGet(sqlGetCount);
        } catch (error) {
            new Error(Exceptions.message500);
        } */

        let id;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM TestDescriptor;')
            .then(value => id = value[0]["COUNT(*)"])
            .catch(error => { throw new Error(Exceptions.message500) });


        const sqlInsert1 = `INSERT INTO TestDescriptor (ID, name, description, passRate) 
        VALUES (${id + 1}, "${name}", "${procedureDescription}", 0);`;
        try {
            const insert1 = await this.#dbManager.genericSqlGet(sqlInsert1);
        } catch (error) {
            new Error(Exceptions.message500);
        }

        const sqlInsert2 = `INSERT INTO TestDescriptorOwnership(testDescID, SKUID) 
        VALUES (${id + 1}, ${idSKU});`;
        try {
            const insert2 = await this.#dbManager.genericSqlGet(sqlInsert2);
        } catch (error) {
            new Error(Exceptions.message500);
        }

    }

    /**function to edit a test descriptor, given its ID*/
    async editTestDesciptor(id, body) {

        const newName = body["newName"];
        const newProcedureDescription = body["newProcedureDescription"];
        const newIdSKU = body["newIdSKU"];

        if (!newName || !newProcedureDescription  || !newIdSKU )
            throw new Error(Exceptions.message422);

        const sqlUpdate1 = `UPDATE TestDescriptor SET name= "${newName}"
        AND description= "${newProcedureDescription}" WHERE ID= ${id};`;

        try {
            const update1 = await this.#dbManager.genericSqlGet(sqlUpdate1);
        } catch (error) {
            new Error(Exceptions.message500);
        }

        const sqlUpdate2 = `UPDATE TestDescriptorOwnership 
        SET SKUID= ${newIdSKU} WHERE testDescID= ${id};`;

        try {
            const update2 = await this.#dbManager.genericSqlGet(sqlUpdate2);
        } catch (error) {
            new Error(Exceptions.message500);
        }
    }

    /**delete function to remove a test descriptor from the table, given its ID*/
    async deleteTestDescriptor(id) {
       /* const sqlInstruction = `DELETE FROM TestDescriptor WHERE ID= ${id};`
        try {
            const testDescriptor = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return testDescriptor;*/

        
        await this.#dbManager.genericSqlRun
            (`DELETE FROM TestDescriptor WHERE ID= ${id};`)
            .catch((error) => { throw new Error(Exceptions.message500) });
    }
}

module.exports = TestDescriptorController;