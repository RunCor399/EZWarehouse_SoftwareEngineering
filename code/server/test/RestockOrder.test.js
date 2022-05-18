'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const RestockOrdersAPICalls = require('./APICalls/RestockOrdersAPICalls');

const baseURL = "http://localhost:3001";

const utilityCalls = new UtilityCalls();
const restockOrdersAPICalls = new RestockOrdersAPICalls();


describe('Restock Orders test suite', async () => {
    describe('Standard Restock Order getters', async () => {
        it('get all restock orders', async () => { //it indicates a TEST CASE
            const response = await restockOrdersAPICalls.getIssuedRestockOrders();

            //console.log(response);
            response.status.should.equal(200);
            //expect(response.status).to.equal(200);
        });


        it('get issued restock orders', async () => { //it indicates a TEST CASE
            const response = await restockOrdersAPICalls.getIssuedRestockOrders();

            //console.log(response.data);
            response.status.should.equal(200);
        });

        it('get restock orders by id', async () => { //it indicates a TEST CASE
            const response = await restockOrdersAPICalls.getRestockOrderById(1);

            //console.log(response.data);
            response.status.should.equal(200);
        });
    });


    describe('Items to be returned in restock order test suite', async () => {
        it('order in COMPLETEDRETURN state', async () => { //it indicates a TEST CASE
            let response = await restockOrdersAPICalls.getReturnItemsByRestockOrder(5);
            //console.log(response.data);

            response.status.should.equal(200);
            
        });

        it('Order in a state different from COMPLETEDRETURN', async () => { //it indicates a TEST CASE
            try{
                let response = await restockOrdersAPICalls.getReturnItemsByRestockOrder(1);
                expect(response).to.exist;
            } catch ({ response }) {
                //WHEN ASSERTING ERROR CODES, USE A TRY CATCH
                response.status.should.equal(422);
            }
        });
    });

    describe('POST Requests tests to Restock Orders', async () => {
        describe('Add a new Restock Order tests', async() => {
            it('Succesfully add a new Restock Order', async () => {

            });

           // it('')
        });
    });
   /* it('add restock order', async () => {
        const response = await restockOrdersAPICalls.addRestockOrder();

        console.log(response.body);
        response.status.should.equal(201);
    })*/
});