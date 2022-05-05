'use strict'

class TestController{
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();
        
        console.log("testController started");
    }

    getAllTestDescriptors(){
        const sqlInstruction = "SELECT * FROM TESTDESCRIPTOR";
        try {
            const rows =   dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    getTestDesciptor(id){
        const sqlInstruction = "SELECT *  FROM TESTDESCRIPTOR WHERE id=" + id;
        try {
            const testDescriptor =  dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return testDescriptor;
    }
    
    createTestDescriptor(name, procedureDescription, idSKU){
        return undefined;
    }

    editTestDesciptor(id, newName, newProcedureDescription, newIdSKU){
        return undefined;
    }

    deleteTestDescriptor(id){
        const sqlInstruction = "DELETE FROM TESTDESCRIPTOR WHERE id=" + id;
        try {
            const testDescriptor =  dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return testDescriptor;
    }

    getTestResults(rfid){
        return undefined;
    }

    getTestResult(rfid, id){
        return undefined;
    }

    createTestResult(rfid, idTestDesciptor, date, result){
        return undefined;
    }

    editTestResult(rfid, id, newIdTestDesciptor, newDate, newResult){
        return undefined;
    }

    deleteTestResult(rfid, id){
        return undefined;
    }
    
}

module.exports = TestController;