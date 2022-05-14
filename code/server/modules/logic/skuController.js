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

    /**getter function to retreive all the SKUs.
     * Privileges needed: manager, customer, clerk
     * @returns an array of skus (code 200)
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error)
    */
    async getAllSku() {


        if (!this.#controller.isLoggedAndHasPermission("manager", "customer", "clerk"))
            throw new Exceptions(401);

        let rows;
        await this.#dbManager.genericSqlGet("SELECT * FROM SKU")
            .then(value => rows = value)
            .catch(error => { throw error });

        if (!rows) {
            const newRows = await this.getPositionForSKU(rows);
            const newNewRows = await this.getTestDescriptorsForSKU(newRows);
            return newNewRows;
        }

        return rows;


    }

    /** given an array of skus, this function returns the same
     * array with position informations
     * @param rows the sku existing in the database
     * @throws 500 Internal Server Error (generic error).
      */
    async getPositionForSKU(rows) {


        for (let i = 0; i < rows.length; i++) {
            //console.log("info",rows[i]);
            await this.#dbManager.genericSqlGet(`SELECT * FROM SKU_in_Position WHERE SKUId = ?;`, rows[i].id)
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

    /** given an array of skus, this function returns the same
    * array with test descriptors informations
    *  @param rows the sku existing in the database
    * @throws 500 Internal Server Error (generic error).*/
    async getTestDescriptorsForSKU(rows) {

        for (let i = 0; i < rows.length; i++) {
            await this.#dbManager.genericSqlGet(`SELECT id FROM TestDescriptor WHERE idSKU = ?;`, rows[i].id)
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


    /**getter function to retreive a single SKU, given its ID.
     * Privileges needed: manager
     *  @param id the skuid of the wanted sku
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no SKU associated to id)
     * @throws 422 Unprocessable Entity (validation of id failed)
     * @throws 500 Internal Server Error (generic error).
    */
    async getSku(id) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        if (this.#controller.areUndefined(id) || this.#controller.areNotNumbers(id))
            throw new Exceptions(422);

        let sku;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKU WHERE ID=?;`, id)
            .then(value => sku = value[0])
            .catch(error => { throw error })
        if (!sku)
            throw new Exceptions(404);

        return sku;

    }

    /**the function read the body and create an sku.
     * Privileges needed: manager, customer, clerk
     * @param body a dictionary with all the info about the sku you want to create
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 422 Unprocessable Entity (validation of request body failed)
     * @throws 503 Service Unavailable (generic error).
     * */
    async createSku(body) {

        //permission check
        if (!this.#controller.isLoggedAndHasPermission("manager", "customer", "clerk"))
            throw new Exceptions(401);


        const description = body["description"];
        const weight = body["weight"];
        const volume = body["volume"];
        const notes = body["notes"];
        const price = body["price"];
        const availableQuantity = body["availableQuantity"];


        //validation of the body
        if (this.#controller.areUndefined(description, weight, volume, notes, price, availableQuantity)
            || this.#controller.areNotNumbers(weight, volume, price, availableQuantity))
            throw new Exceptions(422);


        const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
                                VALUES ( ?, ?, ?, ?, ?, ?);`;

        await this.#dbManager.genericSqlRun(sqlInstruction, weight, volume, price, notes, description, availableQuantity)
            .catch(() => { throw new Exceptions(503) });


    }

    /**this function edit an sku, given its id and a body with the new info.
     * eventually it updates info about his position.
     * If a param in the body is not present, the one relative to the old sku state is taken
     * Privileges needed: manager, customer, clerk
     * @param id the skuid of the sku you want to modify
     * @param body a dictionary of the info you want to modify in the sku. if an info is undefined, it doesn't get modified
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not found (SKU not existing)
     * @throws 422 Unprocessable Entity (validation of request body failed or if with newAvailableQuantity position is not capable enough in weight or in volume)
     * @throws 503 Service Unavailable (generic error).
     */
    async editSku(id, body) {

        //permission check
        if (!this.#controller.isLoggedAndHasPermission("manager", "customer", "clerk"))
            throw new Exceptions(401);

        let sku;
        await this.getSku(id)
            .then(value => sku = value)
            .catch(error => { if (error.getCode() === 500) throw new Exceptions(503); else throw error });

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

        if (!id || this.#controller.areNotNumbers(newWeight, newVolume, newPrice, newAvailableQuantity, id))
            throw new Exceptions(422)

        //check if sku has position
        let position;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKU_in_Position WHERE SKUId = ?`, id)
            .then(value => position = value[0])
            .catch(error => { throw new Exceptions(503) });


        if (position) {
            //if sku has position, check if position can contain modified sku
            if (position.maxWeight < newWeight * newAvailableQuantity
                || position.maxVolume < newVolume * newAvailableQuantity)
                throw new Exceptions(422);

            //update position info
            const sqlUpdate = `UPDATE Position SET occupiedWeight = ?, 
                            occupiedVolume = ? WHERE ID = ?;`;


            await this.#dbManager.genericSqlRun(sqlUpdate, newWeight * newAvailableQuantity, newVolume * newAvailableQuantity, position.positionId)
                .catch(error => { throw new Exceptions(503) });
        }

        //update sku info
        const sqlInstruction = `UPDATE SKU SET weight = ?, volume = ?, price = ? ,
                                notes = ?, description = ?, 
                                availableQuantity= ? WHERE ID = ?;`;

        await this.#dbManager.genericSqlRun(sqlInstruction, newWeight, newVolume, newPrice, newNotes, newDescription, newAvailableQuantity, id)
            .catch((error) => { throw new Exceptions(503); });

    }

    /**TO CHECK
     * @throws  401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not found (Position not existing or SKU not existing)
     * @throws 422 Unprocessable Entity (validation of position through the algorithm failed or position isn't capable to satisfy volume and weight constraints for available quantity of sku or position is already assigned to a sku)
     * @throws 503 Service Unavailable (generic error).
    */
    async setPosition(id, body) {

        //permission check
        if (!this.#controller.isLoggedAndHasPermission("manager", "customer", "clerk"))
            throw new Exceptions(401);

        const positionId = body["position"];

        //validation of the body
        if (this.#controller.areUndefined(positionId, id) || this.#controller.areNotNumbers(id))
            throw new Exceptions(422);

        //search sku
        let sku;
        await this.getSku(id)
            .then(value => sku = value)
            .catch((error) => { if (error.getCode() === 500) throw new Exceptions(503); else throw error });

        //search position
        let position;
        await this.#dbManager.genericSqlGet(`SELECT * FROM Positions WHERE id = ?;`, positionId)
            .then(value => position = value[0])
            .catch(error => { throw new Exceptions(503) });
        if (!position)
            throw new Exceptions(404);

        console.log("test1", position.maxWeight < sku.weight * sku.availableQuantity + position.occupiedWeight);
        console.log("test2", position.maxVolume < sku.volume * sku.availableQuantity + position.occupiedVolume);

        //verify if new position can contain sku
        if (position.maxWeight < sku.weight * sku.availableQuantity
            || position.maxVolume < sku.volume * sku.availableQuantity)
            throw new Exceptions(422);

        //verify if position was already occupied
        let positionAlreadyOccupied;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKU_in_Position WHERE positionId = ?;`, positionId)
            .then(value => positionAlreadyOccupied = value[0])
            .catch(error => { throw new Exceptions(503) });
        if (positionAlreadyOccupied !== undefined)
            throw new Exceptions(422);

        //verify if sku had already a position
        let positionOccupiedBySku;
        await this.#dbManager.genericSqlGet(`SELECT * FROM SKU_in_Position WHERE SKUId = ?;`, id)
            .then(value => positionOccupiedBySku = value[0])
            .catch(error => { throw new Exceptions(503) });

        if (positionOccupiedBySku !== undefined) {

            //remove sku from position
            await this.#dbManager.genericSqlRun(`DELETE FROM SKU_in_Position WHERE SKUId = ?;`, positionOccupiedBySku.SKUId)
                .catch(error => { throw new Exceptions(503) });

            //reset position volume and weight
            await this.#dbManager.genericSqlRun('UPDATE Position SET occupiedWeight =0, occupiedVolume=0 WHERE positionID = ?', positionOccupiedBySku.positionID)
                .catch(error => { throw new Exceptions(503) })

        }

        //set sku in new position
        await this.#dbManager.genericSqlRun(`INSERT INTO SKU_in_Position (SKUId, positionID) VALUES (?, ?)`, id, positionId)
            .catch((error) => { throw new Exceptions(503) });

        //update weight and volume of new position
        await this.#dbManager.genericSqlRun('UPDATE Position SET occupiedWeight =0, occupiedVolume=0 WHERE positionID = ?', position.positionID)
            .catch(error => { throw new Exceptions(503) })


    }

    /**delete function to remove an SKU from the table, given its ID.
     * Privileges needed: manager, customer, clerk
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 422 Unprocessable Entity (validation of id failed)
     * @throws 503 Service Unavailable (generic error).
     */
    async deleteSku(id) {

        //permission check
        if (!this.#controller.isLoggedAndHasPermission("manager", "customer", "clerk"))
            throw new Exceptions(401);

        //validation of id
        if (this.#controller.areUndefined(id) || this.#controller.areNotNumbers(id))
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun(`DELETE FROM SKU WHERE id= ?;`, id)
            .catch((error) => { throw new Exceptions(503) });
    }
}

module.exports = SkuController;