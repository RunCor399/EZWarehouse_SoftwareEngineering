const express = require('express')
const router = express.Router()

//SKU
//GET /api/skus
router.get('/api/skus', (req,res)=>{
    let message = {
      message: '/api/skus'
    }
    return res.status(200).json(message);
  });
  
  //GET /api/skus/:id
  router.get('/api/skus/:id', (req,res)=>{
    let message = {
      message: '/api/skus/:id'
    }
    return res.status(200).json(message);
  });
  
  //POST /api/sku
  router.post('/api/sku', (req,res)=>{
    let message = {
      message: '/api/sku'
    }
    return res.status(200).json(message);
  });
  
  //PUT /api/sku/:id
  router.put('/api/sku/:id', (req,res)=>{
    let message = {
      message: '/api/sku/:id'
    }
    return res.status(200).json(message);
  });
  
  //PUT /api/sku/:id/position
  router.put('/api/sku/:id', (req,res)=>{
    let message = {
      message: '/api/sku/:id/position'
    }
    return res.status(200).json(message);
  });
  
  //DELETE /api/sku/:id
  router.delete('/api/sku/:id', (req,res)=>{
    let message = {
      message: '/api/sku/:id'
    }
    return res.status(200).json(message);
  });


module.exports = router