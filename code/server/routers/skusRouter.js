const express = require('express')
const router = express.Router()

//SKU
//GET /api/skus
router.get('/api/skus', (req, res) => {
  let message = {
    message: '/api/skus'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);
  controller.getSkuController().getAllSku();

  return res.status(200).json(message);

  //unauthorized
  //return res.status(401);

  //Internal server error
  //return res.status(500)

});

//GET /api/skus/:id
router.get('/api/skus/:id', (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/skus/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);
  controller.getSkuController().getSku(param);

  return res.status(200).json(message);

  //unauthorized
  //return res.status(401);

  //not found
  //return res.status(404);

  //unprocessable entity
  //return res.status(422);

  //Internal server error
  //return res.status(500)
});

//POST /api/sku
router.post('/api/sku', (req, res) => {
  let message = {
    message: '/api/sku'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  const description = req.body["description"];
  const weight = req.body["weight"];
  const volume = req.body["volume"];
  const notes = req.body["notes"];
  const price = req.body["price"];
  const availableQuantity = req.body["availableQuantity"];

  controller.getSkuController().createSku(description, weight, volume, notes, price, availableQuantity);
  return res.status(201).json(message);

  //unauthorized
  //return res.status(401);

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

  controller.getSkuController().editSku(param, newDescription, newWeight, newVolume, newNotes, newPrice, newAvailableQuantity);

  return res.status(200).json(message);

  //unauthorized
  //return res.status(401);

  //not found
  //return res.status(404);

  //unprocessable entity
  //return res.status(422);

  //service unavalaible
  //return res.status(503)
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

  controller.getSkuController().setPosition(param, position);
  return res.status(200).json(message);

  //unauthorized
  //return res.status(401);

  //not found
  //return res.status(404);

  //unprocessable entity
  //return res.status(422);

  //service unavailable
  //return res.status(503)


});

//DELETE /api/sku/:id
router.delete('/api/sku/:id', (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/sku/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);
  controller.getSkuController().deleteSku(param);

  return res.status(204).json(message);

  //unauthorized
  //return res.status(401);

  //unprocessable entity
  //return res.status(422);

  //service unavailable
  //return res.status(503)
});


module.exports = router;