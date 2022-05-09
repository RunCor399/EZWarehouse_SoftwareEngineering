'use strict'

class PositionController {
    #controller;
    #dbManager;
    constructor(controller) {
        this.controller = controller;
        this.dbManager = controller.getDBManager();
        console.log("positionController started");
    }

    /*getter function to retreive all positions*/
    async getAllPositions() {
        const sqlInstruction = "SELECT * FROM Position";
        try {
            const rows = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*creation of a new position inside the warehouse*/
    async createPosition(body) {

        const sqlGetCount = 'SELECT COUNT(*) FROM Position'

        try {
            const id = await this.#dbManager.genericSqlGet(sqlGetCount);
        } catch (error) {
            console.log("error");
        }

        const positionID = body["positionID"];
        const aisleID = body["aisleID"];
        const row = body["row"];
        const col = body["col"];
        const maxWeight = body["maxWeight"];
        const maxVolume = body["maxVolume"];

        if (positionID === undefined || aisleID === undefined || row === undefined ||
            col === undefined || maxWeight === undefined || maxVolume === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `INSERT INTO Position (ID, maxVolume, maxWeight, aisle, row, column, occupiedWeight, occupiedVolume) VALUES (${id + 1}, ${maxVolume}, ${maxWeight}, ${aisleID}, ${row}, ${col}, 0, 0);`;
        try {
            const position = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }

    }

    /*function to edit the properties of a specific position, given its ID*/
    async editPosition(id, body) {

        const newAisleID = body["newAisleID"];
        const newRow = body["newRow"];
        const newCol = body["newCol"];
        const newMaxWeight = body["newMaxWeight"];
        const newMaxVolume = body["newMaxVolume"];

        if (newAisleID === undefined || newRow === undefined || newCol === undefined
            || newMaxWeight === undefined || newMaxVolume === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `UPDATE Position SET maxVolume= ${newMaxVolume} AND maxWeight= ${newMaxWeight} 
        AND aisle= ${newAisleID} AND row= ${newRow} AND column= ${newCol} WHERE ID= ${id};`;

        try {
            const position = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return position;
    }

    /*function to edit the ID of a specific position, given its older ID*/
    async editPosition(oldId, body) {

        const newPositionID = body["newPositionID"];
        if (newPositionID === undefined)
            throw new Error(Exceptions.message422);

        const sqlInstruction = `UPDATE Position SET ID= ${newPositionID} WHERE ID= ${oldId};`;
        try {
            const position = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return position;
    }

    /*delete function to remove a position from the table, given its ID*/
    async deletePosition(id) {
        const sqlInstruction = `DELETE FROM Position WHERE ID= ${id};`;
        try {
            const position = await this.#dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return position;
    }

}

module.exports = PositionController;