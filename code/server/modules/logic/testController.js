'use strict'

class TestController {
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();

        console.log("testController started");
    }

    /*MODIFIED */
    getAllTestDescriptors() {
        const sqlInstruction = "SELECT * FROM TestDescriptor";
        try {
            const rows = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*MODIFIED*/
    getTestDesciptor(id) {
        const sqlInstruction = "SELECT *  FROM TestDescriptor WHERE ID=" + id;
        try {
            const testDescriptor = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return testDescriptor;
    }

    /*NEW - some fields are empty! */
    createTestDescriptor(body) {

        const name = body["name"];
        const procedureDescription = body["procedureDescription"];
        const idSKU = body["idSKU"];

        if (name === undefined || procedureDescription === undefined || idSKU === undefined)
            throw new Error(Exceptions.message422);


        const sqlInstruction = "INSERT INTO TestDescriptor (ID, name, procedureDescription) VALUES (?, ?, ?); INSERT INTO TestDescriptorOwnership (testDescID, SKUID) VALUES (?, ?);";
        try {
            const testDesc = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return testDesc;
    }

    /*NEW - the newIdSKU is missing!*/
    editTestDesciptor(id, body) {

        const newName = body["newName"];
        const newProcedureDescription = body["newProcedureDescription"];
        const newIdSKU = body["newIdSKU"];

        if (newName === undefined || newProcedureDescription === undefined || newIdSKU === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = "UPDATE TestDescriptor SET name=" + newName + " AND description=" + newProcedureDescription + " WHERE ID=" + id;
        try {
            const testDesc = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return testDesc;
    }

    /*MODIFIED */
    deleteTestDescriptor(id) {
        const sqlInstruction = "DELETE FROM TestDescriptor WHERE ID=" + id;
        try {
            const testDescriptor = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return testDescriptor;
    }

    /*NEW */
    getTestResults(rfid) {
        const sqlInstruction = "SELECT *  FROM TestResult WHERE SKUItemID=" + rfid;
        try {
            const testRes = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return testRes;
    }

    /*NEW */
    getTestResult(rfid, id) {
        const sqlInstruction = "SELECT *  FROM TestResult WHERE SKUItemID=" + rfid + " AND testDescID=" + id;
        try {
            const testRes = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return testRes;
    }

    /*NEW */
    createTestResult(body) {

        const rfid = body["rfid"];
        const idTestDesciptor = body["idTestDescriptor"];
        const date = body["Date"];
        const result = body["Result"];

        if (rfid === undefined || idTestDesciptor === undefined || date === undefined || result === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = "INSERT INTO TestResult (testDescID, SKUItemID, date, result) VALUES (?, ?, ?, ?);";
        try {
            const testRes = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return testRes;
    }

    /*NEW */
    editTestResult(rfid, id, body) {

        const newIdTestDesciptor = body["newIdTestDescriptor"];
        const newDate = body["newDate"];
        const newResult = body["newResult"];

        if (newIdTestDesciptor === undefined || newDate === undefined || newResult === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = "UPDATE TestDescriptor SET testDescID=" + newIdTestDesciptor + " AND date=" + newDate + " AND result=" + newResult + " WHERE testDescID=" + id + " AND SKUItemID" + rfid;
        try {
            const testRes = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return testRes;
    }

    /*NEW */
    deleteTestResult(rfid, id) {
        const sqlInstruction = "DELETE FROM ITEM WHERE testDescID=" + id + " AND SKUItemID=" + rfid;
        try {
            const testRes = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return testRes;
    }

}

module.exports = TestController;