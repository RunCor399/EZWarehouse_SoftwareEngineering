'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const TestResultAPICalls = require('./APICalls/TestResultAPICalls');

const baseURL = "http://localhost:3001";

const utilityCalls = new UtilityCalls();
const TestResultAPICalls = new TestResultAPICalls();


describe('Test Result test suite', async () => {
    describe('Standard Test Result getters', async () => {
        it('Succesfully get all test results', async () => { //it indicates a TEST CASE
            /*a test result with rfid=1 should exist*/
            const response = await TestResultAPICalls.getTestResults(1);

            //console.log(response);
            response.status.should.equal(200);

        });

        /*it('Unsuccesfully get all test results, no sku item associated rfid ', async () => {
                 try{
                //no sku item with rfid 1234 in the db
                let response = await TestResultAPICalls.getTestResults(1234);
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(404);
            }
            });

        it('Unsuccesfully get all test results, validation of rfid failed', async () => {
                 try{
                let response = await TestResultAPICalls.getTestResults("gatto");
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(422);
            }
            });
        */
        it('Succesfully get a test result ', async () => { //it indicates a TEST CASE
            /*a test result with id=1 for rfid=1 should exist*/
            const response = await TestResultAPICalls.getTestResultById(1,1);

            //console.log(response);
            response.status.should.equal(200);

        });

        /*it('Unsuccesfully get a test results, no sku item associated rfid ', async () => {
                 try{
                // no sku item with id 1234 in the db
                let response = await TestResultAPICalls.getTestResultById(1,1234);
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(404);
            }
            });

        it('Unsuccesfully get a test results, validation of rfid failed', async () => {
                 try{
                let response = await TestResultAPICalls.getTestResultById(1, "gatto");
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(422);
            }
            });
        */
    });


    describe('POST Requests tests to Test Result', async () => {
        describe('Add a new Test result tests', async() => {
            it('Succesfully add a new Test result', async () => {
                /*a rfid with id 1 should exist, a test descriptor with id 2 should exist*/
                const response = await TestResultAPICalls.addTestResult(1, 2, "2021/11/28", true);
                console.log(response.body);
                response.status.should.equal(201);
            });
            
            /*it('Test Result not added, no sku item associated to rfid ', async () => {
                 try{
                //no rfid with id 1234 should exist
                let response = await TestResultAPICalls.addTestResult(1, 1234, "2021/11/28", true);
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(404);
            }
            });

            it('Test Result not added, validation of request body failed ', async () => {
                 try{
                //worng result format
                let response = await TestResultAPICalls.addTestResult(1, 1, "2021/12/28", 9);
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(422);
            }
            });
            */

        });
    });

    describe('PUT Requests tests to Test Result', async () => {
        describe('Edit a Test Result tests', async() => {
            //a test desc with id=1 exists, a sku item with id=1 exists"
            it('Succesfully edit Test Resut', async () => {
                const response = await TestResultAPICalls.editTestDescriptor(1, 1, "nuova desc", "2021/11/28", false);
                console.log(response.body);
                response.status.should.equal(200);
            });
            
            /*it('Test Result not edited, no sku item associated to rfid ', async () => {
                 try{
                let response = await  TestResultAPICalls.editTestDescriptor(1, 1234, "nuova desc", "2021/11/28", false);
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(404);
            }
            });

            /*it('Test Result not edited, validation of request body failed because of string id', async () => {
                 try{
                let response = await  TestResultAPICalls.editTestDescriptor("gatto", 1, "nuova desc", "2021/11/28", false);
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(422);
            }
            });
            */
        });
    });

    describe('DELETE Requests tests to Test Result', async () => {
        describe('Delete a Test Result tests', async() => {
            it('Succesfully delete a Test Descriptor', async () => {
                /*a test descriptor with id 2 must be in the db, a skuitem withrfid 2 must be in the database*/
                const response = await TestResultAPICalls.deleteTestResult(2, 2);

                console.log(response.body);
                response.status.should.equal(204);
            });
            
            /*it('Test Result not deleted, validation of id failed ', async () => {
                 try{
                let response = await TestResultAPICalls.deleteTestResult("gatto", 2);
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(422);
            }
            }); */

        });
    });


});