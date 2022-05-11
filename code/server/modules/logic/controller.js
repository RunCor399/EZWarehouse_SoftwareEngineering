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
const SkuItemController = require("./skuItemController");
const Exceptions = require("../../routers/exceptions");
const { use } = require("../../routers/internalOrderRouter");

class Controller {

    #itemController;
    #userController;
    #positionController;
    #skuController;
    #skuItemController
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
        this.#skuItemController = new SkuItemController(this);
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

    getSkuItemController() {
        return this.#skuItemController;
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

    getSession() {
        let user;
        try {
            user = this.#userController.getUser();
        } catch (error) {
            throw new Error(Exceptions.message401)
        }
        return user;
    }

    isLoggedAndHasPermission(...validType) {
        let user = this.#userController.getUser()
        if (!user) return false;
        return this.#userController.hasPermission(user.type, validType);
    }

    areUndefined(...params) {
        console.log(params);
        return (params.includes(undefined));
    }

    areNotNumbers(...params) {
        console.log(params)
        return params.some((num) => isNaN(num));
    }

    checkRFID(rfid) {
        return (!rfid || isNaN(Number(rfid)) || rfid.length !== 32)
    }

}

module.exports = Controller;
