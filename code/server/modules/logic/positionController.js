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

    checkPositionID(positionID, aisleID, row, col) {
        return (String(positionID).substring(0, 4) === String(aisleID)
            && String(positionID).substring(4, 8) === String(row)
            && String(positionID).substring(8, 12) === String(col))
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

        console.log(body)

        const positionID = body["positionID"];
        const aisleID = body["aisleID"];
        const row = body["row"];
        const col = body["col"];
        const maxWeight = body["maxWeight"];
        const maxVolume = body["maxVolume"];
        const occupiedWeight = !body["occupiedWeight"] ? 0 : body["occupiedWeight"];
        const occupiedVolume = !body["occupiedVolume"] ? 0 : body["occupiedVolume"];


        /*check if the body is valid*/
        if (this.#controller.areUndefined(positionID, aisleID, row, col, maxWeight, maxVolume) ||
            this.#controller.areNotNumbers(maxWeight, maxVolume, occupiedWeight, occupiedVolume)
            || this.#controller.areNotNumbers(positionID, aisleID, row, col)
            || String(positionID).length !== 12 || String(aisleID).length !== 4
            || String(row).length !== 4 || String(col).length !== 4
            || !this.checkPositionID(positionID, aisleID, row, col))
            throw new Exceptions(422);

        const sqlInstruction = `INSERT INTO Position (positionID, maxVolume, maxWeight, aisleID, row, col, occupiedWeight, occupiedVolume) VALUES (?,?,?,?,?,?,?,?);`;

        await this.#dbManager.genericSqlRun(sqlInstruction, positionID, maxVolume, maxWeight, aisleID, row, col, occupiedWeight, occupiedVolume)
            .catch(error => { throw error });
    }

    /**function to edit the properties of a specific position, given its ID*/
    async editPositionVer1(id, body) {

        if (!this.#controller.isLoggedAndHasPermission("manager", "clerk"))
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
            || this.#controller.areNotNumbers(id, newAisleID, newRow, newCol)
            || String(id).length !== 12 || String(newAisleID).length !== 4
            || String(newRow).length !== 4 || String(newCol).length !== 4
            || !this.checkPositionID(id, newAisleID, newRow, newCol))
            throw new Exceptions(422);

        console.log("provaInFunction", id, body)

        let positions;
        await this.getAllPositions()
            .then(value => positions = value)
            .catch((error) => { throw new error })

        const positionIDs = positions.map(pos => String(pos.positionID));
        console.log(positionIDs);

        if (!positionIDs.includes(id))
            throw new Exceptions(404);

        await this.deletePosition(id)
            .catch(error => { throw error });

        let newBody =
        {
            positionID: `${newAisleID}${newRow}${newCol}`,
            aisleID: newAisleID,
            row: newRow,
            col: newCol,
            maxWeight: newMaxWeight,
            maxVolume: newMaxVolume,
            occupiedWeight: newOccupiedWeight,
            occupiedVolume: newOccupiedVolume,
        }

        await this.createPosition(newBody)
            .catch(error => { throw error })

    }

    /**function to edit the ID of a specific position, given its older ID*/
    async editPositionVer2(oldId, body) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        const newPositionID = body["newPositionID"];

        if (this.#controller.areUndefined(oldId, newPositionID)
            || String(oldId).length !== 12 || String(newPositionID).length !== 12)
            throw new Exceptions(422);


        let positions;
        await this.getAllPositions()
            .then(value => positions = value)
            .catch((error) => { throw new error })
        const positionIDs = positions.map(pos => String(pos.positionID))
        if (!positionIDs.includes(oldId))
            throw new Exceptions(404);


        let position = positions.filter(
            (pos) => pos.positionID === oldId)[0];

        await this.deletePosition(oldId)
            .catch(error => { throw error });

        position.positionID = newPositionID
        position.aisleID = String(newPositionID).substring(0, 4)
        position.row = String(newPositionID).substring(4, 8)
        position.col = String(newPositionID).substring(8, 12)

        await this.createPosition(position)
            .catch(error => { throw error });

    }

    /**delete function to remove a position from the table, given its ID*/
    async deletePosition(id) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        if (this.#controller.areUndefined(id) || String(id).length !== 12)
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun
            (`DELETE FROM Position WHERE positionID= $?;`, id)
            .catch((error) => { throw new error });

    }



}

module.exports = PositionController;