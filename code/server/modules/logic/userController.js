'use strict'

const Exceptions = require('../../routers/exceptions');
const CompanyPerson = require('../data/companyPerson');
const MD5 = require("crypto-js/md5")

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



    createUser(body) {

        const username = body["username"];
        const name = body["name"];
        const surname = body["surname"];
        const password = body["password"];
        const type = body["type"];

        if (username === undefined || name === undefined || surname === undefined
            || password === undefined || type === undefined)
            throw new Error(Exceptions.message422);

        const hashedPassword = MD5(password).toString();

        return;
    }

    login(body, type) {

        const username = body["username"];
        const password = body["password"];

        if (username === undefined || password === undefined)
            throw new Error(Exceptions.message422);

        const hashedPassword = MD5(password).toString();


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

    editUser(username, body) {

        const oldType = body["oldType"];
        const newType = body["newType"];

        if (username === undefined || oldType === undefined || newType === undefined)
            throw new Error(Exceptions.message422);
    }

    deleteUser(username, type) {

        if (username === undefined || type === undefined)
            throw new Error(Exceptions.message422);

        return undefined;
    }

}

module.exports = UserController;