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

  const description = req.body["description"];
  const weight = req.body["weight"];
  const volume = req.body["volume"];
  const notes = req.body["notes"];
  const price = req.body["price"];
  const availableQuantity = req.body["availableQuantity"];


  try {
    controller.getSkuController().createSku(description, weight, volume, notes, price, availableQuantity);
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
  const newDescription = req.body["newDescription"];
  const newWeight = req.body["newWeight"];
  const newVolume = req.body["newVolume"];
  const newNotes = req.body["newNotes"];
  const newPrice = req.body["newPrice"];
  const newAvailableQuantity = req.body["newAvailableQuantity"];


  try {
    controller.getSkuController().editSku(param, newDescription, newWeight, newVolume, newNotes, newPrice, newAvailableQuantity);
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

  const position = req.body["position"];


  try {
    controller.getSkuController().setPosition(param, position);

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
  const session = controller.getSession();

  try {
    controller.getSkuController().deleteSku(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(204).json({ message: '/api/sku/:id' });

});


module.exports = router;