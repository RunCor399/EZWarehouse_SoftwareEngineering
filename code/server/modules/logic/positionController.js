'use strict'

class PositionController{
    constructor(controller) {
        this.controller = controller;
        this.dbManager = controller.getDBManager();
        console.log("positionController started");
    }
    
    getAllPositions(){
        return undefined;
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
        return undefined;
    }

}

module.exports = PositionController;