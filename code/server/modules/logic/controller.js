'use strict'

const PositionController = require("./positionController");
const SkuController = require("./skuController");
const UserController = require("./userController");
const TestController = require("./testController");
const OrderController = require("./orderController");
const ItemController = require("./itemController");
const DBManager = require("../database/databaseManager");

class Controller {

    #itemController;
    #userController;
    #positionController;
    #skuController;
    #testController;
    #orderController;
    #dbManager;

    constructor() {
        this.#dbManager = new DBManager();


        this.#itemController = new ItemController(this);
        this.#userController = new UserController(this);
        this.#positionController = new PositionController(this);
        this.#skuController = new SkuController(this);
        this.#testController = new TestController(this);
        this.#orderController = new OrderController(this);
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

    getTestController() {
        return this.#testController;
    }

    getOrderController() {
        return this.#orderController;
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

    print() {
        console.log("Test"); //DEPRECATED
    }

    getSession() {
        return this.#userController.getUser();
    }

}

module.exports = Controller;
