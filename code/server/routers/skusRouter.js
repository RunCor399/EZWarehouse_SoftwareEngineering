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

  await controller.getSkuController().getAllSku()
    .then(skus => {return res.status(200).json(skus);})
    .catch(error => {return res.status(error.getCode()).send(error.getMessage());});


  
});

//GET /api/skus/:id
router.get('/api/skus/:id', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);
  let sku;

  /*
  try {
    sku = await controller.getSkuController().getSku(param);
    console.log("sku", sku)
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    console.log(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(sku);
  */
  
  await controller.getSkuController().getSku(param)
  .then(sku => {return res.status(200).json(sku);})
  .catch(error => {return res.status(error.getCode()).send(error.getMessage());});


});

//POST /api/sku
router.post('/api/sku', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('POST', req.url);


  try {
    console.log("prova4")

    await controller.getSkuController().createSku(req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    console.log(responseParams);
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
    console.log("prova")
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