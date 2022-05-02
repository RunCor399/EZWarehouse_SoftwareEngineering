'use strict';


const express = require('express');
const Controller = require('./modules/controller')
// init express
const app = new express();
const port = 3001;

const controller = new Controller();

app.use(express.json());

//GET /api/test
app.get('/api/hello', (req,res)=>{
  let message = {
    message: 'Hello World!'
  }
  return res.status(200).json(message);
});


//SKU
//GET /api/skus
app.get('/api/skus', (req,res)=>{
  let message = {
    message: '/api/skus'
  }
  return res.status(200).json(message);
});

//GET /api/skus/:id
app.get('/api/skus/:id', (req,res)=>{
  let message = {
    message: '/api/skus/:id'
  }
  return res.status(200).json(message);
});

//POST /api/sku
app.post('/api/sku', (req,res)=>{
  let message = {
    message: '/api/sku'
  }
  return res.status(200).json(message);
});

//PUT /api/sku/:id
app.put('/api/sku/:id', (req,res)=>{
  let message = {
    message: '/api/sku/:id'
  }
  return res.status(200).json(message);
});

//PUT /api/sku/:id/position
app.put('/api/sku/:id', (req,res)=>{
  let message = {
    message: '/api/sku/:id/position'
  }
  return res.status(200).json(message);
});

//DELETE /api/sku/:id
app.delete('/api/sku/:id', (req,res)=>{
  let message = {
    message: '/api/sku/:id'
  }
  return res.status(200).json(message);
});


//SKU ITEM

//GET /api/skuitems
app.get('/api/skuitems', (req,res)=>{
  let message = {
    message: '/api/skuitems'
  }
  return res.status(200).json(message);
});

//GET /api/skuitems/sku/:id
app.get('/api/skuitems/sku/:id', (req,res)=>{
  let message = {
    message: '/api/skuitems/sku/:id'
  }
  return res.status(200).json(message);
});

//GET /api/skuitems/:rfid
app.get('/api/skuitems/:rfid', (req,res)=>{
  let message = {
    message: '/api/skuitems/:rfid'
  }
  return res.status(200).json(message);
});

//POST /api/skuitem
app.post('/api/skuitem', (req,res)=>{
  let message = {
    message: '/api/skuitem'
  }
  return res.status(200).json(message);
});

//PUT /api/skuitems/:rfid
app.put('/api/skuitems/:rfid', (req,res)=>{
  let message = {
    message: '/api/skuitems/:rfid'
  }
  return res.status(200).json(message);
});

//DELETE /api/skuitems/:rfid
app.delete('/api/skuitems/:rfid', (req,res)=>{
  let message = {
    message: '/api/skuitems/:rfid'
  }
  return res.status(200).json(message);
});


//POSITION
//GET /api/positions
app.get('/api/positions', (req,res)=>{
  let message = {
    message: '/api/positions'
  }
  return res.status(200).json(message);
});

//POST /api/position
app.post('/api/position', (req,res)=>{
  let message = {
    message: '/api/position'
  }
  return res.status(200).json(message);
});

//PUT /api/position/:positionID
app.put('/api/position/:positionID', (req,res)=>{
  let message = {
    message: '/api/position/:positionID'
  }
  return res.status(200).json(message);
});

//PUT /api/position/:positionID/changeID
app.put('/api/position/:positionID/changeID', (req,res)=>{
  let message = {
    message: '/api/position/:positionID/changeID'
  }
  return res.status(200).json(message);
});

//DELETE /api/position/:positionID
app.delete('/api/position/:positionID', (req,res)=>{
  let message = {
    message: '/api/position/:positionID'
  }
  return res.status(200).json(message);
});

//TEST DESCRIPTOR
//GET /api/testDescriptors
app.get('/api/testDescriptors', (req,res)=>{
  let message = {
    message: '/api/testDescriptors'
  }
  return res.status(200).json(message);
});

//GET /api/testDescriptors/:id
app.get('/api/testDescriptors/:id', (req,res)=>{
  let message = {
    message: '/api/testDescriptors/:id'
  }
  return res.status(200).json(message);
});

//POST /api/testDescriptor
app.post('/api/testDescriptor', (req,res)=>{
  let message = {
    message: '/api/testDescriptor'
  }
  return res.status(200).json(message);
});

//PUT /api/testDescriptor/:id
app.put('/api/testDescriptor/:id', (req,res)=>{
  let message = {
    message: '/api/testDescriptor/:id'
  }
  return res.status(200).json(message);
});

//DELETE /api/testDescriptor/:id
app.delete('/api/testDescriptor/:id', (req,res)=>{
  let message = {
    message: '/api/testDescriptor/:id'
  }
  return res.status(200).json(message);
});

//TEST RESULT
//GET /api/skuitems/:rfid/testResults
app.get('/api/skuitems/:rfid/testResults', (req,res)=>{
  let message = {
    message: '/api/skuitems/:rfid/testResults'
  }
  return res.status(200).json(message);
});

//GET /api/skuitems/:rfid/testResults/:id
app.get('/api/skuitems/:rfid/testResults/:id', (req,res)=>{
  let message = {
    message: '/api/skuitems/:rfid/testResults/:id'
  }
  return res.status(200).json(message);
});

//POST /api/skuitems/testResult
app.post('/api/skuitems/testResult', (req,res)=>{
  let message = {
    message: '/api/skuitems/testResult'
  }
  return res.status(200).json(message);
});

//PUT /api/skuitems/:rfid/testResult/:id
app.put('/api/skuitems/:rfid/testResult/:id', (req,res)=>{
  let message = {
    message: '/api/skuitems/:rfid/testResult/:id'
  }
  return res.status(200).json(message);
});

//DELETE /api/skuitems/:rfid/testResult/:id
app.delete('/api/skuitems/:rfid/testResult/:id', (req,res)=>{
  let message = {
    message: '/api/skuitems/:rfid/testResult/:id'
  }
  return res.status(200).json(message);
});




// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;