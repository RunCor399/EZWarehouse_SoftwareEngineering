const express = require('express')
const router = express.Router()


//TEST DESCRIPTOR
//GET /api/testDescriptors
router.get('/api/testDescriptors', (req,res)=>{
    let message = {
      message: '/api/testDescriptors'
    }
    return res.status(200).json(message);
  });
  
  //GET /api/testDescriptors/:id
  router.get('/api/testDescriptors/:id', (req,res)=>{
    let message = {
      message: '/api/testDescriptors/:id'
    }
    return res.status(200).json(message);
  });
  
  //POST /api/testDescriptor
  router.post('/api/testDescriptor', (req,res)=>{
    let message = {
      message: '/api/testDescriptor'
    }
    return res.status(200).json(message);
  });
  
  //PUT /api/testDescriptor/:id
  router.put('/api/testDescriptor/:id', (req,res)=>{
    let message = {
      message: '/api/testDescriptor/:id'
    }
    return res.status(200).json(message);
  });
  
  //DELETE /api/testDescriptor/:id
  router.delete('/api/testDescriptor/:id', (req,res)=>{
    let message = {
      message: '/api/testDescriptor/:id'
    }
    return res.status(200).json(message);
  });
  
  //TEST RESULT
  //GET /api/skuitems/:rfid/testResults
  router.get('/api/skuitems/:rfid/testResults', (req,res)=>{
    let message = {
      message: '/api/skuitems/:rfid/testResults'
    }
    return res.status(200).json(message);
  });
  
  //GET /api/skuitems/:rfid/testResults/:id
  router.get('/api/skuitems/:rfid/testResults/:id', (req,res)=>{
    let message = {
      message: '/api/skuitems/:rfid/testResults/:id'
    }
    return res.status(200).json(message);
  });
  
  //POST /api/skuitems/testResult
  router.post('/api/skuitems/testResult', (req,res)=>{
    let message = {
      message: '/api/skuitems/testResult'
    }
    return res.status(200).json(message);
  });
  
  //PUT /api/skuitems/:rfid/testResult/:id
  router.put('/api/skuitems/:rfid/testResult/:id', (req,res)=>{
    let message = {
      message: '/api/skuitems/:rfid/testResult/:id'
    }
    return res.status(200).json(message);
  });
  
  //DELETE /api/skuitems/:rfid/testResult/:id
  router.delete('/api/skuitems/:rfid/testResult/:id', (req,res)=>{
    let message = {
      message: '/api/skuitems/:rfid/testResult/:id'
    }
    return res.status(200).json(message);
  });


module.exports = router