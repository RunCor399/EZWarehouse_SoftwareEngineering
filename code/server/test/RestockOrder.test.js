'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const RestockOrdersAPICalls = require('./APICalls/RestockOrdersAPICalls');
const DBManager = require('../modules/database/databaseManager');

const baseURL = "http://localhost:3001";

//const utilityCalls = new UtilityCalls();
const databaseManager = new DBManager();
const restockOrdersAPICalls = new RestockOrdersAPICalls();


describe('restock', async () => {
    before(async () => {
        // runs once before the first test in this block
        databaseManager.deleteAllData();
      });

    describe('Standard Restock Order getters', async () => {
        it.only('get all restock orders', async () => { //it indicates a TEST CASE
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
        it('order in COMPLETEDRETURN state', async () => { 
            const response = await restockOrdersAPICalls.getReturnItemsByRestockOrder(1);

            response.status.should.equal(200);

        });

        it('Order in a state different from COMPLETEDRETURN', async () => { 
                const response = await restockOrdersAPICalls.getReturnItemsByRestockOrder(2);
                
                response.status.should.equal(422);
        });
    });

    describe('POST Requests tests to Restock Orders', async () => {
        describe('Add a new Restock Order tests', async() => {
            it('Succesfully add a new Restock Order', async () => {

            });

            it('Restock Order with non-existing Supplier ID', async () => {
                //THIS CHECK IS NOT PRESENT IN THE CONTROLLER
            });

            it('Restock Order with non-existing SKU', async () => {
                //THIS CHECK IS NOT PRESENT IN THE CONTROLLER
            });
        });
    });

    describe('PUT Requests tests to Restock Orders', async () => {
        describe('Modify State of a Restock Order by id', async () => {

        });

        describe('Add a list of SKUItems to a Restock Order by id', async () => {

        });

        describe('Add a transportNote to a Restock Order by id', async () => {

        });
    });

    describe('DELETE Requests tests to Restock Orders', async () => {
        describe('Delete a Restock Order by id', async () => {

        });
    });






   /* it('add restock order', async () => {
        const response = await restockOrdersAPICalls.addRestockOrder();

        console.log(response.body);
        response.status.should.equal(201);
    })*/
});