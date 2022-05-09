'use strict'

const PositionController = require("./positionController");
const SkuController = require("./skuController");
const UserController = require("./userController");
const TestResultController = require("./testResultController");
const TestDescriptorController = require("./testDescriptorController");
const InternalOrderController = require("./internalOrderController");
const RestockOrderController = require("./restockOrderController");
const ReturnOrderController = require("./returnOrderController");
const ItemController = require("./itemController");
const DBManager = require("../database/databaseManager");

class Controller {

    #itemController;
    #userController;
    #positionController;
    #skuController;
    #testResultController;
    #testDescriptorController;
    #restockOrderController;
    #returnOrderController;
    #internalOrderController;
    #dbManager;

    constructor() {
        this.#dbManager = new DBManager();


        this.#itemController = new ItemController(this);
        this.#userController = new UserController(this);
        this.#positionController = new PositionController(this);
        this.#skuController = new SkuController(this);
        this.#testResultController = new TestResultController(this);
        this.#testDescriptorController = new TestDescriptorController(this);
        this.#restockOrderController = new RestockOrderController(this);
        this.#returnOrderController = new ReturnOrderController(this);
        this.#internalOrderController = new InternalOrderController(this);
        console.log("general Controller started");
    }



    getUserController() {
        return this.#userController;
    }

    getPositionController() {
        return this.#positionController;
    }

    getSkuController() {
        return this.#skuController;
    }

    getTestResultController() {
        return this.#testResultController;
    }

    getTestDescriptorController() {
        return this.#testDescriptorController;
    }

    getRestockOrderController() {
        return this.#restockOrderController;
    }

    getReturnOrderController() {
        return this.#returnOrderController;
    }

    getInternalOrderController() {
        return this.#internalOrderController;
    }

    getItemController() {
        return this.#itemController;
    }

    getDBManager() {
        return this.#dbManager;
    }

    testPrint(string) {
        console.log(string);
    }

    getSession() {
        return this.#userController.getUser();
    }

}

module.exports = Controller;
