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

        /*let skuitem;
        await this.#dbManager.genericSqlGet(`SELECT *  FROM SKUIrem WHERE RFID= ${rfid};`)
            .then(value => skuitem = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });
        if (sku === undefined)
            throw new Error(Exceptions.message404);*/

        let skuitem;
        await this.#controller.getSkuItemController().getSkuItem(rfid)
            .then(value => skuitem = value)
            .catch(() => { throw new Exceptions(500) });
        if (!skuitem) throw new Exceptions(404)


        let rows;
        await this.#dbManager.genericSqlGet(`SELECT * FROM TestResult WHERE SKUItemID= "${rfid}";`)
            .then(value => rows = value)
            .catch(error => {throw new Exceptions(500)});
        return rows;
    }

    /**getter function to retreive all test results about a particular test related to an SKUItem, given its RFID and the ID of the test result - more than a single test*/
    async getTestResult(rfid, id) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "qualityEmployee"))
            throw new Exceptions(401);
        
        if (this.#controller.areUndefined(id) || this.#controller.areNotNumbers(id)
            || this.#controller.checkRFID(rfid))
            throw new Exceptions(422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM TestResult WHERE rfid= "${rfid}" AND ID= ${id};`)
            .then(value => row = value[0])
            .catch(error => { throw new Exceptions(500) });
        if (!row)
        throw new Exceptions(404)
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
            this.#controller.areUndefined(testDescriptor, date, result)
            || this.#controller.areNotNumbers(idTestDescriptor))
            throw new Exceptions(422)

        /* let skuitem;
         await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItem WHERE rfid= "${rfid}"};`)
             .then(value => skuitem = value[0])
             .catch(error => { throw new Error(Exceptions.message500) });
         if (skuitem === undefined)
             throw new Error(Exceptions.message404)*/

        let skuitem;
        await this.#controller.getSkuItemController().getSkuItem(rfid)
            .then(value => skuitem = value)
            .catch(() => { throw new Exceptions(500) });
        if (!skuitem) throw new Exceptions(404)


        /*let testDescriptor;
        await this.#dbManager.genericSqlGet(`SELECT * FROM TestDescripor WHERE id= "${idTestDescriptor}" ;`)
            .then(value => testDescriptor = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });
        if (testDescriptor === undefined)
            throw new Error(Exceptions.message404)*/

        let testDescriptor;
        await this.#controller.getTestDescriptorController().getTestDesciptor(idTestDescriptor)
            .then(value => testDescriptor = value)
            .catch(() => { throw new Exceptions(500) });
        if (!testDescriptor) throw new Exceptions(404)


        const sqlInstruction = `INSERT INTO TestResult ( testDescID,  SKUItemID, date, result) 
        VALUES ( ${idTestDescriptor}, "${rfid}", "${date}", ${result});`;
        await this.#dbManager.genericSqlRun(sqlInstruction)
            .catch(error => { throw new Exceptions(503); });

    }

    /**function to edit the properties of a SKUItem's test result, given its RFID and the ID of the test result*/
    async editTestResult(rfid, id, body) {


        if (!this.#controller.isLoggedAndHasPermission("manager", "qualityEmployee"))
            throw new Exceptions(401);
        
        const newIdTestDesciptor = body["newIdTestDescriptor"];
        const newDate = body["newDate"];
        const newResult = body["newResult"];

        if (this.#controller.areUndefined(newIdTestDesciptor, newDate, newResult, id)
            || this.#controller.areNotNumbers(id)
            || this.#controller.checkRFID(rfid))
            throw new Exceptions(422);


        /* let skuitem;
         await this.#dbManager.genericSqlGet(`SELECT * FROM SKUItem WHERE rfid= "${rfid}"};`)
             .then(value => skuitem = value[0])
             .catch(error => { throw new Error(Exceptions.message500) });
         if (skuitem === undefined)
             throw new Error(Exceptions.message404)
 
         let testDescriptor;
         await this.#dbManager.genericSqlGet(`SELECT * FROM TestDescripor WHERE id= "${newIdTestDesciptor}" ;`)
             .then(value => testDescriptor = value[0])
             .catch(error => { throw new Error(Exceptions.message500) });
         if (testDescriptor === undefined)
             throw new Error(Exceptions.message404)
 
         let testResult;
         await this.#dbManager.genericSqlGet(`SELECT * FROM TestResult WHERE id= "${id}" ;`)
             .then(value => testResult = value[0])
             .catch(error => { throw new Error(Exceptions.message500) });
         if (testResult === undefined)
             throw new Error(Exceptions.message404)*/

        let skuitem;
        await this.#controller.getSkuItemController().getSkuItem(rfid)
            .then(value => skuitem = value)
            .catch(() => { throw new Exceptions(500) });
        if (!skuitem)  throw new Exceptions(404)

        let testDescriptor;
        await this.#controller.getTestDescriptorController().getTestDesciptor(idTestDescriptor)
            .then(value => testDescriptor = value)
            .catch(() => { throw new Exceptions(500) });
        if (!testDescriptor) throw new Exceptions(404)

        let testResult;
        await this.getTestResult(id)
            .then(value => testResult = value)
            .catch(() => { throw new Exceptions(500) });
        if (!testResult) throw new Exceptions(404)


        const sqlInstruction = `UPDATE TestResult SET testDescID= ${idTestDesciptor} 
        AND date= "${newDate}" AND result= ${newResult} WHERE ID= ${id} AND SKUItemID = "${rfid}";`;

        await this.#dbManager.genericSqlRun(sqlInstruction)
            .catch(error => { throw new Exceptions(503) });
    }


    /**delete function to remove a test result from the table, given the test descriptor ID and the SKUItem RFID*/
    async deleteTestResult(rfid, id) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "qualityEmployee"))
        throw new Exceptions(401);

        if (this.#controller.checkRFID(rfid) || this.#controller.areUndefined(id)
            || this.#controller.areNotNumbers(id))
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun
            (`DELETE FROM TestResult WHERE ID= ${id} AND SKUItemID= "${rfid}";`)
            .catch((error) => { throw new Exceptions(500) });

    }

}

module.exports = TestResultController;