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

        if (!this.#controller.isLoggedAndHasPermission("manager","qualityEmployee"))
            throw new Error(Exceptions.message401);


        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM TestDescriptor;")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;
    }

    /**getter function to retreive a single test descriptor given its ID*/
    async getTestDesciptor(id) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Error(Exceptions.message401);

        if (!id || isNaN(id))
            throw new Error(Exceptions.message422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM TestDescriptor WHERE ID= ${id};`)
            .then(value => row = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });

        if (row === undefined)
            throw new Error(Exceptions.message404);

        return row;
    }

    /**creation of a new test descriptor*/
    async createTestDescriptor(body) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Error(Exceptions.message401);

        const name = body["name"];
        const procedureDescription = body["procedureDescription"];
        const idSKU = body["idSKU"];

        if (!name || !procedureDescription || !idSKU || isNaN(idSKU))
            throw new Error(Exceptions.message422);

        let sku;
        await this.#dbManager.genericSqlGet(`SELECT *  FROM SKU WHERE ID= ${idSKU};`)
            .then(value => sku = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });
        if (sku === undefined)
            throw new Error(Exceptions.message404);

        let id;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM TestDescriptor;')
            .then(value => id = value[0]["COUNT(*)"])
            .catch(error => { throw new Error(Exceptions.message500) });


        const sqlInsert1 = `INSERT INTO TestDescriptor (ID, name, procedureDescription, idSKU) 
        VALUES (${id + 1}, "${name}", "${procedureDescription}", ${idSKU};`;
        await this.#dbManager.genericSqlGet(sqlInsert1)
            .catch((error) => { throw new Error(Exceptions.message503) })

    }

    /**function to edit a test descriptor, given its ID*/
    async editTestDesciptor(id, body) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Error(Exceptions.message401);


        const newName = body["newName"];
        const newProcedureDescription = body["newProcedureDescription"];
        const newIdSKU = body["newIdSKU"];

        if (!newName || !newProcedureDescription || !newIdSKU
            || isNaN(newIdSKU || !id || isNaN(id)))
            throw new Error(Exceptions.message422);

        let sku;
        await this.#dbManager.genericSqlGet(`SELECT *  FROM SKU WHERE ID= ${newIdSKUù};`)
            .then(value => sku = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });
        if (sku === undefined)
            throw new Error(Exceptions.message404);

        let testDescriptor;
        await this.#dbManager.genericSqlGet(`SELECT *  FROM TestDescriptor WHERE ID= ${id};`)
            .then(value => testDescriptor = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });
        if (testDescriptor === undefined)
            throw new Error(Exceptions.message404);


        const sqlUpdate1 = `UPDATE TestDescriptor SET name= "${newName}"
        AND description= "${newProcedureDescription}" AND SKUID = ${newIdSKU}
        WHERE ID= ${id};`;

        await this.#dbManager.genericSqlRun(sqlUpdate1)
            .catch((error) => { throw new Error(Exceptions.message503) });
        
        }
    

    /**delete function to remove a test descriptor from the table, given its ID*/
    async deleteTestDescriptor(id) {
        
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Error(Exceptions.message401);

        if (!id || isNaN(id))
            throw new Error(Exceptions.message422)

        await this.#dbManager.genericSqlRun
            (`DELETE FROM TestDescriptor WHERE ID= ${id};`)
            .catch((error) => { throw new Error(Exceptions.message503) });
    }
}

module.exports = TestDescriptorController;