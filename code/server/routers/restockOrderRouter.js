const express = require('express')
const router = express.Router()

//Restock Order Requests


router.route('/api/restockOrders')
  .get((req, res) => {
    let message = {
      message: 'GET Restock Orders'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);

    try {
      controller.getRestockOrderController().getAllRestockOrders();
    } catch (error) {
      let responseParams = Exceptions.handle(error);
      return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
  });


router.route('/api/restockOrder')
  .post((req, res) => {
    let message = {
      message: '/api/restockOrder'
    }
    const controller = req.app.get("controller");
    controller.testPrint(req.url);

    try {
      controller.getRestockOrderController().createRestockOrder(req.body);
    } catch (error) {
      let responseParams = Exceptions.handle(error);
      return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
  });


router.route('/api/restockOrders/:id')
  .get((req, res) => {
    const param = req.params.id;
    let message = {
      message: "GET: " + param
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);

    try {
      controller.getRestockOrderController().getRestockOrder(param);
    } catch (error) {
      let responseParams = Exceptions.handle(error);
      return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
  });

router.route('/api/restockOrder/:id')
  .put((req, res) => {
    const param = req.params.id;
    let message = {
      message: "PUT /api/restockOrder/: " + param
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);

    try {
      controller.getRestockOrderController().editRestockOrder(param, req.body);
    } catch (error) {
      let responseParams = Exceptions.handle(error);
      return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
  })
  .delete((req, res) => {
    const param = req.params.id;
    let message = {
      message: "DELETE /api/restockOrder/: " + param
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);

    try {
      controller.getRestockOrderController().deleteRestockOrder(param);
    } catch (error) {
      let responseParams = Exceptions.handle(error);
      return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
  });


router.route('/api/restockOrdersIssued')
  .get((req, res) => {
    let message = {
      message: "/api/restockOrdersIssued"
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);

    try {
      controller.getRestockOrderController().getIssuedRestockOrders();
    } catch (error) {
      let responseParams = Exceptions.handle(error);
      return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
  });


router.route('/api/restockOrders/:id/returnItems')
  .get((req, res) => {
    const param = req.params.id;
    let message = {
      message: "/api/restockOrders/:id/returnItems"
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);

    try {
      controller.getRestockOrderController().getRestockOrderToBeReturned(param);
    } catch (error) {
      let responseParams = Exceptions.handle(error);
      return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
  });


router.route('/api/restockOrder/:id/skuItems')
  .put((req, res) => {
    const param = req.params.id;
    let message = {
      message: "PUT /api/restockOrder/id/skuItems: " + param
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);


    try {
      controller.getRestockOrderController().addSkuItemsToRestockOrder(param, req.body);
    } catch (error) {
      let responseParams = Exceptions.handle(error);
      return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
  });


router.route('/api/restockOrder/:id/transportNote')
  .put((req, res) => {
    const param = req.params.id;
    let message = {
      message: "PUT /api/restockOrder/id/transportNote: " + param
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);

    try {
      controller.getRestockOrderController().addTransportNote(param, req.body);
    } catch (error) {
      let responseParams = Exceptions.handle(error);
      return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
  });

module.exports = router