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

        if (!this.#controller.isLoggedAndHasPermission("manager", "qualityEmployee"))
            throw new Exceptions(401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM TestDescriptor;")
            .then(value => rows = value)
            .catch(error => { throw error });
        return rows;
    }

    /**getter function to retreive a single test descriptor given its ID*/
    async getTestDescriptor(id) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

        if (this.#controller.areUndefined(id) || this.#controller.areNotNumbers(id))
            throw new Exceptions(422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM TestDescriptor WHERE ID= ${id};`)
            .then(value => row = value[0])
            .catch(error => { throw error });

        //()`SELECT * FROM TestDescriptor WHERE ID= ?;`, id)

        if (!row)
            throw new Exceptions(404)

        return row;
    }

    /**creation of a new test descriptor*/
    async createTestDescriptor(body) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        const name = body["name"];
        const procedureDescription = body["procedureDescription"];
        const idSKU = body["idSKU"];

        if (this.#controller.areUndefined(name, procedureDescription, idSKU)
            || this.#controller.areNotNumbers(idSKU))
            throw new Exceptions(422);

        let sku;
        await this.#controller.getSkuController().getSku(idSKU)
            .then(value => sku = value)
            .catch((error) => { throw error });
        if (!sku) throw new Exceptions(404)


        const sqlInsert1 = `INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
        VALUES ( "${name}", "${procedureDescription}", ${idSKU});`;

        //const sqlInsert1 = `INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) VALUES ( ?, ?, ?);`, name, procedureDescription, idSKU)

        await this.#dbManager.genericSqlRun(sqlInsert1)
            .catch((error) => { throw error })

    }

    /**function to edit a test descriptor, given its ID*/
    async editTestDescriptor(id, body) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        const newName = body["newName"];
        const newProcedureDescription = body["newProcedureDescription"];
        const newIdSKU = body["newIdSKU"];
     
        if (this.#controller.areUndefined(newName, newProcedureDescription, newIdSKU, id)
            || this.#controller.areNotNumbers(newIdSKU, id))
            throw new Exceptions(422);


        let sku;
        await this.#controller.getSkuController().getSku(newIdSKU)
            .then(value => sku = value)
            .catch(error => { throw error });
        if (!sku) throw new Exceptions(404)

        let testDescriptor;
        await this.getTestDescriptor(id)
            .then(value => testDescriptor = value)
            .catch(error => { throw error});
        if (!testDescriptor) throw new Exceptions(404)


        const sqlUpdate1 = `UPDATE TestDescriptor SET name= "${newName}",
         procedureDescription= "${newProcedureDescription}", idSku = ${newIdSKU} WHERE ID= ${id};`;

         // const sqlUpdate1 = `UPDATE TestDescriptor SET name= ?, procedureDescription= ?, idSku = ? WHERE ID= ?;`, newName, newProcedureDescrition, newIdSKU, id;

        await this.#dbManager.genericSqlRun(sqlUpdate1)
            .catch((error) => { throw new Exceptions(503) });

    }


    /**delete function to remove a test descriptor from the table, given its ID*/
    async deleteTestDescriptor(id) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        if (this.#controller.areUndefined(id) || this.#controller.areNotNumbers(id))
            throw new Exceptions(422);

        //`DELETE FROM TestDescriptor WHERE ID= ?;`, id

        await this.#dbManager.genericSqlRun
            (`DELETE FROM TestDescriptor WHERE ID= ${id};`)
            .catch((error) => { throw error });
    }
}

module.exports = TestDescriptorController;