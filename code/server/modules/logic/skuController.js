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
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager' && user.type !== 'customer' && user.type !== 'clerk')
            throw new Error(Exceptions.message401);

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

        if (!id || isNaN(id))
            throw new Error(Exceptions.message422);

        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager')
            throw new Error(Exceptions.message401);

        let sku;
        await this.#dbManager.genericSqlGet(`SELECT *  FROM SKU WHERE ID= ${id};`)
            .then(value => sku = value[0])
            .catch(error => { throw new Error(Exceptions.message500) });

        if (sku === undefined)
            throw new Error(Exceptions.message404);

        return sku;


    }

    /**TO CHECK - availableQuantity is missing in the SKU table */
    async createSku(body) {

        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager')
            throw new Error(Exceptions.message401);

        const description = body["description"];
        const weight = body["weight"];
        const volume = body["volume"];
        const notes = body["notes"];
        const price = body["price"];
        const availableQuantity = body["availableQuantity"];

        if (!description || !weight || !volume || !notes || !price || !availableQuantity
            || isNaN(weight) || isNaN(volume) || isNaN(price) || isNaN(availableQuantity))
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
            .catch(error => { throw new Error(Exceptions.message503) });

        const sqlInstruction = `INSERT INTO SKU (id, weight, volume, price, notes, description, availableQuantity)
         VALUES (${id + 1}, ${weight}, ${volume}, ${price}, "${notes}", "${description}", ${availableQuantity});`;

        await this.#dbManager.genericSqlRun(sqlInstruction)
            .catch((error) => { throw new Error(Exceptions.message503) });

    }

    /**TO CHECK - availableQuantity is missing in the SKU table */
    async editSku(id, body) {


        //permission check
        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager')
            throw new Error(Exceptions.message401);

        //validation of body and id
        const newDescription = body["newDescription"];
        const newWeight = body["newWeight"];
        const newVolume = body["newVolume"];
        const newNotes = body["newNotes"];
        const newPrice = body["newPrice"];
        const newAvailableQuantity = req.body["newAvailableQuantity"];

        if (!newDescription || !newWeight || !newVolume || !newNotes || !newPrice || !newAvailableQuantity
            || isNaN(newWeight) || isNaN(newVolume) || isNaN(newPrice) || isNaN(newAvailableQuantity) || !id || isNaN(id))
            throw new Error(Exceptions.message422);

        //check if sku exists
        let num;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM SKU')
            .then(value => num = value[0]["COUNT(*)"])
            .catch(error => { throw new Error(Exceptions.message503) });
        if (num === 0)
            throw new Error(Exceptions.message404)

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

            //update sku info
            const sqlInstruction =
                `UPDATE SKU SET weight= ${newWeight} AND volume= ${newVolume} AND price= ${newPrice} 
        AND notes= "${newNotes}" AND description= "${newDescription}" AND availableQuantity= ${newAvailableQuantity} WHERE ID=${id};`;
            await this.#dbManager.genericSqlRun(sqlInstruction)
                .catch((error) => { new Error(Exceptions.message503); });

            //update position info
            const sqlUpdate = `UPDATE Position SET occupiedWeight= ${newWeight * newAvailableQuantity} 
                AND occupiedVolume = ${newVolume * newAvailableQuantity} WHERE ID= ${position.positionId};`;
            try {
                await this.#dbManager.genericSqlRun(sqlUpdate);
            } catch (error) {
                new Error(Exceptions.message503);
            }
        }


    }



    /**TO CHECK*/
    async setPosition(id, body) {

        const positionId = body["position"];

        if (!positionId || !id || isNaN(id))
            throw new Error(Exceptions.message422);

        let sku;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKU WHERE id= ${id};`)
            .then(value => sku = value[0])
            .catch(error => { throw new Error(Exceptions.message503) });
        //error if id doesnt exist

        let position;
        await this.#dbManager.genericSqlGet(`SELECT * FROM Positions WHERE id= ${positionId};`)
            .then(value => position = value[0])
            .catch(error => { throw new Error(Exceptions.message503) });
        //error if id doesnt exist


        if (position.maxWeight < sku.weight * sku.availableQuantity
            || position.maxVolume < sku.volume * sku.availableQuantity)
            throw new Error(Exceptions.message422);

        let testValue;
        await this.#dbManager.genericSqlGet(`SELECT COUNT(*) FROM SKU_in_Position WHERE positionId = ${positionId}`)
            .then(value => testValue = value[0]["COUNT(*)"])
            .catch(error => { throw new Error(Exceptions.message503) });

        if (testValue !== 0)
            throw new Error(Exceptions.message422);

        const sqlInsert =
            `INSERT INTO SKU_in_Position SET(SKUId, positionID) 
            VALUES (${id} ,${positionId});`;
        try {
            await this.#dbManager.genericSqlRun(sqlInsert);
        } catch (error) {
            new Error(Exceptions.message503);
        }

        const sqlUpdate = `UPDATE Position SET occupiedWeight= ${sku.weight * sku.availableQuantity} 
        AND occupiedVolume = ${sku.volume * sku.availableQuantity} WHERE ID= ${positionId}`;
        try {
            await this.#dbManager.genericSqlGet(sqlUpdate);
        } catch (error) {
            new Error(Exceptions.message503);
        }

    }

    /**delete function to remove an SKU from the table, given its ID */
    async deleteSku(id) {

        if (!id || isNaN(id))
            throw new Error(Exceptions.message422);

        let user;
        try {
            user = this.#controller.getSession();
        } catch (error) {
            throw new Error(Exceptions.message401);
        }
        if (user.type !== 'manager')
            throw new Error(Exceptions.message401);

        /* const sqlInstruction = `DELETE FROM SKU WHERE ID= ${id};`;
                 try {
                     await this.#dbManager.genericSqlRun(sqlInstruction);
                 } catch (error) {
                     throw new Error(Exceptions.message500);
                 }
                 
                 return sku; //sku returned to test it
                 */

        await this.#dbManager.genericSqlRun(`DELETE FROM SKU WHERE Id= ${id};`)
            .catch((error) => { throw new Error(Exceptions.message503); });

    }
}

module.exports = SkuController;