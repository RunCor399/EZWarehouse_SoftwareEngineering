const { application } = require('express');
const express = require('express')
const router = express.Router();


//POSITION
//GET /api/positions
router.get('/api/positions', (req,res)=>{
    let message = {
      message: '/api/positions'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);
    controller.getPositionController().getAllPositions();
  
  return res.status(200).json(message);
  
   //unauthorized
  //return res.status(401);

  //Internal Server Error
  //return res.status(500)
  });
  
  //POST /api/position
  router.post('/api/position', (req,res)=>{
    let message = {
      message: '/api/position'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);
    const positionID = req.body["positionID"];
    const aisleID = req.body["aisleID"];
    const row = req.body["row"];
    const col = req.body["col"];
    const maxWeight = req.body["maxWeight"];
    const maxVolume = req.body["maxVolume"];
    
    controller.getPositionController().createPosition(positionID, aisleID, row, col, maxWeight, maxVolume);
    
    
    return res.status(201).json(message);

     //unauthorized
  //return res.status(401);

  //not found
  //return res.status(404);

  //unprocessable entity
  //return res.status(422);

  //Service Unavailable
  //return res.status(503)
  });
  
  //PUT /api/position/:positionID
  router.put('/api/position/:positionID', (req,res)=>{
    const param = req.params.positionID;
    let message = {
      message: '/api/position/:positionID'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);
    const newAisleID = req.body["newAisleID"];
    const newRow = req.body["newRow"];
    const newCol = req.body["newCol"];
    const newMaxWeight = req.body["newMaxWeight"];
    const newMaxVolume = req.body["newMaxVolume"];
    
    controller.getPositionController().editPosition(param, newAisleID, newRow, newCol, newMaxWeight, newMaxVolume)

    return res.status(200).json(message);

     //unauthorized
  //return res.status(401);

  //not found
  //return res.status(404);

  //unprocessable entity
  //return res.status(422);

  //Service Unavailable
  //return res.status(503)
  });
  
  //PUT /api/position/:positionID/changeID
  router.put('/api/position/:positionID/changeID', (req,res)=>{
    const param = req.params.positionID;
    let message = {
      message: '/api/position/:positionID/changeID'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);
    const newPositionID = req.body["newPositionID"];
    controller.getPositionController().editPosition(param, newPositionID);    


    return res.status(200).json(message);

     //unauthorized
  //return res.status(401);

  //not found
  //return res.status(404);

  //unprocessable entity
  //return res.status(422);

  //Service Unavailable
  //return res.status(503)
  });
  
  //DELETE /api/position/:positionID
  router.delete('/api/position/:positionID', (req,res)=>{
    const param = req.params.positionID;
    let message = {
      message: '/api/position/:positionID'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);
    controller.getPositionController().deletePosition(param);

    return res.status(204).json(message);
     //unauthorized
  //return res.status(401);


  //unprocessable entity
  //return res.status(422);

  //Service Unavailable
  //return res.status(503)
  });

module.exports = router