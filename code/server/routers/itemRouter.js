const express = require('express')
const router = express.Router()

//SKU
//GET /api/items
router.get('/api/items',  (req, res) => {
  let message = {
    message: '/api/items'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    const items = controller.getItemController().getAllItems();
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//GET /api/items/:id
router.get('/api/items/:id', (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/items/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);
  
  try {
    const item = controller.getItemController().getItem(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//POST /api/item
router.post('/api/item', (req, res) => {
  let message = {
    message: '/api/item'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    controller.getItemController().createItem(req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }


  return res.status(200).json(message);
});

//PUT /api/item/:id
router.put('/api/sku/:id', (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/sku/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  
  try {
    controller.getItemController().editItem(param, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//DELETE /api/items/:id
router.delete('/api/items/:id', (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/items/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);
  
  try {
    controller.getItemController().deleteItem(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});


module.exports = router