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


        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("supplier"))
            throw new Exceptions(401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM Item")
            .then(value => rows = value)
            .catch(error => { throw error });
        return rows;


    }

    /**getter function to retreive a single item given its ID*/
    async getItem(id) {


        /*check if the current user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        /*check if the id is valid*/
        if (!id || isNaN(id))
            throw new Exceptions(422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM Item WHERE id= ?;`, id)
            .then(value => row = value[0])
            .catch(error => { throw error });

        //`SELECT * FROM Item WHERE id= ${id};`


        /*check if the item exists*/
        if (!row)
            throw new Exceptions(404)

        return row;

    }

    /**creation of a new item in the table*/
    async createItem(body) {

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("supplier"))
            throw new Exceptions(401);

        const id = body["id"];
        const description = body["description"];
        const price = body["price"];
        const SKUId = body["SKUId"]
        const supplierId = body["supplierID"];

        /*check if the body is valid*/
        if (!id || !description || !price || !SKUId || !supplierId || isNaN(id) || isNaN(price) || isNaN(SKUId) || isNaN(supplierId))
            throw new Exceptions(422);

        /*check if the supplier already sells an item with the same SKUId*/
        let num1;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM Item WHERE SKUid = ${SKUid} AND supplierId= ${supplierId}')
            .then(value => num1 = value[0]["COUNT(*)"])
            .catch(error => { throw error });
        if (num1 !== 0)
            throw new Exceptions(422)

        //'SELECT COUNT(*) FROM Item WHERE SKUid = ${SKUid} AND supplierId= ${supplierId}', SKUid, supplierId

        /*check if the supplier already sells an item with the same ID*/
        let num2;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM Item WHERE id = ? AND supplierID =?', SKUId, supplierId)
            .then(value => num2 = value[0]["COUNT(*)"])
            .catch(error => { throw new error });
        if (num2 !== 0)
            throw new Exceptions(422)

        //'SELECT COUNT(*) FROM Item WHERE id = ${id} AND supplierID = ${supplierId}'

        /*check if sku exists in the SKU table*/
        let sku;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKU WHERE id = ?`, SKUId)
            .then(value => sku = value[0])
            .catch(error => { throw new error });

        if (!sku)
            throw new Exceptions(404);
        //`SELECT * FROM SKU WHERE id = ${SKUid}`
        
        await this.#dbManager.genericSqlRun(`INSERT INTO Item (id, description, price, SKUId, supplierId) 
        VALUES (?,?,?,?,?);`, id, description, price, SKUId, supplierId)
            .catch(error => { throw error });

        //`INSERT INTO Item (id, description, price, SKUId, supplierId) VALUES (${id}, "${description}", ${price}, ${SKUId}, ${supplierId});`
        


    }

    /**function to edit the properties of a specific item, given its ID*/
    async editItem(id, body) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("supplier"))
            throw new Exceptions(401);

        const newDescription = body["newDescription"];
        const newPrice = body["newPrice"];

        /*check if the body is valid*/
        if (!newDescription || !newPrice || isNaN(newPrice))
            throw new Exceptions(422);

        /*check if the item exists in the Item table*/
        let item;
        await this.#dbManager.genericSqlGet(`SELECT * FROM Item WHERE id = ?`, id)
            .then(value => item = value[0])
            .catch(error => { throw error });
        if (!item)
            throw new Exceptions(404)

        //`SELECT * FROM Item WHERE id = ${id}`

        await this.#dbManager.genericSqlRun(`UPDATE Item SET description= ? , price= ? WHERE SKUid= ?;` , newDescription, newPrice, id)
            .catch(error => { throw error });

        //`UPDATE Item SET description= "${newDescription}", price= ${newPrice} WHERE SKUid= ${id};`

    }

    /**delete function to remove an item from the table, given its ID*/
    async deleteItem(id) {
       

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("supplier"))
            throw new Exceptions(401);

        /*check if the id is valid*/
        if (isNaN(id) || !id)
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun
            (`DELETE FROM Item WHERE ID= ?;`, id)
            .catch((error) => { throw error });

        //`DELETE FROM Item WHERE ID= ${id};`
    }

}

module.exports = ItemController;