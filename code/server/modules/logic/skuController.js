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
            throw new Exceptions(401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM SKU")
            .then(value => rows = value)
            .catch(error => { throw new Exceptions(500) });
        return rows;
    }

    /**getter function to retreive a single SKU, given its ID*/
    async getSku(id) {

        if (this.#controller.areUndefined(id) || this.#controller.areNotNumbers(id))
            throw new Exceptions(422);

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        let sku;
        await this.#dbManager.genericSqlGet(`SELECT *  FROM SKU WHERE ID= ${id};`)
            .then(value => sku = value[0])
            .catch(error => { throw new Exceptions(500) });

        if (!sku)
            throw new Exceptions(404);

        return sku;


    }

    /**TO CHECK - availableQuantity is missing in the SKU table */
    async createSku(body) {


        if (!this.#controller.isLoggedAndHasPermission("manager", "customer", "clerk"))
            throw new Exceptions(401);

        const description = body["description"];
        const weight = body["weight"];
        const volume = body["volume"];
        const notes = body["notes"];
        const price = body["price"];
        const availableQuantity = body["availableQuantity"];

        console.log(body);


        if (this.#controller.areUndefined(description, weight, volume, notes, price, availableQuantity)
            || this.#controller.areNotNumbers(weight, volume, price, availableQuantity))
            throw new Exceptions(422);



        const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
         VALUES ( ${weight}, ${volume}, ${price}, "${notes}", "${description}", ${availableQuantity});`;

        await this.#dbManager.genericSqlRun(sqlInstruction)
            .catch((error) => { throw new Exceptions(503) });
            

    }

    /**TO CHECK - availableQuantity is missing in the SKU table */
    async editSku(id, body) {
        //permission check
        if (!this.#controller.isLoggedAndHasPermission("manager", "customer", "clerk"))
            throw new Exceptions(401);

        let sku;
        await this.getSku(id)
            .then(value => sku = value)
            .catch((err) => { throw err });
        if (!sku){ 
            throw new Exceptions(404)
        }

        
        editParams = {"newDescription":"description", "newWeight":"weight", "newVolume":"volume", "newNotes":"notes", "newPrice":"price", "newAvailableQuantity":"availableQuantity"};

        //If a param in the body is not present, the one relative to the old sku state is taken
        (Object.keys(editParams)).map((param) => {
            body[param] === undefined ? body[param] = sku[editParams[param]] : "";
        });
        
        //validation of body and id
        const newDescription = body["newDescription"];
        const newWeight = body["newWeight"];
        const newVolume = body["newVolume"];
        const newNotes = body["newNotes"];
        const newPrice = body["newPrice"];
        const newAvailableQuantity = body["newAvailableQuantity"];

        
        

        if (this.#controller.areUndefined(newDescription, newWeight, newVolume, newNotes, newPrice, newAvailableQuantity, id)
            || this.#controller.areNotNumbers(newWeight, newVolume, newPrice, newAvailableQuantity, id))
            throw new Exceptions(422);

        console.log("prova2")

        

        console.log("prova3")


        //check if sku has position
        let position;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKU_in_Position WHERE SKUId = ${id}`)
            .then(value => position = value[0])
            .catch(error => { throw Exceptions(503) });

        console.log("prova4", position)


        if (position) {
            //if sku has position, check if position can contain modified sku
            if (position.maxWeight < newWeight * newAvailableQuantity
                || position.maxVolume < newVolume * newAvailableQuantity)
                throw new Exceptions(422);
            
            console.log("prova5")

            /*
            //update position info
            const sqlUpdate = `UPDATE Position SET occupiedWeight= ${newWeight * newAvailableQuantity} 
                AND occupiedVolume = ${newVolume * newAvailableQuantity} WHERE ID= ${position.positionId};`;
            try {
                await this.#dbManager.genericSqlRun(sqlUpdate);
            } catch (error) {
                new Error(Exceptions.message503);
            }*/

            this.#controller.getPositionController()
                .editPositionVer1({
                    newAisleID: position.aisleID,
                    newRow: position.row,
                    newCol: position.col,
                    newMaxWeight: position.maxWeight,
                    newMaxVolume: position.maxVolume,
                    newOccupiedWeight: newWeight * newAvailableQuantity,
                    newOccupiedVolume: newVolume * newAvailableQuantity,
                }).catch(error => { throw new Exceptions(500) });

            console.log("prova6")

        }

        //update sku info
        const sqlInstruction =
            `UPDATE SKU SET weight= ${newWeight}, volume= ${newVolume}, price= ${newPrice} ,
             notes= "${newNotes}", description= "${newDescription}", 
             availableQuantity= ${newAvailableQuantity} WHERE ID=${id};`;

        console.log("prova7")


        await this.#dbManager.genericSqlRun(sqlInstruction)
            .catch((error) => { throw new Exceptions(503); });

        console.log("prova8")


    }

    /**TO CHECK*/
    async setPosition(id, body) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "customer", "clerk"))
            throw new Exceptions(401);

        const positionId = body["position"];

        if (this.#controller.areUndefined(positionId, id) || this.#controller.areNotNumbers(id))
        throw new Exceptions(422);

        let sku;
        await this.getSku(id)
            .then(value => sku = value)
            .catch(() => { throw new Error(Exceptions.message500) });
        if (!sku) throw new Error(Exceptions.message404)


        let position;
        await this.#dbManager.genericSqlGet(`SELECT * FROM Positions WHERE id= ${positionId};`)
            .then(value => position = value[0])
            .catch(error => { throw new Error(Exceptions.message503) });


        if (position.maxWeight < sku.weight * sku.availableQuantity
            || position.maxVolume < sku.volume * sku.availableQuantity)
            throw new Exceptions(422);

        let testValue;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKU_in_Position WHERE positionId = ${positionId}`)
            .then(value => testValue = value[0])
            .catch(error => { throw new Error(Exceptions.message503) });

        if (!testValue)
        throw new Exceptions(422);

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
        
        if (!this.#controller.isLoggedAndHasPermission("manager", "customer", "clerk"))
            throw new Exceptions(401);
        
        console.log(id);
        
        if (this.#controller.areUndefined(id) || this.#controller.areNotNumbers(id))
        throw new Exceptions(422);


        await this.#dbManager.genericSqlRun(`DELETE FROM SKU WHERE Id= ${id};`)
            .catch((error) => { throw new Exceptions(503) });

    }
}

module.exports = SkuController;