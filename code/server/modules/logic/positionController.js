'use strict'
const Exceptions = require('../../routers/exceptions');
const Controller = require('./controller')

class PositionController {
    /** @type {Controller} */
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();
        console.log("positionController started");
    }

    /**getter function to retreive all positions*/
    async getAllPositions() {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager", "clerk"))
            throw new Error(Exceptions.message401);

        let rows;
        const sqlInstruction = "SELECT * FROM Position";
        try {
            rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return rows;
    }

    /**creation of a new position inside the warehouse*/
    async createPosition(body) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Error(Exceptions.message401);

        const positionID = body["positionID"];
        const aisleID = body["aisleID"];
        const row = body["row"];
        const col = body["col"];
        const maxWeight = body["maxWeight"];
        const maxVolume = body["maxVolume"];

        /*check if the body is valid*/
        if (this.#controller.areUndefined(positionID, aisleID, row, col, maxWeight, maxVolume) ||
            this.#controller.areNotNumbers(positionID, aisleID, row, col, maxWeight, maxVolume))
            throw new Error(Exceptions.message422);


        let id;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM Position')
            .then(value => id = value[0]["COUNT(*)"])
            .catch(error => { throw new Error(Exceptions.message500) });


        const sqlInstruction = `INSERT INTO Position (ID, maxVolume, maxWeight, aisle, row, column, occupiedWeight, occupiedVolume) 
        VALUES (${id + 1}, ${maxVolume}, ${maxWeight}, ${aisleID}, ${row}, ${col}, 0, 0);`;

        await this.#dbManager.genericSqlRun(sqlInstruction)
            .catch(error => { new Error(Exceptions.message500); });
    }


    /**function to edit the properties of a specific position, given its ID*/
    async editPosition(id, body) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "clerk"))
            throw new Error(Exceptions.message401);

        const newAisleID = body["newAisleID"];
        const newRow = body["newRow"];
        const newCol = body["newCol"];
        const newMaxWeight = body["newMaxWeight"];
        const newMaxVolume = body["newMaxVolume"];
        const newOccupiedWeight = body["newOccupiedWeight"];
        const newOccupiedVolume = body["newOccupiedVolume"];

        if (this.#controller.areUndefined(id, newAisleID, newRow, newCol, newMaxWeight, newMaxVolume) ||
            this.#controller.areNotNumbers(id, newAisleID, newRow, newCol, newMaxWeight, newMaxVolume))
            throw new Error(Exceptions.message422);

        const sqlInstruction = `UPDATE Position SET maxVolume= ${newMaxVolume} AND maxWeight= ${newMaxWeight} 
        AND aisle= ${newAisleID} AND row= ${newRow} AND column= ${newCol} AND occupiedWeight= ${newOccupiedWeight} AND occupiedVolume= ${newOccupiedVolume} WHERE ID= ${id};`;

        
        await this.#dbManager.genericSqlRun(sqlInstruction)
            .catch (error => {throw new Error(Exceptions.message500);})

    }

    /**function to edit the ID of a specific position, given its older ID*/
    async editPosition(oldId, body) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Error(Exceptions.message401);

        const newPositionID = body["newPositionID"];

        if (this.#controller.areUndefined(oldId, newPositionID)
        || this.#controller.areNotNumbers(oldId, newPositionID))
            throw new Error(Exceptions.message422);

        const sqlInstruction = `UPDATE Position SET ID= ${newPositionID} WHERE ID= ${oldId};`;
        await this.#dbManager.genericSqlGet(sqlInstruction)
        .catch (error => {throw new Error(Exceptions.message500);})
    }

    /**delete function to remove a position from the table, given its ID*/
    async deletePosition(id) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Error(Exceptions.message401);

        if (this.#controller.areUndefined(id) || this.#controller.areNotNumbers(id))
            throw new Error(Exceptions.message422);

        await this.#dbManager.genericSqlRun
            (`DELETE FROM Position WHERE ID= ${id};`)
            .catch((error) => { throw new Error(Exceptions.message500) });
    }

}

module.exports = PositionController;