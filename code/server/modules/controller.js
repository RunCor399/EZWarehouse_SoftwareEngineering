'use strict'

const PositionController = require("./positionController");
const SkuController = require("./skuController");
const UserController = require("./userController");
const TestController = require("./testController");
const OrderController = require("./orderController");
const ItemController = require("./itemController");
const DBManager = require("./databaseManager");

class Controller{
    constructor() {
        this.userController = new UserController();
        this.positionController = new PositionController();
        this.skuController = new SkuController();
        this.testController = new TestController();
        this.orderController = new OrderController();
        this.itemController = new ItemController();
        this.dbManager = new DBManager();
        console.log("general Controller started");
    }
    
    getUserController(){
        return this.userController;
    }

    getPositionController(){
        return this.positionController;
    }

    getSkuController(){
        return this.skuController;
    }

    getTestController(){
        return this.testController;
    }

    getOrderController(){
        return this.orderController;
    }
    
    getItemController(){
        return this.itemController;
    }
}

module.exports = Controller;