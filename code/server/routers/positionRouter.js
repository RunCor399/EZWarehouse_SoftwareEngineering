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
    controller.print();

    return res.status(200).json(message);
  });
  
  //POST /api/position
  router.post('/api/position', (req,res)=>{
    let message = {
      message: '/api/position'
    }

    const controller = req.app.get("controller");
    controller.print();

    const positionID = req.body["positionID"];
    const aisleID = req.body["aisleID"];
    const row = req.body["row"];
    const col = req.body["col"];
    const maxWeight = req.body["maxWeight"];
    const maxVolume = req.body["maxVolume"];


    
    return res.status(200).json(message);
  });
  
  //PUT /api/position/:positionID
  router.put('/api/position/:positionID', (req,res)=>{
    const param = req.params.positionID;
    let message = {
      message: '/api/position/:positionID'
    }

    const controller = req.app.get("controller");
    controller.print();

    const newAisleID = req.body["newAisleID"];
    const newRow = req.body["newRow"];
    const newCol = req.body["newCol"];
    const newMaxWeight = req.body["newMaxWeight"];
    const newMaxVolume = req.body["newMaxVolume"];


    return res.status(200).json(message);
  });
  
  //PUT /api/position/:positionID/changeID
  router.put('/api/position/:positionID/changeID', (req,res)=>{
    const param = req.params.positionID;
    let message = {
      message: '/api/position/:positionID/changeID'
    }

    const controller = req.app.get("controller");
    controller.print();
    
    const newPositionID = req.body["newPositionID"];


    return res.status(200).json(message);
  });
  
  //DELETE /api/position/:positionID
  router.delete('/api/position/:positionID', (req,res)=>{
    const param = req.params.positionID;
    let message = {
      message: '/api/position/:positionID'
    }

    const controller = req.app.get("controller");
    controller.print();


    return res.status(200).json(message);
  });

module.exports = router