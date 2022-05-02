'use strict'

const PositionController = require("./positionController");
const SkuController = require("./skuController");
const UserController = require("./userController");
const TestController = require("./testController");
const OrderController = require("./orderController");
const ItemController = require("./itemController");

class Controller{
    constructor() {
        this.userController = new UserController();
        this.positionController = new PositionController();
        this.skuController = new SkuController();
        this.testController = new TestController();
        this.orderController = new OrderController();
        this.ItemController = new ItemController();
        console.log("general Controller started");
    }
    
    
}

module.exports = Controller;