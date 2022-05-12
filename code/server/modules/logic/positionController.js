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
            throw new Exceptions(401)

        const sqlInstruction = 'SELECT * FROM Position'
        let rows;
        await this.#dbManager.genericSqlGet(sqlInstruction)
            .then((value) => rows = value)
            .catch(error => { throw error })
        return rows;
    }

    /**creation of a new position inside the warehouse*/
    async createPosition(body) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        const positionID = body["positionID"];
        const aisleID = body["aisleID"];
        const row = body["row"];
        const col = body["col"];
        const maxWeight = body["maxWeight"];
        const maxVolume = body["maxVolume"];

        /*check if the body is valid*/
        if (this.#controller.areUndefined(positionID, aisleID, row, col, maxWeight, maxVolume) ||
            this.#controller.areNotNumbers(maxWeight, maxVolume
                || String(positionID).length !== 12 || aisleID).length !== 12
            || String(row).length !== 12 || String(col).length !== 12)
            throw new Exceptions(422);

        const sqlInstruction =
            `INSERT INTO Position (positionID, maxVolume, maxWeight, aisleID, row, col, occupiedWeight, occupiedVolume) 
        VALUES (${positionID}, ${maxVolume}, ${maxWeight}, ${aisleID}, ${row}, ${col}, 0, 0);`;

        await this.#dbManager.genericSqlRun(sqlInstruction)
            .catch(error => { throw new error });
    }

    /**function to edit the properties of a specific position, given its ID*/
    async editPositionVer1(id, body) {

        if (!this.#controller.isLoggedAndHasPermission("manager","clerk"))
            throw new Exceptions(401);

        const newAisleID = body["newAisleID"];
        const newRow = body["newRow"];
        const newCol = body["newCol"];
        const newMaxWeight = body["newMaxWeight"];
        const newMaxVolume = body["newMaxVolume"];
        const newOccupiedWeight = body["newOccupiedWeight"];
        const newOccupiedVolume = body["newOccupiedVolume"];

        if (this.#controller.areUndefined(id, newAisleID, newRow, newCol, newMaxWeight, newMaxVolume, newOccupiedWeight, newOccupiedVolume) ||
            this.#controller.areNotNumbers(newMaxWeight, newMaxVolume, newOccupiedWeight, newOccupiedVolume)
            || String(id).length !== 12 || String(newAisleID).length !== 4 || String(newRow).length !== 4 || String(newCol).length !== 4)
            throw new Exceptions(422);

        let positions;
        await this.getAllPositions()
            .then(value => positions = value)
            .catch((error) => { throw new error})

        const positionIDs = positions.map(pos => String(pos.positionID));

        if (!positionIDs.includes(id))
            throw new Exceptions(404);

        const sqlInstruction =
            `UPDATE Position SET maxVolume= ${newMaxVolume}, maxWeight= ${newMaxWeight}, aisleID = ${newAisleID}, 
        row= ${newRow}, col= ${newCol},  occupiedWeight= ${newOccupiedWeight}, occupiedVolume= ${newOccupiedVolume} 
        WHERE positionID= ${id};`;

        await this.#dbManager.genericSqlRun(sqlInstruction)
            .catch(error => { throw new error })
    }

    /**function to edit the ID of a specific position, given its older ID*/
    async editPositionVer2(oldId, body) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        const newPositionID = body["newPositionID"];

        if (this.#controller.areUndefined(oldId, newPositionID)
            || String(oldId).length !== 12 || String(newPositionID).length !== 12)
            throw new Exceptions(422);

        const sqlInstruction = `UPDATE Position SET positionID= ${newPositionID} WHERE positionID= ${oldId};`;
        await this.#dbManager.genericSqlGet(sqlInstruction)
            .catch(error => { throw new error })
    }

    /**delete function to remove a position from the table, given its ID*/
    async deletePosition(id) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
        throw new Exceptions(401);

        if (this.#controller.areUndefined(id) || String(id).length !== 12)
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun
            (`DELETE FROM Position WHERE positionID= ${id};`)
            .catch((error) => { throw new error });
    }

}

module.exports = PositionController;