const express = require('express')
const router = express.Router()
const Exceptions = require('./exceptions')
const Controller = require('../modules/logic/controller')

//GET /api/items
router.get('/api/items', async (req, res) => {

/** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET',req.url);
  let items;

  try {
    items = await controller.getItemController().getAllItems();
    console.log("items", items);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(items);

  /*await controller.getSkuController().getUserAPI()
    .then((user) => { return res.status(200).json(user); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });*/
});

//GET /api/items/:id
router.get('/api/items/:id', async (req, res) => {
  const param = req.params.id;
  
  let item;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET',req.url);
  
  try {
    item = await controller.getItemController().getItem(param);
    console.log("item", item);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(item);

  /*await controller.getSkuController().getUserAPI()
    .then((user) => { return res.status(200).json(user); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });*/
});

//POST /api/item
router.post('/api/item',async (req, res) => {
  

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('POST',req.url);

  try {
    await controller.getItemController().createItem(req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(201).end();

  /*await controller.getSkuController().getUserAPI()
    .then((user) => { return res.status(200).json(user); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });*/
});

//PUT /api/item/:id
router.put('/api/item/:id', async (req, res) => {
  const param = req.params.id;
  
  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('PUT',req.url);

  
  try {
    await controller.getItemController().editItem(param, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).end();

  /*await controller.getSkuController().getUserAPI()
    .then((user) => { return res.status(200).json(user); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });*/
});

//DELETE /api/items/:id
router.delete('/api/items/:id', async(req, res) => {
  const param = req.params.id;
  

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('DELETE',req.url);
  
  try {
    await controller.getItemController().deleteItem(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(204).end();

  /*await controller.getSkuController().getUserAPI()
    .then((user) => { return res.status(200).json(user); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });*/
});

module.exports = router;