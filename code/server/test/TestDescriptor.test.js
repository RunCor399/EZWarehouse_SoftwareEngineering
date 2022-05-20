'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const TestDescriptorAPICalls = require('./APICalls/TestDescriptorAPICalls');

const baseURL = "http://localhost:3001";

const utilityCalls = new UtilityCalls();
const testDescriptorAPICalls = new TestDescriptorAPICalls();


describe('Test Descriptor test suite', async () => {
    
    describe('Standard Test Descriptor getters', async () => {
        it('get all test descriptors', async () => { //it indicates a TEST CASE
            const response = await testDescriptorAPICalls.getTestDescriptors();

            //console.log(response);
            response.status.should.equal(200);

        });


        it('get test descriptor by id', async () => { //it indicates a TEST CASE
            const response = await testDescriptorAPICalls.getTestDescriptorById(1);

            //console.log(response.data);
            response.status.should.equal(200);
        });
    });


    describe('POST Requests tests to Test Descriptor', async () => {
        describe('Add a new Test Descriptor tests', async() => {
            it('Succesfully add a new Test Descriptor', async () => {
                const response = await testDescriptorAPICalls.addTestDescriptor("test1", "descrizione test", 1);

                console.log(response.body);
                response.status.should.equal(201);
            });
            
            /*it('Test Descriptor not added, no sku associated idSKU ', async () => {
                 try{
                //HOW TO BE SURE THERE IS NO SKU WITH SKUID IN THE DB?
                //No sku with id 1234 in the db
                //THIS CHECK IS IN THE CONTROLLER WITH THE WRONG CODE
                let response = await TestDescriptorAPICalls.addTestDescriptor("test1", "descrizione test", 1234);;
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(404);
            }
            });

            it('Test Descriptor not added, validation of request body failed ', async () => {
                 try{
                let response = await TestDescriptorAPICalls.addTestDescriptor("test2", "descrizione test", "ciao");;
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(422);
            }
            });
            */

           // it('')
        });
    });

    describe('PUT Requests tests to Test Descriptor', async () => {
        describe('Edit a Test Descriptor tests', async() => {
            it('Succesfully edit Test Descriptor', async () => {
                //test descriptor with id 2 in the db
                const response = await testDescriptorAPICalls.editTestDescriptor(1, "test1", "descrizione test2", 1);

                console.log(response.body);
                response.status.should.equal(200);
            });
            
            /*it('Test Descriptor not edited, no test descriptor associated to id ', async () => {
                 try{
                //no test descriptor with id 10 in the db
                //THIS CHECK IS IN THE CONTROLLER WITH THE WRONG CODE
                let response = await TestDescriptorAPICalls.editTestDescriptor(10, "test1", "descrizione test", 1);
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(404);
            }
            });

            /*it('Test Descriptor not edited, validation of request body failed because of string id', async () => {
                 try{
                let response = await TestDescriptorAPICalls.editTestDescriptor(1, "test2", "descrizione test", "ciao");
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(422);
            }
            });
            */

           // it('')
        });
    });

    describe('DELETE Requests tests to Test Descriptor', async () => {
        describe('Delete a Test Descriptor tests', async() => {
            it('Succesfully delete a Test Descriptor', async () => {
                /*a test descriptor with id 3 must be in the db*/
                const response = await testDescriptorAPICalls.deleteTestDescriptor(3);

                console.log(response.body);
                response.status.should.equal(204);
            });
            
            /*it('Test Descriptor not deleted, validation of id failed ', async () => {
                 try{
                let response = await TestDescriptorAPICalls.deleteTestDescriptor("gatto");
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(422);
            }
            }); */

        });
    });


});