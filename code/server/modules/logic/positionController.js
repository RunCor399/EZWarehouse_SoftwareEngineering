'use strict'
const Exceptions = require('../../routers/exceptions');
const Controller = require('./controller')

class PositionController {
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = controller.getDBManager();
        console.log("positionController started");
    }

    /**getter function to retreive all positions*/
    async getAllPositions() {
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
        console.log(body)
        const sqlGetCount = 'SELECT COUNT(*) FROM Position'
        let id;
        try {
            id = (await this.#dbManager.genericSqlGet(sqlGetCount))[0]["COUNT(*)"];
            console.log(id);
        } catch (error) {
            new Error(Exceptions.message500);
        }

        const positionID = body["positionID"];
        const aisleID = body["aisleID"];
        const row = body["row"];
        const col = body["col"];
        const maxWeight = body["maxWeight"];
        const maxVolume = body["maxVolume"];

        if (!positionID || !aisleID || !row ||
            !col || !maxWeight || !maxVolume)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `INSERT INTO Position (ID, maxVolume, maxWeight, aisle, row, column, occupiedWeight, occupiedVolume) 
        VALUES (${id + 1}, ${maxVolume}, ${maxWeight}, ${aisleID}, ${row}, ${col}, 0, 0);`;
        try {
            const position = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }

    }

    /**function to edit the properties of a specific position, given its ID*/
    async editPosition(id, body) {

        const newAisleID = body["newAisleID"];
        const newRow = body["newRow"];
        const newCol = body["newCol"];
        const newMaxWeight = body["newMaxWeight"];
        const newMaxVolume = body["newMaxVolume"];
        const newOccupiedWeight = body["newOccupiedWeight"];
        const newOccupiedVolume = body["newOccupiedVolume"];

        if (!newAisleID || !newRow || !newCol || !newMaxWeight || !newMaxVolume || !newOccupiedWeight || !newOccupiedVolume)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `UPDATE Position SET maxVolume= ${newMaxVolume} AND maxWeight= ${newMaxWeight} 
        AND aisle= ${newAisleID} AND row= ${newRow} AND column= ${newCol} AND occupiedWeight= ${newOccupiedWeight} AND occupiedVolume= ${newOccupiedVolume} WHERE ID= ${id};`;

        try {
            const position = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return position;
    }

    /**function to edit the ID of a specific position, given its older ID*/
    async editPosition(oldId, body) {

        const newPositionID = body["newPositionID"];
        if (!newPositionID)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `UPDATE Position SET ID= ${newPositionID} WHERE ID= ${oldId};`;
        try {
            const position = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return position;
    }

    /**delete function to remove a position from the table, given its ID*/
    async deletePosition(id) {
        const sqlInstruction = `DELETE FROM Position WHERE ID= ${id};`;
        try {
            const position = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            new Error(Exceptions.message500);
        }
        return position;
    }

}

module.exports = PositionController;