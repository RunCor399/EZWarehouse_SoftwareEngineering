const express = require('express')
const router = express.Router()
const Exceptions = require('./exceptions')
const Controller = require('../modules/logic/controller')

router.get('/api/internalOrders', async (req, res) => {
  
  
  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);
  
  /* let internalOrders;
  try {
    internalOrders = await controller.getInternalOrderController().getAllInternalOrders();
    console.log("internalOrders", internalOrders)
  } catch (error) {
    console.log(error);
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(internalOrders); */

  await controller.getInternalOrderController().getAllInternalOrders()
    .then((orders) => { return res.status(200).json(orders); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
  
});

router.get('/api/internalOrdersIssued', async (req, res) => {
  
  
  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);
  
  /* let internalOrdersIssued;
  try {
    internalOrdersIssued = await controller.getInternalOrderController().getIssuedInternalOrders();
    console.log("internalOrdersIssued", internalOrdersIssued)
  } catch (error) {
    console.log(error);
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(internalOrdersIssued); */

  await controller.getInternalOrderController().getIssuedInternalOrders()
    .then((orders) => { return res.status(200).json(orders); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

router.get('/api/internalOrdersAccepted', async (req, res) => {
  
  
  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);
  
  /* try {
    let internalOrdersAccepted;
    internalOrdersAccepted = await controller.getInternalOrderController().getAcceptedInternalOrders();
    console.log("internalOrdersAccepted", internalOrdersAccepted);

  } catch (error) {
    console.log(error);
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(internalOrdersAccepted); */

  await controller.getInternalOrderController().getAcceptedInternalOrders()
    .then((orders) => { return res.status(200).json(orders); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

router.get('/api/internalOrders/:id', async (req, res) => {
  const param = req.params.id;


  
  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);
  
  /* let internalOrder;
  try {
    internalOrder = await controller.getInternalOrderController().getInternalOrder(param);
    console.log("internalOrder", internalOrder)
  } catch (error) {
    console.log(error);
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(internalOrder); */

  await controller.getInternalOrderController().getInternalOrder(param)
    .then((orders) => { return res.status(200).json(orders); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

router.post('/api/internalOrder', async (req, res) => {
  

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('POST', req.url);

 /*  try {
    await controller.getInternalOrderController().createInternalOrder(req.body);
  } catch (error) {
    console.log(error);
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }


  return res.status(200).end(); */

  await controller.getInternalOrderController().createInternalOrder(req.body)
    .then(() => { return res.status(200).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});


router.put('/api/internalOrder/:id', async (req, res) => {
  const param = req.params.id;
  

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('PUT', req.url);


 /*  try {
    await controller.getInternalOrderController().editInternalOrder(param, req.body);
  } catch (error) {
    console.log(error);
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }


  return res.status(200).end(); */

  await controller.getInternalOrderController().editInternalOrder(param, req.body)
    .then(() => { return res.status(200).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

router.delete('/api/internalOrder/:id', async (req, res) => {
  const param = req.params.id;
  

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('DELETE', req.url);

/*   try {
    await controller.getInternalOrderController().deleteInternalOrder(param);
  } catch (error) {
    console.log(error);
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).end();
 */
  
  await controller.getSkuController().deleteInternalOrder(param)
    .then((user) => { return res.status(200).json(user); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
  
});


module.exports = router;