'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const UserAPICalls = require('./APICalls/UserAPICalls');

const baseURL = "http://localhost:3001";

const utilityCalls = new UtilityCalls();
const userAPICalls = new UserAPICalls();


describe('User test suite', async () => {
    describe('Standard User getters', async () => {
        it('Succesfully get all user info', async () => { //it indicates a TEST CASE
            const response = await userAPICalls.getUserInfo();
            //console.log(response);
            response.status.should.equal(200);
        });

        it('Succesfully get all suppliers', async () => { //it indicates a TEST CASE
            const response = await userAPICalls.getSuppliers();
            //console.log(response);
            response.status.should.equal(200);
        });

        it('Succesfully get all users', async () => { //it indicates a TEST CASE
            const response = await userAPICalls.getUsers();
            //console.log(response);
            response.status.should.equal(200);
        });
    });


    describe('POST Requests tests to User', async () => {
        describe('Add a new user tests', async() => {
            it('Succesfully add a new user', async () => {
                const response = await userAPICalls.newUser("giu@yahoo.it", "giulia", "bianchi", "password", "customer");
                console.log(response.body);
                response.status.should.equal(201);
            });
            
            /*it('User not added, user with same email and type already exists ', async () => {
                 try{
                let response = await UserAPICalls.newUser("user1@ezwh.com","name1","surname1","e16b2ab8d12314bf4efbd6203906ea6c","customer");
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(409);
            }
            });

            it('User not added, wrong user password ', async () => {
                 try{
                let response = await UserAPICalls.newUser("user111@ezwh.com","name1","surname1","c","customer");
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(422);
            }
            });
            */
        });
        describe('User session test', async() => {
            it('Succesfully log a manager', async () => {
                const response = await userAPICalls.managerSessions("manager1@ezwh.com", "e16b2ab8d12314bf4efbd6203906ea6c" );
                console.log(response.body);
                response.status.should.equal(200);
            });

            it('Succesfully log a customer', async () => {
                const response = await userAPICalls.customerSessions("user1@ezwh.com", "e16b2ab8d12314bf4efbd6203906ea6c" );
                console.log(response.body);
                response.status.should.equal(200);
            });
            
            it('Succesfully log a supplier', async () => {
                const response = await userAPICalls.supplierSessions("supplier1@ezwh.com", "e16b2ab8d12314bf4efbd6203906ea6c" );
                console.log(response.body);
                response.status.should.equal(200);
            });

            it('Succesfully log a clerk', async () => {
                const response = await userAPICalls.clerkSessions("clerk1@ezwh.com", "e16b2ab8d12314bf4efbd6203906ea6c" );
                console.log(response.body);
                response.status.should.equal(200);
            });

            it('Succesfully log a quality empolyee', async () => {
                const response = await userAPICalls.qualityEmployeeSessions("qualityEmployee1@ezwh.com", "e16b2ab8d12314bf4efbd6203906ea6c" );
                console.log(response.body);
                response.status.should.equal(200);
            });

            it('Succesfully log a delivery empolyee', async () => {
                const response = await userAPICalls.deliveryEmployeeSessions("deliveryEmployee1@ezwh.com", "e16b2ab8d12314bf4efbd6203906ea6c" );
                console.log(response.body);
                response.status.should.equal(200);
            });

            it('Succesfully logout', async () => {
                const response = await userAPICalls.logout();
                console.log(response.body);
                response.status.should.equal(200);
            });

        });
    });

    describe('PUT Requests tests to User', async () => {
        describe('Edit a user tests', async() => {
            it('Succesfully edit user', async () => {
                /*creare utente con email user12@ezwh.com e tipo customer*/
                const response = await userAPICalls.editUser("user12@ezwh.com", "customer", "clerk");
                console.log(response.body);
                response.status.should.equal(200);
            });
            
            /*it('User not edited, no user associated to username ', async () => {
                 try{
                let response = await UserAPICalls.editUser("user-1@ezwh.com", "customer", "clerk");
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(404);
            }
            });

            it('User not edited, username format is not valid ', async () => {
                 try{
                let response = await UserAPICalls.editUser(undefined, "customer", "clerk");
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(422);
            }
            });
            */
        });
    });

    describe('DELETE Requests tests to user', async () => {
        describe('Delete a user tests', async() => {
            it('Succesfully delete a user', async () => {
                /*a user with username studente@ezwh.com and type customer exists*/
                const response = await userAPICalls.editUser("studente@ezwh.com", "customer");
                console.log(response.body);
                response.status.should.equal(204);
            });
            
            /*it('User not deleted, validation of username failed ', async () => {
                 try{
                let response = await UserAPICalls.editUser(undefined, "customer");
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(422);
            }
            }); */

        });
    });


});