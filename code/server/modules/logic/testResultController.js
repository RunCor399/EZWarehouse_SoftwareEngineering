'use strict'
const Exceptions = require('../../routers/exceptions');
const Controller = require('./controller')

class TestResultController {
    /** @type {Controller} */

    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = this.#controller.getDBManager();

        console.log("testResultController started");
    }

    /** getter function to retreive all test results related to an SKUItem, given its RFID - more than a single test
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found(no sku item associated to rfid)
     * @throws 422 Unprocessable Entity(validation of rfid failed)
     * @throws 500 Internal Server Error` (generic error).
    */
    async getTestResults(rfid) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "qualityEmployee"))
            throw new Exceptions(401);

        if (this.#controller.checkRFID(rfid))
            throw new Exceptions(422);

        await this.#controller.getSkuItemController().getSkuItem(rfid)
            .catch(error => { throw error });

        let rows;
        await this.#dbManager.genericSqlGet(`SELECT * FROM TestResult WHERE RFID= ?;`, rfid)
            .then(value => rows = value)
            .catch(error => { throw error });
        return rows;
    }

    /**getter function to retreive all test results about a particular test related to an SKUItem, given its RFID and the ID of the test result - more than a single test
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no test result associated to id or no sku item associated to rfid)
     * @throws 422 Unprocessable Entity (validation of id or of rfid failed)
     * @throws 500 Internal Server Error (generic error).
    */
    async getTestResult(rfid, id) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "qualityEmployee"))
            throw new Exceptions(401);

        if (this.#controller.areUndefined(id) || this.#controller.areNotNumbers(id)
            || this.#controller.checkRFID(rfid))
            throw new Exceptions(422);

        await this.#controller.getSkuItemController().getSkuItem(rfid)
            .catch(error => { throw error });

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM TestResult WHERE rfid= ? AND ID= ?;`, rfid, id)
            .then(value => row = value[0])
            .catch(error => { throw error });
        if (!row)
            throw new Exceptions(404)



        return row;
    }

    /**creation of a new test result
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found(no sku item associated to rfid or no test descriptor associated to idTestDescriptor)
     * @throws 422 Unprocessable Entity(validation of request body or of rfid failed)
     * @throws 503 Service Unavailable` (generic error).
    */
    async createTestResult(body) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "qualityEmployee"))
            throw new Exceptions(401);

        const rfid = body["rfid"];
        const idTestDescriptor = body["idTestDescriptor"];
        const date = body["Date"];
        const result = body["Result"];

        if (this.#controller.checkRFID(rfid) ||
            this.#controller.areUndefined(idTestDescriptor, date, result)
            || this.#controller.areNotNumbers(idTestDescriptor))
            throw new Exceptions(422)

        await this.#controller.getSkuItemController().getSkuItem(rfid)
            .catch(error => { if (error.getCode() === 500) throw new Exceptions(503); else throw error });

        await this.#controller.getTestDescriptorController().getTestDescriptor(idTestDescriptor)
            .catch(error => { if (error.getCode() === 500) throw new Exceptions(503); else throw error });

        const sqlInstruction = `INSERT INTO TestResult ( idTestDescriptor, RFID, date, result)  VALUES ( ?, ?, ?, ?);`;
        await this.#dbManager.genericSqlRun(sqlInstruction, idTestDescriptor, rfid, date, result)
            .catch(error => { throw new Exceptions(503); });

    }

    /**function to edit the properties of a SKUItem's test result, given its RFID and the ID of the test result
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found(no sku item associated to rfid or no test descriptor associated to newIdTestDescriptor or no test result associated to id)
     * @throws 422 Unprocessable Entity (validation of request body, of id or of rfid failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async editTestResult(rfid, id, body) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "qualityEmployee"))
            throw new Exceptions(401);

        const newIdTestDescriptor = body["newIdTestDescriptor"];
        const newDate = body["newDate"];
        const newResult = body["newResult"];

        if (this.#controller.areUndefined(newIdTestDescriptor, newDate, newResult, id)
            || this.#controller.areNotNumbers(id)
            || this.#controller.checkRFID(rfid))
            throw new Exceptions(422);


        await this.#controller.getSkuItemController().getSkuItem(rfid)
            .catch((error) => { if (error.getCode() === 500) throw new Exceptions(503); else throw error });

        await this.#controller.getTestDescriptorController().getTestDescriptor(newIdTestDescriptor)
            .catch((error) => { if (error.getCode() === 500) throw new Exceptions(503); else throw error });

        await this.getTestResult(rfid, id)
            .catch((error) => { if (error.getCode() === 500) throw new Exceptions(503); else throw error });

        const sqlInstruction = `UPDATE TestResult SET idtestDescriptor= ?, date= ?, result=? WHERE ID= ? AND RFID = ?;`
        await this.#dbManager.genericSqlRun(sqlInstruction, newIdTestDescriptor, newDate, newResult, id, rfid)
            .catch(error => { throw new Exceptions(503) });
    }


    /**delete function to remove a test result from the table, given the test descriptor ID and the SKUItem RFID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 422 Unprocessable Entity (validation of id or of rfid failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async deleteTestResult(rfid, id) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "qualityEmployee"))
            throw new Exceptions(401);

        if (this.#controller.checkRFID(rfid) || this.#controller.areUndefined(id)
            || this.#controller.areNotNumbers(id))
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun
            (`DELETE FROM TestResult WHERE ID= ? AND RFID= ?;`, id, rfid)
            .catch((error) => { throw new Exceptions(503) });


    }

}

module.exports = TestResultController;