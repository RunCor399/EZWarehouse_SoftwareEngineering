'use strict'

class PositionController{
    #controller;
    #dbManager;
    constructor(controller) {
        this.controller = controller;
        this.dbManager = controller.getDBManager();
        console.log("positionController started");
    }
    
    getAllPositions(){
        const sqlInstruction = "SELECT * FROM POSITIONS";
        try {
            const rows =   dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log(error);
        }
        return rows.map((row) => row);
    }

    createPosition(positionID, aisleID, row, col, maxWeight, maxVolume){
        return undefined;
    }
    
    editPosition(id, newAisleID, newRow, newCol, newMaxWeight, newMaxVolume){
        return undefined;
    }

    editPosition(oldId, newId){
        return undefined;
    }

    deletePosition(id){
        const sqlInstruction = "DELETE FROM POSITION WHERE id=" + id;
        try {
            const sku =  dbManager.genericSqlGet(sqlInstruction);
        } catch (error) {
            console.log("error");
        }
        return position; /*position returned to test it*/
    }

}

module.exports = PositionController;