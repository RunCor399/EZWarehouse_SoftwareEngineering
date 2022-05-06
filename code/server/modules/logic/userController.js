'use strict'

const Exceptions = require('../../routers/exceptions');

class UserController {
    #controller;
    #dbManager;
    #id = 1;
    #session = {
        id: 0,
        username: "",
        name: "",
        surname: "",
        type: ""
    };

    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();
        console.log("testController started");

    }

    getUser() {
        if (this.#session.username === "")
            throw new Error(Exceptions.message401);
        else return this.#session;
    }

    getAllSuppliers() {
        if (this.#session.username === "" ||
            this.#session.type !== "manager")
            throw new Error(Exceptions.message401);
        else return undefined;
    }

    getAllUsers() {
        if (this.#session.username === "" ||
            this.#session.type !== "manager")
            throw new Error(Exceptions.message401);
        return undefined;
    }



    createUser(username, name, surname, password, type) {
        if (this.#session.username === "" ||
            this.#session.type !== "manager")
            throw new Error(Exceptions.message401);
        else if (true) //errore409//
            throw new Error(Exceptions.message404);
        else if (type === "manager")
            throw new Error(Exceptions.message422);
        //execute query
        return;
    }


    loginManager(username, password) {

        if (false) {
            this.#session.username = username;
            this.#session.type = "manager"
        }
        else {
            throw new Error(Exceptions.message401);
        }

    }

    loginCustomer(username, password) {
        if (true) {
            session.username = username;
            session.type = "customer"
        }
        else {
            throw new Error(Exceptions.message401);
        }
    }

    loginSupplier(username, password) {
        if (true) {
            session.username = username;
            session.type = "supplier"
        }
        else {
            throw new Error(Exceptions.message401);
        }
    }

    loginClerk(username, password) {
        if (true) {
            session.username = username;
            session.type = "clerk"
        }
        else {
            throw new Error(Exceptions.message401);
        }
    }

    loginQualityEmployee(username, password) {
        if (true) {
            session.username = username;
            session.type = "qualityEmployee"
        }
        else {
            throw new Error(Exceptions.message401);
        }
    }

    loginDeliveryEmployee(username, password) {
        if (true) {
            session.username = username;
            session.type = "deliveryEmployee"
        }
        else {
            throw new Error(Exceptions.message401);
        }
    }

    logout() {
        if (this.#session.username === "" ||
            this.#session.type === "")
            throw new Error(Exceptions.message500);//already logged out
        this.#session.username = "";
        this.#session.type = "";
        return;
    }

    editUser(username, oldType, newType) {
        if (this.#session.username === "" ||
            this.#session.type !== "manager")
            throw new Error(Exceptions.message401);
        return undefined;
    }

    deleteUser(username, type) {
        return undefined;
    }

}

module.exports = UserController;