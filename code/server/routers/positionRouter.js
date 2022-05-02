const express = require('express')
const router = express.Router()


//POSITION
//GET /api/positions
router.get('/api/positions', (req,res)=>{
    let message = {
      message: '/api/positions'
    }
    return res.status(200).json(message);
  });
  
  //POST /api/position
  router.post('/api/position', (req,res)=>{
    let message = {
      message: '/api/position'
    }
    return res.status(200).json(message);
  });
  
  //PUT /api/position/:positionID
  router.put('/api/position/:positionID', (req,res)=>{
    let message = {
      message: '/api/position/:positionID'
    }
    return res.status(200).json(message);
  });
  
  //PUT /api/position/:positionID/changeID
  router.put('/api/position/:positionID/changeID', (req,res)=>{
    let message = {
      message: '/api/position/:positionID/changeID'
    }
    return res.status(200).json(message);
  });
  
  //DELETE /api/position/:positionID
  router.delete('/api/position/:positionID', (req,res)=>{
    let message = {
      message: '/api/position/:positionID'
    }
    return res.status(200).json(message);
  });

module.exports = router