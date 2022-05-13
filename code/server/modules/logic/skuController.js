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
            .catch(error => { throw error });


        //console.log("pre", rows);

        const newRows = await this.getPositionForSKU(this.#dbManager, rows);

        const newNewRows = await this.getTestDescriptorsForSKU(this.#dbManager, newRows);

        return newNewRows;


    }

    async getPositionForSKU(dbmanager, rows) {


        for (let i = 0; i < rows.length; i++) {
            //console.log("info",rows[i]);
            await dbmanager.genericSqlGet(`SELECT * FROM SKU_in_Position WHERE SKUId = ?;`, rows[i].id)
                .then(value => {
                    //console.log(value[0])
                    rows[i].position = value[0] === undefined ? undefined : value[0].positionID
                })
                .catch(error => { throw error });
            //console.log("info",rows[i].position);
        }

        //console.log("newRows", rows);

        return rows;

    }

    async getTestDescriptorsForSKU(dbmanager, rows) {

        for (let i = 0; i < rows.length; i++) {
            await dbmanager.genericSqlGet(`SELECT id FROM TestDescriptor WHERE idSKU = ?;`, rows[i].id)
                .then(value => {
                    if (!value)
                        rows[i].testDescriptors = undefined;
                    else rows[i].testDescriptors = value.map(v => v.id)
                })
                .catch(error => { throw error });
            //console.log("info",rows[i].position);
        }

        //console.log("newNewRows", rows);
        return rows;
    }


    /**getter function to retreive a single SKU, given its ID*/
    async getSku(id) {

        if (this.#controller.areUndefined(id) || this.#controller.areNotNumbers(id))
            throw new Exceptions(422);

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        let sku;
         await this.#dbManager.genericSqlGet(`SELECT * FROM SKU WHERE ID=?;`, id)
            .then(value => sku = value[0])
            .catch(error => { throw error });

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



        // const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
        //  VALUES ( ${weight}, ${volume}, ${price}, "${notes}", "${description}", ${availableQuantity});`;

        const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
                                VALUES ( ?, ?, ?, ?, ?, ?);`;

        await this.#dbManager.genericSqlRun(sqlInstruction, weight, volume, price, notes, description, availableQuantity)
            .catch((error) => { throw error });


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

        if (!sku) {
            throw new Exceptions(404)
        }


        editParams = { "newDescription": "description", "newWeight": "weight", "newVolume": "volume", "newNotes": "notes", "newPrice": "price", "newAvailableQuantity": "availableQuantity" };

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

        if (this.#controller.areUndefined(id)
            || this.#controller.areNotNumbers(newWeight, newVolume, newPrice, newAvailableQuantity, id))
            throw new Exceptions(422)

        //check if sku has position
        let position;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKU_in_Position WHERE SKUId = ?`, id)
            .then(value => position = value[0])
            .catch(error => { throw error });


        if (position) {
            //if sku has position, check if position can contain modified sku
            if (position.maxWeight < newWeight * newAvailableQuantity
                || position.maxVolume < newVolume * newAvailableQuantity)
                throw new Exceptions(422);

            //update position info
            const sqlUpdate = `UPDATE Position SET occupiedWeight = ?, 
                            occupiedVolume = ? WHERE ID = ?;`;


            await this.#dbManager.genericSqlRun(sqlUpdate, newWeight * newAvailableQuantity, newVolume * newAvailableQuantity, position.positionId)
                .catch(error => { throw error });
        }

        this.#controller.getPositionController()
            .editPositionVer1({
                newAisleID: position.aisleID,
                newRow: position.row,
                newCol: position.col,
                newMaxWeight: position.maxWeight,
                newMaxVolume: position.maxVolume,
                newOccupiedWeight: newWeight * newAvailableQuantity,
                newOccupiedVolume: newVolume * newAvailableQuantity,
            }).catch(error => { throw error });


        //update sku info
        const sqlInstruction = `UPDATE SKU SET weight = ?, volume = ?, price = ? ,
                                notes = ?, description = ?, 
                                availableQuantity= ? WHERE ID = ?;`;

        await this.#dbManager.genericSqlRun(sqlInstruction, newWeight, newVolume, newPrice, newNotes, newDescription, newAvailableQuantity, id)
            .catch((error) => { throw error; });

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
            .catch((error) => { throw error });
        if (!sku) throw new Exceptions(404);


        let position;
           await this.#dbManager.genericSqlGet(`SELECT * FROM Positions WHERE id = ?;`, positionId)
            .then(value => position = value[0])
            .catch(error => { throw error });

        console.log("test1", position.maxWeight < sku.weight * sku.availableQuantity + position.occupiedWeight);
        console.log("test2", position.maxVolume < sku.volume * sku.availableQuantity + position.occupiedVolume);

        if (position.maxWeight < sku.weight * sku.availableQuantity
            || position.maxVolume < sku.volume * sku.availableQuantity)
            throw new Exceptions(422);

        let positionAlreadyOccupied;
         await this.#dbManager.genericSqlGet(`SELECT * FROM SKU_in_Position WHERE positionId = ?;`, positionId)
            .then(value => positionAlreadyOccupied = value[0])
            .catch(error => { throw error });

        console.log("test positionalreadyoccupied", positionAlreadyOccupied === undefined)

        if (positionAlreadyOccupied)
            throw new Exceptions(422);


        let skuHasAlreadyAPosition;
        const query3 = `SELECT * FROM SKU_in_Position WHERE SKUId = ?;`;

        await this.#dbManager.genericSqlGet(query3, id)
            .then(value => skuHasAlreadyAPosition = value[0])
            .catch(error => { throw error });
        console.log("test skuhasalreadyaposition", skuHasAlreadyAPosition)

        if (skuHasAlreadyAPosition) {
            await this.#dbManager.genericSqlRun(`DELETE FROM SKU_in_Position WHERE SKUId = ?;`, skuHasAlreadyAPosition.SKUId)
                .catch(error => { throw error });

            let occupiedPosition
            await this.#dbManager.genericSqlGet(`SELECT * FROM Position WHERE positionID= ?;`, skuHasAlreadyAPosition.positionID)
                .then(value => occupiedPosition = value[0])
                .catch(error => { throw error });

            console.log("occupiedPositionPre", occupiedPosition)
            await this.#controller.getPositionController()
                .editPositionVer1(skuHasAlreadyAPosition.positionID,
                    {
                        newAisleID: occupiedPosition.aisleID,
                        newRow: occupiedPosition.row,
                        newCol: occupiedPosition.col,
                        newMaxWeight: position.maxWeight,
                        newMaxVolume: position.maxVolume,
                        newOccupiedWeight: occupiedPosition.occupiedWeight - sku.weight * sku.availableQuantity,
                        newOccupiedVolume: occupiedPosition.occupiedVolume - sku.volume * sku.availableQuantity
                    })
                .catch(error => { throw error });

        }

        await this.#dbManager.genericSqlRun(`INSERT INTO SKU_in_Position (SKUId, positionID) VALUES (?, ?)`, id, positionId)
            .catch((error) => { throw error });
        // or throw 503?

        await this.#controller.getPositionController()
            .editPositionVer1(positionId,
                {
                    newAisleID: position.aisleID,
                    newRow: position.row,
                    newCol: position.col,
                    newMaxWeight: position.maxWeight + position.occupiedWeight,
                    newMaxVolume: position.maxVolume + position.occupiedVolume,
                    newOccupiedWeight: sku.weight * sku.availableQuantity,
                    newOccupiedVolume: sku.volume * sku.availableQuantity
                })
            .catch(error => { throw error });

    }

    /**delete function to remove an SKU from the table, given its ID */
    async deleteSku(id) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "customer", "clerk"))
            throw new Exceptions(401);

        console.log(id);

        if (this.#controller.areUndefined(id) || this.#controller.areNotNumbers(id))
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun(`DELETE FROM SKU WHERE id= ?;`, id)
            .catch((error) => { throw error });
        //or throw new 503?
    }
}

module.exports = SkuController;