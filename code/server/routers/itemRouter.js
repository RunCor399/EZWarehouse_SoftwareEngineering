const express = require('express')
const router = express.Router()

//SKU
//GET /api/items
router.get('/api/items', (req,res)=>{
    let message = {
      message: '/api/items'
    }
    return res.status(200).json(message);
  });
  
  //GET /api/items/:id
  router.get('/api/items/:id', (req,res)=>{
    const param = req.params.id;
    let message = {
      message: '/api/items/:id'
    }
    return res.status(200).json(message);
  });
  
  //POST /api/item
  router.post('/api/item', (req,res)=>{
    let message = {
      message: '/api/item'
    }

    const description = req.body["description"];
    const price = req.body["price"];
    const SKUid = req.body["SKUId"]
    const supplierId = req.body["supplierID"];

    return res.status(200).json(message);
  });
  
  //PUT /api/item/:id
  router.put('/api/sku/:id', (req,res)=>{
    const param = req.params.id;
    let message = {
      message: '/api/sku/:id'
    }

    const newDescription = req.body["newDescription"];
    const newPrice = req.body["newPrice"];


    return res.status(200).json(message);
  });
  
  //DELETE /api/items/:id
  router.delete('/api/items/:id', (req,res)=>{
    const param = req.params.id;
    let message = {
      message: '/api/items/:id'
    }
    return res.status(200).json(message);
  });


module.exports = router