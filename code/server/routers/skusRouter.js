const express = require('express')
const router = express.Router()

//SKU
//GET /api/skus
router.get('/api/skus', (req, res) => {

  const controller = req.app.get("controller");
  controller.testPrint(req.url);


  try {
    controller.getSkuController().getAllSku();
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json({ message: '/api/skus' });
});

//GET /api/skus/:id
router.get('/api/skus/:id', (req, res) => {
  const param = req.params.id;

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    controller.getSkuController().getSku(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json({ message: '/api/skus/:id' });

});

//POST /api/sku
router.post('/api/sku', (req, res) => {
  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    controller.getSkuController().createSku(req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json({ message: '/api/sku' });



  //unprocessable entity
  //return res.status(422);

  //Service unavailable
  //return res.status(503)
});

//PUT /api/sku/:id
router.put('/api/sku/:id', (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/sku/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    controller.getSkuController().editSku(param, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  return res.status(200).json({ message: '/api/sku/:id' });

});

//PUT /api/sku/:id/position
router.put('/api/sku/:id', (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/sku/:id/position'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);


  try {
    controller.getSkuController().setPosition(param, req.body);

  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }


});

//DELETE /api/sku/:id
router.delete('/api/sku/:id', (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/sku/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    controller.getSkuController().deleteSku(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(204).json({ message: '/api/sku/:id' });

});


module.exports = router;