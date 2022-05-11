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


        if (!this.#controller.isLoggedAndHasPermission("manager", "customer", "clerk"))
            throw new Error(Exceptions.message401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM SKU")
            .then(value => rows = value)
            .catch(error => { throw new Error(Exceptions.message500) });
        return rows;
    }

    /**getter function to retreive a single SKU, given its ID*/
    async getSku(id) {

        if (this.#controller.areUndefined(id) || this.#controller.areNotNumbers(id))
            throw new Error(Exceptions.message422);

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Error(Exceptions.message401);

        let sku;
        await this.#dbManager.genericSqlGet(`SELECT *  FROM SKU WHERE ID= ${id};`)
            .then(value => sku = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });

        if (!sku)
            throw new Error(Exceptions.message404);

        return sku;


    }

    /**TO CHECK - availableQuantity is missing in the SKU table */
    async createSku(body) {


        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Error(Exceptions.message401);

        const description = body["description"];
        const weight = body["weight"];
        const volume = body["volume"];
        const notes = body["notes"];
        const price = body["price"];
        const availableQuantity = body["availableQuantity"];

        if (this.#controller.areUndefined(description, weight, volume, notes, price, availableQuantity)
            || this.#controller.areNotNumbers(weight, volume, price, availableQuantity))
            throw new Error(Exceptions.message422);

        const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
         VALUES ( ${weight}, ${volume}, ${price}, "${notes}", "${description}", ${availableQuantity});`;

        await this.#dbManager.genericSqlRun(sqlInstruction)
            .catch((error) => { throw new Error(Exceptions.message503) });

    }

    /**TO CHECK - availableQuantity is missing in the SKU table */
    async editSku(id, body) {

        //permission check
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Error(Exceptions.message401);

        //validation of body and id
        const newDescription = body["newDescription"];
        const newWeight = body["newWeight"];
        const newVolume = body["newVolume"];
        const newNotes = body["newNotes"];
        const newPrice = body["newPrice"];
        const newAvailableQuantity = req.body["newAvailableQuantity"];

        if (this.#controller.areUndefined(newDescription, newWeight, newVolume, newNotes, newPrice, newAvailableQuantity, id)
            || this.#controller.areNotNumbers(newWeight, newVolume, newPrice, newAvailableQuantity, id))
            throw new Error(Exceptions.message422);

        /* //check if sku exists
         let num;
         await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM SKU')
             .then(value => num = value[0]["COUNT(*)"])
             .catch(error => { throw new Error(Exceptions.message503) });
         if (num === 0)
             throw new Error(Exceptions.message404)*/

        let sku;
        try {
            sku = await this.getSku(id);
        } catch (error) {
            throw new Error(Exceptions.message404);
        }


        //check if sku has position
        let position;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKU_in_Position WHERE SKUId = ${id}`)
            .then(value => position = value[0])
            .catch(error => { throw new Error(Exceptions.message503) });

        if (position !== undefined) {

            //if sku has position, check if position can contains modified sku
            if (position.maxWeight < newWeight * newAvailableQuantity
                || position.maxVolume < newVolume * newAvailableQuantity)
                throw new Error(Exceptions.message422);

            //update position info
            const sqlUpdate = `UPDATE Position SET occupiedWeight= ${newWeight * newAvailableQuantity} 
                AND occupiedVolume = ${newVolume * newAvailableQuantity} WHERE ID= ${position.positionId};`;
            try {
                await this.#dbManager.genericSqlRun(sqlUpdate);
            } catch (error) {
                new Error(Exceptions.message503);
            }
        }

        //update sku info
        const sqlInstruction =
            `UPDATE SKU SET weight= ${newWeight} AND volume= ${newVolume} AND price= ${newPrice} 
            AND notes= "${newNotes}" AND description= "${newDescription}" AND 
             availableQuantity= ${newAvailableQuantity} WHERE ID=${id};`;

        await this.#dbManager.genericSqlRun(sqlInstruction)
            .catch((error) => { new Error(Exceptions.message503); });

    }

    /**TO CHECK*/
    async setPosition(id, body) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Error(Exceptions.message401);

        const positionId = body["position"];

        if (this.#controller.areUndefined(positionId, id) || this.#controller.areNotNumbers(id))
            throw new Error(Exceptions.message422);

        let sku;
        await this.getSku(id)
        .then(value => sku = value)
        .catch(() => {throw new Error(Exceptions.message500)});
        if(!sku) throw new Error(Exceptions.message404)
        

        let position;
        await this.#dbManager.genericSqlGet(`SELECT * FROM Positions WHERE id= ${positionId};`)
            .then(value => position = value[0])
            .catch(error => { throw new Error(Exceptions.message503) });
        //error if id doesnt exist


        if (position.maxWeight < sku.weight * sku.availableQuantity
            || position.maxVolume < sku.volume * sku.availableQuantity)
            throw new Error(Exceptions.message422);

        let testValue;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKU_in_Position WHERE positionId = ${positionId}`)
            .then(value => testValue = value[0])
            .catch(error => { throw new Error(Exceptions.message503) });

        if (!testValue)
            throw new Error(Exceptions.message422);

        const sqlInsert =
            `INSERT INTO SKU_in_Position SET(SKUId, positionID) 
            VALUES (${id} ,${positionId});`;
        await this.#dbManager.genericSqlRun(sqlInsert)
            .catch((error) => { throw new Error(Exceptions.message503) });


        const sqlUpdate = `UPDATE Position SET occupiedWeight= ${sku.weight * sku.availableQuantity} 
        AND occupiedVolume = ${sku.volume * sku.availableQuantity} WHERE ID= ${positionId}`;

        await this.#dbManager.genericSqlGet(sqlUpdate)
            .catch((error) => { throw new Error(Exceptions.message503) });

    }

    /**delete function to remove an SKU from the table, given its ID */
    async deleteSku(id) {

        if (areUndefined(id) || areNotNumbers(id))
            throw new Error(Exceptions.message422);

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Error(Exceptions.message401);

        await this.#dbManager.genericSqlRun(`DELETE FROM SKU WHERE Id= ${id};`)
            .catch((error) => { throw new Error(Exceptions.message503); });

    }
}

module.exports = SkuController;