const express = require('express')
const router = express.Router()


const testsRouter = require('./testsRouter');
router.use('/', testsRouter);

//SKU ITEM

//GET /api/skuitems
router.get('/api/skuitems', (req, res) => {
  let message = {
    message: '/api/skuitems'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);


  try {

    controller.getSkuItemController().getAllSkuItems();
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//GET /api/skuitems/sku/:id
router.get('/api/skuitems/sku/:id', (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/skuitems/sku/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);


  try {
    controller.getSkuItemController().getSkuItems(param);

  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }


  return res.status(200).json(message);



});

//GET /api/skuitems/:rfid
router.get('/api/skuitems/:rfid', (req, res) => {
  const param = req.params.rfid;
  let message = {
    message: '/api/skuitems/:rfid'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);


  try {
    controller.getSkuItemController().getSkuItem(param);

  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }


  return res.status(200).json(message);


});

//POST /api/skuitem
router.post('/api/skuitem', (req, res) => {
  let message = {
    message: '/api/skuitem'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    controller.getSkuItemController().createSkuItem(req.body);

  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }


  return res.status(201).json(message);


});

//PUT /api/skuitems/:rfid
router.put('/api/skuitems/:rfid', (req, res) => {
  const param = req.params.rfid;
  let message = {
    message: '/api/skuitems/:rfid'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);
  try {

    controller.getSkuItemController().editSkuItem(param, req.body)
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);


});

//DELETE /api/skuitems/:rfid
router.delete('/api/skuitems/:rfid', (req, res) => {
  const param = req.params.rfid;
  let message = {
    message: '/api/skuitems/:rfid'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);


  try {

    controller.getSkuItemController().deleteSkuItem(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(204).json(message);


});



module.exports = router