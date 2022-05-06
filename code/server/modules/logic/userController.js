'use strict'

const Exceptions = require('../../routers/exceptions');
const CompanyPerson = require('../data/companyPerson');

class UserController {
    #controller;
    #dbManager;
    #id;
    #user = undefined;

    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();
        console.log("testController started");
        //get first available id
        //#id = query;
    }

    getUser() {
        if (this.#user === undefined)
            throw new Error(Exceptions.message401);
        else return this.#user;
    }

    getAllSuppliers() {
        if (this.#user === undefined ||
            this.#user.getType() !== "manager")
            throw new Error(Exceptions.message401);
        else return undefined;
    }

    getAllUsers() {
        if (this.#user === undefined ||
            this.#user.getType() !== "manager")
            throw new Error(Exceptions.message401);
        return undefined;
    }



    createUser(username, name, surname, password, type) {
        if (this.#user === undefined ||
            this.#user.getType() !== "manager")
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
            let row = undefined; //sql query 
            this.#user = new CompanyPerson(row.id, row.type, row.name, row.surname, row.privilegeLevel);
        }
        else {
            throw new Error(Exceptions.message401);
        }

    }

    loginCustomer(username, password) {
        if (false) {
            let row = undefined; //sql query 
            this.#user = new CompanyPerson(row.id, row.type, row.name, row.surname, row.privilegeLevel);
        }
        else {
            throw new Error(Exceptions.message401);
        }
    }

    loginSupplier(username, password) {
        if (false) {
            let row = undefined; //sql query 
            this.#user = new CompanyPerson(row.id, row.type, row.name, row.surname, row.privilegeLevel);
        }
        else {
            throw new Error(Exceptions.message401);
        }
    }

    loginClerk(username, password) {
        if (false) {
            let row = undefined; //sql query 
            this.#user = new CompanyPerson(row.id, row.type, row.name, row.surname, row.privilegeLevel);
        }
        else {
            throw new Error(Exceptions.message401);
        }
    }

    loginQualityEmployee(username, password) {
        if (false) {
            let row = undefined; //sql query 
            this.#user = new CompanyPerson(row.id, row.type, row.name, row.surname, row.privilegeLevel);
        }
        else {
            throw new Error(Exceptions.message401);
        }
    }

    loginDeliveryEmployee(username, password) {
        if (false) {
            let row = undefined; //sql query 
            this.#user = new CompanyPerson(row.id, row.type, row.name, row.surname, row.privilegeLevel);
        }
        else {
            throw new Error(Exceptions.message401);
        }
    }

    logout() {
        if (this.#user === undefined)
            throw new Error(Exceptions.message500);//already logged out
        this.#user = undefined;
        return;
    }

    editUser(username, oldType, newType) {
        if (this.#user === undefined ||
            this.#user.getType() !== "manager")
            throw new Error(Exceptions.message401);
        return undefined;
    }

    deleteUser(username, type) {
        return undefined;
    }

}

module.exports = UserController;