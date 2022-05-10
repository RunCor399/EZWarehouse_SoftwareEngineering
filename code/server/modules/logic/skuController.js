'use strict'

class SkuController {
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();

        console.log("skuController started");
    }

    /*getter function to retreive all the SKUs*/
    async getAllSku() {
        let rows;
        const sqlInstruction = "SELECT * FROM SKU";
        try {
             rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return rows;
    }

    /*getter function to retreive a single SKU, given its ID*/
    async getSku(id) {
        const sqlInstruction = `SELECT *  FROM SKU WHERE ID= ${id};`;
        try {
            const sku = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return sku;
    }

    /*TO CHECK - availableQuantity is missing in the SKU table */
    async createSku(body) {
        let id;
        const sqlGetCount = 'SELECT COUNT(*) FROM SKU'

        try {
             id = (await this.#dbManager.genericSqlGet(sqlGetCount))[0]["COUNT(*)"];
        } catch (error) {
            new Error(Exceptions.message500);
        }

        const description = body["description"];
        const weight = body["weight"];
        const volume = body["volume"];
        const notes = body["notes"];
        const price = body["price"];
        const availableQuantity = body["availableQuantity"];

        if (!description || !weight || !volume || !notes || !price || !availableQuantity)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `INSERT INTO SKU (ID, weight, volume, price, notes, description, availableQuantity)
         VALUES (${id + 1}, ${weight}, ${volume}, ${price}, "${notes}", "${description}", ${availableQuantity});`;
        try {
            const sku = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return sku;
    }

    /*TO CHECK - availableQuantity is missing in the SKU table */
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
        try {
            const item = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }

        if (!this.getSku(id).position) {
            SKUweight = this.getSku(id).weight;
            SKUvolume = this.getSku(id).volume;
            SKUposition = this.getSku(id).position;
            //SKUweight = getSku(id).getWeight();
            //SKUvolume = getSku(id).getVolume();

            const sqlUpdate2 = `UPDATE Position SET occupiedWeight= ${occupiedWeight + SKUweight} AND occupiedVolume = ${Position.occupiedVolume + SKUvolume} WHERE ID= ${SKUposition};`;
            try {
                const update2 = await this.#dbManager.genericSqlGet(sqlUpdate2);
            } catch (error) {
                new Error(Exceptions.message500);
            }
        }

    }

    /*TO CHECK - which way of getting the volume and the weight is the right one?*/
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

        SKUweight = this.getSku(id).weight;
        SKUvolume = this.getSku(id).volume;
        //SKUweight = getSku(id).getWeight();
        //SKUvolume = getSku(id).getVolume();

        const sqlUpdate2 = `UPDATE Position SET occupiedWeight= ${occupiedWeight + SKUweight} AND occupiedVolume = ${Position.occupiedVolume + SKUvolume} WHERE ID= ${position}`;
        try {
            const update2 = await this.#dbManager.genericSqlGet(sqlUpdate2);
        } catch (error) {
            new Error(Exceptions.message500);
        }

    }

    /*delete function to remove an SKU from the table, given its ID */
    async deleteSku(id) {
        const sqlInstruction = `DELETE FROM SKU WHERE ID= ${id};`;
        try {
            const sku = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return sku; /*sku returned to test it*/
    }
}

module.exports = SkuController;