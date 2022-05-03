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
    const param = req.params.id;
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

    const description = req.body["description"];
    const weight = req.body["weight"];
    const volume = req.body["volume"];
    const notes = req.body["notes"];
    const price = req.body["price"];
    const availableQuantity = req.body["availableQuantity"];

    return res.status(200).json(message);
  });
  
  //PUT /api/sku/:id
  router.put('/api/sku/:id', (req,res)=>{
    const param = req.params.id;
    let message = {
      message: '/api/sku/:id'
    }

    const newDescription = req.body["newDescription"];
    const newWeight = req.body["newWeight"];
    const newVolume = req.body["newVolume"];
    const newNotes = req.body["newNotes"];
    const newPrice = req.body["newPrice"];
    const newAvailableQuantity = req.body["newAvailableQuantity"];


    return res.status(200).json(message);
  });
  
  //PUT /api/sku/:id/position
  router.put('/api/sku/:id', (req,res)=>{
    const param = req.params.id;
    let message = {
      message: '/api/sku/:id/position'
    }

    const position = req.body["position"];

    return res.status(200).json(message);
  });
  
  //DELETE /api/sku/:id
  router.delete('/api/sku/:id', (req,res)=>{
    const param = req.params.id;
    let message = {
      message: '/api/sku/:id'
    }
    return res.status(200).json(message);
  });


module.exports = router