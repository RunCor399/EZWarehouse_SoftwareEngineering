const express = require('express')
const router = express.Router()

//Internal Order Requests


router.route('/api/internalOrders')
  .get((req, res) => {
    let message = {
      message: 'GET Internal Orders'
    }
    return res.status(200).json(message);
  });

  router.route('/api/internalOrdersIssued')
    .get((req, res) => {
      let message = {
        message: "GET: internalOrdersIssued "
      }
      return res.status(200).json(message);
    });

    router.route('/api/internalOrdersAccepted')
    .get((req, res) => {
      let message = {
        message: "GET: internalOrdersAccepted "
      }
      return res.status(200).json(message);
    });
    
    router.route('/api/internalOrders/:id')
  .get((req, res) => {
    const param = req.params.id;
    let message = {
      message: 'GET Internal Orders'
    }
    return res.status(200).json(message);
  });

router.route('/api/internalOrder')
  .post((req, res) => {
    let message = {
      message: '/api/internalOrder'
    }

    const issueDate = req.body["issueDate"];
    const products = req.body["products"];
    const customerId = req.body["supplierId"]

    return res.status(200).json(message);
  });


  router.route('/api/internalOrder/:id')
    .put((req, res) => {
      const param = req.params.id;
      let message = {
        message: "PUT /api/internalOrder/: "+param
      }

      const newState = req.body["newState"];

      if(newState === "COMPLETED"){
        const products = req.body["products"];
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
      const param = req.params.id;
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

      const transportNote = req.body["transportNote"];

      return res.status(200).json(message);
    });

  module.exports = router