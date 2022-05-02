const express = require('express')
const router = express.Router()


const testsRouter = require('./testsRouter');
router.use('/', testsRouter);

//SKU ITEM

//GET /api/skuitems
router.get('/api/skuitems', (req,res)=>{
    let message = {
      message: '/api/skuitems'
    }
    return res.status(200).json(message);
  });
  
  //GET /api/skuitems/sku/:id
  router.get('/api/skuitems/sku/:id', (req,res)=>{
    let message = {
      message: '/api/skuitems/sku/:id'
    }
    return res.status(200).json(message);
  });
  
  //GET /api/skuitems/:rfid
  router.get('/api/skuitems/:rfid', (req,res)=>{
    let message = {
      message: '/api/skuitems/:rfid'
    }
    return res.status(200).json(message);
  });
  
  //POST /api/skuitem
  router.post('/api/skuitem', (req,res)=>{
    let message = {
      message: '/api/skuitem'
    }
    return res.status(200).json(message);
  });
  
  //PUT /api/skuitems/:rfid
  router.put('/api/skuitems/:rfid', (req,res)=>{
    let message = {
      message: '/api/skuitems/:rfid'
    }
    return res.status(200).json(message);
  });
  
  //DELETE /api/skuitems/:rfid
  router.delete('/api/skuitems/:rfid', (req,res)=>{
    let message = {
      message: '/api/skuitems/:rfid'
    }
    return res.status(200).json(message);
  });



module.exports = router