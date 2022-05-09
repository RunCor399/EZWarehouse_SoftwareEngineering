const express = require('express')
const router = express.Router()

//SKU
//GET /api/skus
router.get('/api/skus', async (req, res) => {

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    await controller.getSkuController().getAllSku();
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json({ message: '/api/skus' });
});

//GET /api/skus/:id
router.get('/api/skus/:id', async (req, res) => {
  const param = req.params.id;

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    await controller.getSkuController().getSku(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json({ message: '/api/skus/:id' });

});

//POST /api/sku
router.post('/api/sku', async (req, res) => {
  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    await controller.getSkuController().createSku(req.body);
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
router.put('/api/sku/:id', async (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/sku/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    await controller.getSkuController().editSku(param, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  return res.status(200).json({ message: '/api/sku/:id' });

});

//PUT /api/sku/:id/position
router.put('/api/sku/:id', async (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/sku/:id/position'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);


  try {
    await controller.getSkuController().setPosition(param, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }


});

//DELETE /api/sku/:id
router.delete('/api/sku/:id', async (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/sku/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    await controller.getSkuController().deleteSku(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(204).json({ message: '/api/sku/:id' });

});


module.exports = router;