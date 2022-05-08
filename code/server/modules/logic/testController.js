'use strict'

class TestController {
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();

        console.log("testController started");
    }

    /*getter function to retreive all test descriptors*/
    getAllTestDescriptors() {
        const sqlInstruction = "SELECT * FROM TestDescriptor;";
        try {
            const rows = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*getter function to retreive a single test descriptor given its ID*/
    getTestDesciptor(id) {
        const sqlInstruction = `SELECT * FROM TestDescriptor WHERE ID= ${id};`;
        try {
            const testDescriptor = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return testDescriptor;
    }

    /*creation of a new test descriptor*/
    createTestDescriptor(body) {

        const sqlGetCount = 'SELECT COUNT(*) FROM TestDescriptor;'

        try {
            const id = dbManager.genericSqlGet(sqlGetCount);
        } catch (error) {
            console.log("error");
        }

        const name = body["name"];
        const procedureDescription = body["procedureDescription"];
        const idSKU = body["idSKU"];

        if (name === undefined || procedureDescription === undefined || idSKU === undefined)
            throw new Error(Exceptions.message422);

        const sqlInsert1 = `INSERT INTO TestDescriptor (ID, name, description, passRate) VALUES (${id + 1}, ${name}, ${procedureDescription}, 0);`;
        try {
            const insert1 = dbManager.genericSqlGet(sqlInsert1);
        } catch (error) {
            console.log("error");
        }

        const sqlInsert2 = `INSERT INTO TestDescriptorOwnership(testDescID, SKUID) VALUES (${id + 1}, ${idSKU});`;
        try {
            const insert2 = dbManager.genericSqlGet(sqlInsert2);
        } catch (error) {
            console.log("error");
        }

    }

    /*function to edit a test descriptor, given its ID*/
    editTestDesciptor(id, body) {

        const newName = body["newName"];
        const newProcedureDescription = body["newProcedureDescription"];
        const newIdSKU = body["newIdSKU"];

        if (newName === undefined || newProcedureDescription === undefined || newIdSKU === undefined)
            throw new Error(Exceptions.message422);

        const sqlUpdate1 = `UPDATE TestDescriptor SET name= ${newName}
        AND description= ${newProcedureDescription} WHERE ID= ${id};`;

        try {
            const update1 = dbManager.genericSqlGet(sqlUpdate1);
        } catch (error) {
            console.log("error");
        }

        const sqlUpdate2 = `UPDATE TestDescriptorOwnership SET SKUID= ${newIdSKU} WHERE testDescID= ${id};`;

        try {
            const update2 = dbManager.genericSqlGet(sqlUpdate2);
        } catch (error) {
            console.log("error");
        }
    }

    /*delete function to remove a test descriptor from the table, given its ID*/
    deleteTestDescriptor(id) {
        const sqlInstruction = `DELETE FROM TestDescriptor WHERE ID= ${id};`
        try {
            const testDescriptor = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return testDescriptor;
    }

    /*getter function to retreive all test results related to an SKUItem, given its RFID - more than a single test*/
    getTestResults(rfid) {
        const sqlInstruction = `SELECT * FROM TestResult WHERE SKUItemID= ${rfid};`;
        try {
            const rows = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return rows.map((row) => row);
    }

    /*getter function to retreive all test results about a particular test related to an SKUItem, given its RFID and the ID of the test descriptor - more than a single test*/
    getTestResult(rfid, id) {
        const sqlInstruction = `SELECT * FROM TestResult WHERE SKUItemID= ${rfid} AND testDescID= ${id};`;
        try {
            const rows = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return rows.map((row) => row);
    }

    /*creation of a new test result*/
    createTestResult(body) {

        const sqlGetCount = 'SELECT COUNT(*) FROM TestResult;'

        try {
            const id = dbManager.genericSqlGet(sqlGetCount);
        } catch (error) {
            console.log("error");
        }

        const rfid = body["rfid"];
        const idTestDesciptor = body["idTestDescriptor"];
        const date = body["Date"];
        const result = body["Result"];

        if (rfid === undefined || idTestDesciptor === undefined || date === undefined || result === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `INSERT INTO TestResult (testDescID, SKUItemID, date, result) VALUES (${id + 1}, ${rfid}, ${date}, ${result});`;
        try {
            const testRes = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return testRes;
    }

    /*function to edit the properties of a SKUItem's test result, given its RFID and the ID of the test descriptor*/
    editTestResult(rfid, id, body) {

        const newIdTestDesciptor = body["newIdTestDescriptor"];
        const newDate = body["newDate"];
        const newResult = body["newResult"];

        if (newIdTestDesciptor === undefined || newDate === undefined || newResult === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `UPDATE TestDescriptor SET testDescID= ${newIdTestDesciptor} AND date= ${newDate} AND result= ${newResult} WHERE testDescID= ${id} AND SKUItemID = ${rfid};`;

        try {
            const testRes = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return testRes;
    }

    /*delete function to remove a test result from the table, given the test descriptor ID and the SKUItem RFID*/
    deleteTestResult(rfid, id) {
        const sqlInstruction = `DELETE FROM TestResult WHERE testDescID= ${id} AND SKUItemID= ${rfid};`;

        try {
            const testRes = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return testRes;
    }

}

module.exports = TestController;