const { application } = require('express');
const express = require('express')
const router = express.Router();
const Exceptions = require('./exceptions');
const Controller = require('../modules/logic/controller')

//POSITION
//GET /api/positions
router.get('/api/positions', async(req, res) => {
  
  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);
  let positions;

  try {
    positions = await controller.getPositionController().getAllPositions();
    console.log("positions",positions)
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(positions);

});

//POST /api/position
router.post('/api/position', async (req, res) => {
  

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('POST',req.url);

  try {
    await controller.getPositionController().createPosition(req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }


  return res.status(201).end();

});

//PUT /api/position/:positionID
router.put('/api/position/:positionID', async (req, res) => {
  const param = req.params.positionID;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('PUT',req.url);

  try {
   await controller.getPositionController().editPosition(param, req.body)
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).end();

});

//PUT /api/position/:positionID/changeID
router.put('/api/position/:positionID/changeID', async (req, res) => {
  const param = req.params.positionID;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('PUT',req.url);

  try {
    await controller.getPositionController().editPosition(param, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).end();

});

//DELETE /api/position/:positionID
router.delete('/api/position/:positionID', async (req, res) => {
  const param = req.params.positionID;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('DELETE',req.url);

  try {
   await controller.getPositionController().deletePosition(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(204).end();
});

module.exports = router;