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

        /*check if the current user is authorized*/
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

        /*check if the current user is authorized */
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager')
            throw new Error(Exceptions.message401);

        /*check if the id is valid*/
        if (!id || isNaN(id))
            throw new Error(Exceptions.message422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM Item WHERE id= ${id};`)
            .then(value => row = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });

        /*check if the item exists*/
        if (!row)
            throw new Error(Exceptions.message404)

        return row;

    }

    /**creation of a new item in the table*/
    async createItem(body) {

        /*check if the user is authorized */
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

        /*check if the body is valid*/
        if (!id || !description || !price || !SKUid || !supplierId || isNaN(id) || isNaN(price) || isNaN(SKUid) || isNaN(supplierId))
            throw new Error(Exceptions.message422);

        /*check if the supplier already sells an item with the same SKUId*/
        let num1;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM Item WHERE SKUid = ${SKUid} AND supplierId= ${supplierId}')
            .then(value => num1 = value[0]["COUNT(*)"])
            .catch(error => { throw new Error(Exceptions.message503) });
        if (num1 !== 0)
            throw new Error(Exceptions.message422)

        /*check if the supplier already sells an item with the same ID*/
        let num2;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM Item WHERE id = ${id} AND supplierID = ${supplierId}')
            .then(value => num2 = value[0]["COUNT(*)"])
            .catch(error => { throw new Error(Exceptions.message503) });
        if (num2 !== 0)
            throw new Error(Exceptions.message422)

        /*check if sku exists in the SKU table*/
        let sku;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKU WHERE id = ${SKUid}`)
            .then(value => sku = value[0])
            .catch(error => { throw new Error(Exceptions.message503) });

        if (!sku)
            throw new Error(Exceptions.message404)

        let row;
        await this.#dbManager.genericSqlRun(`INSERT INTO Item (id, description, price, SKUId, supplierId) 
            VALUES (${id}, "${description}", ${price}, ${SKUid}, ${supplierId});`)
            .catch(error => { throw new Error(Exceptions.message503) });


        /*const sqlInsert1 = `INSERT INTO Item (ID, description, price, SKUId, supplierId) 
        VALUES (${id}, "${description}", ${price}, ${SKUid}, ${supplierId});`;
        try {
            const insert1 = this.#dbManager.genericSqlGet(sqlInsert1);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        */

    }

    /**function to edit the properties of a specific item, given its ID*/
    async editItem(id, body) {

        /*check if the user is authorized*/
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

        /*check if the body is valid*/
        if (!newDescription || !newPrice || isNaN(newPrice))
            throw new Error(Exceptions.message422);

        /*check if the item exists in the Item table*/
        let item;
        await this.#dbManager.genericSqlGet(`SELECT * FROM Item WHERE id = ${id}`)
            .then(value => item = value[0])
            .catch(error => { throw new Error(Exceptions.message503) });

        if (!item)
            throw new Error(Exceptions.message404)

        let row;
        await this.#dbManager.genericSqlRun(`UPDATE Item SET description= "${newDescription}"
            AND price= ${newPrice} WHERE SKUid= ${id};`)
            .catch(error => { throw new Error(Exceptions.message503) });

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

        /*check if the user is authorized*/
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'supplier')
            throw new Error(Exceptions.message401);

        /*check if the id is valid*/
        if (isNaN(id) || !id)
            throw new Error(Exceptions.message422);

        await this.#dbManager.genericSqlRun
            (`DELETE FROM Item WHERE id= ${id};`)
            .catch((error) => { throw new Error(Exceptions.message503) });
    }

}

module.exports = ItemController;