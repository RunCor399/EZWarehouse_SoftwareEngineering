const { application } = require('express');
const express = require('express')
const router = express.Router


//POSITION
//GET /api/positions
router.get('/api/positions', (req,res)=>{
    let message = {
      message: '/api/positions'
    }

    controller.getPositionController().getAllPositions();

    return res.status(200).json(message);
  });
  
  //POST /api/position
  router.post('/api/position', (req,res)=>{
    let message = {
      message: '/api/position'
    }

    controller.getPositionController().createPosition();

    return res.status(200).json(message);
  });
  
  //PUT /api/position/:positionID
  router.put('/api/position/:positionID', (req,res)=>{
    let message = {
      message: '/api/position/:positionID'
    }

    controller.getPositionController().editPosition();

    return res.status(200).json(message);
  });
  
  //PUT /api/position/:positionID/changeID
  router.put('/api/position/:positionID/changeID', (req,res)=>{
    let message = {
      message: '/api/position/:positionID/changeID'
    }
    controller.getPositionController().editPosition();

    return res.status(200).json(message);
  });
  
  //DELETE /api/position/:positionID
  router.delete('/api/position/:positionID', (req,res)=>{
    let message = {
      message: '/api/position/:positionID'
    }

    controller.getPositionController().deletePosition();
    return res.status(200).json(message);
  });

module.exports = router