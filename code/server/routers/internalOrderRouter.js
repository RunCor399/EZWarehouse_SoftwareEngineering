const express = require('express')
const router = express.Router()
const Exceptions = require('./exceptions')
const Controller = require('../modules/logic/controller')

router.get('/api/internalOrders', async (req, res) => {
  let message = {
    message: 'GET Internal Orders'
  }
  let internalOrders;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);

  try {
    internalOrders = await controller.getInternalOrderController().getAllInternalOrders();
    console.log("internalOrders", internalOrders)
  } catch (error) {
    console.log(error);
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

router.get('/api/internalOrdersIssued', async (req, res) => {
  let message = {
    message: "GET: internalOrdersIssued "
  }
  let internalOrdersIssued;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);

  try {
    internalOrdersIssued = await controller.getInternalOrderController().getIssuedInternalOrders();
    console.log("internalOrdersIssued", internalOrdersIssued)
  } catch (error) {
    console.log(error);
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(internalOrdersIssued);
});

router.get('/api/internalOrdersAccepted', async (req, res) => {
  let message = {
    message: "GET: internalOrdersAccepted "
  }
  let internalOrdersAccepted;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);

  try {
    internalOrdersAccepted = await controller.getInternalOrderController().getAcceptedInternalOrders();
    console.log("internalOrdersAccepted", internalOrdersAccepted);

  } catch (error) {
    console.log(error);
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

router.get('/api/internalOrders/:id', async (req, res) => {
  const param = req.params.id;
  let message = {
    message: 'GET Internal Orders'
  }

  let internalOrder;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);

  try {
    internalOrder = await controller.getInternalOrderController().getInternalOrder(param);
    console.log("internalOrder", internalOrder)
  } catch (error) {
    console.log(error);
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

router.post('/api/internalOrder', async (req, res) => {
  let message = {
    message: '/api/internalOrder'
  }

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('POST', req.url);

  try {
    await controller.getInternalOrderController().createInternalOrder(req.body);
  } catch (error) {
    console.log(error);
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }


  return res.status(200).json(message);
});


router.put('/api/internalOrder/:id', async (req, res) => {
  const param = req.params.id;
  let message = {
    message: "PUT /api/internalOrder/: " + param
  }
  
  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('PUT', req.url);


  try {
    await controller.getInternalOrderController().editInternalOrder(param, req.body);
  } catch (error) {
    console.log(error);
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }


  return res.status(200).json(message);
});

router.delete('/api/internalOrder/:id', async (req, res) => {
  const param = req.params.id;
  let message = {
    message: "DELETE /api/internalOrder/: " + param
  }

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('DELETE', req.url);

  try {
    await controller.getInternalOrderController().deleteInternalOrder(param);
  } catch (error) {
    console.log(error);
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});


module.exports = router;