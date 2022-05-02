const express = require('express')
const router = express.Router()

//Restock Order Requests
//GET
router.get('/api/restockOrders', (req,res)=>{
    let message = {
      message: 'GET Restock Orders'
    }
    return res.status(200).json(message);
  });

  module.exports = router