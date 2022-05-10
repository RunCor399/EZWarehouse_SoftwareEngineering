const express = require('express')
const router = express.Router()
const Exceptions = require('./exceptions')
const Controller = require('../modules/logic/controller')
//SKU
//GET /api/skus
router.get('/api/skus', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);
  let skus;
  try {
    skus = await controller.getSkuController().getAllSku();
    console.log("skus", skus);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(skus);
});

//GET /api/skus/:id
router.get('/api/skus/:id', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);
  let sku;

  try {
    sku = await controller.getSkuController().getSku(param);
    console.log("sku", sku)
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    console.log(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(sku);

});

//POST /api/sku
router.post('/api/sku', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('POST', req.url);

  console.l

  try {
    await controller.getSkuController().createSku(req.body);
  } catch (error) {
    console.log(error);
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(201).end();
});

//PUT /api/sku/:id
router.put('/api/sku/:id', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('PUT', req.url);

  try {
    await controller.getSkuController().editSku(param, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).end();
});

//PUT /api/sku/:id/position
router.put('/api/sku/:id', async (req, res) => {
  const param = req.params.id;
  
/** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('PUT', req.url);


  try {
    await controller.getSkuController().setPosition(param, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).end();
});

//DELETE /api/sku/:id
router.delete('/api/sku/:id', async (req, res) => {
  const param = req.params.id;
  
/** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('DELETE', req.url);

  try {
    await controller.getSkuController().deleteSku(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(204).end();
});


module.exports = router;