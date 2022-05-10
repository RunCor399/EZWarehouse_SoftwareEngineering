const express = require('express')
const router = express.Router()
const Exceptions = require('./exceptions')
const Controller = require('../modules/logic/controller')

//SKU ITEM

//GET /api/skuitems
router.get('/api/skuitems', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);
  let skuitems;

  try {
    skuitems = await controller.getSkuItemController().getAllSkuItems();
    console.log("skuitems", skuitems)
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(skuitems);
});

//GET /api/skuitems/sku/:id
router.get('/api/skuitems/sku/:id', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);
  let sku;

  try {
    sku = await controller.getSkuItemController().getSkuItems(param);
    console.log("sku", sku);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(sku);
});

//GET /api/skuitems/:rfid
router.get('/api/skuitems/:rfid', async (req, res) => {
  const param = req.params.rfid;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);
  let skuitem;

  try {
    skuitem = await controller.getSkuItemController().getSkuItem(param);
    console.log("skuitem", skuitem);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(skuitem);
});

//POST /api/skuitem
router.post('/api/skuitem', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('POST', req.url);

  try {
    await controller.getSkuItemController().createSkuItem(req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(201).end();
});

//PUT /api/skuitems/:rfid
router.put('/api/skuitems/:rfid', async (req, res) => {
  const param = req.params.rfid;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('PUT', req.url);

  try {
    await controller.getSkuItemController().editSkuItem(param, req.body)
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).end();
});

//DELETE /api/skuitems/:rfid
router.delete('/api/skuitems/:rfid', async (req, res) => {
  const param = req.params.rfid;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('DELETE', req.url);


  try {
    await controller.getSkuItemController().deleteSkuItem(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(204).end();
});



module.exports = router