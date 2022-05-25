'use strict';

const { expect } = require('chai');
const Controller = require('../modules/logic/controller');

const controller = new Controller();
const userController = controller.getUserController();
const dbManager = controller.getDBManager();

beforeEach(async () => {
    await dbManager.deleteAllData().then(async () => {
        //await dbManager.insertUserTestData();
    })
});

afterEach(async () => {
    await dbManager.deleteAllData();
});

describe("UserController Tests", () => {
    describe("getUserAPI method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });
    
    describe("getUser method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });
    
    describe("getAllSuppliers method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });

    describe("getAllUsers method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });

    describe("createUser method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });

    describe("login method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });

    describe("logout method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });

    describe("editUser method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });

    describe("deleteUser method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });

    describe("hasPermission method testing", () => {
        test("", () => {

        });
        
        test("", () => {

        });
        
        test("", () => {

        });
    });
    
});