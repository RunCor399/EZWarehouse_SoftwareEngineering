const express = require('express')
const router = express.Router()
const Exceptions = require('./exceptions')
const Controller = require('../modules/logic/controller')
//Restock Order Requests


router.get('/api/restockOrders', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET',req.url);
  let restockOrders;

  try {
    restockOrders = await controller.getRestockOrderController().getAllRestockOrders();
    console.log("restockOrders", restockOrders)
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(restockOrders);
});

router.get('/api/restockOrders/:id', async (req, res) => {
  const param = req.params.id;
 
  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET',req.url);
  let restockOrder;
  
  try {
    restockOrder = await controller.getRestockOrderController().getRestockOrder(param);
    console.log("restockOrder", restockOrder);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  
  return res.status(200).json(restockOrder);
});

router.get('/api/restockOrders/:id/returnItems', async (req, res) => {
  const param = req.params.id;
  
  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET',req.url);
  let returnItems;
  
  try {
    returnItems = await controller.getRestockOrderController().getRestockOrderToBeReturned(param);
    console.log("returnItems", returnItems);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  
  return res.status(200).json(returnItems);
});


router.get('/api/restockOrdersIssued', async (req, res) => {
  
  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET',req.url);
  let restockOrdersIssued;
  
  try {
    restockOrdersIssued = await controller.getRestockOrderController().getIssuedRestockOrders();
    console.log("restockOrdersIssued", restockOrdersIssued);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  
  return res.status(200).json(restockOrdersIssued);
});


router.post('/api/restockOrder', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('POST',req.url);

  try {
    await controller.getRestockOrderController().createRestockOrder(req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }  

  return res.status(200).end();
});  

router.put('/api/restockOrder/:id', async (req, res) => {
  const param = req.params.id

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('PUT',req.url);

  try {
    await controller.getRestockOrderController().editRestockOrder(param, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }  

  return res.status(200).end();
})  

router.put('/api/restockOrder/:id/skuItems', async (req, res) => {
  const param = req.params.id;
  
  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('PUT',req.url);
  
  
  try {
    await controller.getRestockOrderController().addSkuItemsToRestockOrder(param, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  
  return res.status(200).end();
});


router.put('/api/restockOrder/:id/transportNote', async (req, res) => {
  const param = req.params.id;
  
  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('PUT',req.url);
  
  try {
    await controller.getRestockOrderController().addTransportNote(param, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  
  return res.status(200).end();
});


router.delete('/api/restockOrder/:id', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('DELETE',req.url);

  try {
    await controller.getRestockOrderController().deleteRestockOrder(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).end();
});

module.exports = router