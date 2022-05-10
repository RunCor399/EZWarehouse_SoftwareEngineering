'use strict'

const Exceptions = require('../../routers/exceptions');
const Controller = require('./controller')

class SkuController {
    /** @type {Controller} */
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = this.#controller.getDBManager();

        console.log("skuController started");
    }

    /**getter function to retreive all the SKUs*/
    async getAllSku() {
        /*let rows;
        const sqlInstruction = "SELECT * FROM SKU";
        try {
             rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return rows;*/

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM SKU")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;
    }

    /**getter function to retreive a single SKU, given its ID*/
    async getSku(id) {
        /*const sqlInstruction = `SELECT *  FROM SKU WHERE ID= ${id};`;
        try {
            const sku = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return sku;*/

        let sku;
        await this.#dbManager.genericSqlGet(`SELECT *  FROM SKU WHERE ID= ${id};`)
            .then(value => sku = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return sku;


    }

    /**TO CHECK - availableQuantity is missing in the SKU table */
    async createSku(body) {

        const description = body["description"];
        const weight = body["weight"];
        const volume = body["volume"];
        const notes = body["notes"];
        const price = body["price"];
        const availableQuantity = body["availableQuantity"];

        if (!description || !weight || !volume || !notes || !price || !availableQuantity)
            throw new Error(Exceptions.message422);



        /* let id;
         const sqlGetCount = 'SELECT COUNT(*) FROM SKU'
 
         try {
              id = (await this.#dbManager.genericSqlGet(sqlGetCount))[0]["COUNT(*)"];
         } catch (error) {
             new Error(Exceptions.message500);
         }*/

        let id;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM SKU')
            .then(value => id = value[0]["COUNT(*)"])
            .catch(error => { throw new Error(Exceptions.message500) });

        const sqlInstruction = `INSERT INTO SKU (ID, weight, volume, price, notes, description, availableQuantity, positionID)
         VALUES (${id + 1}, ${weight}, ${volume}, ${price}, "${notes}", "${description}", ${availableQuantity}, NULL);`;

        await this.#dbManager.genericSqlRun(sqlInstruction)
            .catch((error) => { throw new Error(Exceptions.message500) });

    }

    /**TO CHECK - availableQuantity is missing in the SKU table */
    async editSku(id, body) {

        const newDescription = body["newDescription"];
        const newWeight = body["newWeight"];
        const newVolume = body["newVolume"];
        const newNotes = body["newNotes"];
        const newPrice = body["newPrice"];
        const newAvailableQuantity = req.body["newAvailableQuantity"];

        if (!newDescription || !newWeight || !newVolume || !newNotes || !newPrice || !newAvailableQuantity)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `UPDATE SKU SET weight= ${newWeight} AND volume= ${newVolume} AND price= ${newPrice} 
        AND notes= "${newNotes}" AND description= "${newDescription}" AND availableQuantity= ${newAvailableQuantity} WHERE ID=${id};`;
        await this.#dbManager.genericSqlRun(sqlInstruction)
            .catch((error) => { new Error(Exceptions.message500); });


        let sku;
        await this.#dbManager.genericSqlGet(`SELECT *  FROM SKU WHERE ID= ${id};`)
            .then(value => sku = value)
            .catch(error => { throw new Error(Exceptions.message500) });

        if (sku.position) {
            const sqlUpdate2 = `UPDATE Position SET occupiedWeight= ${newWeight} AND occupiedVolume = ${newVolume} WHERE ID= ${sku.position};`;
            try {
                const update2 = await this.#dbManager.genericSqlGet(sqlUpdate2);
            } catch (error) {
                new Error(Exceptions.message500);
            }
        }

    }

    /**TO CHECK*/
    async setPosition(id, body) {

        const position = body["position"];

        if (!position)
            throw new Error(Exceptions.message422);

        const sqlUpdate1 = `UPDATE SKU SET position= ${position} WHERE ID= ${id};`;
        try {
            const update1 = await this.#dbManager.genericSqlGet(sqlUpdate1);
        } catch (error) {
            new Error(Exceptions.message500);
        }

        /*the SKUStorage table can be deleted

        const sqlInstruction = `UPDATE SKUStorage SET positionID= ${position} WHERE SKUID= ${id};`;
        try {
            const position = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        */

        let sku;
        await this.#dbManager.genericSqlGet(`SELECT *  FROM SKU WHERE ID= ${id};`)
            .then(value => sku = value)
            .catch(error => { throw new Error(Exceptions.message500) });

        const sqlUpdate2 = `UPDATE Position SET occupiedWeight= ${sku.weight} AND occupiedVolume = ${sku.volume} WHERE ID= ${position}`;
        try {
            const update2 = await this.#dbManager.genericSqlGet(sqlUpdate2);
        } catch (error) {
            new Error(Exceptions.message500);
        }

    }

    /**delete function to remove an SKU from the table, given its ID */
    async deleteSku(id) {
        /* const sqlInstruction = `DELETE FROM SKU WHERE ID= ${id};`;
         try {
             await this.#dbManager.genericSqlRun(sqlInstruction);
         } catch (error) {
             throw new Error(Exceptions.message500);
         }
         
         return sku; //sku returned to test it
         */

        await this.#dbManager.genericSqlRun(`DELETE FROM SKU WHERE ID= ${id};`)
            .catch((error) => { throw new Error(Exceptions.message500); });

    }
}

module.exports = SkuController;