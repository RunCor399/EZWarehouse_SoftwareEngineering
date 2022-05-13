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

    /** getter function to retreive all test results related to an SKUItem, given its RFID - more than a single test*/
    async getTestResults(rfid) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "qualityEmployee"))
            throw new Exceptions(401);

        if (this.#controller.checkRFID(rfid))
            throw new Exceptions(422);

        let skuitem;
        await this.#controller.getSkuItemController().getSkuItem(rfid)
            .then(value => skuitem = value)
            .catch(error => { throw error });
        if (!skuitem) throw new Exceptions(404)


        let rows;
        await this.#dbManager.genericSqlGet(`SELECT * FROM TestResult WHERE RFID= ?;`, rfid)
            .then(value => rows = value)
            .catch(error => { throw error });
        return rows;

        //`SELECT * FROM TestResult WHERE RFID= "${rfid}";`

    }

    /**getter function to retreive all test results about a particular test related to an SKUItem, given its RFID and the ID of the test result - more than a single test*/
    async getTestResult(rfid, id) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "qualityEmployee"))
            throw new Exceptions(401);

        if (this.#controller.areUndefined(id) || this.#controller.areNotNumbers(id)
            || this.#controller.checkRFID(rfid))
            throw new Exceptions(422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM TestResult WHERE rfid= ? AND ID= ?;`, rfid, id)
            .then(value => row = value[0])
            .catch(error => { throw error });
        if (!row)
            throw new Exceptions(404)


        //`SELECT * FROM TestResult WHERE rfid= "${rfid}" AND ID= ${id};`

        return row;
    }

    /**creation of a new test result*/
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


        let skuitem;
        await this.#controller.getSkuItemController().getSkuItem(rfid)
            .then(value => skuitem = value)
            .catch(error => { throw error });
        if (!skuitem) throw new Exceptions(404)



        let testDescriptor;
        await this.#controller.getTestDescriptorController().getTestDescriptor(idTestDescriptor)
            .then(value => testDescriptor = value)
            .catch(error => { throw error });
        if (!testDescriptor) throw new Exceptions(404)


        //const sqlInstruction = `INSERT INTO TestResult ( idTestDescriptor, RFID, date, result) VALUES ( ${idTestDescriptor}, "${rfid}", "${date}", ${result});`;

        const sqlInstruction = `INSERT INTO TestResult ( idTestDescriptor, RFID, date, result)  VALUES ( ?, ?, ?, ?);`;

        await this.#dbManager.genericSqlRun(sqlInstruction, idTestDescriptor, rfid, date, result)
            .catch(error => { throw error; });

    }

    /**function to edit the properties of a SKUItem's test result, given its RFID and the ID of the test result*/
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


        let skuitem;
        await this.#controller.getSkuItemController().getSkuItem(rfid)
            .then(value => skuitem = value)
            .catch((error) => { throw error });
        if (!skuitem) throw new Exceptions(404)



        let testDescriptor;
        await this.#controller.getTestDescriptorController().getTestDescriptor(newIdTestDescriptor)
            .then(value => testDescriptor = value)
            .catch((error) => { throw error });
        if (!testDescriptor) throw new Exceptions(404)


        let testResult;
        await this.getTestResult(rfid, id)
            .then(value => testResult = value)
            .catch((error) => { throw error });
        if (!testResult) throw new Exceptions(404);



        //const sqlInstruction = `UPDATE TestResult SET idtestDescriptor= ${newIdTestDescriptor}, date= "${newDate}", result= ${newResult} WHERE ID= ${id} AND RFID = "${rfid}";`;

        const sqlInstruction = `UPDATE TestResult SET idtestDescriptor= ?, date= ?, result=? WHERE ID= ? AND RFID = ?;`

        await this.#dbManager.genericSqlRun(sqlInstruction, newIdTestDescriptor, newDate, newResult, id, rfid)
            .catch(error => { throw error });
    }


    /**delete function to remove a test result from the table, given the test descriptor ID and the SKUItem RFID*/
    async deleteTestResult(rfid, id) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "qualityEmployee"))
            throw new Exceptions(401);

        if (this.#controller.checkRFID(rfid) || this.#controller.areUndefined(id)
            || this.#controller.areNotNumbers(id))
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun
            (`DELETE FROM TestResult WHERE ID= ? AND RFID= ?;`, id, rfid)
            .catch((error) => { throw error });

        //`DELETE FROM TestResult WHERE ID= ${id} AND RFID= "${rfid}";`


    }

}

module.exports = TestResultController;