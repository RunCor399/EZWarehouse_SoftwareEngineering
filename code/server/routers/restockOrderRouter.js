const express = require('express')
const router = express.Router()

//Restock Order Requests

router.route('/api/restockOrders')
  .get((req, res) => {
    let message = {
      message: 'GET Restock Orders'
    }
    return res.status(200).json(message);
  });


router.route('/api/restockOrder')
  .post((req, res) => {
    let message = {
      message: '/api/restockOrder'
    }
    return res.status(200).json(message);
  });


  router.route('/api/restockOrders/:id')
    .get((req, res) => {
      const param = req.params.id;
      let message = {
        message: "GET: "+param
      }
      return res.status(200).json(message);
    });
    
  router.route('/api/restockOrder/:id')
    .put((req, res) => {
      const param = req.params.id;
      let message = {
        message: "PUT /api/restockOrder/: "+param
      }
      return res.status(200).json(message);
    })
    .delete((req, res) => {
      const param = req.params.id;
      let message = {
        message: "DELETE /api/restockOrder/: "+param
      }
      return res.status(200).json(message);
    });


  router.route('/api/restockOrdersIssued')
    .get((req, res) => {
      let message = {
        message: "/api/restockOrdersIssued"
      }
      return res.status(200).json(message);
    });


  router.route('/api/restockOrders/:id/returnItems')
    .get((req, res) => {
      let message = {
        message: "/api/restockOrders/:id/returnItems"
      }
      return res.status(200).json(message);
    });


  router.route('/api/restockOrder/:id/skuItems')
    .put((req, res) => {
      const param = req.params.id;
      let message = {
        message: "PUT /api/restockOrder/id/skuItems: "+param
      }
      return res.status(200).json(message);
    });


    router.route('/api/restockOrder/:id/transportNote')
    .put((req, res) => {
      const param = req.params.id;
      let message = {
        message: "PUT /api/restockOrder/id/transportNote: "+param
      }
      return res.status(200).json(message);
    });

  module.exports = router