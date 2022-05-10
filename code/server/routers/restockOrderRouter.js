const express = require('express')
const router = express.Router()
const Exceptions = require('./exceptions')

//Restock Order Requests


router.route('/api/restockOrders').get(async (req, res) => {
  let message = {
    message: 'GET Restock Orders'
  }

  const controller = req.app.get("controller");
  console.log('GET',req.url);

  try {
    await controller.getRestockOrderController().getAllRestockOrders();
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
  
  const controller = req.app.get("controller");
  console.log('GET',req.url);
  
  try {
    await controller.getRestockOrderController().getRestockOrder(param);
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
  
  const controller = req.app.get("controller");
  console.log('GET',req.url);
  
  try {
    await controller.getRestockOrderController().getRestockOrderToBeReturned(param);
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
  
  const controller = req.app.get("controller");
  console.log('GET',req.url);
  
  try {
    await controller.getRestockOrderController().getIssuedRestockOrders();
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