const express = require('express')
const router = express.Router()

//SKU
//GET /api/items
router.get('/api/items', async (req, res) => {
  let message = {
    message: '/api/items'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    const items = await controller.getItemController().getAllItems();
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//GET /api/items/:id
router.get('/api/items/:id', async (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/items/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);
  
  try {
    const item = await controller.getItemController().getItem(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//POST /api/item
router.post('/api/item',async (req, res) => {
  let message = {
    message: '/api/item'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    await controller.getItemController().createItem(req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }


  return res.status(200).json(message);
});

//PUT /api/item/:id
router.put('/api/sku/:id', async (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/sku/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  
  try {
    await controller.getItemController().editItem(param, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//DELETE /api/items/:id
router.delete('/api/items/:id', async(req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/items/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);
  
  try {
    await controller.getItemController().deleteItem(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

module.exports = router;