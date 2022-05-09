'use strict'

class TestResultController {
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();

        console.log("testResultController started");
    }

    /*getter function to retreive all test results related to an SKUItem, given its RFID - more than a single test*/
    async getTestResults(rfid) {
        const sqlInstruction = `SELECT * FROM TestResult WHERE SKUItemID= ${rfid};`;
        try {
            const rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return rows.map((row) => row);
    }

    /*getter function to retreive all test results about a particular test related to an SKUItem, given its RFID and the ID of the test result - more than a single test*/
    async getTestResult(rfid, id) {
        const sqlInstruction = `SELECT * FROM TestResult WHERE SKUItemID= ${rfid} AND ID= ${id};`;
        try {
            const rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return rows.map((row) => row);
    }

    /*creation of a new test result*/
    async createTestResult(body) {

        const sqlGetCount = 'SELECT COUNT(*) FROM TestResult;'

        try {
            const id = await this.#dbManager.genericSqlGet(sqlGetCount);
        } catch (error) {
            new Error(Exceptions.message500);
        }

        const rfid = body["rfid"];
        const idTestDesciptor = body["idTestDescriptor"];
        const date = body["Date"];
        const result = body["Result"];

        if (!rfid || !idTestDesciptor || !date || !result)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `INSERT INTO TestResult (ID, testDescID,  SKUItemID, date, result) VALUES (${id + 1}, ${idTestDesciptor}, ${rfid}, ${date}, ${result});`;
        try {
            const testRes = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return testRes;
    }

    /*function to edit the properties of a SKUItem's test result, given its RFID and the ID of the test result*/
    async editTestResult(rfid, id, body) {

        const newIdTestDesciptor = body["newIdTestDescriptor"];
        const newDate = body["newDate"];
        const newResult = body["newResult"];

        if (!newIdTestDesciptor || !newDate || !newResult)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `UPDATE TestResult SET testDescID= ${newIdTestDesciptor} AND date= ${newDate} AND result= ${newResult} WHERE ID= ${id} AND SKUItemID = ${rfid};`;

        try {
            const testRes = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return testRes;
    }

    /*delete function to remove a test result from the table, given the test descriptor ID and the SKUItem RFID*/
    async deleteTestResult(rfid, id) {
        const sqlInstruction = `DELETE FROM TestResult WHERE ID= ${id} AND SKUItemID= ${rfid};`;

        try {
            const testRes = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return testRes;
    }

}

module.exports = TestResultController;