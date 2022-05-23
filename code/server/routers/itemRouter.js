const express = require('express')
const router = express.Router()
const Controller = require('../modules/logic/controller')

//GET /api/items
router.get('/api/items', async (req, res) => {

/** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET',req.url);

  await controller.getItemController().getAllItems()
    .then((items) => { return res.status(200).json(items); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//GET /api/items/:id
router.get('/api/items/:id', async (req, res) => {
  const param = req.params.id;
  
  let item;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET',req.url);

  await controller.getItemController().getItem(param)
    .then((item) => { return res.status(200).json(item); })
    .catch(error => { console.log(error.getMessage()); return res.status(error.getCode()).send(error.getMessage()); });
});

//POST /api/item
router.post('/api/item',async (req, res) => {
  

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('POST',req.url);

  await controller.getItemController().createItem(req.body)
    .then(() => { return res.status(201).end(); })
    .catch(error => {console.log(error.getMessage()); return res.status(error.getCode()).send(error.getMessage()); });
});

//PUT /api/item/:id
router.put('/api/item/:id', async (req, res) => {
  const param = req.params.id;
  
  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('PUT',req.url);

  await controller.getItemController().editItem(param, req.body)
    .then(() => { return res.status(200).end(); })
    .catch(error => {console.log(error.getMessage()); return res.status(error.getCode()).send(error.getMessage()); });
});

//DELETE /api/items/:id
router.delete('/api/items/:id', async(req, res) => {
  const param = req.params.id;
  

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('DELETE',req.url);

  await controller.getItemController().deleteItem(param)
    .then(() => { return res.status(204).end(); })
    .catch(error => { console.log(error.getMessage()); return res.status(error.getCode()).send(error.getMessage()); });
});

module.exports = router;