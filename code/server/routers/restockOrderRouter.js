const express = require('express')
const router = express.Router()
const Exceptions = require('./exceptions')

//Restock Order Requests


router.get('/api/restockOrders', async (req, res) => {
  let message = {
    message: 'GET Restock Orders'
  }
  let restockOrders;
  const controller = req.app.get("controller");
  console.log('GET',req.url);

  try {
    restockOrders = await controller.getRestockOrderController().getAllRestockOrders();
    console.log("restockOrders", restockOrders)
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});




router.get('/api/restockOrders/:id', async (req, res) => {
  const param = req.params.id;
  let message = {
    message: "GET: " + param
  }
  let restockOrder;
  const controller = req.app.get("controller");
  console.log('GET',req.url);
  
  try {
    restockOrder = await controller.getRestockOrderController().getRestockOrder(param);
    console.log("restockOrder", restockOrder);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  
  return res.status(200).json(message);
});

router.get('/api/restockOrders/:id/returnItems', async (req, res) => {
  const param = req.params.id;
  let message = {
    message: "/api/restockOrders/:id/returnItems"
  }
  
  let returnItems;
  const controller = req.app.get("controller");
  console.log('GET',req.url);
  
  try {
    returnItems = await controller.getRestockOrderController().getRestockOrderToBeReturned(param);
    console.log("returnItems", returnItems);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  
  return res.status(200).json(message);
});


router.get('/api/restockOrdersIssued', async (req, res) => {
  let message = {
    message: "/api/restockOrdersIssued"
  }
  
  let restockOrdersIssued;
  const controller = req.app.get("controller");
  console.log('GET',req.url);
  
  try {
    restockOrdersIssued = await controller.getRestockOrderController().getIssuedRestockOrders();
    console.log("restockOrdersIssued", restockOrdersIssued);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  
  return res.status(200).json(message);
});


router.post('/api/restockOrder', async (req, res) => {
  let message = {
    message: '/api/restockOrder'
  }  
  const controller = req.app.get("controller");
  console.log('POST',req.url);

  try {
    await controller.getRestockOrderController().createRestockOrder(req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }  

  return res.status(200).json(message);
});  

router.put('/api/restockOrder/:id', async (req, res) => {
  const param = req.params.id;
  let message = {
    message: "PUT /api/restockOrder/: " + param
  }  

  const controller = req.app.get("controller");
  console.log('PUT',req.url);

  try {
    await controller.getRestockOrderController().editRestockOrder(param, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }  

  return res.status(200).json(message);
})  




router.put('/api/restockOrder/:id/skuItems', async (req, res) => {
  const param = req.params.id;
  let message = {
    message: "PUT /api/restockOrder/id/skuItems: " + param
  }
  
  const controller = req.app.get("controller");
  console.log('PUT',req.url);
  
  
  try {
    await controller.getRestockOrderController().addSkuItemsToRestockOrder(param, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  
  return res.status(200).json(message);
});


router.put('/api/restockOrder/:id/transportNote', async (req, res) => {
  const param = req.params.id;
  let message = {
    message: "PUT /api/restockOrder/id/transportNote: " + param
  }
  
  const controller = req.app.get("controller");
  console.log('PUT',req.url);
  
  try {
    await controller.getRestockOrderController().addTransportNote(param, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  
  return res.status(200).json(message);
});


router.delete('/api/restockOrder/:id', async (req, res) => {
  const param = req.params.id;
  let message = {
    message: "DELETE /api/restockOrder/: " + param
  }

  const controller = req.app.get("controller");
  console.log('DELETE',req.url);

  try {
    await controller.getRestockOrderController().deleteRestockOrder(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

module.exports = router