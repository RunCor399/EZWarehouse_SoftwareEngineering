'use strict'

const Exceptions = require('../../routers/exceptions');
const MD5 = require("crypto-js/md5")

class UserController {
    #controller;
    #dbManager;
    #user = {
        id: undefined,
        username : undefined,
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
            throw new Error(Exceptions.message401);
        else return this.#user;
    }

   async getAllSuppliers() {
        const sqlInstruction = "SELECT * FROM USERS U WHERE TYPE='supplier';";
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

        else return rows;

    }

    async getAllUsers() {
        const sqlInstruction = "SELECT * FROM USERS U";

       // if (!this.#user || this.#user.type !== "manager")
         //   throw new Error(Exceptions.message401);
        try {
            const rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            throw (Exceptions.message500);
        }

        if (!rows)
            throw (Exceptions.message404);

        else return rows;
    }



    async createUser(body) {

        console.log(body);

        const sqlGetCount = 'SELECT COUNT(*) FROM USERS'
        let id = 0;
        try {
            id = (await this.#dbManager.genericSqlGet(sqlGetCount))[0]["COUNT(*)"];
            console.log(id);
        } catch (error) {
            console.log("error", error);
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
            `INSERT INTO USERS (id, username, name, surname, password, type) VALUES
             (${id+1}, "${username}" , "${name}", "${surname}", "${hashedPassword}", "${type}");`;

        try {
            this.#dbManager.genericSqlRun(sqlInstruction);
        } catch (error) {
            console.log("error", error);
            throw (Exceptions.message500);
        }

        return;
    }

  async  login(body, type) {


        const username = body["username"];
        const password = body["password"];
        let row;
        if (username === undefined || password === undefined){
            throw new Error(Exceptions.message422);}

        const hashedPassword = MD5(password).toString();

        const sqlInstruction = `SELECT id, username, name, surname, type FROM USERS U 
        WHERE username="${username}" AND password="${hashedPassword}" AND type="${type}"`;

        try {
            row = (await this.#dbManager.genericSqlGet(sqlInstruction))[0];
            console.log(row);
        } catch (error) {
            throw (Exceptions.message500);
        }

        if (row !== undefined) {
            this.#user.id = row.ID;
            this.#user.username = row.username;
            this.#user.name = row.name;
            this.#user.surname = row.surname;
            this.#user.type = row.type;
            this.#logged=true;
            return;
        }
        else {
            throw new Error(Exceptions.message401);
        }
    }

    logout() {
        if (!this.#logged)
            throw new Error(Exceptions.message500);//already logged out
       this.#logged=false;
        return;
    }

    async editUser(username, body) {

        const oldType = body["oldType"];
        const newType = body["newType"];

        if (username === undefined || oldType === undefined || newType === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `UPDATE USERS SET type="${newType}" WHERE type="${oldType}";`;
        try {
           await this.#dbManager.genericSqlRun(sqlInstruction);
        } catch (error) {
            throw (Exceptions.message500);
        }

    }

   async deleteUser(username, type) {

        if (username === undefined || type === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `DELETE FROM USERS WHERE username="${username}" AND type="${type}";`;
        try {
           await this.#dbManager.genericSqlRun(sqlInstruction);
        } catch (error) {
            throw (Exceptions.message500);
        }

    }
}

module.exports = UserController;