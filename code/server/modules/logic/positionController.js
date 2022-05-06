'use strict'

class PositionController {
    #controller;
    #dbManager;
    constructor(controller) {
        this.controller = controller;
        this.dbManager = controller.getDBManager();
        console.log("positionController started");
    }

    /*MODIFIED */
    getAllPositions() {
        const sqlInstruction = "SELECT * FROM Position";
        try {
            const rows = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    /*NEW - can occupiedWeight and occupiedVolume be initialized at zero? */
    createPosition(body) {

        const positionID = body["positionID"];
        const aisleID = body["aisleID"];
        const row = body["row"];
        const col = body["col"];
        const maxWeight = body["maxWeight"];
        const maxVolume = body["maxVolume"];

        const sqlInstruction = "INSERT INTO Position (ID, maxVolume, maxWeight, aisle, row, column) VALUES (?, ?, ?, ?, ?, ?);";
        try {
            const position = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return position;
    }

    /*NEW */
    editPosition(id, body) {

        const newAisleID = body["newAisleID"];
        const newRow = body["newRow"];
        const newCol = body["newCol"];
        const newMaxWeight = body["newMaxWeight"];
        const newMaxVolume = body["newMaxVolume"];

        const sqlInstruction = "UPDATE Position SET maxVolume=" + newMaxVolume + " AND maxWeight=" + newMaxWeight + " AND aisle=" + newAisleID + " AND row=" + newRow + " AND column=" + newCol + " WHERE ID=" + id;
        try {
            const position = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return position;
    }

    /*NEW */
    editPosition(oldId, body) {

        const newPositionID = body["newPositionID"];


        const sqlInstruction = "UPDATE SKU SET ID=" + newPositionID + " WHERE ID=" + oldId;
        try {
            const position = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return position;
    }


    /*MODIFIED */
    deletePosition(id) {
        const sqlInstruction = "DELETE FROM Position WHERE ID=" + id;
        try {
            const position = dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return position; /*position returned to test it*/
    }

}

module.exports = PositionController;