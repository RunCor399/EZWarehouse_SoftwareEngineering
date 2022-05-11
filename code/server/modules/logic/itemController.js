'use strict'

const Exceptions = require('../../routers/exceptions');
const Controller = require('./controller')
class ItemController {
    /** @type {Controller} */
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = this.#controller.getDBManager();
        console.log("itemController started");
    }


    /**getter function to retreive all the items*/
    async getAllItems() {
        /* let rows;
         const sqlInstruction = "SELECT * FROM Item";
         try {
             rows = await this.#dbManager.genericSqlGet(sqlInstruction);
         } catch (error) {
             new Error(Exceptions.message500);
         }
         return rows;*/

        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager' && user.type !== 'supplier')
            throw new Error(Exceptions.message401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM Item")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;


    }

    /**getter function to retreive a single item given its ID*/
    async getItem(id) {
        /* let row;
         const sqlInstruction = `SELECT * FROM Item WHERE ID= ${id};`;
         try {
             row = await this.#dbManager.genericSqlGet(sqlInstruction);
         } catch (error) {
             new Error(Exceptions.message500);
         }
         return row;*/

        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager')
            throw new Error(Exceptions.message401);

        if (!id || isNaN(id))
            throw new Error(Exceptions.message422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM Item WHERE ID= ${id};`)
            .then(value => row = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });

        if (!row)
            throw new Error(Exceptions.message404)

        return row;


    }

    /**creation of a new item in the table*/
    async createItem(body) {

        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'supplier')
            throw new Error(Exceptions.message401);

        const id = body["id"];
        const description = body["description"];
        const price = body["price"];
        const SKUid = body["SKUId"]
        const supplierId = body["supplierID"];

        if (!id || !description || !price || !SKUid || !supplierId)
            throw new Error(Exceptions.message422);

        /*add error check: 422 Unprocessable Entity (this supplier already sells an item with the same SKUId or supplier already sells an Item with the same ID)*/

        let row;
        await this.#dbManager.genericSqlRun(`INSERT INTO Item (ID, description, price, SKUId, supplierId) 
            VALUES (${id}, "${description}", ${price}, ${SKUid}, ${supplierId});`)
            .catch(error => { throw new Error(Exceptions.message503) });

        if (!row)
            throw new Error(Exceptions.message404)


        /*const sqlInsert1 = `INSERT INTO Item (ID, description, price, SKUId, supplierId) 
        VALUES (${id}, "${description}", ${price}, ${SKUid}, ${supplierId});`;
        try {
            const insert1 = this.#dbManager.genericSqlGet(sqlInsert1);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        */

        /* ItemSoldPerSupplier can be deleted
        const sqlInsert2 = `INSERT INTO ItemSoldPerSupplier (itemID, supplierID) VALUES (${id + 1}, ${supplierId});`;
        try {
            const insert2 = await this.#dbManager.genericSqlGet(sqlInsert1);
        } catch (error) {
            console.log("error");
        }
        */

    }

    /**function to edit the properties of a specific item, given its ID*/
    async editItem(id, body) {

        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'supplier')
            throw new Error(Exceptions.message401);

        const newDescription = body["newDescription"];
        const newPrice = body["newPrice"];

        if (!newDescription || !newPrice)
            throw new Error(Exceptions.message422);

        let row;
        await this.#dbManager.genericSqlRun(`UPDATE ITEM SET description= "${newDescription}"
            AND price= ${newPrice} WHERE SKUid= ${id};`)
            .catch(error => { throw new Error(Exceptions.message503) });

        if (!row)
            throw new Error(Exceptions.message404)

        /*
        const sqlInstruction = `UPDATE ITEM SET description= "${newDescription}"
        AND price= ${newPrice} WHERE SKUid= ${id};`;
        try {
            const item = await this.#dbManager.genericSqlRun(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message503);
        }
        */
    }

    /**delete function to remove an item from the table, given its ID*/
    async deleteItem(id) {
        /* const sqlInstruction = `DELETE FROM Item WHERE ID= ${id};`;
        try {
            const item = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return item; */

        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'supplier')
            throw new Error(Exceptions.message401);

        if (!id || isNaN(id))
            throw new Error(Exceptions.message422);

        await this.#dbManager.genericSqlRun
            (`DELETE FROM Item WHERE ID= ${id};`)
            .catch((error) => { throw new Error(Exceptions.message503) });
    }

}

module.exports = ItemController;