'use strict'

class TestController{
    constructor() {
        console.log("testController started");
    }

    getAllTestDescriptors(){
        return undefined;
    }

    getTestDesciptor(id){
        return undefined;
    }
    
    createTestDescriptor(name, procedureDescription, idSKU){
        return undefined;
    }

    editTestDesciptor(id, newName, newProcedureDescription, newIdSKU){
        return undefined;
    }

    deleteTestDescriptor(id){
        return undefined;
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