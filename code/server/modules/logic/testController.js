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
    
    createTestDescriptor(body){
        return undefined;
    }

    editTestDesciptor(id){
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

    createTestResult(body){
        return undefined;
    }

    editTestResult(rfid, id, body){
        return undefined;
    }

    deleteTestResult(rfid, id){
        return undefined;
    }
    
}

module.exports = TestController;