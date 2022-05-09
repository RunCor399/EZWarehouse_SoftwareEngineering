const express = require('express')
const router = express.Router()

//Internal Order Requests


router.route('/api/internalOrders')
  .get((req, res) => {
    let message = {
      message: 'GET Internal Orders'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);

    try {
      controller.getInternalOrderController().getAllInternalOrders();
    } catch (error) {
      let responseParams = Exceptions.handle(error);
      return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
  });

router.route('/api/internalOrdersIssued')
  .get((req, res) => {
    let message = {
      message: "GET: internalOrdersIssued "
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);

    try {
      controller.getInternalOrderController().getIssuedInternalOrders();
    } catch (error) {
      let responseParams = Exceptions.handle(error);
      return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
  });

router.route('/api/internalOrdersAccepted')
  .get((req, res) => {
    let message = {
      message: "GET: internalOrdersAccepted "
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);

    try {
      controller.getInternalOrderController().getAcceptedInternalOrders();
    } catch (error) {
      let responseParams = Exceptions.handle(error);
      return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
  });

router.route('/api/internalOrders/:id')
  .get((req, res) => {
    const param = req.params.id;
    let message = {
      message: 'GET Internal Orders'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);

    try {
      controller.getInternalOrderController().getInternalOrder(param);
    } catch (error) {
      let responseParams = Exceptions.handle(error);
      return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
  });

router.route('/api/internalOrder')
  .post((req, res) => {
    let message = {
      message: '/api/internalOrder'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);

    try {
      controller.getInternalOrderController().createInternalOrder(req.body);
    } catch (error) {
      let responseParams = Exceptions.handle(error);
      return res.status(responseParams.code).send(responseParams.message);
    }


    return res.status(200).json(message);
  });


router.route('/api/internalOrder/:id')
  .put((req, res) => {
    const param = req.params.id;
    let message = {
      message: "PUT /api/internalOrder/: " + param
    }
    const controller = req.app.get("controller");
    controller.testPrint(req.url);


      try {
        controller.getInternalOrderController().editIntenalOrder(param, req.body);
      } catch (error) {
        let responseParams = Exceptions.handle(error);
        return res.status(responseParams.code).send(responseParams.message);
      }
   

    return res.status(200).json(message);
  })
  .delete((req, res) => {
    const param = req.params.id;
    let message = {
      message: "DELETE /api/internalOrder/: " + param
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);
    
    try {
      controller.getInternalOrderController().deleteInternalOrder(param);
    } catch (error) {
      let responseParams = Exceptions.handle(error);
      return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
  });


  module.exports = router;