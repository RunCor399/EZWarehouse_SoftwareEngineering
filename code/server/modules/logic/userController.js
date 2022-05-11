'use strict'

const Exceptions = require('../../routers/exceptions');
const MD5 = require("crypto-js/md5")
const Controller = require('./controller')
class UserController {
    /** @type {Controller} */
    #controller;
    #dbManager;
    #user = {
        id: undefined,
        username: undefined,
        name: undefined,
        surname: undefined,
        type: undefined,

    };
    #logged = false;

    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = this.#controller.getDBManager();
        console.log("testController started");


    }

    getUser() {
        if (!this.#logged)
            return undefined;
        else return this.#user;
    }

    async getAllSuppliers() {


        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Error(Exceptions.message401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM USERS U WHERE TYPE='supplier';")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;

    }

    async getAllUsers() {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Error(Exceptions.message401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM USERS U")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;
    }



    async createUser(body) {

        const username = body["username"];
        const name = body["name"];
        const surname = body["surname"];
        const password = body["password"];
        const type = body["type"];

        if (this.#controller.areUndefined(username, name, surname, password, type))
            throw new Error(Exceptions.message422);

        const hashedPassword = MD5(password).toString();
        const sqlInstruction =
            `INSERT INTO USERS ( username, name, surname, password, type) VALUES
             ("${username}" , "${name}", "${surname}", "${hashedPassword}", "${type}");`;


        this.#dbManager.genericSqlRun(sqlInstruction).
            catch((error) => { throw new Error((Exceptions.message500)); });

    }

    async login(body, type) {


        const username = body["username"];
        const password = body["password"];

        if (this.#controller.areUndefined(username, password))
            throw new Error(Exceptions.message422);

        const hashedPassword = MD5(password).toString();
        const sqlInstruction = `SELECT id, username, name, surname, type FROM USERS U 
        WHERE username="${username}" AND password="${hashedPassword}" AND type="${type}"`;

        let row;
        await this.#dbManager.genericSqlGet(sqlInstruction)
            .then(value => row = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });

        console.log(row === undefined);


        if (!row)
            throw new Error(Exceptions.message401);

        this.#user.id = row.ID;
        this.#user.username = row.username;
        this.#user.name = row.name;
        this.#user.surname = row.surname;
        this.#user.type = row.type;
        this.#logged = true;
        return (
            {
                id: this.#user.id,
                username: this.#user.username,
                name: this.#user.name
            });

    }

    logout() {
        if (!this.#logged)
            throw new Error(Exceptions.message500);//already logged out
        this.#logged = false;
        return;
    }

    async editUser(username, body) {

        const oldType = body["oldType"];
        const newType = body["newType"];

        if (this.#controller.areUndefined(username, oldType, newType))
            throw new Error(Exceptions.message422);

        await this.#dbManager.genericSqlRun
            (`UPDATE USERS SET type="${newType}" WHERE type="${oldType}";`)
            .catch((error) => { throw new Error(Exceptions.message500); });

    }

    async deleteUser(username, type) {

        if (!username || !type)
            throw new Error(Exceptions.message422);

        await this.#dbManager.genericSqlRun
            (`DELETE FROM USERS WHERE username="${username}" AND type="${type}";`)
            .catch((error) => { throw new Error(Exceptions.message500) });

    }

    hasPermission(type, validType) {
        console.log(type, validType, validType.includes(type))
        return validType.includes(type)
    }

}

module.exports = UserController;