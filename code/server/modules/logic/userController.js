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

    getUserAPI() {
     
        if (!this.#controller.isLoggedAndHasPermission("manager") 
            || !this.#logged )
            throw new Exceptions(401);

        return this.#user;
    }

    getUser() {

        if (!this.#logged)
            throw new Exceptions(401);
        return this.#user;
    }

    async getAllSuppliers() {


        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM USERS U WHERE TYPE='supplier';")
            .then(value => rows = value)
            .catch(error => { throw error });
        return rows;

    }

    async getAllUsers() {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM USERS U")
            .then(value => rows = value)
            .catch(error => { throw error });
        return rows;
    }



    async createUser(body) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        const username = body["username"];
        const name = body["name"];
        const surname = body["surname"];
        const password = body["password"];
        const type = body["type"];

        if (this.#controller.areUndefined(username, name, surname, password, type))
            throw new Exceptions(422);

        const hashedPassword = MD5(password).toString();

        let users;
        await this.getAllUsers()
        .then(value => users = value)
        .catch(error => {throw error})

        let usersEmails = users.map(user => user.email)
        if(usersEmails.includes(username))
        throw new Exceptions(409);

        const sqlInstruction =
            `INSERT INTO USERS ( email, name, surname, password, type) VALUES
             ("${username}" , "${name}", "${surname}", "${hashedPassword}", "${type}");`;

        //const sqlInstruction =`INSERT INTO USERS ( email, name, surname, password, type) VALUES (?,?,?,?,?);` , username, name, surname, hashedPassword, type);

        this.#dbManager.genericSqlRun(sqlInstruction).
            catch((error) => { throw new Exceptions(500); });

    }

    async login(body, type) {


        const username = body["username"];
        const password = body["password"];

        if (this.#controller.areUndefined(username, password))
            throw new Exceptions(422);

        const hashedPassword = MD5(password).toString();
        const sqlInstruction = `SELECT id, email, name, surname, type FROM USERS U 
        WHERE email="${username}" AND password="${hashedPassword}" AND type="${type}"`;

        //const sqlInstruction = `SELECT id, email, name, surname, type FROM USERS U WHERE email= ? AND password= ? AND type= ?`, username, hashedPassword, type;

        let row;
        await this.#dbManager.genericSqlGet(sqlInstruction)
            .then(value => row = value[0])
            .catch(error => { throw error });

        if (!row)
            throw new Exceptions(401);

        this.#user.id = row.id;
        this.#user.username = row.email;
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
            throw new Exceptions(500)//already logged out
        this.#logged = false;
        return;
    }

    async editUser(username, body) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        const oldType = body["oldType"];
        const newType = body["newType"];

        if (this.#controller.areUndefined(username, oldType, newType))
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun
            (`UPDATE USERS SET type="${newType}" WHERE type="${oldType}";`)
            .catch((error) => { throw error });

        //`UPDATE USERS SET type= ? WHERE type= ? ;`, newType, oldType

    }

    async deleteUser(username, type) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        if (this.#controller.areUndefined(username, type) || type === "manager")
            throw new Exceptions(422);


        await this.#dbManager.genericSqlRun
            (`DELETE FROM USERS WHERE email="${username}" AND type="${type}";`)
            .catch((error) => { throw error });

        //`DELETE FROM USERS WHERE email= ? AND type= ?;` , username, type

    }

    hasPermission(type, validType) {
        //console.log(type, validType, validType.includes(type))
        console.log("Type: " + type);
        console.log(" validType: " + validType);
        console.log(" bool: " + validType.includes(type));
        return validType.includes(type);
    }

}

module.exports = UserController;