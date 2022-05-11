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

        //get first available id
        //#id = query;
    }

    getUser() {
        if (!this.#logged)
            return undefined;
        else return this.#user;
    }

    async getAllSuppliers() {
        /*const sqlInstruction = "SELECT * FROM USERS U WHERE TYPE='supplier';";
        let rows
        //if (!this.#user || this.#user.type() !== "manager")
        //   throw new Error(Exceptions.message401);
        try {
            rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            throw (Exceptions.message500);
        }

        if (!rows)
            throw (Exceptions.message404);
        else return rows;*/

        if (!this.#logged
            //    ||  this.#user.type !== "manager" 
        ) throw new Error(Exceptions.message401)
        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM USERS U WHERE TYPE='supplier';")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;

    }

    async getAllUsers() {
        /* const sqlInstruction = "SELECT * FROM USERS U";
        let rows;
        // if (!this.#user || this.#user.type !== "manager")
        //   throw new Error(Exceptions.message401);
        try {
            rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            throw (Exceptions.message500);
        }

        if (!rows)
            throw (Exceptions.message404);

        else return rows;*/
        if (!this.#logged
            //    ||  this.#user.type !== "manager" 
        ) throw new Error(Exceptions.message401)
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

        if (username === undefined || name === undefined || surname === undefined
            || password === undefined || type === undefined)
            throw new Error(Exceptions.message422);

        let id;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM USERS')
            .then(value => id = value[0]["COUNT(*)"])
            .catch(error => { throw new Error(Exceptions.message500) });

        const hashedPassword = MD5(password).toString();
        const sqlInstruction =
            `INSERT INTO USERS (id, username, name, surname, password, type) VALUES
             (${id + 1}, "${username}" , "${name}", "${surname}", "${hashedPassword}", "${type}");`;


        this.#dbManager.genericSqlRun(sqlInstruction).
            catch((error) => { throw new Error((Exceptions.message500)); });

    }

    async login(body, type) {


        const username = body["username"];
        const password = body["password"];

        if (!username  || !password ) {
            throw new Error(Exceptions.message422);
        }

        const hashedPassword = MD5(password).toString();

        console.log(username, hashedPassword, type);

        const sqlInstruction = `SELECT id, username, name, surname, type FROM USERS U 
        WHERE username="${username}" AND password="${hashedPassword}" AND type="${type}"`;

        let row;
        await this.#dbManager.genericSqlGet(sqlInstruction)
        .then(value => row = value[0])
        .catch (error => { throw new Error(Exceptions.message500) });
        

        if (row !== undefined) {
            this.#user.id = row.ID;
            this.#user.username = row.username;
            this.#user.name = row.name;
            this.#user.surname = row.surname;
            this.#user.type = row.type;
            this.#logged = true;
            return  {id: this.#user.id, username : this.#user.username,  name:this.#user.name};
        }
        else {
            throw new Error(Exceptions.message401);
        }
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

        if (!username || !oldType || !newType)
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
        return validType.includes(type)
    }

}

module.exports = UserController;