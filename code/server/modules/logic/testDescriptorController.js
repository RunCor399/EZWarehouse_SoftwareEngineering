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

    /**getter function to retreive all test descriptors
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error).
    */
    async getAllTestDescriptors() {

        if (!this.#controller.isLoggedAndHasPermission("manager", "qualityEmployee"))
            throw new Exceptions(401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM TestDescriptor;")
            .then(value => rows = value)
            .catch(error => { throw error });
        return rows;
    }

    /**getter function to retreive a single test descriptor given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no test descriptor associated id)
     * @throws 422 Unprocessable Entity (validation of id failed)
     * @throws 500 Internal Server Error (generic error).
    */
    async getTestDescriptor(id) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

        if (this.#controller.areUndefined(id) 
        || this.#controller.areNotNumbers(id)
        || !this.#controller.areAllPositive(id))
            throw new Exceptions(422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM TestDescriptor WHERE ID= ?;`, id)
            .then(value => row = value[0])
            .catch(error => { throw error });
        if (!row)
            throw new Exceptions(404)

        return row;
    }

    /**creation of a new test descriptor 
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no sku associated idSKU)
     * @throws 422 Unprocessable Entity (validation of request body failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async createTestDescriptor(body) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        const name = body["name"];
        const procedureDescription = body["procedureDescription"];
        const idSKU = body["idSKU"];

        if (this.#controller.areUndefined(name, procedureDescription, idSKU)
            || this.#controller.areNotNumbers(idSKU)
            || !this.#controller.areAllPositive(idSKU))
            throw new Exceptions(422);

        let sku;
        await this.#controller.getSkuController().getSku(idSKU)
            .then(value => sku = value)
            .catch((error) => { if (error.getCode() === 500) throw new Exceptions(503); throw error });

        const sqlInsert = `INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) VALUES ( ?, ?, ?);`

        await this.#dbManager.genericSqlRun(sqlInsert, name, procedureDescription, idSKU)
            .catch((error) => { throw new Exceptions(503) })

    }

    /**function to edit a test descriptor, given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no test descriptor associated id or no sku associated to IDSku)
     * @throws 422 Unprocessable Entity (validation of request body or of id failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async editTestDescriptor(id, body) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        const newName = body["newName"];
        const newProcedureDescription = body["newProcedureDescription"];
        const newIdSKU = body["newIdSKU"];

        if (this.#controller.areUndefined(newName, newProcedureDescription, newIdSKU, id)
            || this.#controller.areNotNumbers(newIdSKU, id)
            || !this.#controller.areAllPositive(newIdSKU, id))
            throw new Exceptions(422);


        let sku;
        await this.#controller.getSkuController().getSku(newIdSKU)
            .then(value => sku = value)
            .catch(error => { if (error.getCode() === 500) throw new Exceptions(503); else throw error });

        let testDescriptor;
        await this.getTestDescriptor(id)
            .then(value => testDescriptor = value)
            .catch(error => { if (error.getCode() === 500) throw new Exceptions(503); else throw error });

        const sqlUpdate = `UPDATE TestDescriptor SET name= ?, procedureDescription= ?, idSku = ? WHERE ID= ?;`;

        await this.#dbManager.genericSqlRun(sqlUpdate, newName, newProcedureDescription, newIdSKU, id)
            .catch((error) => { throw new Exceptions(503) });

    }


    /**delete function to remove a test descriptor from the table, given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 422 Unprocessable Entity (validation of id failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async deleteTestDescriptor(id) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        if (this.#controller.areUndefined(id) 
        || this.#controller.areNotNumbers(id)
        || !this.#controller.areAllPositive(id))
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun
            (`DELETE FROM TestDescriptor WHERE ID= ?;`, id)
            .catch((error) => { throw new Exceptions(503) });
    }
}

module.exports = TestDescriptorController;