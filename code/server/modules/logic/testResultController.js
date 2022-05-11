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

        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager' && user.type !== 'qualityEmployee')
            throw new Error(Exceptions.message401);

        if (!rfid || isNaN(rfid) || String(rfid).length !== 32)
            throw new Error(Exceptions.message422)

        let rows;
        await this.#dbManager.genericSqlGet(`SELECT * FROM TestResult WHERE SKUItemID= "${rfid}";`)
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;
    }

    /**getter function to retreive all test results about a particular test related to an SKUItem, given its RFID and the ID of the test result - more than a single test*/
    async getTestResult(rfid, id) {
        /*let row;
        const sqlInstruction = `SELECT * FROM TestResult WHERE SKUItemID= "${rfid}" AND ID= ${id};`;
        try {
            row = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return row;*/

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM TestResult WHERE SKUItemID= "${rfid}" AND ID= ${id};`)
            .then(value => row = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });
        return row;
    }

    /**creation of a new test result*/
    async createTestResult(body) {

        const rfid = body["rfid"];
        const idTestDesciptor = body["idTestDescriptor"];
        const date = body["Date"];
        const result = body["Result"];

        if (!rfid || !idTestDesciptor || !date || !result)
            throw new Error(Exceptions.message422);

        /*  const sqlGetCount = 'SELECT COUNT(*) FROM TestResult;'
  
         try {
              const id = await this.#dbManager.genericSqlGet(sqlGetCount);
          } catch (error) {
              new Error(Exceptions.message500);
          } */

        let id;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM TestResult;')
            .then(value => id = value[0]["COUNT(*)"])
            .catch(error => { throw new Error(Exceptions.message500) });


        const sqlInstruction = `INSERT INTO TestResult (ID, testDescID,  SKUItemID, date, result) 
        VALUES (${id + 1}, ${idTestDesciptor}, "${rfid}", ${date}, ${result});`;
        try {
            const testRes = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return testRes;
    }

    /**function to edit the properties of a SKUItem's test result, given its RFID and the ID of the test result*/
    async editTestResult(rfid, id, body) {

        const newIdTestDesciptor = body["newIdTestDescriptor"];
        const newDate = body["newDate"];
        const newResult = body["newResult"];

        if (!newIdTestDesciptor || !newDate || !newResult)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `UPDATE TestResult SET testDescID= ${newIdTestDesciptor} 
        AND date= ${newDate} AND result= ${newResult} WHERE ID= ${id} AND SKUItemID = ${rfid};`;

        try {
            const testRes = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return testRes;
    }

    /**delete function to remove a test result from the table, given the test descriptor ID and the SKUItem RFID*/
    async deleteTestResult(rfid, id) {
        /*const sqlInstruction = `DELETE FROM TestResult WHERE ID= ${id} AND SKUItemID= "${rfid}";`;

        try {
            const testRes = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return testRes;*/

        await this.#dbManager.genericSqlRun
            (`DELETE FROM TestResult WHERE ID= ${id} AND SKUItemID= "${rfid}";`)
            .catch((error) => { throw new Error(Exceptions.message500) });

    }

}

module.exports = TestResultController;