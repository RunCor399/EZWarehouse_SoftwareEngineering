'use strict'

const Exceptions = require('../../routers/exceptions');
const MD5 = require("crypto-js/md5")

class UserController {
    #controller;
    #dbManager;
    #user = undefined;

    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = this.#controller.getDBManager();
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
        const sqlInstruction = "SELECT * FROM USERS U WHERE TYPE='supplier'";;

        if (this.#user === undefined ||
            this.#user.getType() !== "manager")
            throw new Error(Exceptions.message401);
        try {
            const rows = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            throw (Exceptions.message500);
        }

        if (rows === undefined)
            throw (Exceptions.message404);

        else return rows;

    }

    getAllUsers() {
        const sqlInstruction = "SELECT * FROM USERS U";

        if (this.#user === undefined ||
            this.#user.getType() !== "manager")
            throw new Error(Exceptions.message401);
        try {
            const rows = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            throw (Exceptions.message500);
        }

        if (rows === undefined)
            throw (Exceptions.message404);

        else return rows;
    }



    createUser(body) {

        const sqlGetCount = 'SELECT COUNT(*) FROM USERS'

        try {
            const id = this.#dbManager.genericSqlGet(sqlGetCount);
        } catch (error) {
            throw (Exceptions.message500);
        }

        const username = body["username"];
        const name = body["name"];
        const surname = body["surname"];
        const password = body["password"];
        const type = body["type"];

        if (username === undefined || name === undefined || surname === undefined
            || password === undefined || type === undefined)
            throw new Error(Exceptions.message422);

        const hashedPassword = MD5(password).toString();

        const sqlInstruction =
            `INSERT INTO USERS (id, username, name, surname, 
                password, type) VALUES (${id + 1}, ${username} ,${name}, 
                    ${surname}. ${hashedPassword}, ${type});`;

        try {
            this.#dbManager.genericSqlRun(sqlInstruction);
        } catch (error) {
            throw (Exceptions.message500);
        }

        return;
    }

    login(body, type) {


        const username = body["username"];
        const password = body["password"];

        if (username === undefined || password === undefined)
            throw new Error(Exceptions.message422);

        const hashedPassword = MD5(password).toString();

        const sqlInstruction = `SELECT id, username, name, surname, type FROM USERS U 
        WHERE username=${username} AND password=${hashedPassword}`;

        try {
            const row = this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            throw (Exceptions.message500);
        }

        if (row !== undefined) {
            this.#user.id = row.id;
            this.#user.username = row.username;
            this.#user.name = row.name;
            this.#user.surname = row.surname;
            this.#user.type = row.type;
            return;
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

        const sqlInstruction = `UPDATE USERS SET type=${newType} WHERE type=${oldType};`;
        try {
            this.#dbManager.genericSqlRun(sqlInstruction);
        } catch (error) {
            throw (Exceptions.message500);
        }

    }

    deleteUser(username, type) {

        if (username === undefined || type === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `DELETE FROM USERS WHERE username=${username} AND type=${type};`;
        try {
            this.#dbManager.genericSqlRun(sqlInstruction);
        } catch (error) {
            throw (Exceptions.message500);
        }

    }
}

module.exports = UserController;